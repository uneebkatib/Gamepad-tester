'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { XboxSVG } from './visuals/XboxSVG'
import { PS4SVG } from './visuals/PS4SVG'

const SR = 72 // stick radius in SVG units
const SECTORS = 36 // 10° each

/** Build max-radius polygon per sector, return avg error % and SVG polygon points */
function analyzeCirc(paths:{x:number;y:number}[]) {
  if(paths.length < 20) return { avgError: null, polyPoints: '' }
  const S = 180
  const maxR = new Array(SECTORS).fill(0)
  paths.forEach(p => {
    const angle = Math.atan2(p.y, p.x) // -π to π
    const sector = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * SECTORS) % SECTORS
    const r = Math.sqrt(p.x**2 + p.y**2)
    if(r > maxR[sector]) maxR[sector] = r
  })
  const filledSectors = maxR.filter(r => r > 0)
  if(filledSectors.length < 4) return { avgError: null, polyPoints: '' }
  const avgMaxR = filledSectors.reduce((a,b)=>a+b,0) / filledSectors.length
  const avgError = Math.max(0, Math.round((1 - avgMaxR) * 100))
  // Build SVG polygon from max points per sector
  const polyPoints = maxR.map((r, i) => {
    const angle = ((i + 0.5) / SECTORS) * 2 * Math.PI - Math.PI
    const rad = r * SR
    return `${S/2 + Math.cos(angle)*rad},${S/2 + Math.sin(angle)*rad}`
  }).join(' ')
  return { avgError, polyPoints }
}

function StickCircle({x=0,y=0,label='',paths=[],showPaths=false,testCirc=false}:
  {x:number;y:number;label:string;paths:{x:number;y:number}[];showPaths:boolean;testCirc:boolean}) {
  const S = 180, cx = S/2+x*SR, cy = S/2+y*SR
  const { avgError, polyPoints } = testCirc ? analyzeCirc(paths) : { avgError: null, polyPoints: '' }
  const t=paths.length>5?(Math.min(...paths.map(p=>p.y))*-100).toFixed(1):null
  const b=paths.length>5?(Math.max(...paths.map(p=>p.y))*100).toFixed(1):null
  const l=paths.length>5?(Math.min(...paths.map(p=>p.x))*-100).toFixed(1):null
  const r=paths.length>5?(Math.max(...paths.map(p=>p.x))*100).toFixed(1):null
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
      <div style={{position:'relative',width:S,height:S}}>
        <svg width={S} height={S}>
          {/* Green fill when testing circularity */}
          {testCirc && polyPoints && (
            <polygon points={polyPoints} fill="rgba(34,197,94,0.35)" stroke="rgba(34,197,94,0.7)" strokeWidth="1.5"/>
          )}
          <circle cx={S/2} cy={S/2} r={SR} fill="none" stroke="var(--border)" strokeWidth="1.5"/>
          <circle cx={S/2} cy={S/2} r={SR*.45} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity=".4"/>
          <line x1={S/2} y1={S/2-SR} x2={S/2} y2={S/2+SR} stroke="var(--border)" strokeWidth=".8" opacity=".5"/>
          <line x1={S/2-SR} y1={S/2} x2={S/2+SR} y2={S/2} stroke="var(--border)" strokeWidth=".8" opacity=".5"/>
          {showPaths && paths.length>1 && (
            <polyline points={paths.map(p=>`${S/2+p.x*SR},${S/2+p.y*SR}`).join(' ')}
              fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity=".65" strokeLinecap="round" strokeLinejoin="round"/>
          )}
          <circle cx={cx} cy={cy} r="7" fill="var(--foreground)" opacity=".85"/>
          <circle cx={cx} cy={cy} r="2.5" fill="var(--background)"/>
          {/* Avg Error label in center */}
          {testCirc && avgError !== null && (
            <>
              <text x={S/2} y={S/2-6} textAnchor="middle" fontSize="9" fill="rgb(34,197,94)" fontWeight="700">Avg Error</text>
              <text x={S/2} y={S/2+8} textAnchor="middle" fontSize="13" fill="rgb(34,197,94)" fontWeight="900">{avgError}%</text>
            </>
          )}
        </svg>
        {t&&<span style={{position:'absolute',top:1,left:'50%',transform:'translateX(-50%)',fontSize:9,fontFamily:'monospace',color:'var(--foreground-muted)'}}>{t}%</span>}
        {b&&<span style={{position:'absolute',bottom:1,left:'50%',transform:'translateX(-50%)',fontSize:9,fontFamily:'monospace',color:'var(--foreground-muted)'}}>{b}%</span>}
        {l&&<span style={{position:'absolute',top:'50%',left:0,transform:'translateY(-50%)',fontSize:9,fontFamily:'monospace',color:'var(--foreground-muted)'}}>{l}%</span>}
        {r&&<span style={{position:'absolute',top:'50%',right:0,transform:'translateY(-50%)',fontSize:9,fontFamily:'monospace',color:'var(--foreground-muted)'}}>{r}%</span>}
      </div>
      <div style={{fontSize:10,fontWeight:600,color:'var(--foreground-muted)'}}>{label}</div>
    </div>
  )
}

export default function GamepadTester() {
  const [sel,setSel]=useState(0)
  const [conn,setConn]=useState([false,false,false,false])
  const [names,setNames]=useState(['','','',''])
  const [ids,setIds]=useState(['','','',''])
  const [gd,setGd]=useState({axes:[] as number[],buttons:Array.from({length:17},()=>({pressed:false,value:0})),ts:0,mapping:'standard',vib:false})
  const [hist,setHist]=useState<string[]>([])
  const [showP,setShowP]=useState(false)
  const [lPath,setLPath]=useState<{x:number;y:number}[]>([])
  const [rPath,setRPath]=useState<{x:number;y:number}[]>([])
  const [infVib,setInfVib]=useState(false)
  const [vibPlaying,setVibPlaying]=useState(false)
  const [testCirc,setTestCirc]=useState(false)
  const showPRef=useRef(false)   // live refs so tick closure sees current values
  const testCircRef=useRef(false)
  const prevRef=useRef<any>(null),rafRef=useRef<number|null>(null),vibInt=useRef<any>(null)

  // Keep refs in sync with state
  useEffect(()=>{showPRef.current=showP},[showP])
  useEffect(()=>{testCircRef.current=testCirc},[testCirc])

  const checkConn=useCallback(()=>{
    try{
      const gps=navigator.getGamepads()
      const s=[false,false,false,false],n=['','','',''],i=['','','','']
      for(let x=0;x<4;x++){
        const gp=gps[x]
        if(gp && gp.connected){
          s[x]=true
          const id=(gp as any).id||''
          n[x]=id.split('(')[0].trim().slice(0,28)||'Gamepad'
          i[x]=id
        }
      }
      setConn(s);setNames(n);setIds(i)
    }catch(e){}
  },[])

  const tick=useCallback(()=>{
    try{
      const gp=navigator.getGamepads()[sel]
      if(gp?.connected){
        const axes=Array.from(gp.axes) as number[]
        const buttons=Array.from(gp.buttons).map(b=>({pressed:b.pressed,value:b.value}))
        const sig=axes.join(',')+buttons.map(b=>b.pressed?1:0).join('')
        if(sig!==prevRef.current?.sig){
          if(prevRef.current)buttons.forEach((b,i)=>{if(b.pressed&&!prevRef.current.buttons[i]?.pressed)setHist(h=>[`B${i}`,...h].slice(0,80))})
          setGd({axes,buttons,ts:gp.timestamp,mapping:gp.mapping||'standard',vib:!!(gp as any).vibrationActuator})
          // Only record paths when Show Paths or Test Circularity is active
          if(showPRef.current||testCircRef.current){
            setLPath(p=>[...p,{x:axes[0]||0,y:axes[1]||0}].slice(-800))
            setRPath(p=>[...p,{x:axes[2]||0,y:axes[3]||0}].slice(-800))
          }
          prevRef.current={sig,buttons}
        }
      }
    }catch(e){}
    rafRef.current=requestAnimationFrame(tick)
  },[sel])

  useEffect(()=>{checkConn();const t=setInterval(checkConn,1500);return()=>clearInterval(t)},[checkConn])
  useEffect(()=>{if(conn[sel])rafRef.current=requestAnimationFrame(tick);return()=>{if(rafRef.current)cancelAnimationFrame(rafRef.current)}},[sel,conn,tick])



  const stopVib=async()=>{try{const gp=navigator.getGamepads()[sel] as any;await gp?.vibrationActuator?.reset?.()}catch(e){}; clearInterval(vibInt.current);setVibPlaying(false)}
  const toggleVib=async()=>{
    if(vibPlaying){await stopVib();return}
    try{const gp=navigator.getGamepads()[sel] as any;if(!gp?.vibrationActuator)return;const play=()=>gp.vibrationActuator.playEffect('dual-rumble',{startDelay:0,duration:infVib?3000:800,weakMagnitude:1,strongMagnitude:1});await play();setVibPlaying(true);if(infVib)vibInt.current=setInterval(play,2800);else setTimeout(()=>setVibPlaying(false),900)}catch(e){}
  }
  const startCirc=()=>{setLPath([]);setRPath([]);setCirc({l:null,r:null});setShowP(true);setTesting(true);setTimeout(()=>setTesting(false),4000)}
  const clearPaths=()=>{setLPath([]);setRPath([]);setCirc({l:null,r:null});setShowP(false)}

  const isPS=ids[sel].toLowerCase().match(/playstation|wireless controller|dualshock|dualsense/)

  return (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>

      {/* ── TABS ── */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',background:'var(--surface)'}}>
        {[0,1,2,3].map(i=>(
          <button key={i} onClick={()=>setSel(i)} style={{padding:'8px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:2,borderRight:i<3?'1px solid var(--border)':'none',background:sel===i?'var(--background)':'transparent',transition:'background .15s',cursor:'pointer'}}>
            <span style={{fontSize:10,fontWeight:700,color:conn[i]?'var(--success)':'var(--foreground-muted)',letterSpacing:1,textTransform:'uppercase'}}>Player #{i+1}</span>
            <span style={{fontSize:11,fontWeight:600,color:sel===i?'var(--primary)':'var(--foreground-secondary)',maxWidth:110,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
              {conn[i]?`Virtual Controller ${i+1}`:`Not connected`}
            </span>
          </button>
        ))}
      </div>

      {conn[sel] ? (
        <div style={{display:'grid',gridTemplateColumns:'480px 1fr',gap:12,alignItems:'start'}}>

          {/* ════ LEFT CARD ════ */}
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,padding:20,display:'flex',flexDirection:'column',gap:16}}>

            {/* Title */}
            <div>
              <div style={{fontSize:18,fontWeight:700,color:'var(--foreground)'}}>Virtual Controller {sel+1}</div>
              <div style={{fontSize:11,fontWeight:700,color:'var(--primary)',textTransform:'uppercase',letterSpacing:1,marginTop:2}}>{names[sel]||'Unknown Controller'}</div>
              <div style={{display:'flex',gap:24,marginTop:6,fontSize:10,color:'var(--foreground-muted)',fontFamily:'monospace'}}>
                <span>Mapping: <span style={{color:'var(--foreground-secondary)'}}>{gd.mapping}</span></span>
                <span>Timestamp: <span style={{color:'var(--foreground-secondary)'}}>{gd.ts.toFixed(10)}</span></span>
              </div>
            </div>

            <div style={{height:1,background:'var(--border)'}}/>

            {/* Button States */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:'var(--foreground)',marginBottom:10}}>Button States</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(8,1fr)',gap:4}}>
                {gd.buttons.map((b,i)=>(
                  <div key={i} style={{
                    display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 2px',borderRadius:6,
                    border:`1px solid ${b.pressed?'var(--foreground)':b.value>0.01?'var(--primary)':'var(--border)'}`,
                    background:b.pressed?'var(--foreground)':b.value>0.01?'var(--primary)':'var(--background)',
                    color:b.pressed?'var(--background)':b.value>0.01?'white':'var(--foreground-muted)',
                    transition:'all .07s',cursor:'default',minHeight:40
                  }}>
                    <span style={{fontWeight:700,fontSize:9,lineHeight:1}}>B{i}</span>
                    <span style={{fontFamily:'monospace',fontSize:8,marginTop:3,opacity:.85}}>{b.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{height:1,background:'var(--border)'}}/>

            {/* Button History */}
            <div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:12,fontWeight:700,color:'var(--foreground)'}}>Buttons History</span>
                  <span style={{fontSize:9,background:'var(--background)',border:'1px solid var(--border)',borderRadius:4,padding:'1px 5px',color:'var(--foreground-muted)'}}>{hist.length}</span>
                </div>
                <button onClick={()=>setHist([])} style={{fontSize:12,color:'var(--foreground-muted)',background:'none',border:'none',cursor:'pointer'}} title="Clear">⊗</button>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4,minHeight:28,maxHeight:52,overflow:'hidden'}}>
                {hist.length===0
                  ?<span style={{fontSize:10,color:'var(--foreground-muted)',fontStyle:'italic'}}>Press buttons to see history…</span>
                  :hist.map((h,i)=><span key={i} style={{padding:'2px 6px',background:'rgba(16,185,129,.15)',color:'var(--success)',border:'1px solid rgba(16,185,129,.3)',borderRadius:4,fontSize:9,fontFamily:'monospace',fontWeight:700}}>{h}</span>)
                }
              </div>
            </div>

            <div style={{height:1,background:'var(--border)'}}/>

            {/* Vibration */}
            <div>
              <div style={{fontSize:12,fontWeight:700,color:'var(--foreground)',marginBottom:8}}>Vibration Test</div>
              <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                <label style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--foreground-secondary)',cursor:'pointer'}}>
                  <input type="checkbox" checked={infVib} onChange={e=>setInfVib(e.target.checked)} style={{accentColor:'var(--primary)',width:12,height:12}}/>
                  Infinite Vibration
                </label>
                <select style={{fontSize:10,border:'1px solid var(--border)',borderRadius:6,padding:'3px 6px',background:'var(--background)',color:'var(--foreground-secondary)'}}>
                  <option>Both Motors</option><option>Weak Motor</option><option>Strong Motor</option>
                </select>
                <button onClick={toggleVib} style={{width:28,height:28,borderRadius:'50%',border:'none',background:vibPlaying?'var(--error)':'var(--success)',color:'white',cursor:'pointer',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {vibPlaying?'⏹':'▶'}
                </button>
                {!gd.vib&&<span style={{fontSize:10,color:'var(--foreground-muted)'}}>Vibration is not supported by this controller/browser.</span>}
                {vibPlaying&&gd.vib&&<span style={{fontSize:10,color:'var(--success)',fontWeight:600}}>● Vibrating…</span>}
              </div>
            </div>
          </div>

          {/* ════ RIGHT CARD ════ */}
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,padding:20,display:'flex',flexDirection:'column',gap:16}}>

            {/* SVG */}
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',background:'var(--background)',borderRadius:12,border:'1px solid var(--border)',padding:'8px 0',overflow:'visible'}}>
              <div style={{transform:'scale(0.68)',transformOrigin:'center',lineHeight:0}}>
                {isPS?(
                  <PS4SVG leftX={gd.axes[0]||0} leftY={gd.axes[1]||0} rightX={gd.axes[2]||0} rightY={gd.axes[3]||0}
                    APressed={gd.buttons[0]?.pressed} BPressed={gd.buttons[1]?.pressed} XPressed={gd.buttons[2]?.pressed} YPressed={gd.buttons[3]?.pressed}
                    lbPressed={gd.buttons[4]?.pressed} rbPressed={gd.buttons[5]?.pressed} lt={gd.buttons[6]?.value} rt={gd.buttons[7]?.value}
                    sharePressed={gd.buttons[8]?.pressed} optionsPressed={gd.buttons[9]?.pressed} l3Pressed={gd.buttons[10]?.pressed} r3Pressed={gd.buttons[11]?.pressed}
                    upPressed={gd.buttons[12]?.pressed} downPressed={gd.buttons[13]?.pressed} leftPressed={gd.buttons[14]?.pressed} rightPressed={gd.buttons[15]?.pressed}
                    logoPressed={gd.buttons[16]?.pressed} touchbarPressed={gd.buttons[17]?.pressed}/>
                ):(
                  <XboxSVG leftX={gd.axes[0]||0} leftY={gd.axes[1]||0} rightX={gd.axes[2]||0} rightY={gd.axes[3]||0}
                    APressed={gd.buttons[0]?.pressed} BPressed={gd.buttons[1]?.pressed} XPressed={gd.buttons[2]?.pressed} YPressed={gd.buttons[3]?.pressed}
                    lbPressed={gd.buttons[4]?.pressed} rbPressed={gd.buttons[5]?.pressed} lt={gd.buttons[6]?.value} rt={gd.buttons[7]?.value}
                    sharePressed={gd.buttons[8]?.pressed} optionsPressed={gd.buttons[9]?.pressed} l3Pressed={gd.buttons[10]?.pressed} r3Pressed={gd.buttons[11]?.pressed}
                    upPressed={gd.buttons[12]?.pressed} downPressed={gd.buttons[13]?.pressed} leftPressed={gd.buttons[14]?.pressed} rightPressed={gd.buttons[15]?.pressed}/>
                )}
              </div>
            </div>

            {/* Stick Circles */}
            <div style={{display:'flex',justifyContent:'space-around'}}>
              <StickCircle x={gd.axes[0]||0} y={gd.axes[1]||0} label="Left Stick" paths={lPath} showPaths={showP} testCirc={testCirc}/>
              <StickCircle x={gd.axes[2]||0} y={gd.axes[3]||0} label="Right Stick" paths={rPath} showPaths={showP} testCirc={testCirc}/>
            </div>

            {/* Axis values */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4,borderTop:'1px solid var(--border)',paddingTop:12}}>
              {[['AXIS 0 (X)',gd.axes[0]||0],['AXIS 1 (Y)',gd.axes[1]||0],['AXIS 2 (X)',gd.axes[2]||0],['AXIS 3 (Y)',gd.axes[3]||0]].map(([lbl,v],i)=>(
                <div key={i} style={{textAlign:'center'}}>
                  <div style={{fontSize:9,color:'var(--foreground-muted)',textTransform:'uppercase',fontWeight:600}}>{lbl as string}</div>
                  <div style={{fontFamily:'monospace',fontSize:11,fontWeight:700,marginTop:2,color:Math.abs(v as number)>0.05?'var(--primary)':'var(--foreground-secondary)'}}>
                    {(v as number)>=0?'+':''}{(v as number).toFixed(5)}
                  </div>
                </div>
              ))}
            </div>

            {/* Show Paths | Test Circularity (checkbox) */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              <button onClick={()=>setShowP(v=>!v)} style={{padding:'7px 0',borderRadius:8,border:'1px solid var(--border)',background:showP?'var(--primary)':'var(--background)',color:showP?'white':'var(--foreground-secondary)',fontSize:12,fontWeight:600,cursor:'pointer',transition:'all .15s'}}>
                {showP?'Hide Paths':'Show Paths'}
              </button>
              <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,padding:'7px 0',borderRadius:8,border:`1px solid ${testCirc?'rgba(34,197,94,.4)':'var(--border)'}`,background:testCirc?'rgba(34,197,94,.1)':'var(--background)',cursor:'pointer',fontSize:12,fontWeight:600,color:testCirc?'rgb(34,197,94)':'var(--foreground-secondary)',transition:'all .15s'}}>
                <input type="checkbox" checked={testCirc} onChange={e=>{
                  const v=e.target.checked
                  setTestCirc(v)
                  if(v){setLPath([]);setRPath([]);setShowP(true)} // clear & start fresh
                }} style={{accentColor:'rgb(34,197,94)',width:12,height:12}}/>
                Test Circularity
                <span style={{width:13,height:13,borderRadius:'50%',border:'1px solid currentColor',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:700}}>i</span>
              </label>
            </div>

            {/* Clear Paths | Reset */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              <button onClick={()=>{setLPath([]);setRPath([]);setShowP(false)}} style={{padding:'6px 0',borderRadius:8,border:'1px solid var(--border)',background:'var(--background)',color:'var(--foreground-muted)',fontSize:11,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
                Clear Paths <span style={{fontSize:13}}>↺</span>
              </button>
              <button onClick={()=>{setLPath([]);setRPath([]);setShowP(false);setTestCirc(false);setHist([])}} style={{padding:'6px 0',borderRadius:8,border:'1px solid var(--border)',background:'var(--background)',color:'var(--foreground-muted)',fontSize:11,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
                Reset <span style={{fontSize:13}}>↺</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{background:'var(--surface)',border:'2px dashed var(--border)',borderRadius:16,padding:48,textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
          <div style={{fontSize:48,opacity:.3}}>🎮</div>
          <div style={{fontSize:20,fontWeight:700,color:'var(--foreground)'}}>No Controller Detected</div>
          <div style={{fontSize:14,color:'var(--foreground-muted)'}}>Press any button on Player {sel+1}'s controller to begin</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,maxWidth:400,marginTop:8,textAlign:'left'}}>
            {[{icon:'🔌',t:'USB',d:'Plug in directly — no drivers needed'},{icon:'📶',t:'Bluetooth',d:'Pair via OS settings first'},{icon:'🚫',t:'Close Steam/Xbox App',d:'They block browser access'},{icon:'🌐',t:'Chrome or Edge',d:'Best Gamepad API support'}].map((tip,i)=>(
              <div key={i} style={{padding:12,background:'var(--background)',borderRadius:12,border:'1px solid var(--border)'}}>
                <div style={{fontSize:18}}>{tip.icon}</div>
                <div style={{fontSize:12,fontWeight:600,color:'var(--foreground)',marginTop:4}}>{tip.t}</div>
                <div style={{fontSize:11,color:'var(--foreground-muted)',marginTop:2}}>{tip.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
