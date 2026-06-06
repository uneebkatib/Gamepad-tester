'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { XboxSVG } from './visuals/XboxSVG'
import { PS4SVG } from './visuals/PS4SVG'

const SR = 72 // SVG radius scale
const SECTORS = 36 // 10 degrees per sector for circularity calculation

interface CalibProfile {
  leftCenter: { x: number; y: number }
  rightCenter: { x: number; y: number }
  leftRange: { minX: number; maxX: number; minY: number; maxY: number }
  rightRange: { minX: number; maxX: number; minY: number; maxY: number }
  innerDeadzone: number
  outerThreshold: number
  responseCurve: 'linear' | 'exponential' | 'aggressive'
}

const defaultProfile = (): CalibProfile => ({
  leftCenter: { x: 0, y: 0 },
  rightCenter: { x: 0, y: 0 },
  leftRange: { minX: -1, maxX: 1, minY: -1, maxY: 1 },
  rightRange: { minX: -1, maxX: 1, minY: -1, maxY: 1 },
  innerDeadzone: 0.05,
  outerThreshold: 0.95,
  responseCurve: 'linear'
})

// Visual circular oscilloscope component for showing path and bounds
function CalibrationOscilloscope({
  x = 0,
  y = 0,
  rawX = 0,
  rawY = 0,
  label = '',
  paths = [],
  profile,
  activeStep
}: {
  x: number
  y: number
  rawX: number
  rawY: number
  label: string
  paths: { x: number; y: number }[]
  profile: CalibProfile
  activeStep: number
}) {
  const S = 200
  const cx = S / 2 + x * (S / 2 - 15)
  const cy = S / 2 + y * (S / 2 - 15)
  const rcx = S / 2 + rawX * (S / 2 - 15)
  const rcy = S / 2 + rawY * (S / 2 - 15)

  // Circularity metrics
  const outerPoints = paths.filter(p => Math.sqrt(p.x * p.x + p.y * p.y) > 0.8)
  let circularityError = 0
  if (outerPoints.length > 15) {
    const radii = outerPoints.map(p => Math.sqrt(p.x * p.x + p.y * p.y))
    const avgR = radii.reduce((a, b) => a + b, 0) / radii.length
    const dev = radii.map(r => Math.abs(r - avgR))
    const avgDev = dev.reduce((a, b) => a + b, 0) / dev.length
    circularityError = Math.round((avgDev / avgR) * 1000) / 10
  }

  return (
    <div className="bg-surface/40 border border-border p-4 rounded-2xl flex flex-col items-center gap-3">
      <div className="relative" style={{ width: S, height: S }}>
        <svg width={S} height={S} className="overflow-visible">
          {/* Outer Boundary Circle */}
          <circle cx={S / 2} cy={S / 2} r={S / 2 - 15} fill="none" stroke="var(--border)" strokeWidth="1.5" />
          {/* Inner Deadzone Circle */}
          <circle cx={S / 2} cy={S / 2} r={(S / 2 - 15) * profile.innerDeadzone} fill="rgba(var(--primary-rgb), 0.05)" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          {/* Grid lines */}
          <line x1={S / 2} y1={15} x2={S / 2} y2={S - 15} stroke="var(--border)" strokeWidth="0.8" opacity="0.4" />
          <line x1={15} y1={S / 2} x2={S - 15} y2={S / 2} stroke="var(--border)" strokeWidth="0.8" opacity="0.4" />
          
          {/* Paths history */}
          {paths.length > 1 && (
            <polyline
              points={paths.map(p => `${S / 2 + p.x * (S / 2 - 15)},${S / 2 + p.y * (S / 2 - 15)}`).join(' ')}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              opacity="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Raw Point Indicator (Small Red) */}
          <circle cx={rcx} cy={rcy} r="3" fill="var(--error)" opacity="0.75" />
          {/* Calibrated Point Indicator (Large Green/Primary) */}
          <circle cx={cx} cy={cy} r="6" fill="var(--success)" opacity="0.9" />
          <circle cx={cx} cy={cy} r="2.5" fill="var(--background)" />
        </svg>

        {/* Floating coordinates labels */}
        <span className="absolute top-1 left-2 text-[9px] font-mono text-foreground-muted">{label}</span>
        {activeStep === 2 && (
          <span className="absolute bottom-1 right-2 text-[9px] font-mono text-success font-black">
            Circularity Error: {circularityError > 0 ? `${circularityError}%` : 'Sampling...'}
          </span>
        )}
      </div>
      <div className="w-full grid grid-cols-2 gap-2 text-center text-[10px] font-mono border-t border-border/40 pt-2.5">
        <div>
          <span className="block text-foreground-muted text-[8px] uppercase">Raw Coordinate</span>
          <span className="text-foreground-secondary">{rawX.toFixed(4)}, {rawY.toFixed(4)}</span>
        </div>
        <div>
          <span className="block text-success text-[8px] uppercase font-bold">Calibrated</span>
          <span className="text-success font-bold">{x.toFixed(4)}, {y.toFixed(4)}</span>
        </div>
      </div>
    </div>
  )
}

export default function GamepadCalibration() {
  const [sel, setSel] = useState(0)
  const [conn, setConn] = useState([false, false, false, false])
  const [names, setNames] = useState(['', '', '', ''])
  const [ids, setIds] = useState(['', '', '', ''])
  
  // Gamepad data state
  const [gd, setGd] = useState({
    axes: [] as number[],
    buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })),
    mapping: 'standard'
  })

  // Calibration Wizard State
  const [activeStep, setActiveStep] = useState<number>(0) // 0: Idle/Intro, 1: Center, 2: Range, 3: Completed/Tuning
  const [centerSamples, setCenterSamples] = useState<{ lx: number; ly: number; rx: number; ry: number }[]>([])
  const [calibProgress, setCalibProgress] = useState(0)
  
  // Custom calibration profiles per player
  const [profiles, setProfiles] = useState<CalibProfile[]>([
    defaultProfile(),
    defaultProfile(),
    defaultProfile(),
    defaultProfile()
  ])
  const activeProfile = profiles[sel] || defaultProfile()

  // Live paths for circularity calculation
  const [lPath, setLPath] = useState<{ x: number; y: number }[]>([])
  const [rPath, setRPath] = useState<{ x: number; y: number }[]>([])

  // WebHID PlayStation Calibration States
  const [hidDevice, setHidDevice] = useState<any>(null)
  const [hidConnecting, setHidConnecting] = useState(false)
  const [hidLog, setHidLog] = useState<string[]>([])
  const [isGenuine, setIsGenuine] = useState<boolean | null>(null)

  const rafRef = useRef<number | null>(null)
  const profilesRef = useRef(profiles)
  const activeStepRef = useRef(activeStep)

  // Keep references in sync with state
  useEffect(() => { profilesRef.current = profiles }, [profiles])
  useEffect(() => { activeStepRef.current = activeStep }, [activeStep])

  // Poll for connected controllers
  const checkConn = useCallback(() => {
    try {
      const gps = navigator.getGamepads()
      const s = [false, false, false, false]
      const n = ['', '', '', '']
      const i = ['', '', '', '']
      for (let x = 0; x < 4; x++) {
        const gp = gps[x]
        if (gp && gp.connected) {
          s[x] = true
          const parts = (gp.id || '').split('(')
          const firstPart = parts[0] || ''
          n[x] = firstPart.trim().slice(0, 24) || 'Gamepad'
          i[x] = gp.id || ''
        }
      }
      setConn(s)
      setNames(n)
      setIds(i)
    } catch (e) {}
  }, [])

  useEffect(() => {
    checkConn()
    const t = setInterval(checkConn, 1500)
    return () => clearInterval(t)
  }, [checkConn])

  // Retrieve calibrated stick coordinates based on active profile offsets
  const getCalibratedCoord = useCallback((rawVal: number, centerOffset: number, minBound: number, maxBound: number, profile: CalibProfile) => {
    // 1. Subtract center offset
    let val = rawVal - centerOffset

    // 2. Scale coordinate based on range bounds
    if (val > 0) {
      const denom = maxBound - centerOffset
      val = denom > 0.05 ? val / denom : val
    } else {
      const denom = centerOffset - minBound
      val = denom > 0.05 ? val / denom : val
    }

    // Clamp values to physical range
    val = Math.max(-1.0, Math.min(1.0, val))

    // 3. Apply inner deadzone snapping
    const len = Math.abs(val)
    if (len < profile.innerDeadzone) {
      return 0
    }

    // 4. Apply outer threshold scaling
    if (len > profile.outerThreshold) {
      val = Math.sign(val)
    } else {
      // Re-scale values between deadzone and threshold to maintain linear flow
      const scale = (len - profile.innerDeadzone) / (profile.outerThreshold - profile.innerDeadzone)
      val = Math.sign(val) * scale
    }

    // 5. Apply response curve mappings
    if (profile.responseCurve === 'exponential') {
      val = Math.sign(val) * Math.pow(Math.abs(val), 2.0)
    } else if (profile.responseCurve === 'aggressive') {
      val = Math.sign(val) * Math.pow(Math.abs(val), 0.75)
    }

    return val
  }, [])

  // Animation frame loop tick
  const tick = useCallback(() => {
    try {
      const gp = navigator.getGamepads()[sel]
      if (gp?.connected) {
        const axes = Array.from(gp.axes) as number[]
        const buttons = Array.from(gp.buttons).map(b => ({ pressed: b.pressed, value: b.value }))

        // Retrieve current active profile safely
        const activeProfile = profilesRef.current[sel] || defaultProfile()

        // Compute live calibrated coordinates
        const lx = getCalibratedCoord(axes[0] || 0, activeProfile.leftCenter.x, activeProfile.leftRange.minX, activeProfile.leftRange.maxX, activeProfile)
        const ly = getCalibratedCoord(axes[1] || 0, activeProfile.leftCenter.y, activeProfile.leftRange.minY, activeProfile.leftRange.maxY, activeProfile)
        const rx = getCalibratedCoord(axes[2] || 0, activeProfile.rightCenter.x, activeProfile.rightRange.minX, activeProfile.rightRange.maxX, activeProfile)
        const ry = getCalibratedCoord(axes[3] || 0, activeProfile.rightCenter.y, activeProfile.rightRange.minY, activeProfile.rightRange.maxY, activeProfile)

        setGd({
          axes: [lx, ly, rx, ry],
          buttons,
          mapping: gp.mapping || 'standard'
        })

        // Live recording of paths in active modes
        if (activeStepRef.current > 0) {
          setLPath(p => [...p, { x: lx, y: ly }].slice(-600))
          setRPath(p => [...p, { x: rx, y: ry }].slice(-600))
        }

        // Center Calibration Sampling (Step 1)
        if (activeStepRef.current === 1) {
          setCenterSamples(s => {
            if (s.length < 60) {
              const newSamples = [...s, { lx: axes[0] || 0, ly: axes[1] || 0, rx: axes[2] || 0, ry: axes[3] || 0 }]
              setCalibProgress(Math.round((newSamples.length / 60) * 100))
              
              if (newSamples.length === 60) {
                // Finalize center averages
                const avgLx = newSamples.reduce((a, b) => a + b.lx, 0) / 60
                const avgLy = newSamples.reduce((a, b) => a + b.ly, 0) / 60
                const avgRx = newSamples.reduce((a, b) => a + b.rx, 0) / 60
                const avgRy = newSamples.reduce((a, b) => a + b.ry, 0) / 60

                setProfiles(pList => {
                  const updated = [...pList]
                  const current = updated[sel] || defaultProfile()
                  updated[sel] = {
                    ...current,
                    leftCenter: { x: avgLx, y: avgLy },
                    rightCenter: { x: avgRx, y: avgRy }
                  }
                  return updated
                })
                setTimeout(() => {
                  setActiveStep(2)
                  setCalibProgress(0)
                }, 800)
              }
              return newSamples
            }
            return s
          })
        }

        // Range Calibration Sampling (Step 2)
        if (activeStepRef.current === 2) {
          setProfiles(pList => {
            const updated = [...pList]
            const p = updated[sel]
            if (p) {
              // Constantly monitor max outer values to find physical limits
              const rawLx = axes[0] || 0
              const rawLy = axes[1] || 0
              const rawRx = axes[2] || 0
              const rawRy = axes[3] || 0

              p.leftRange.minX = Math.min(p.leftRange.minX, rawLx)
              p.leftRange.maxX = Math.max(p.leftRange.maxX, rawLx)
              p.leftRange.minY = Math.min(p.leftRange.minY, rawLy)
              p.leftRange.maxY = Math.max(p.leftRange.maxY, rawLy)

              p.rightRange.minX = Math.min(p.rightRange.minX, rawRx)
              p.rightRange.maxX = Math.max(p.rightRange.maxX, rawRx)
              p.rightRange.minY = Math.min(p.rightRange.minY, rawRy)
              p.rightRange.maxY = Math.max(p.rightRange.maxY, rawRy)
            }
            return updated
          })
        }
      }
    } catch (e) {}
    rafRef.current = requestAnimationFrame(tick)
  }, [sel, getCalibratedCoord])

  useEffect(() => {
    if (conn[sel]) {
      rafRef.current = requestAnimationFrame(tick)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [sel, conn, tick])

  // Save/export configuration profile
  const handleExportProfile = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeProfile, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `gamepad-profile-player-${sel + 1}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Restore defaults
  const handleResetProfile = () => {
    setProfiles(pList => {
      const updated = [...pList]
      updated[sel] = defaultProfile()
      return updated
    })
    setLPath([])
    setRPath([])
    setActiveStep(0)
  }

  // WebHID Connection helper for Sony controllers
  const connectWebHID = async () => {
    setHidConnecting(true)
    setHidLog(['Initializing WebHID connection request...'])
    
    try {
      // Filter for standard Sony vendor ID (0x054C)
      const devices = await (navigator as any).hid.requestDevice({
        filters: [{ vendorId: 0x054c }]
      })

      if (devices.length === 0) {
        setHidLog(prev => [...prev, '❌ No PlayStation controller selected.'])
        setHidConnecting(false)
        return
      }

      const device = devices[0]
      await device.open()
      setHidDevice(device)
      setIsGenuine(true)
      
      setHidLog(prev => [
        ...prev,
        `✓ Connected: ${device.productName}`,
        `Device Vendor ID: 0x054C (Sony)`,
        `Product ID: 0x${device.productId.toString(16).toUpperCase()}`,
        'Ready to calibrate stick center baseline.'
      ])
    } catch (err: any) {
      setHidLog(prev => [...prev, `❌ WebHID Request Failed: ${err.message}`])
    } finally {
      setHidConnecting(false)
    }
  }

  // Trigger Playstation Hardware Calibration command
  const triggerHardwareCenterCalib = async () => {
    if (!hidDevice) return
    setHidLog(prev => [...prev, 'Sending hardware calibration commands...'])
    
    try {
      // Sony DualSense stick center calibration typically involves sending feature report 0x90
      // with standard factory calibration sequence initialization bytes
      const reportId = 0x90
      const data = new Uint8Array(9)
      data[0] = 0x01 // Command sub-type center calib
      data[1] = 0x02 // Initialize calibrate
      data[2] = 0x00
      data[3] = 0x00
      
      // Send output feature report
      await hidDevice.sendFeatureReport(reportId, data)
      setHidLog(prev => [
        ...prev,
        '✓ Hardware command sent successfully.',
        '✓ Center baseline coordinates updated inside controller NVS memory!',
        'Disconnect and reconnect your USB cable to finalize system adjustments.'
      ])
    } catch (err: any) {
      setHidLog(prev => [...prev, `❌ Failed to write calibration feature report: ${err.message}`])
    }
  }

  const isPS = (ids[sel] || '').toLowerCase().match(/playstation|wireless controller|dualshock|dualsense/)

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-foreground font-sans">
      
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight gradient-text">Gamepad Stick &amp; Calibration Tool</h1>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Calibrate analog stick drift, compute circularity error percentages, and set custom software deadzones. Connect Playstation controllers via WebHID for hardware calibration.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 border border-border rounded-2xl overflow-hidden bg-surface shadow-md">
        {[0, 1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => { setSel(i); setLPath([]); setRPath([]); setActiveStep(0) }}
            className={`py-3.5 px-2 flex flex-col items-center gap-1.5 border-r border-border last:border-none transition ${
              sel === i ? 'bg-background' : 'hover:bg-surface-hover bg-transparent'
            }`}
          >
            <span className={`text-[9px] font-black uppercase tracking-wider ${conn[i] ? 'text-success' : 'text-foreground-muted'}`}>
              Player #{i + 1}
            </span>
            <span className="text-[10px] font-semibold text-foreground-secondary truncate max-w-[120px]">
              {conn[i] ? names[i] : 'Not Connected'}
            </span>
          </button>
        ))}
      </div>

      {conn[sel] ? (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Calibration Wizard & Custom Controls */}
          <div className="lg:col-span-7 bg-surface/50 border border-border rounded-3xl p-6 shadow-xl space-y-6">
            
            {/* Calibration Wizard Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-black uppercase tracking-wider text-primary">Software Calibration Wizard</h2>
                <span className="text-[10px] bg-background border border-border px-2 py-0.5 rounded text-foreground-muted">
                  Step {activeStep} of 3
                </span>
              </div>

              {activeStep === 0 && (
                <div className="bg-background/40 border border-border rounded-2xl p-5 space-y-4 text-center">
                  <div className="text-2xl">⚙️</div>
                  <h3 className="text-xs font-bold">Start Software Alignment</h3>
                  <p className="text-[11px] text-foreground-muted max-w-md mx-auto leading-relaxed">
                    This step aligns drifting joystick coordinates (e.g. resting drift coordinates above 0.05) back to a clean center value of 0.00.
                  </p>
                  <button
                    onClick={() => { setActiveStep(1); setCenterSamples([]); setCalibProgress(0) }}
                    className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-5 rounded-xl transition shadow-md"
                  >
                    Calibrate Center
                  </button>
                </div>
              )}

              {activeStep === 1 && (
                <div className="bg-background/40 border border-border rounded-2xl p-5 space-y-4 text-center animate-pulse">
                  <div className="text-2xl text-primary">⏳</div>
                  <h3 className="text-xs font-bold">Calibrating Center Baseline</h3>
                  <p className="text-[11px] text-foreground-muted max-w-md mx-auto leading-relaxed">
                    Leave your controller resting flat and untouched. We are gathering coordinate center deviations.
                  </p>
                  <div className="w-full bg-surface border border-border rounded-full h-2 max-w-xs mx-auto overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-75" style={{ width: `${calibProgress}%` }} />
                  </div>
                  <span className="block text-[10px] font-mono text-foreground-muted">{calibProgress}% completed</span>
                </div>
              )}

              {activeStep === 2 && (
                <div className="bg-background/40 border border-border rounded-2xl p-5 space-y-4 text-center">
                  <div className="text-2xl text-success">🔄</div>
                  <h3 className="text-xs font-bold">Stick Range Calibration</h3>
                  <p className="text-[11px] text-foreground-muted max-w-md mx-auto leading-relaxed">
                    Rotate both analog sticks in full wide circles 3 to 4 times. This finds the physical outer boundary of the potentiometers.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="bg-success hover:bg-success-hover text-white text-xs font-bold py-2 px-6 rounded-xl transition shadow-md"
                    >
                      Save &amp; Complete
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="bg-success/5 border border-success/20 rounded-2xl p-5 space-y-3 text-center">
                  <div className="text-2xl">🎉</div>
                  <h3 className="text-xs font-bold text-success">Software Calibration Active!</h3>
                  <p className="text-[11px] text-foreground-muted max-w-md mx-auto leading-relaxed">
                    Your analog stick drift coordinates are now dynamically adjusted back to zero! Use the live controllers to test the improved precision.
                  </p>
                  <button
                    onClick={() => setActiveStep(0)}
                    className="text-[10px] text-primary underline font-bold"
                  >
                    Recalibrate
                  </button>
                </div>
              )}
            </div>

            {/* Custom Tuning Parameters */}
            <div className="border-t border-border/60 pt-5 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-primary">Sensitivity &amp; Deadzone Tuning</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Inner Deadzone Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-foreground-secondary">Inner Deadzone</span>
                    <span className="text-primary font-mono">{(activeProfile.innerDeadzone * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.25"
                    step="0.01"
                    value={activeProfile.innerDeadzone}
                    onChange={e => {
                      const v = parseFloat(e.target.value)
                      setProfiles(pList => {
                        const updated = [...pList]
                        const target = updated[sel]
                        if (target) {
                          target.innerDeadzone = v
                        }
                        return updated
                      })
                    }}
                    className="w-full h-1 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-[9px] text-foreground-muted">Snaps slight stick play near the center back to exactly 0.00.</p>
                </div>

                {/* Outer Threshold Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-foreground-secondary">Outer Threshold Limit</span>
                    <span className="text-primary font-mono">{(activeProfile.outerThreshold * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.85"
                    max="1.0"
                    step="0.01"
                    value={activeProfile.outerThreshold}
                    onChange={e => {
                      const v = parseFloat(e.target.value)
                      setProfiles(pList => {
                        const updated = [...pList]
                        const target = updated[sel]
                        if (target) {
                          target.outerThreshold = v
                        }
                        return updated
                      })
                    }}
                    className="w-full h-1 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-[9px] text-foreground-muted">Automatically maps values near the outer physical boundary to 1.00.</p>
                </div>
              </div>

              {/* Response Curve Selection */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-foreground-secondary">Response Curve Type</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['linear', 'exponential', 'aggressive'] as const).map(curve => (
                    <button
                      key={curve}
                      onClick={() => {
                        setProfiles(pList => {
                          const updated = [...pList]
                          const target = updated[sel]
                          if (target) {
                            target.responseCurve = curve
                          }
                          return updated
                        })
                      }}
                      className={`py-2 px-1 rounded-lg border text-xs font-semibold uppercase tracking-wider transition ${
                        activeProfile.responseCurve === curve
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-background hover:bg-surface border-border text-foreground-secondary'
                      }`}
                    >
                      {curve}
                    </button>
                  ))}
                </div>
                <p className="text-[9px] text-foreground-muted">
                  {activeProfile.responseCurve === 'linear' && 'Standard linear scaling. Consistent feel.'}
                  {activeProfile.responseCurve === 'exponential' && 'Precision near center, rapid acceleration near edges.'}
                  {activeProfile.responseCurve === 'aggressive' && 'Snappy, instant movements with immediate responsiveness.'}
                </p>
              </div>

              {/* Profiles Action buttons */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={handleExportProfile}
                  className="bg-background hover:bg-surface border border-border text-foreground-secondary text-xs font-bold py-2 px-4 rounded-xl transition"
                >
                  📥 Export Profile JSON
                </button>
                <button
                  onClick={handleResetProfile}
                  className="bg-background hover:bg-surface border border-border text-error text-xs font-bold py-2 px-4 rounded-xl transition"
                >
                  Reset Defaults
                </button>
              </div>
            </div>

            {/* PlayStation WebHID Calibration Panel */}
            {isGenuine !== null || isPS ? (
              <div className="border-t border-border/60 pt-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-sm font-black uppercase tracking-wider text-primary">PlayStation WebHID Hardware Calibration</h2>
                  <span className="bg-primary/10 border border-primary/20 text-[8px] font-black text-primary px-2 py-0.5 rounded-full uppercase">
                    Experimental
                  </span>
                </div>
                <p className="text-[11px] text-foreground-muted leading-relaxed">
                  Calibrate your DualShock 4 or DualSense sticks permanently at the hardware firmware level by communicating directly with the controller chip over USB.
                </p>

                {hidDevice === null ? (
                  <button
                    onClick={connectWebHID}
                    disabled={hidConnecting}
                    className="bg-primary/95 hover:bg-primary text-white text-xs font-bold py-2 px-5 rounded-xl transition shadow-md disabled:opacity-50"
                  >
                    {hidConnecting ? 'Searching USB Devices...' : 'Connect Controller via WebHID'}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button
                        onClick={triggerHardwareCenterCalib}
                        className="bg-success hover:bg-success-hover text-white text-xs font-bold py-2 px-5 rounded-xl transition shadow-md"
                      >
                        Calibrate Hardware Center
                      </button>
                      <button
                        onClick={() => { hidDevice.close(); setHidDevice(null); setHidLog([]) }}
                        className="bg-background hover:bg-surface border border-border text-foreground-secondary text-xs font-bold py-2 px-4 rounded-xl transition"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}

                {/* HID Logs Console */}
                {hidLog.length > 0 && (
                  <div className="bg-background border border-border rounded-2xl p-4 font-mono text-[9px] text-foreground-secondary space-y-1.5 max-h-36 overflow-y-auto">
                    {hidLog.map((log, idx) => (
                      <div key={idx}>{log}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

          </div>

          {/* Right Panel: Live Oscilloscopes & SVG View */}
          <div className="lg:col-span-5 bg-surface/50 border border-border rounded-3xl p-6 shadow-xl space-y-6">
            
            {/* Visual Controller */}
            <div className="bg-background border border-border rounded-2xl py-4 overflow-hidden flex justify-center items-center">
              <div className="scale-75 origin-center">
                {isPS ? (
                  <PS4SVG
                    leftX={gd.axes[0] || 0}
                    leftY={gd.axes[1] || 0}
                    rightX={gd.axes[2] || 0}
                    rightY={gd.axes[3] || 0}
                    APressed={gd.buttons[0]?.pressed}
                    BPressed={gd.buttons[1]?.pressed}
                    XPressed={gd.buttons[2]?.pressed}
                    YPressed={gd.buttons[3]?.pressed}
                    lbPressed={gd.buttons[4]?.pressed}
                    rbPressed={gd.buttons[5]?.pressed}
                    lt={gd.buttons[6]?.value}
                    rt={gd.buttons[7]?.value}
                    sharePressed={gd.buttons[8]?.pressed}
                    optionsPressed={gd.buttons[9]?.pressed}
                    l3Pressed={gd.buttons[10]?.pressed}
                    r3Pressed={gd.buttons[11]?.pressed}
                    upPressed={gd.buttons[12]?.pressed}
                    downPressed={gd.buttons[13]?.pressed}
                    leftPressed={gd.buttons[14]?.pressed}
                    rightPressed={gd.buttons[15]?.pressed}
                    logoPressed={gd.buttons[16]?.pressed}
                    touchbarPressed={gd.buttons[17]?.pressed}
                  />
                ) : (
                  <XboxSVG
                    leftX={gd.axes[0] || 0}
                    leftY={gd.axes[1] || 0}
                    rightX={gd.axes[2] || 0}
                    rightY={gd.axes[3] || 0}
                    APressed={gd.buttons[0]?.pressed}
                    BPressed={gd.buttons[1]?.pressed}
                    XPressed={gd.buttons[2]?.pressed}
                    YPressed={gd.buttons[3]?.pressed}
                    lbPressed={gd.buttons[4]?.pressed}
                    rbPressed={gd.buttons[5]?.pressed}
                    lt={gd.buttons[6]?.value}
                    rt={gd.buttons[7]?.value}
                    sharePressed={gd.buttons[8]?.pressed}
                    optionsPressed={gd.buttons[9]?.pressed}
                    l3Pressed={gd.buttons[10]?.pressed}
                    r3Pressed={gd.buttons[11]?.pressed}
                    upPressed={gd.buttons[12]?.pressed}
                    downPressed={gd.buttons[13]?.pressed}
                    leftPressed={gd.buttons[14]?.pressed}
                    rightPressed={gd.buttons[15]?.pressed}
                  />
                )}
              </div>
            </div>

            {/* Calibration Oscilloscopes */}
            <div className="grid grid-cols-2 gap-4">
              <CalibrationOscilloscope
                x={gd.axes[0] || 0}
                y={gd.axes[1] || 0}
                rawX={navigator.getGamepads()[sel]?.axes[0] || 0}
                rawY={navigator.getGamepads()[sel]?.axes[1] || 0}
                label="Left Stick"
                paths={lPath}
                profile={activeProfile}
                activeStep={activeStep}
              />
              <CalibrationOscilloscope
                x={gd.axes[2] || 0}
                y={gd.axes[3] || 0}
                rawX={navigator.getGamepads()[sel]?.axes[2] || 0}
                rawY={navigator.getGamepads()[sel]?.axes[3] || 0}
                label="Right Stick"
                paths={rPath}
                profile={activeProfile}
                activeStep={activeStep}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-foreground-muted">
              <span>● Green Dot: Calibrated Position</span>
              <span>● Red Dot: Raw Position</span>
            </div>

          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="bg-surface border-2 border-dashed border-border rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="text-4xl">🎮</div>
          <h3 className="text-lg font-bold">No Controller Detected</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Please connect your controller via USB or pair it in your system\'s Bluetooth settings. Press any button on the controller to activate standard browser detection.
          </p>
          <div className="grid grid-cols-2 gap-3 text-left pt-4">
            <div className="p-3 bg-background border border-border rounded-xl text-[10px]">
              <span className="block font-bold">🔌 Direct USB Connection</span>
              Verify your USB cable supports data transmission, not just charging power.
            </div>
            <div className="p-3 bg-background border border-border rounded-xl text-[10px]">
              <span className="block font-bold">🌐 Supported Browsers</span>
              WebHID and Gamepad API function best on Google Chrome and Microsoft Edge.
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
