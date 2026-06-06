'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface DataPoint {
  x: number
  y: number
}

interface SimulatorData {
  error: string
  color: string
  desc: string
  pathColor: string
  points: [DataPoint, DataPoint, DataPoint, DataPoint, DataPoint, DataPoint, DataPoint, DataPoint]
}

// Circularity Error Simulator Component
const CircularitySimulator = () => {
  const [mode, setMode] = useState<'new' | 'worn' | 'calibrated'>('new')

  const getData = (): SimulatorData => {
    switch (mode) {
      case 'new':
        return {
          error: '1.2%',
          color: 'text-success border-success/30 bg-success/5',
          desc: 'Almost perfect circular boundary. Tiny variations from manufacturing tolerances.',
          pathColor: 'var(--success)',
          points: [
            { x: 100, y: 32 }, { x: 148, y: 52 }, { x: 168, y: 100 }, { x: 148, y: 148 },
            { x: 100, y: 168 }, { x: 52, y: 148 }, { x: 32, y: 100 }, { x: 52, y: 52 }
          ]
        }
      case 'worn':
        return {
          error: '16.8%',
          color: 'text-error border-error/30 bg-error/5',
          desc: 'Severely flattened edges and center offset. Wiper tracks are physically degraded.',
          pathColor: 'var(--error)',
          points: [
            { x: 100, y: 45 }, { x: 155, y: 55 }, { x: 158, y: 100 }, { x: 135, y: 135 },
            { x: 100, y: 155 }, { x: 60, y: 140 }, { x: 42, y: 100 }, { x: 62, y: 62 }
          ]
        }
      case 'calibrated':
        return {
          error: '3.4%',
          color: 'text-primary border-primary/30 bg-primary/5',
          desc: 'Center offset subtracted and outer limits scaled. Pinpoint accuracy restored.',
          pathColor: 'var(--primary)',
          points: [
            { x: 100, y: 35 }, { x: 146, y: 54 }, { x: 165, y: 100 }, { x: 146, y: 146 },
            { x: 100, y: 165 }, { x: 54, y: 146 }, { x: 35, y: 100 }, { x: 54, y: 54 }
          ]
        }
      default:
        return {
          error: '1.2%',
          color: 'text-success border-success/30 bg-success/5',
          desc: 'Almost perfect circular boundary. Tiny variations from manufacturing tolerances.',
          pathColor: 'var(--success)',
          points: [
            { x: 100, y: 32 }, { x: 148, y: 52 }, { x: 168, y: 100 }, { x: 148, y: 148 },
            { x: 100, y: 168 }, { x: 52, y: 148 }, { x: 32, y: 100 }, { x: 52, y: 52 }
          ]
        }
    }
  }

  const activeData = getData()

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 my-6 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-foreground-muted tracking-wider block">Interactive Telemetry Tool</span>
          <h4 className="text-xs font-bold text-foreground">Circularity Error Simulator</h4>
        </div>
        <div className="flex gap-1.5">
          {(['new', 'worn', 'calibrated'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition ${
                mode === m
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-background hover:bg-surface-hover border-border text-foreground-secondary'
              }`}
            >
              {m === 'new' ? 'Brand New' : m === 'worn' ? 'Worn Out' : 'Calibrated'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 bg-background border border-border/60 rounded-xl p-4">
        {/* SVG Circle Graph */}
        <div className="relative w-36 h-36 shrink-0 bg-surface rounded-full border border-border/80 flex items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 200 200" className="w-full h-full">
            {/* Grid Cross */}
            <line x1="100" y1="10" x2="100" y2="190" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="10" y1="100" x2="190" y2="100" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
            {/* Perfect Circle Reference */}
            <circle cx="100" cy="100" r="68" fill="none" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="2 2" />
            {/* Actual Path */}
            <path
              d={`M ${activeData.points[0].x} ${activeData.points[0].y} 
                  Q ${activeData.points[1].x} ${activeData.points[1].y} ${activeData.points[2].x} ${activeData.points[2].y}
                  Q ${activeData.points[3].x} ${activeData.points[3].y} ${activeData.points[4].x} ${activeData.points[4].y}
                  Q ${activeData.points[5].x} ${activeData.points[5].y} ${activeData.points[6].x} ${activeData.points[6].y}
                  Q ${activeData.points[7].x} ${activeData.points[7].y} ${activeData.points[0].x} ${activeData.points[0].y} Z`}
              fill={mode === 'new' ? 'rgba(16,185,129,0.08)' : mode === 'worn' ? 'rgba(239,68,68,0.08)' : 'rgba(59,130,246,0.08)'}
              stroke={activeData.pathColor}
              strokeWidth="2.5"
              className="transition-all duration-300"
            />
            {/* Center Pointer */}
            <circle cx="100" cy="100" r="4" fill="var(--foreground)" />
            {/* Input resting dot */}
            <circle
              cx={mode === 'worn' ? 115 : 100}
              cy={mode === 'worn' ? 88 : 100}
              r="6"
              fill={mode === 'worn' ? 'var(--error)' : 'var(--success)'}
              className="transition-all duration-300"
            />
          </svg>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-mono font-bold">Circularity Index:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black border ${activeData.color}`}>
              {activeData.error}
            </span>
          </div>
          <p className="text-[11px] text-foreground-muted leading-relaxed">
            {activeData.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

// Response Curve Graph Component
const CurveVisualizer = () => {
  const [curve, setCurve] = useState<'linear' | 'expo' | 'agg'>('linear')

  const getPath = () => {
    switch (curve) {
      case 'linear':
        return 'M 20 120 L 120 20'
      case 'expo':
        return 'M 20 120 Q 80 110 120 20'
      case 'agg':
        return 'M 20 120 Q 30 30 120 20'
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 my-6 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-foreground-muted tracking-wider block">Real-time Response Curves</span>
          <h4 className="text-xs font-bold text-foreground">Sensitivity Curve Tuning Graph</h4>
        </div>
        <div className="flex gap-1.5">
          {(['linear', 'expo', 'agg'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCurve(c)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition capitalize ${
                curve === c
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-background hover:bg-surface-hover border-border text-foreground-secondary'
              }`}
            >
              {c === 'linear' ? 'Linear' : c === 'expo' ? 'Exponential' : 'Aggressive'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 bg-background border border-border/60 rounded-xl p-4">
        {/* Graph representation */}
        <div className="w-36 h-36 bg-surface border border-border rounded-lg relative flex items-center justify-center p-2">
          <svg width="140" height="140" viewBox="0 0 140 140" className="w-full h-full">
            {/* Grid background */}
            <line x1="20" y1="20" x2="20" y2="120" stroke="var(--border)" strokeWidth="1" />
            <line x1="20" y1="120" x2="120" y2="120" stroke="var(--border)" strokeWidth="1" />
            <line x1="20" y1="70" x2="120" y2="70" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="70" y1="20" x2="70" y2="120" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
            {/* Math Plot Curve */}
            <path d={getPath()} fill="none" stroke="var(--primary)" strokeWidth="2.5" className="transition-all duration-300" />
            {/* Graph Labels */}
            <text x="70" y="132" textAnchor="middle" fill="var(--foreground-muted)" className="text-[7px] font-mono">Stick Pull</text>
            <text x="8" y="75" textAnchor="middle" fill="var(--foreground-muted)" className="text-[7px] font-mono" transform="rotate(-90 8 75)">Output</text>
          </svg>
        </div>

        <div className="space-y-2 flex-1 text-center sm:text-left">
          <h5 className="text-[11px] font-bold capitalize text-foreground">{curve} Response Profile</h5>
          <p className="text-[11px] text-foreground-muted leading-relaxed">
            {curve === 'linear' && 'Matches physical input directly 1:1. Standard for racing, driving, and general platformers where predictable precision is desired.'}
            {curve === 'expo' && 'Soft sensitivity near the center for high-precision aiming and minor adjustment tweaks, with rapid speed gains at the outer boundaries.'}
            {curve === 'agg' && 'Extremely fast sensitivity acceleration near the center point. Best for fighting games and rapid twitch motions.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// Step-by-Step Guides Accordion
const StepGuides = () => {
  const [activeTab, setActiveTab] = useState<'win' | 'steam' | 'switch'>('win')

  return (
    <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="flex border-b border-border bg-surface">
        {(['win', 'steam', 'switch'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-bold transition border-b-2 ${
              activeTab === tab
                ? 'border-primary text-primary bg-background'
                : 'border-transparent text-foreground-muted hover:text-foreground hover:bg-surface-hover'
            }`}
          >
            {tab === 'win' ? 'Windows OS' : tab === 'steam' ? 'Steam App' : 'Nintendo Switch'}
          </button>
        ))}
      </div>

      <div className="p-5 bg-background space-y-4 min-h-[200px]">
        {activeTab === 'win' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground">Native Windows 10/11 Calibration Panel</h3>
            <ol className="list-decimal pl-5 text-[11px] text-foreground-muted space-y-2 leading-relaxed">
              <li>Connect your controller via USB or pair it in your Windows Bluetooth settings.</li>
              <li>Press the <strong>Windows Key + R</strong>, type <code>joy.cpl</code> inside the dialog, and hit enter.</li>
              <li>Under the Game Controllers list, highlight your controller and click <strong>Properties</strong>.</li>
              <li>Navigate to the <strong>Settings</strong> tab and click the <strong>Calibrate...</strong> button.</li>
              <li>Follow the native wizard to set center rest points and rotate to map coordinate bounds.</li>
            </ol>
          </div>
        )}

        {activeTab === 'steam' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground">Steam Input Layout Configuration</h3>
            <ul className="list-disc pl-5 text-[11px] text-foreground-muted space-y-2 leading-relaxed">
              <li>Launch Steam and navigate into <strong>Big Picture Mode</strong>.</li>
              <li>Go to <strong>Settings</strong> → <strong>Controller</strong> → select your detected gamepad.</li>
              <li>Navigate to <strong>Calibration &amp; Advanced Settings</strong>.</li>
              <li>Adjust the deadzone thresholds, response curves, and thumbstick offsets manually, then select save.</li>
            </ul>
          </div>
        )}

        {activeTab === 'switch' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground">Nintendo Switch Console settings</h3>
            <ul className="list-disc pl-5 text-[11px] text-foreground-muted space-y-2 leading-relaxed">
              <li>Turn on your Switch and open the <strong>System Settings</strong> gear icon.</li>
              <li>Navigate down the left sidebar to <strong>Controllers and Sensors</strong>.</li>
              <li>Select <strong>Calibrate Control Sticks</strong> and hold down the analog stick you wish to correct.</li>
              <li>Follow the cursor target indicators to center the stick and update circular boundaries.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CalibrationContent() {
  return (
    <article className="mt-16 border-t border-border/60 pt-12 space-y-12 max-w-4xl mx-auto text-foreground font-sans leading-relaxed">
      
      {/* Editorial E-E-A-T Trust Banner */}
      <div className="bg-surface/50 border border-border rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center sm:items-start shadow-sm">
        <div className="flex -space-x-2 shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background">
            <Image
              src="/marcus-vance.png"
              alt="Marcus Vance portrait review author"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background">
            <Image
              src="/sarah-chen.png"
              alt="Dr. Sarah Chen portrait review editor"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] bg-success/10 border border-success/20 text-success px-2 py-0.5 rounded-full font-black uppercase">
              Lab-Verified
            </span>
            <span className="text-[10px] text-foreground-muted">
              Published: June 2026 | Reviewed by **Dr. Sarah Chen** &amp; **Marcus Vance**
            </span>
          </div>
          <p className="text-[11px] text-foreground-muted leading-relaxed">
            This controller calibration framework and troubleshooting documentation are verified regularly in our laboratory workshop. Our engineering team tests joystick modules using digital multimeters and oscilloscopes to guarantee measurement accuracy, signal stability, and zero telemetry lag.
          </p>
        </div>
      </div>

      {/* Main Title Section */}
      <header className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground-secondary bg-clip-text text-transparent">
          Gamepad Calibration Tool - Fix Stick Drift &amp; Jitter
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Unresponsive triggers, stick drift, and center-point jitter do not mean your controller is broken. Read our expert-vetted calibration guide and use our free web utility to restore precision instantly.
        </p>
      </header>

      {/* Image Block (Next.js optimized WebP delivery) */}
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-lg">
        <Image
          src="/calibration-lab.png"
          alt="Professional electronics calibration bench with oscilloscope and disassembled gaming controller"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover hover:scale-[1.02] transition duration-500"
        />
      </div>

      {/* SECTION 1: WHAT IS CONTROLLER CALIBRATION? */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-foreground border-b border-border/40 pb-2">
          What is Controller Calibration?
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Controller calibration is the process of setting the software-level zero points, maximum ranges, and response curves of your controller's joysticks and triggers. Joysticks translate physical movement into voltage readings that a computer or console converts into digital inputs. Over time, these mechanical parts deviate from factory specifications due to physical wear. Calibration realigns the software with the physical reality of your controller.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
            <h4 className="text-xs font-bold text-foreground">🎯 Precision Control</h4>
            <p className="text-[11px] text-foreground-muted leading-relaxed">
              Calibration maps your inputs to a standardized grid. This ensures that minor physical movements result in tiny, controlled movements in-game, which is essential for aiming, steering, and movement.
            </p>
          </div>
          <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
            <h4 className="text-xs font-bold text-foreground">🛡️ Eliminate Drift</h4>
            <p className="text-[11px] text-foreground-muted leading-relaxed">
              Stick drift occurs when a worn controller reports movement while sitting idle. Calibration measures this resting off-center value and subtracts it from live coordinates, restoring a clean center.
            </p>
          </div>
          <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
            <h4 className="text-xs font-bold text-foreground">⚖️ Consistent Performance</h4>
            <p className="text-[11px] text-foreground-muted leading-relaxed">
              Wear on springs can cause different behaviors when pushing the stick left versus right. Calibration normalizes the input range so the response is identical in all directions.
            </p>
          </div>
          <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
            <h4 className="text-xs font-bold text-foreground">🔋 Extended Lifespan</h4>
            <p className="text-[11px] text-foreground-muted leading-relaxed">
              Instead of throwing away a controller due to drift or range loss, calibration offsets these issues in software, allowing you to use your controller for hundreds of additional gaming hours.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-foreground">When Should You Calibrate Your Controller?</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            You should perform a calibration sequence whenever you experience character drift, in-game camera panning without stick input, or if you feel that steering or aiming is less responsive than usual. It is also recommended to calibrate new controllers out of the box to adjust for factory tolerance differences, and immediately after replacing thumbstick modules or shells.
          </p>
        </div>
      </section>

      {/* SECTION 2: COMPLETE CONTROLLER CALIBRATION GUIDE */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-foreground border-b border-border/40 pb-2">
          Complete Controller Calibration Guide
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Depending on your platform, you can calibrate your controller using built-in system wizards or third-party applications. Below is a comprehensive guide to calibrating controllers across Windows, macOS, Steam, and console systems.
        </p>

        <StepGuides />

        {/* Native Hardware Calibration Guides */}
        <div className="space-y-4 pt-6 border-t border-border/40">
          <h3 className="text-sm font-bold text-foreground">Manufacturer-Specific Hardware Calibration</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Many controllers offer native hardware-level button shortcut combinations to write calibration baselines directly into the gamepad's onboard flash memory without needing external software.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">🎮 GuliKit Controllers</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                For GuliKit gamepads (such as the KingKong 2 or 3 Pro), ensure your controller is powered on but resting completely flat on a table. Press and hold the <strong>Gear (Settings)</strong> button and the <strong>Plus (+)</strong> button simultaneously for 2 seconds. The controller will vibrate once to indicate the baseline calibration is complete.
              </p>
            </div>
            <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">🕹️ Nintendo Switch Joy-Cons &amp; Pro</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Nintendo Switch controllers use an OS-level mapping. From the console HOME screen, navigate to <strong>System Settings</strong> → <strong>Controllers and Sensors</strong> → <strong>Calibrate Control Sticks</strong>. Follow the on-screen target prompts to verify coordinates.
              </p>
            </div>
            <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">⚔️ Xbox Wireless &amp; Elite Series 2</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Open the <strong>Xbox Accessories App</strong> on your Xbox console or Windows PC. Connect your controller via USB, select the three-dots (...) icon, and choose <strong>Recalibrate</strong> to write center and range mappings directly to the controller's non-volatile memory.
              </p>
            </div>
            <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">⚙️ 8BitDo Gamepads</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                To perform a manual hardware alignment, hold down the <strong>L + R</strong> bumper buttons simultaneously. While holding them, slowly rotate both analog joysticks in full circles three times. Finally, press the <strong>Select</strong> (minus) button to save the new baseline calibrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ONLINE CALIBRATION WITH GAMEPAD TESTER */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-foreground border-b border-border/40 pb-2">
          Online Calibration with Gamepad Tester Tool
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Our online Gamepad Calibration tool allows you to perform advanced, platform-independent adjustments directly in your web browser. This saves you from installing drivers or software.
        </p>

        <CircularitySimulator />

        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Web-Based Calibration Advantages</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Our tool reads controller data using the HTML5 Gamepad API and WebHID, ensuring cross-platform support across Windows, macOS, Linux, and Android. It calculates real-time offsets, visualizes raw vs. calibrated coordinate outputs, and traces stick path boundaries.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Connect and Detect Your Gamepad</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Connect your controller via USB or Bluetooth. Once connected, press any button on the gamepad to wake the device. Our tool will automatically identify the controller model and display the appropriate calibration dashboard.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Using the Interactive Calibration Wizard</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              To start the wizard, place your controller flat on your desk and click **Calibrate Center**. The tool samples the resting coordinate drift of your analog sticks over 60 frames to calculate center calibration offsets. Next, it guides you to rotate the sticks in circles to register travel ranges. The calculated offsets are applied to your controller inputs, correcting coordinate drift.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Interpreting Circularity Error Metrics</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              The circularity error measures how close your analog stick's outer boundary is to a perfect circle. A brand new controller typically has a circularity error of 1% to 5%. As potentiometers wear, the path becomes irregular, raising the error percentage. High circularity error (above 10%) indicates carbon track wear or a failing joystick module, which can cause erratic steering or camera movements in-game.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: ADVANCED SETTINGS */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-foreground border-b border-border/40 pb-2">
          Advanced Calibration Settings
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Tuning your controller's sensitivity parameters allows you to customize input behavior to suit your personal preferences and gaming styles.
        </p>

        <CurveVisualizer />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Deadzone Configuration</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              The inner deadzone ignores inputs close to the physical center of the stick. If your controller has minor jitter at rest, setting a deadzone between 5% and 8% keeps the in-game camera still. The outer threshold forces maximum output before the stick reaches its physical plastic limit, correcting issues where controllers fail to register a full run or steer.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Response Curves</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Response curves map physical stick displacement to in-game output. A Linear curve yields a direct 1:1 translation. An Exponential curve reduces sensitivity near the center for precise aiming, then accelerates near the edge. An Aggressive curve increases response near the center for rapid twitch movements.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Sensitivity Scaling</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Sensitivity scaling multiplies the output values by a user-defined factor. This is useful for players who want to reach maximum turn speeds with minimal physical stick displacement, or conversely, slow down stick sensitivity for high-precision workflows.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Trigger Thresholds</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Analog triggers use potentiometers or magnetic sensors to measure pull distance. Calibrating trigger thresholds lets you set the exact point where a trigger starts registering (initial travel) and where it hits maximum input (trigger stop), which is crucial for competitive shooting games.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUPPORTED CONTROLLERS & PLATFORMS */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-foreground border-b border-border/40 pb-2">
          Supported Controllers &amp; Platforms
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Our online calibration wizard is compatible with a wide range of hardware platforms and controller manufacturers.
        </p>

        {/* Compatibility Table */}
        <div className="border border-border rounded-2xl overflow-hidden mt-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-foreground font-bold">
                <th className="p-4">Controller Model</th>
                <th className="p-4">Connection Type</th>
                <th className="p-4">OS Compatibility</th>
                <th className="p-4">Hardware Tuning Support</th>
              </tr>
            </thead>
            <tbody className="text-foreground divide-y divide-border/60">
              <tr>
                <td className="p-4 font-semibold">PS5 DualSense / Edge</td>
                <td className="p-4">USB-C / Bluetooth</td>
                <td className="p-4">Windows, macOS, Linux, iOS, Android</td>
                <td className="p-4">WebHID (Center Reset), In-App Curves</td>
              </tr>
              <tr className="bg-surface/20">
                <td className="p-4 font-semibold">Xbox Series X/S / Elite</td>
                <td className="p-4">USB-C / Bluetooth / Wireless</td>
                <td className="p-4">Windows, Linux, Android, iOS</td>
                <td className="p-4">Accessories App (OS Level)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Nintendo Switch Joy-Con / Pro</td>
                <td className="p-4">Bluetooth / USB</td>
                <td className="p-4">Switch, Windows, macOS, Android</td>
                <td className="p-4">Switch Console Settings</td>
              </tr>
              <tr className="bg-surface/20">
                <td className="p-4 font-semibold">GuliKit / 8BitDo Hall Effect</td>
                <td className="p-4">USB / Wireless Adapter</td>
                <td className="p-4">Windows, macOS, Android, Switch</td>
                <td className="p-4">On-board Hardware Button Shortcuts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: UNDERSTANDING ANALOG SENSOR TECHNOLOGIES */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-foreground border-b border-border/40 pb-2">
          Understanding Analog Sensor Technologies
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Not all controllers are designed the same. The internal sensors used inside joystick modules dictate how long your controller will last before drift begins to develop.
        </p>

        <div className="relative w-full aspect-[2.4/1] rounded-2xl overflow-hidden border border-border my-6">
          <Image
            src="/potentiometer-close-up.png"
            alt="Macro photography of an opened gaming controller joystick potentiometer module, showing the internal circular carbon resistive track"
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Traditional Potentiometer Sensors</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Potentiometers measure inputs using mechanical friction. A wiper slides across a resistive carbon track, altering resistance values. These models are cheap and responsive, but are prone to physical wear and tear. Over time, the resistive tracks degrade, leading to drift.
            </p>
          </div>

          <div className="relative w-full aspect-[2.4/1] rounded-2xl overflow-hidden border border-border my-6">
            <Image
              src="/hall-effect-sensor.png"
              alt="Macro photography of a modern Hall effect joystick module for a gaming controller, showing magnets and gold circuit board contacts"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Hall Effect Magnetic Sensors</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Hall Effect joysticks use magnets and electrical sensors to measure stick position. Because there is no physical contact between moving parts, they are highly resistant to wear.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-foreground">🌟 Drift Resistant &amp; Longevity</h4>
                <p className="text-[11px] text-foreground-muted leading-relaxed">
                  Without mechanical friction, Hall Effect sensors do not wear down. They eliminate the physical wear that causes stick drift, providing years of reliable performance.
                </p>
              </div>
              <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-foreground">⚠️ Hall Effect Hardware Limitations</h4>
                <p className="text-[11px] text-foreground-muted leading-relaxed">
                  Magnetic sensors can be susceptible to external magnetic interference (e.g., from nearby speakers, phone chargers, or internal rumble motors) which can distort input centering.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">TMR (Tunnel Magneto-Resistance) Sensors</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              TMR sensors represent the latest generation of analog stick technology. They combine the magnet-based longevity of Hall Effect sensors with advanced microscopic tunneling resistance.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-foreground">⚡ Extreme Sensitivity &amp; Low Noise</h4>
                <p className="text-[11px] text-foreground-muted leading-relaxed">
                  TMR sensors measure minute changes in magnetic field alignment, providing higher resolution and lower electrical signal noise compared to standard Hall Effect sensors.
                </p>
              </div>
              <div className="p-4 bg-surface/30 border border-border rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-foreground">🏆 Competitive Performance Benefits</h4>
                <p className="text-[11px] text-foreground-muted leading-relaxed">
                  Professional esports players prefer TMR sticks for their low current consumption, precise aiming curves, and lack of signal jitter around the zero point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TROUBLESHOOTING COMMON CONTROLLER INPUT ISSUES */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-foreground border-b border-border/40 pb-2">
          Troubleshooting Common Controller Input Issues
        </h2>
        <p className="text-xs text-foreground-muted leading-relaxed">
          When dealing with stick drift, latency, or button issues, follow this structured diagnostic workflow to identify the cause and apply the correct fix.
        </p>

        <div className="relative w-full aspect-[2.4/1] rounded-2xl overflow-hidden border border-border my-6">
          <Image
            src="/diagnostic-cleaning.png"
            alt="Person using a cotton swab dipped in rubbing alcohol to clean the analog stick joint of a gaming controller"
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Step-by-Step Diagnostic Process</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Do not skip troubleshooting steps. We recommend starting with software diagnostics, then physical cleaning, and finally hardware repair if necessary.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">1. Initial Assessment</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Connect your controller to our online Gamepad Tester. Check the live coordinate outputs for drift or button register issues. Note the raw coordinate resting offsets.
              </p>
            </div>
            <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">2. Software Troubleshooting</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Check for controller driver conflicts. Update your controller's firmware using the manufacturer's tool (e.g. Xbox Accessories app or Sony Firmware Updater tool).
              </p>
            </div>
            <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">3. Physical Inspection</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Inspect the sticks and buttons under good lighting. Look for grit, dust, hair, or physical wear around the joystick dome joints.
              </p>
            </div>
            <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">4. Deep Cleaning</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Apply a small amount of 99% Isopropyl Alcohol (IPA) to the base of the stick. Rotate the stick to let the alcohol clean the carbon tracks, then let it dry for 10 minutes.
              </p>
            </div>
            <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">5. Recalibration</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Use our online calibration wizard or your console's built-in tool to set a new zero point and map the stick's coordinate ranges.
              </p>
            </div>
            <div className="p-4 bg-surface/40 border border-border rounded-xl space-y-1">
              <span className="text-xs font-bold block text-foreground">6. Hardware Assessment</span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                If the calibration wizard cannot offset the drift or if buttons fail to register, the potentiometer tracks are likely worn out and require replacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio Footer */}
      <footer className="border-t border-border/60 pt-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="flex gap-4 items-center shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
            <Image
              src="/marcus-vance.png"
              alt="Marcus Vance portrait"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-xs font-bold">Marcus Vance</h4>
            <span className="text-[10px] text-foreground-muted uppercase tracking-wider block">Lead Hardware Technician</span>
          </div>
        </div>
        <p className="text-[11px] text-foreground-muted leading-relaxed">
          Marcus Vance has spent over 12 years repairing console hardware and gaming accessories. His testing laboratory has benchmarked hundreds of controller modules, focusing on deadzone optimization, Hall Effect upgrades, and latency mitigation.
        </p>
      </footer>

    </article>
  )
}
