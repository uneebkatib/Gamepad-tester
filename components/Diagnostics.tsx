'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

function StatCard({ label, value, sub, color='text-foreground' }: { label:string; value:string; sub?:string; color?:string }) {
  return (
    <div className="bg-background rounded-xl border border-border p-4">
      <div className="text-xs text-foreground-muted uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
      {sub && <div className="text-xs text-foreground-muted mt-0.5">{sub}</div>}
    </div>
  )
}

export default function Diagnostics() {
  const [selected, setSelected] = useState(0)
  const [status, setStatus] = useState([false,false,false,false])
  const [names, setNames] = useState(['','','',''])
  const [gpData, setGpData] = useState<any>(null)
  const [history, setHistory] = useState<number[]>([])
  const rafRef = useRef<number|null>(null)
  const prevRef = useRef<any>(null)

  const checkStatus = useCallback(()=>{
    try {
      if(!navigator.getGamepads) return
      const gps = navigator.getGamepads()
      const s=[false,false,false,false], n=['','','','']
      for(let i=0;i<4;i++){
        const gp = gps[i]
        if(gp && gp.connected){ s[i]=true; n[i]=((gp as any).id||'').split('(')[0].trim()||'Gamepad' }
      }
      setStatus(s); setNames(n)
    } catch(e){}
  },[])

  const loop = useCallback(()=>{
    try {
      const gp = navigator.getGamepads()[selected]
      if(gp?.connected){
        const axes = Array.from(gp.axes||[])
        const buttons = Array.from(gp.buttons||[]).map(b=>({pressed:b.pressed,value:b.value}))
        const maxDrift = Math.max(...axes.slice(0,4).map(v=>Math.abs(v)))
        setGpData({
          id: gp.id, index: gp.index, connected: gp.connected,
          mapping: gp.mapping, timestamp: gp.timestamp,
          axes, buttons,
          vibSupported: !!(gp as any).vibrationActuator,
          maxDrift,
          buttonCount: buttons.length, axisCount: axes.length,
        })
        setHistory(h=>[...h, maxDrift].slice(-60))
        prevRef.current = gp.timestamp
      }
    } catch(e){}
    rafRef.current = requestAnimationFrame(loop)
  },[selected])

  useEffect(()=>{ checkStatus(); const t=setInterval(checkStatus,1500); return()=>clearInterval(t) },[checkStatus])
  useEffect(()=>{
    if(status[selected]){ rafRef.current=requestAnimationFrame(loop) }
    return()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current) }
  },[selected,status,loop])

  const driftLabel = (v:number) => {
    if(v<0.05) return {label:'Excellent',color:'text-success'}
    if(v<0.10) return {label:'Good',color:'text-success'}
    if(v<0.14) return {label:'Acceptable',color:'text-warning'}
    if(v<0.25) return {label:'Early Drift',color:'text-warning'}
    return {label:'Severe Drift',color:'text-error'}
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex bg-surface rounded-2xl border border-border overflow-x-auto">
        {[0,1,2,3].map(i=>(
          <button key={i} onClick={()=>setSelected(i)}
            className={`flex-1 min-w-[110px] py-3 px-2 flex flex-col items-center gap-1 border-r border-border last:border-r-0 transition-all text-sm font-medium
              ${selected===i ? 'bg-background text-primary font-bold rounded-2xl' : 'text-foreground-secondary hover:bg-surface-hover'}`}>
            <span className="truncate max-w-[110px]">{status[i] ? names[i] : `Player ${i+1}`}</span>
            <span className={`text-xs font-semibold ${status[i] ? 'text-success' : 'text-foreground-muted'}`}>
              {status[i] ? '● Connected' : '○ Not found'}
            </span>
          </button>
        ))}
      </div>

      {gpData && status[selected] ? (
        <div className="space-y-5 animate-slide-up">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Controller" value={(names[selected]||'').substring(0,18)} sub={`Index: ${gpData.index}`}/>
            <StatCard label="Mapping" value={gpData.mapping} sub={`${gpData.buttonCount} buttons · ${gpData.axisCount} axes`}/>
            <StatCard label="Vibration" value={gpData.vibSupported?'Supported':'N/A'} color={gpData.vibSupported?'text-success':'text-foreground-muted'}/>
            <StatCard label="Timestamp" value={gpData.timestamp.toFixed(0)+'ms'} sub="Active since connection"/>
          </div>

          {/* Drift Analysis */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wider mb-4">Stick Drift Analysis</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['Left X','Left Y','Right X','Right Y'].map((lbl,i)=>{
                const v = gpData.axes[i]||0
                const abs = Math.abs(v)
                const {label,color} = driftLabel(abs)
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-secondary font-medium">{lbl}</span>
                      <div className="flex gap-2">
                        <span className={`text-xs font-bold ${color}`}>{label}</span>
                        <span className="font-mono text-xs text-foreground-muted">{v.toFixed(5)}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-75" style={{
                        width:`${abs*100}%`,
                        background: abs<0.1 ? 'var(--success)' : abs<0.25 ? 'var(--warning)' : 'var(--error)'
                      }}/>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Overall rating */}
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-foreground-secondary">Overall Health</span>
              <div className={`text-lg font-bold ${driftLabel(gpData.maxDrift).color}`}>
                {driftLabel(gpData.maxDrift).label} · {(gpData.maxDrift*100).toFixed(1)}% drift
              </div>
            </div>
          </div>

          {/* Live drift graph */}
          <div className="bg-surface rounded-2xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wider mb-3">Live Drift Graph (60 samples)</h3>
            <svg width="100%" height="80" viewBox={`0 0 ${history.length||60} 1`} preserveAspectRatio="none" className="rounded-lg overflow-hidden">
              <rect width="100%" height="1" fill="var(--background)"/>
              <line x1="0" y1="0.14" x2={history.length||60} y2="0.14" stroke="var(--warning)" strokeWidth="0.01" strokeDasharray="0.3 0.2"/>
              {history.map((v,i)=>(
                <rect key={i} x={i} y={1-v} width="1.2" height={v}
                  fill={v<0.1?'var(--success)':v<0.25?'var(--warning)':'var(--error)'} opacity="0.8"/>
              ))}
            </svg>
            <div className="flex gap-4 mt-2 text-xs text-foreground-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success inline-block" />
                {' <0.10 Good'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-warning inline-block" />
                {' 0.10–0.25 Watch'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error inline-block" />
                {' >0.25 Drift'}
              </span>
            </div>
          </div>

          {/* Raw Gamepad ID */}
          <div className="bg-surface rounded-2xl border border-border p-4">
            <div className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Full Device ID</div>
            <div className="font-mono text-sm text-foreground break-all">{gpData.id}</div>
          </div>
        </div>
      ) : (
        <div className="card flex flex-col items-center justify-center min-h-64 text-center gap-3 border-dashed border-2">
          <span className="text-4xl opacity-40">📊</span>
          <p className="text-foreground-secondary font-medium">Connect a gamepad to view diagnostics</p>
          <p className="text-foreground-muted text-sm">Press any button on your controller to begin</p>
        </div>
      )}
    </div>
  )
}
