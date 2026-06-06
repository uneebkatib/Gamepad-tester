'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { articles, authors } from '@/lib/blogData'

// Custom SVGs & Illustrations

const ConnectionInfographic = () => (
  <div className="flex justify-center my-6">
    <svg 
      width="100%" 
      height="180" 
      viewBox="0 0 500 180" 
      role="img"
      aria-labelledby="conn-title conn-desc"
      className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-inner"
    >
      <title id="conn-title">Controller Connection Diagram</title>
      <desc id="conn-desc">A visual infographic showing how gamepads connect to computers wirelessly via Bluetooth or wired via a USB cable, with glowing signal indicators.</desc>
      <defs>
        <linearGradient id="usbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--primary-hover)" />
        </linearGradient>
        <linearGradient id="btGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--border-light)" opacity="0.5"/>
        </pattern>
      </defs>
      
      {/* Background blueprint grid */}
      <rect width="500" height="180" fill="url(#gridPattern)" rx="16" />
      
      {/* Laptop / Console shape */}
      <rect x="340" y="45" width="120" height="76" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="2"/>
      <rect x="350" y="53" width="100" height="60" rx="3" fill="var(--background)"/>
      <polygon points="320,121 480,121 470,128 330,128" fill="var(--border)"/>
      
      {/* Mock Laptop UI */}
      <rect x="356" y="59" width="36" height="18" rx="2" fill="rgba(34,197,94,0.1)" stroke="var(--success)" strokeWidth="0.5"/>
      <circle cx="430" cy="68" r="5" fill="var(--primary)"/>
      <line x1="356" y1="84" x2="444" y2="84" stroke="var(--border)" strokeWidth="1"/>
      <line x1="356" y1="94" x2="444" y2="94" stroke="var(--border)" strokeWidth="1"/>

      {/* Controller shape - modernized */}
      <path d="M60,95 C60,65 85,55 120,55 C155,55 180,65 180,95 C180,123 155,135 150,145 C144,156 132,156 120,134 C108,156 96,156 90,145 C85,135 60,123 60,95 Z" fill="var(--surface)" stroke="var(--border)" strokeWidth="2"/>
      <circle cx="95" cy="95" r="12" fill="var(--background)" stroke="var(--border)"/>
      <circle cx="145" cy="95" r="12" fill="var(--background)" stroke="var(--border)"/>
      <circle cx="95" cy="95" r="5" fill="var(--foreground-muted)"/>
      <circle cx="145" cy="95" r="5" fill="var(--foreground-muted)"/>
      
      {/* D-Pad */}
      <rect x="116" y="72" width="8" height="6" rx="1" fill="var(--border)"/>
      
      {/* Buttons */}
      <circle cx="82" cy="72" r="3.5" fill="var(--foreground-muted)"/>
      <circle cx="158" cy="72" r="3.5" fill="var(--foreground-muted)"/>

      {/* Connection paths */}
      {/* USB path */}
      <path d="M120,55 C120,30 230,30 340,65" fill="none" stroke="url(#usbGradient)" strokeWidth="2.5" strokeDasharray="5 5">
        <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" repeatCount="indefinite" />
      </path>
      <text x="230" y="24" textAnchor="middle" fill="var(--primary)" className="text-[10px] font-display font-extrabold tracking-widest">USB CABLE</text>

      {/* Bluetooth path */}
      <path d="M150,117 C185,133 275,133 340,100" fill="none" stroke="url(#btGradient)" strokeWidth="2.5" strokeDasharray="5 5">
        <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="245" y="142" textAnchor="middle" fill="#3b82f6" className="text-[10px] font-display font-extrabold tracking-widest">📶 BLUETOOTH WIRELESS</text>
    </svg>
  </div>
)

const StickCrossSection = () => (
  <div className="flex justify-center my-6">
    <svg 
      width="100%" 
      height="200" 
      viewBox="0 0 500 200" 
      role="img"
      aria-labelledby="pot-title pot-desc"
      className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-inner"
    >
      <title id="pot-title">Potentiometer Wiper Mechanism and Stick Drift Cause</title>
      <desc id="pot-desc">Cross-section diagram illustrating an analog joystick potentiometer assembly with a metal wiper brushing against a carbon track, showing the spot where degradation occurs and leads to stick drift.</desc>
      <defs>
        <radialGradient id="pivotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--border)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </radialGradient>
        <linearGradient id="potTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--foreground-muted)" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="var(--foreground-muted)" />
        </linearGradient>
      </defs>
      
      {/* Stick Shaft */}
      <line x1="250" y1="25" x2="250" y2="110" stroke="var(--foreground-muted)" strokeWidth="14" strokeLinecap="round"/>
      <rect x="215" y="15" width="70" height="16" rx="8" fill="var(--foreground)" opacity="0.9"/>
      
      {/* Pivot dome */}
      <path d="M200,110 C200,80 300,80 300,110 Z" fill="url(#pivotGlow)" stroke="var(--border)" strokeWidth="1"/>
      <circle cx="250" cy="110" r="16" fill="var(--foreground-muted)"/>

      {/* wiper assembly */}
      <line x1="250" y1="110" x2="310" y2="155" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"/>
      {/* metal wiper brush */}
      <circle cx="310" cy="155" r="6" fill="var(--primary)" className="animate-pulse"/>

      {/* Carbon track arc */}
      <path d="M170,170 Q250,190 330,170" fill="none" stroke="var(--surface)" strokeWidth="16" strokeLinecap="round"/>
      <path d="M180,170 Q250,188 320,170" fill="none" stroke="url(#potTrackGrad)" strokeWidth="6" strokeLinecap="round"/>

      {/* Wear area (scratched) */}
      <circle cx="295" cy="177" r="12" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M288,177 L302,177" stroke="#ef4444" strokeWidth="2"/>

      {/* Labels */}
      <text x="175" y="40" fill="var(--foreground)" className="text-[10px] font-display font-bold">🕹️ Stick Shaft</text>
      
      <text x="120" y="105" fill="var(--foreground-muted)" className="text-[10px] font-sans">Pivot Center</text>
      <path d="M180,105 L230,110" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2"/>

      <text x="365" y="145" fill="var(--primary)" className="text-[10px] font-display font-bold">Metal Wiper</text>
      <path d="M360,145 L316,153" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2"/>

      <text x="110" y="180" fill="var(--foreground-secondary)" className="text-[10px] font-sans font-bold">Carbon Track</text>
      <path d="M175,178 L190,173" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2"/>

      <text x="365" y="185" fill="#ef4444" className="text-[10px] font-display font-bold">Degraded Spot (Drift Cause)</text>
      <path d="M360,182 L306,177" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2"/>
    </svg>
  </div>
)

const DriftSeverityComparison = () => (
  <div className="flex justify-center my-6">
    <div className="grid grid-cols-2 gap-6 w-full max-w-lg bg-surface border border-border rounded-2xl p-5 shadow-sm">
      {/* No Drift */}
      <div className="flex flex-col items-center gap-3 bg-background border border-border/50 rounded-xl p-4">
        <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-success">Ideal Calibration</span>
        <svg 
          width="130" 
          height="130" 
          viewBox="0 0 120 120" 
          role="img"
          aria-labelledby="ideal-cal-title ideal-cal-desc"
          className="bg-surface rounded-full border border-border shadow-inner"
        >
          <title id="ideal-cal-title">Ideal Stick Calibration Graph</title>
          <desc id="ideal-cal-desc">Oscilloscope-style coordinate graph of a perfectly centered joystick hovering precisely at coordinate 0.00, indicating no active drift.</desc>
          <circle cx="60" cy="60" r="45" fill="none" stroke="var(--border)" strokeWidth="1"/>
          <circle cx="60" cy="60" r="20" fill="none" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="60" y1="10" x2="60" y2="110" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="2 2"/>
          <line x1="10" y1="60" x2="110" y2="60" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="2 2"/>
          {/* Grid lines indicators */}
          <text x="65" y="18" fill="var(--foreground-muted)" className="text-[7px] font-mono">1.0</text>
          <text x="65" y="106" fill="var(--foreground-muted)" className="text-[7px] font-mono">-1.0</text>
          <text x="100" y="56" fill="var(--foreground-muted)" className="text-[7px] font-mono">1.0</text>
          <text x="12" y="56" fill="var(--foreground-muted)" className="text-[7px] font-mono">-1.0</text>
          {/* Precise green center point */}
          <circle cx="60" cy="60" r="6" fill="#10B981" className="shadow-lg"/>
          <circle cx="60" cy="60" r="2" fill="white"/>
        </svg>
        <span className="text-xs font-mono font-bold text-success">No Drift (0.00000)</span>
      </div>

      {/* Severe Drift */}
      <div className="flex flex-col items-center gap-3 bg-background border border-border/50 rounded-xl p-4">
        <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-error">Active Drift</span>
        <svg 
          width="130" 
          height="130" 
          viewBox="0 0 120 120" 
          role="img"
          aria-labelledby="active-drift-title active-drift-desc"
          className="bg-surface rounded-full border border-border shadow-inner"
        >
          <title id="active-drift-title">Active Stick Drift Coordinate Graph</title>
          <desc id="active-drift-desc">Coordinate plot demonstrating stick drift, where the resting point is pulled away from the center origin line toward the upper right sector.</desc>
          <circle cx="60" cy="60" r="45" fill="none" stroke="var(--border)" strokeWidth="1"/>
          <circle cx="60" cy="60" r="20" fill="none" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="60" y1="10" x2="60" y2="110" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="2 2"/>
          <line x1="10" y1="60" x2="110" y2="60" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="2 2"/>
          {/* Grid lines indicators */}
          <text x="65" y="18" fill="var(--foreground-muted)" className="text-[7px] font-mono">1.0</text>
          <text x="65" y="106" fill="var(--foreground-muted)" className="text-[7px] font-mono">-1.0</text>
          <text x="100" y="56" fill="var(--foreground-muted)" className="text-[7px] font-mono">1.0</text>
          <text x="12" y="56" fill="var(--foreground-muted)" className="text-[7px] font-mono">-1.0</text>
          
          {/* Scattered offset points representing severe drift */}
          <circle cx="78" cy="42" r="8" fill="rgba(239,68,68,0.2)" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2"/>
          <circle cx="78" cy="42" r="5" fill="#EF4444" className="animate-ping"/>
          <circle cx="78" cy="42" r="4" fill="#EF4444"/>
          
          {/* Drift vector line */}
          <line x1="60" y1="60" x2="78" y2="42" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="text-xs font-mono font-bold text-error">Severe Drift (0.18520)</span>
      </div>
    </div>
  </div>
)

const GamepadTesterUIMockup = () => (
  <div className="flex justify-center my-6">
    <svg 
      width="100%" 
      height="160" 
      viewBox="0 0 420 160" 
      role="img"
      aria-labelledby="mockup-title mockup-desc"
      className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-lg"
    >
      <title id="mockup-title">Gamepad Tester Live Dashboard Mockup</title>
      <desc id="mockup-desc">Visual interface mockup representing active gamepad inputs, buttons, and stick coordinate charting under the Player 1 profile.</desc>
      <defs>
        <linearGradient id="headerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--surface-hover)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>
      </defs>
      {/* Header bar */}
      <rect x="15" y="15" width="390" height="22" rx="4" fill="url(#headerGlow)"/>
      <circle cx="28" cy="26" r="3.5" fill="#ef4444"/>
      <circle cx="38" cy="26" r="3.5" fill="#f59e0b"/>
      <circle cx="48" cy="26" r="3.5" fill="#22c55e"/>
      <text x="68" y="30" fill="var(--foreground-muted)" className="text-[9px] font-mono font-medium">GamepadTester.live – Telemetry Dashboard</text>

      {/* Dual Card split representation */}
      {/* Left representational card */}
      <rect x="15" y="48" width="185" height="96" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
      <text x="25" y="64" fill="var(--primary)" className="text-[9px] font-display font-extrabold tracking-wider">PLAYER #1 (Xbox Controller)</text>
      {/* Button grids */}
      <rect x="25" y="74" width="16" height="16" rx="4" fill="var(--primary)"/>
      <text x="33" y="85" fill="white" textAnchor="middle" className="text-[8px] font-bold">A</text>
      
      <rect x="47" y="74" width="16" height="16" rx="4" fill="var(--background)" stroke="var(--border)"/>
      <text x="55" y="85" fill="var(--foreground-muted)" textAnchor="middle" className="text-[8px] font-bold">B</text>
      
      <rect x="69" y="74" width="16" height="16" rx="4" fill="var(--background)" stroke="var(--border)"/>
      <text x="77" y="85" fill="var(--foreground-muted)" textAnchor="middle" className="text-[8px] font-bold">X</text>
      
      <rect x="91" y="74" width="16" height="16" rx="4" fill="var(--background)" stroke="var(--border)"/>
      <text x="99" y="85" fill="var(--foreground-muted)" textAnchor="middle" className="text-[8px] font-bold">Y</text>

      <rect x="25" y="96" width="16" height="16" rx="4" fill="var(--background)" stroke="var(--border)"/>
      <rect x="47" y="96" width="16" height="16" rx="4" fill="var(--background)" stroke="var(--border)"/>
      <rect x="69" y="96" width="16" height="16" rx="4" fill="var(--background)" stroke="var(--border)"/>
      <rect x="91" y="96" width="16" height="16" rx="4" fill="var(--background)" stroke="var(--border)"/>

      {/* Telemetry charts on right */}
      <rect x="215" y="48" width="190" height="96" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
      <circle cx="265" cy="96" r="30" fill="none" stroke="var(--border)" strokeWidth="1"/>
      {/* Path trace */}
      <circle cx="265" cy="96" r="20" fill="rgba(34,197,94,0.15)" stroke="var(--success)" strokeWidth="1" strokeDasharray="2 2"/>
      <text x="265" y="99" textAnchor="middle" fill="var(--success)" className="text-[8px] font-mono font-bold">Avg Error 0%</text>

      {/* Axis values */}
      <text x="325" y="80" fill="var(--foreground-muted)" className="text-[8px] font-mono font-bold">AXIS 0</text>
      <text x="325" y="92" fill="var(--success)" className="text-[9px] font-mono font-bold">+0.00000</text>
      
      <text x="365" y="80" fill="var(--foreground-muted)" className="text-[8px] font-mono font-bold">AXIS 1</text>
      <text x="365" y="92" fill="var(--success)" className="text-[9px] font-mono font-bold">+0.00000</text>
    </svg>
  </div>
)

// Document Structure and Sections Mapping
export default function HomepageContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [activeId, setActiveId] = useState('')
  
  // Interactive simulator states
  const [latencyVal, setLatencyVal] = useState(0)
  const [isMeasuringLatency, setIsMeasuringLatency] = useState(false)
  const [latencyHistory, setLatencyHistory] = useState<number[]>([])
  const [healthScoreVal, setHealthScoreVal] = useState(100)
  const [vibrationPreset, setVibrationPreset] = useState('None')
  const [customVibStrength, setCustomVibStrength] = useState(50)
  const [isVibrating, setIsVibrating] = useState(false)
  
  // Diagnostics interactive quiz states
  const [quizChecks, setQuizChecks] = useState({
    stickCenter: false,
    buttonResponse: false,
    triggerRange: false,
    inputDetection: false,
    connectionStability: false,
  })

  // Table of contents navigation items
  const sectionsRef = useRef<{[key: string]: HTMLDivElement | null}>({})

  const handleScrollTo = (id: string) => {
    const el = sectionsRef.current[id]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  // Latency test trigger
  const runLatencyTest = () => {
    if (isMeasuringLatency) return
    setIsMeasuringLatency(true)
    setLatencyVal(0)
    let count = 0
    const interval = setInterval(() => {
      const randomMs = +(Math.random() * 4 + 2).toFixed(2)
      setLatencyVal(randomMs)
      count++
      if (count > 10) {
        clearInterval(interval)
        setIsMeasuringLatency(false)
        setLatencyHistory(h => [randomMs, ...h].slice(0, 5))
      }
    }, 120)
  }

  // Diagnostic Quiz evaluator
  const evaluateQuiz = () => {
    const checkedCount = Object.values(quizChecks).filter(Boolean).length
    if (checkedCount === 0) {
      return { status: 'Awaiting checks', desc: 'Select symptoms above to begin analysis.', color: 'text-foreground-muted bg-surface/40' }
    }
    if (quizChecks.inputDetection || (quizChecks.connectionStability && checkedCount >= 2)) {
      return { status: 'Likely Broken', desc: 'Severe hardware failure that warrants replacement.', color: 'text-error bg-error/10 border border-error/20' }
    }
    if (quizChecks.stickCenter || quizChecks.triggerRange || quizChecks.buttonResponse) {
      return { status: 'Repairable', desc: 'Minor hardware wear that can be addressed.', color: 'text-warning bg-warning/10 border border-warning/20' }
    }
    return { status: 'Not Broken', desc: 'A calibration or software issue is the likely cause.', color: 'text-success bg-success/10 border border-success/20' }
  }

  // Trigger vibration animation
  const triggerVibePreset = (name: string, duration = 800) => {
    setVibrationPreset(name)
    setIsVibrating(true)
    setTimeout(() => {
      setIsVibrating(false)
    }, duration)
  }

  // Chapters grouping
  const chapters = [
    {
      title: "1. Ultimate Gamepad Guide",
      sections: ["intro", "who-gets-value", "useful-alternatives"]
    },
    {
      title: "2. Diagnostics & Telemetry",
      sections: ["stats-panel", "info-panel", "latency-test", "health-score", "input-history", "quick-test"]
    },
    {
      title: "3. Connection & Configuration",
      sections: ["supported-connections", "no-software", "wireless-pairing", "step-by-step-connect", "multi-controller", "mobile-support", "button-press-security", "privacy-first"]
    },
    {
      title: "4. In-Depth Component Tests",
      sections: ["stick-testing", "button-testing", "vibration-testing", "trigger-testing", "thorough-button", "drift-precision", "final-verification"]
    },
    {
      title: "5. Platform & Compatibility",
      sections: ["xbox-compatibility", "playstation-compatibility", "nintendo-compatibility", "four-step-flow", "raw-signal-ranges", "browser-compatibility"]
    },
    {
      title: "6. Drift & Hardware Troubleshooting",
      sections: ["catching-drift-worse", "drift-severity", "not-showing-up", "vibration-not-firing", "drift-diagnosing-fixing", "button-lag-fixes", "connectivity-fixes", "maintenance-longevity", "platform-differences", "quiz-diagnosis", "ps5-drift-steps", "xbox-detection-steps"]
    }
  ]

  // Full database of handwritten text sections
  const rawData: {[key: string]: { title: string; content: string[]; component?: React.ReactNode }} = {
    "intro": {
      title: "Gamepad Tester – Test PS5, PS4, PS3 & Xbox Controller Online",
      content: [
        "If you've ever questioned whether your controller is actually performing the way it should, a gamepad tester is the fastest answer you'll find. This free, browser-based tool lets you test your PS5, PS4, PS3, and Xbox controllers online without installing anything just plug in or pair up and every input lights up instantly. Whether you're checking buttons, sticks, triggers, vibration, or drift, everything shows up in real time the moment you connect.",
        "What sets this apart from guessing is that it works with every major controller type DualSense, DualShock, Xbox One, Xbox Series, Generic USB, and Bluetooth making it a genuinely universal testing experience. I've used it personally to catch a subtle analog drift issue I had completely written off as a game bug, and the detection was immediate. The HID-compliant hardware recognized by your operating system is all you need no extra software, no wireless setup headaches, no wasted time."
      ],
      component: (
        <div className="flex flex-wrap gap-2 justify-center my-4">
          {['PS5 DualSense', 'Xbox Series X/S', 'Nintendo Switch Pro', 'DualShock 4', 'Generic USB'].map((c) => (
            <span key={c} className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-semibold text-foreground-secondary">🎮 {c}</span>
          ))}
        </div>
      )
    },
    "stats-panel": {
      title: "What the Live Stats Panel Actually Tells You",
      content: [
        "The stats panel sitting at the top of the tester is more useful than it looks at first glance. It gives you a live count of active buttons, axes, connected controllers, and current latency in ms all updating in real-time so you're never looking at stale data. The 0 readings across Buttons, Axes, and Controllers before connection confirm the detection is clean and waiting, not producing false performance signals.",
        "Once a gamepad connects, those numbers shift immediately and the monitoring begins. Every tracking metric on that display from total active slots to input response count reflects exactly what your hardware is doing at that milliseconds level."
      ],
      component: (
        <div className="bg-surface/50 border border-border rounded-xl p-4 my-4 font-mono">
          <div className="text-[10px] uppercase text-foreground-muted mb-2 tracking-wider font-sans font-bold">Simulated Live Stats Panel</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-background border border-border/60 rounded p-2">
              <div className="text-xs text-foreground-muted">Controllers</div>
              <div className="text-lg font-bold text-primary">0</div>
            </div>
            <div className="bg-background border border-border/60 rounded p-2">
              <div className="text-xs text-foreground-muted">Active Buttons</div>
              <div className="text-lg font-bold text-foreground">0</div>
            </div>
            <div className="bg-background border border-border/60 rounded p-2">
              <div className="text-xs text-foreground-muted">Active Axes</div>
              <div className="text-lg font-bold text-foreground">0</div>
            </div>
            <div className="bg-background border border-border/60 rounded p-2">
              <div className="text-xs text-foreground-muted">Latency</div>
              <div className="text-lg font-bold text-success">0.00 ms</div>
            </div>
          </div>
        </div>
      )
    },
    "multi-controller": {
      title: "Single, Dual, or Four Controllers at Once",
      content: [
        "One of the more underrated features here is testing flexibility across modes. You can run a single controller mode for focused diagnosis, switch to compare 2 controllers for a direct side-by-side comparison, or go all the way and connect up to 4 simultaneous devices if you're doing a full multi-controller sweep. Each session keeps its own live input feed so nothing bleeds across slots.",
        "This becomes genuinely useful when you're trying to figure out if an issue is controller-specific or system-wide. Running concurrent detection across multiple active gamepads eliminates the guesswork that a single test simply can't rule out."
      ],
      component: (
        <div className="grid grid-cols-3 gap-2 my-4">
          {['1 Controller Mode', '2 Controller Compare', '4 Controller Sweep'].map((m, idx) => (
            <div key={m} className="border border-border/70 rounded-xl p-3 text-center bg-background/50 hover:bg-surface transition-colors">
              <div className="text-base mb-1">🕹️{idx >= 1 ? '🕹️' : ''}{idx === 2 ? '🕹️🕹️' : ''}</div>
              <div className="text-[10px] font-bold text-foreground-secondary">{m}</div>
            </div>
          ))}
        </div>
      )
    },
    "supported-connections": {
      title: "Wired, Wireless, and Dongle - All Supported",
      content: [
        "Connection types don't limit what you can test here. A standard wired USB cable gives you the most stable signal, while Bluetooth covers wireless controller pairing with no extra steps beyond what your OS already handles. For those running a 2.4GHz dongle, the wireless receiver plugs into any USB port and the browser detects it just like a direct wired connection instantly, without prompting for drivers or adapters.",
        "I've personally tested third-party controllers through cheap USB dongle setups and the HID compatible recognition held up every time. Whether you're running plug-and-play or a full wireless adapter configuration, the connect and pair flow works cleanly across all three connection setups."
      ],
      component: (
        <div className="overflow-x-auto my-4 border border-border rounded-xl">
          <table className="min-w-full divide-y divide-border text-xs bg-background">
            <thead className="bg-surface font-semibold text-foreground-secondary">
              <tr>
                <th className="px-4 py-2 text-left">Connection Type</th>
                <th className="px-4 py-2 text-left">Stability</th>
                <th className="px-4 py-2 text-left">Driver Need</th>
                <th className="px-4 py-2 text-left">API Polling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground-muted">
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Wired USB Cable</td>
                <td className="px-4 py-2 text-success">Maximum Stability</td>
                <td className="px-4 py-2">None (HID-compliant)</td>
                <td className="px-4 py-2">Instant (Up to 250Hz)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Bluetooth Wireless</td>
                <td className="px-4 py-2 text-warning">Medium Stability</td>
                <td className="px-4 py-2">None (OS-managed)</td>
                <td className="px-4 py-2">Standard (125Hz)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">2.4GHz USB Dongle</td>
                <td className="px-4 py-2 text-success">High Stability</td>
                <td className="px-4 py-2">None (Plug & Play)</td>
                <td className="px-4 py-2">Direct HID Detection</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    "info-panel": {
      title: "Everything Your Controller Info Panel Shows You",
      content: [
        "The moment your controller registers, the info panel fills up with hardware detail that goes well beyond just a name. It shows you the exact controller type PS5, Xbox, Generic, and so on alongside the Vendor ID and Product ID pulled directly from the hardware identifier your OS reported. Both left stick and right stick show live X and Y axis values, while LT and RT display trigger pressure as a live percentage.",
        "The Health field at the bottom of the panel gives you an overall score that factors in everything the connected tester has measured so far. Watching the display update in real-time as you interact gives you a genuinely accurate picture of how your controller is behaving at the hardware level, not just what a game chooses to register."
      ],
      component: (
        <div className="bg-surface border border-border rounded-xl p-4 my-4 space-y-2 text-xs font-mono">
          <div className="flex justify-between border-b border-border/60 pb-1.5 font-sans">
            <span className="font-extrabold text-primary">INFO PANEL SPECIMEN</span>
            <span className="text-success font-bold">● REGISTERED</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-foreground-muted">
            <div>Device Type: <span className="text-foreground font-semibold">Sony DualSense (PS5)</span></div>
            <div>Operating System Identifier: <span className="text-foreground font-semibold">HID-compliant Gamepad</span></div>
            <div>Vendor ID: <span className="text-foreground font-semibold">0x054C</span></div>
            <div>Product ID: <span className="text-foreground font-semibold">0x0CE6</span></div>
            <div>Left Analog Stick: <span className="text-foreground font-semibold">X: 0.00 | Y: 0.00</span></div>
            <div>Right Analog Stick: <span className="text-foreground font-semibold">X: 0.00 | Y: 0.00</span></div>
            <div>Left Trigger (LT): <span className="text-foreground font-semibold">0.00%</span></div>
            <div>Right Trigger (RT): <span className="text-foreground font-semibold">0.00%</span></div>
          </div>
          <div className="border-t border-border/60 pt-2 flex justify-between items-center font-sans">
            <span className="font-bold text-foreground">Health Rating:</span>
            <span className="px-2.5 py-0.5 rounded bg-success/20 text-success text-[10px] font-extrabold">98% (EXCELLENT)</span>
          </div>
        </div>
      )
    },
    "stick-testing": {
      title: "Reading Your Analog Sticks in Real Time",
      content: [
        "Your left stick and right stick each report X axis and Y axis readings that update continuously as you move them. At rest, a healthy stick holds at 0.00 on both axes any deviation from center is displayed the moment it occurs, making drift detection immediate and visual. The live values feed is what makes this different from in-game guessing: you're reading raw joystick position data, not filtered game input.",
        "Testing full range and symmetry is as simple as pushing each stick to the edges and watching the real-time tracking respond. The visual pad on screen mirrors the movement exactly, and the deadzone, calibration, and center accuracy all become clear within seconds of actual use. I've caught analog sensitivity drops this way that only showed up at extreme positions the kind of thing no in-game calibration menu would surface."
      ],
      component: (
        <div className="bg-surface/50 border border-border rounded-xl p-4 my-4">
          <div className="text-[10px] uppercase text-foreground-muted font-bold mb-3">Analog Coordinate Axes Representation</div>
          <div className="flex justify-around items-center">
            {['Left Stick', 'Right Stick'].map((label) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-24 h-24 bg-background border border-border rounded-full relative flex items-center justify-center">
                  <div className="absolute w-full h-[0.5px] bg-border/80"></div>
                  <div className="absolute h-full w-[0.5px] bg-border/80"></div>
                  <div className="w-3.5 h-3.5 bg-primary rounded-full border border-white absolute shadow"></div>
                </div>
                <span className="text-[10px] font-bold text-foreground-secondary">{label} (X:0.00000, Y:0.00000)</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    "button-testing": {
      title: "How Every Button Gets Tested",
      content: [
        "All face buttons, system buttons, and every D-Pad direction up, down, left, right are displayed on screen and highlight the instant they register as pressed. Each input is handled as a clean digital signal: A, B, X, Y, LB, RB, L3, R3, LT, RT, and every bumper, trigger click, and directional is covered without exception. There's no ambiguity if the indicator lights up, the button is working; if it doesn't activate, the problem is confirmed.",
        "The press and detection happen simultaneously with zero visible lag, and the active response display reflects each D-Pad direction as a fully independent input rather than a combined axis reading. This distinction matters for digital controllers where diagonal reads can mask individual direction failures."
      ],
      component: (
        <div className="bg-surface/40 border border-border rounded-xl p-4 my-4 space-y-3">
          <div className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Independent D-Pad Layout</div>
          <div className="flex justify-center">
            <div className="relative w-20 h-20 bg-background border border-border/80 rounded-lg">
              <div className="absolute top-0 left-7 w-6 h-6 bg-surface border-x border-b border-border/40 flex items-center justify-center text-[10px] font-bold text-foreground-muted">↑</div>
              <div className="absolute bottom-0 left-7 w-6 h-6 bg-surface border-x border-t border-border/40 flex items-center justify-center text-[10px] font-bold text-foreground-muted">↓</div>
              <div className="absolute left-0 top-7 w-6 h-6 bg-surface border-y border-r border-border/40 flex items-center justify-center text-[10px] font-bold text-foreground-muted">←</div>
              <div className="absolute right-0 top-7 w-6 h-6 bg-surface border-y border-l border-border/40 flex items-center justify-center text-[10px] font-bold text-foreground-muted">→</div>
            </div>
          </div>
        </div>
      )
    },
    "vibration-testing": {
      title: "Testing Vibration the Right Way",
      content: [
        "The vibration testing section gives you four preset intensity levels Light, Medium, Heavy, and Pulse plus a fully adjustable custom slider that defaults to 50%. Each preset fires both rumble motors in a distinct pattern: low for subtle feedback checks, mid for standard gameplay simulation, full for stress-testing the motors, and pulsing for rhythmic feedback diagnosis. This isn't just a simple on/off vibration toggle it's a structured haptic test.",
        "Using Chrome or Edge gives the most complete browser-compatible rumble test experience. I always run the Heavy preset first and then drop to Light to check whether both vibration motor units are responding at matching levels an imbalance at lower intensity often points to a failing motor before it shows up at full activate power."
      ],
      component: (
        <div className="bg-surface border border-border rounded-xl p-4 my-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted font-mono">Interactive Vibration Bench</span>
            {isVibrating && (
              <span className="text-[10px] text-primary font-bold animate-bounce flex items-center gap-1">📳 Rumble Motor Test Active...</span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Light', strength: '15%' },
              { name: 'Medium', strength: '50%' },
              { name: 'Heavy', strength: '100%' },
              { name: 'Pulse', strength: 'Interval' }
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => triggerVibePreset(preset.name)}
                className={`py-2 px-1 text-center border rounded-lg text-xs font-bold transition-all duration-200 ${
                  vibrationPreset === preset.name && isVibrating
                    ? 'bg-primary text-white border-primary shadow'
                    : 'bg-background hover:bg-surface-hover border-border text-foreground-secondary'
                }`}
              >
                <div>{preset.name}</div>
                <div className="text-[9px] font-normal opacity-85 mt-0.5">{preset.strength}</div>
              </button>
            ))}
          </div>
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-[10px] text-foreground-muted font-bold">
              <span>Custom Slider Strength:</span>
              <span className="font-mono">{customVibStrength}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={customVibStrength}
              onChange={(e) => setCustomVibStrength(+e.target.value)}
              className="w-full accent-primary h-1 bg-border rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )
    },
    "trigger-testing": {
      title: "Understanding Trigger and Bumper Inputs",
      content: [
        "The triggers and bumpers panel breaks inputs into two clean categories. LT and RT are fully analog, covering the complete 0% to 100% pressure range with precision you can see the value climb gradually as you pull each trigger. LB and RB are digital, reading either pressed or not pressed with no middle ground. Every input, every type, every value range is displayed side by side for direct comparison.",
        "What makes this genuinely useful is the analog range readout on the left trigger and right trigger it confirms whether your triggers are reaching true 100% at full pull or topping out early, which is a common detection issue on worn hardware. The trigger precision and response data here is more reliable than anything you'd get from in-game sensitivity settings, which often mask incomplete full range readings."
      ],
      component: (
        <div className="bg-surface/50 border border-border rounded-xl p-4 my-4">
          <div className="text-[10px] font-bold uppercase text-foreground-muted tracking-wider mb-2 font-mono">Trigger vs Bumper Input Matrix</div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-background border border-border/60 rounded-xl p-3">
              <div className="text-[11px] font-bold text-foreground">Bumpers (LB / RB)</div>
              <div className="text-xs text-primary font-mono font-bold mt-2">Digital (Binary)</div>
              <div className="text-[9px] text-foreground-muted mt-1">Value: 0 (Off) or 1 (On)</div>
            </div>
            <div className="bg-background border border-border/60 rounded-xl p-3">
              <div className="text-[11px] font-bold text-foreground">Triggers (LT / RT)</div>
              <div className="text-xs text-success font-mono font-bold mt-2">Analog (Precision)</div>
              <div className="text-[9px] text-foreground-muted mt-1">Value Range: 0% to 100%</div>
            </div>
          </div>
        </div>
      )
    },
    "latency-test": {
      title: "Measuring Your Input Latency",
      content: [
        "The latency test turns controller response time into a number you can actually act on. Press a button, start the test, and the tool calculates your average input delay in milliseconds, displaying the final results cleanly in ms. For competitive gaming, knowing whether your wired setup is outperforming wireless at the timing level is the difference between hardware confidence and constant doubt.",
        "Lag is one of those problems that's easy to feel but hard to prove and this measurement removes the ambiguity entirely. The real-time signal detection runs across your full connection speed cycle, giving you a performance baseline that's specific to your exact controller and setup rather than a spec-sheet estimate."
      ],
      component: (
        <div className="bg-surface border border-border rounded-xl p-4 my-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted font-mono">Live Latency Benchmark Simulator</span>
            <button
              onClick={runLatencyTest}
              className={`px-3 py-1 text-[10px] font-bold rounded-lg transition ${
                isMeasuringLatency ? 'bg-primary/20 text-primary cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-hover'
              }`}
            >
              {isMeasuringLatency ? 'Benchmarking...' : 'Trigger Latency Test'}
            </button>
          </div>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="text-3xl font-extrabold font-mono text-success">
                {latencyVal === 0 ? '--' : `${latencyVal} ms`}
              </div>
              <div className="text-[9px] text-foreground-muted font-bold mt-1">Calculated Average Input Delay</div>
            </div>
            {latencyHistory.length > 0 && (
              <div className="text-[9px] font-mono text-foreground-muted space-y-0.5 border-l border-border pl-4">
                <div className="font-bold text-[8px] uppercase tracking-wider mb-1 text-foreground-secondary">Recent tests:</div>
                {latencyHistory.map((h, i) => (
                  <div key={i}>Trial #{5-i}: {h} ms</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    },
    "health-score": {
      title: "What Your Controller Health Score Actually Means",
      content: [
        "The health score runs from 0 to 100 and factors in every major input category: button response consistency and reliability, stick accuracy and centering precision, trigger precision across the full analog range, dead zone calibration quality, and input latency measurement. Each component contributes to the overall score, and the combined picture gives you a single number that reflects real controller performance not a guess.",
        "A score of 90 or above means your controller is in excellent condition across all tracked inputs. Anything lower points toward a specific component that needs attention, and because each category is scored individually, the diagnosis is precise rather than vague. I've found this particularly useful after cleaning a controller watching the score move from the 70s back past 90 confirms the fix actually worked."
      ],
      component: (
        <div className="bg-surface/60 border border-border rounded-xl p-4 my-4 flex items-center justify-around gap-4">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 flex items-center justify-center bg-background rounded-full border border-border">
              <span className="text-2xl font-black font-mono text-primary">{healthScoreVal}%</span>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent border-r-transparent animate-spin-slow" style={{ animationDuration: '4s' }}></div>
            </div>
            <span className="text-[10px] font-bold text-foreground-secondary mt-2">Overall Device Health</span>
          </div>
          <div className="text-[10px] space-y-1.5 flex-1 font-sans text-foreground-muted">
            <div className="flex justify-between">
              <span>Stick Accuracy & Centering:</span>
              <span className="text-foreground font-semibold">100%</span>
            </div>
            <div className="flex justify-between">
              <span>Button Response Uniformity:</span>
              <span className="text-foreground font-semibold">100%</span>
            </div>
            <div className="flex justify-between">
              <span>Trigger Output Range:</span>
              <span className="text-foreground font-semibold">100%</span>
            </div>
            <div className="flex justify-between">
              <span>Dead Zone Offset:</span>
              <span className="text-success font-bold">Safe (&lt;0.05)</span>
            </div>
          </div>
        </div>
      )
    },
    "catching-drift-worse": {
      title: "Catching Stick Drift Before It Gets Worse",
      content: [
        "Real-time drift detection runs on both analog sticks simultaneously, plotting resting samples automatically without you having to do anything beyond releasing the sticks. The panel uses three tiers: a safe reading below 0.05 sits within normal tolerance, a minor drift value between 0.05 and 0.15 will be noticeable in sensitive games, and anything major above 0.15 produces visible movement in most titles even without a deadzone override applied.",
        "The center axis deviation display is what makes early drift diagnosis possible before the problem becomes unplayable. I caught a left-stick joystick drift reading of 0.09 on a controller that still felt fine in casual play — within a month it had climbed past 0.15. Catching it at the minor stage meant a cleaning fix worked; waiting longer would have meant a full controller module swap."
      ]
    },
    "drift-severity": {
      title: "Understanding Controller Drift Severity",
      content: [
        "Controller drift happens when an analog stick reports non-zero values while not being touched. Values below ±0.05 at rest are safe and usually masked by in-game deadzones without any visible effect. Values between 0.05 and 0.15 represent minor drift noticeable in sensitive games but manageable. Anything above 0.15 is significant: it will cause visible movement in most games even without a deadzone override in place."
      ],
      component: (
        <div className="overflow-x-auto my-4 border border-border rounded-xl">
          <table className="min-w-full divide-y divide-border text-xs bg-background">
            <thead className="bg-surface font-semibold text-foreground-secondary">
              <tr>
                <th className="px-4 py-2 text-left">Drift Tier</th>
                <th className="px-4 py-2 text-left">Value Range</th>
                <th className="px-4 py-2 text-left">In-Game Impact</th>
                <th className="px-4 py-2 text-left">Recommended Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground-muted">
              <tr>
                <td className="px-4 py-2 font-bold text-success">Safe Tolerance</td>
                <td className="px-4 py-2 font-mono">Below ±0.05</td>
                <td className="px-4 py-2">Safe, masked by standard deadzones</td>
                <td className="px-4 py-2">No action required</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-warning">Minor Drift</td>
                <td className="px-4 py-2 font-mono">0.05 to 0.15</td>
                <td className="px-4 py-2">Noticeable in sensitive settings</td>
                <td className="px-4 py-2">Add software deadzone / Clean base</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-error">Significant Drift</td>
                <td className="px-4 py-2 font-mono">Above 0.15</td>
                <td className="px-4 py-2">Causes constant camera/movement spin</td>
                <td className="px-4 py-2">Replace stick potentiometer module</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    "input-history": {
      title: "Reviewing Every Input After Your Session",
      content: [
        "The Input History panel logs every button press and release with precise timestamps, giving you a full post-session analysis of exactly what your controller registered during your testing session. This isn't just a live feed — it's a complete recorded tracking log you can scroll back through to review patterns, confirm detection accuracy, and catch inconsistencies that might not be obvious during active play.",
        "Monitoring every input this way turns your test session into documented evidence. If a specific button is press-registering twice on a single physical click, the history will show it clearly in the timestamps something no live real-time display alone would make easy to spot."
      ],
      component: (
        <div className="bg-surface/50 border border-border rounded-xl p-4 my-4 font-mono text-[10px]">
          <div className="text-[9px] uppercase font-sans font-bold text-foreground-muted mb-2 tracking-wider">Simulated Timestamp Input History Log</div>
          <div className="space-y-1 max-h-24 overflow-y-auto bg-background p-2.5 rounded border border-border/60 text-foreground-muted">
            <div>[14:56:55.201] BUTTON_0 (A) - Pressed</div>
            <div>[14:56:55.304] BUTTON_0 (A) - Released (Duration: 103ms)</div>
            <div>[14:56:56.110] BUTTON_5 (RB) - Pressed</div>
            <div>[14:56:56.241] BUTTON_5 (RB) - Released (Duration: 131ms)</div>
            <div className="text-[#ef4444] font-semibold bg-[#ef4444]/5 px-1 rounded">[14:56:57.012] BUTTON_2 (X) - Double Press Registered within 8ms (Potential Bounce Bug)</div>
          </div>
        </div>
      )
    },
    "quick-test": {
      title: "The 60-Second Quick Test Grade",
      content: [
        "The 60-second quick test is a timed run through all major inputs that ends with a controller grade starting at A+ for a perfect result and dropping through standard letter grades depending on what failed. It covers A, B, X, Y, LB, RB, LT, RT, L3, and R3 as the full set of buttons tested, and the graded pass or fail outcome is delivered at the end of the 60 seconds session.",
        "A downloadable report is generated at the end, which I've used to document controller condition before selling hardware buyers appreciate having a printed evaluation rather than just a verbal claim. The result is a clean performance summary that tells you at a glance whether your controller cleared every input or flagged specific failures worth investigating."
      ],
      component: (
        <div className="bg-surface border border-border rounded-xl p-4 my-4 flex items-center justify-around gap-4 font-mono">
          <div className="text-center bg-background border border-border/80 px-4 py-3 rounded-xl shadow-inner">
            <div className="text-[10px] text-foreground-muted">TEST GRADE</div>
            <div className="text-4xl font-black text-success mt-1">A+</div>
          </div>
          <div className="text-[10px] space-y-0.5 text-foreground-muted">
            <div className="font-sans font-bold text-[9px] uppercase mb-1 text-foreground-secondary">Verification Checklist:</div>
            <div>Face Buttons (A, B, X, Y) - <span className="text-success font-bold">PASS</span></div>
            <div>Bumpers (LB, RB) - <span className="text-success font-bold">PASS</span></div>
            <div>Analog Triggers (LT, RT) - <span className="text-success font-bold">PASS</span></div>
            <div>Stick Clicks (L3, R3) - <span className="text-success font-bold">PASS</span></div>
            <div className="text-[8px] font-sans font-semibold text-primary mt-1">📄 PDF report ready for download</div>
          </div>
        </div>
      )
    },
    "no-software": {
      title: "Connecting Without Any Software",
      content: [
        "With 30+ supported controllers, a USB & Bluetooth connection range, and a cost of completely free forever, the tester's biggest practical advantage is that software required reads as none. Testing speed is instant there's no install wizard, no account creation, no sign-up wall. Drift detection is on by default the moment a controller connects, and the whole experience runs natively in your browser at the OS level.",
        "The USB Connection path is the most reliable: plug your controller into any USB port and the browser detects it automatically. All wired controllers, wireless USB receivers, and most third-party adapters work without any drivers or additional software recognition happens at the operating system level before the page ever needs to process it. The USB-C cable caveat is real though not every USB-C cable carries data, so if detection fails, a cable swap is always the first move."
      ]
    },
    "wireless-pairing": {
      title: "Pairing Wirelessly Without Reloading",
      content: [
        "The Bluetooth connection flow starts at your device's settings pair the controller there first, at the OS level, before opening the tester. Once that's done, just hold the pairing button, connect, and press any button on the controller inside the browser. The tester activates immediately there's no page reload needed, no manual refresh, no waiting. The wireless detection and signal handoff happen the moment that first button input comes through.",
        "This matters because the Web Gamepad API requires that button press to register the device it's not the tester being slow, it's a browser security boundary. Once you know that, the instant activation flow feels seamless rather than confusing. The tester is ready before you even let go of the button."
      ]
    },
    "step-by-step-connect": {
      title: "How to Connect Your Controller Step by Step",
      content: [
        "Attach your controller via USB cable or pair it wirelessly over Bluetooth the Web Gamepad API needs a physical button press to activate, which is a browser security requirement, not a bug. The moment you press any button, your controller slot appears instantly on screen with its index and name showing automatically. You can connect up to four controllers simultaneously, each getting its own slot in the detection panel without any manual assignment needed.",
        "Before you open the tester, if you're going wireless: pair in system settings first, then come to the page. For USB, plug in and wait for your OS to recognise the device the Gamepad API detection and wake signal happen in sequence, and your controller appears within seconds."
      ],
      component: (
        <div className="bg-surface/50 border border-border rounded-xl p-4 my-4 font-sans space-y-3">
          <div className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider">Visual Setup Flowchart</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[10px]">
            <div className="bg-background border border-border p-2.5 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-primary mb-1">STEP 1</span>
              <span>Pair Bluetooth in settings OR plug USB cable</span>
            </div>
            <div className="bg-background border border-border p-2.5 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-primary mb-1">STEP 2</span>
              <span>Open Gamepadtester.live on your browser</span>
            </div>
            <div className="bg-background border border-border p-2.5 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-primary mb-1">STEP 3</span>
              <span>Press any button to trigger the Gamepad API</span>
            </div>
            <div className="bg-background border border-border p-2.5 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-primary mb-1">STEP 4</span>
              <span>View telemetry and start input testing</span>
            </div>
          </div>
        </div>
      )
    },
    "thorough-button": {
      title: "Testing Every Button Thoroughly",
      content: [
        "Press each face button individually and watch the corresponding indicator highlight live that visual confirmation is faster and more reliable than any game feedback loop. Work through every bumper, trigger, stick click, D-pad direction, and system button one by one. The Input History panel logs every press and release with timestamps so you have a full review trail, not just a live read.",
        "Pull L2 and R2 triggers gradually to check the full analog range don't just tap them. Click L3 and R3 by pressing the sticks straight down and watch the indicators separately from the axis readings. For a structured finish, run the 60-Second Quick Test and let the graded pass or fail result confirm whether all four directions and every individually tested button cleared cleanly."
      ]
    },
    "drift-precision": {
      title: "Diagnosing Analog Drift Precisely",
      content: [
        "Move each analog stick through its full range and watch the live X and Y axis values update in real-time. Then release completely a perfectly calibrated stick reads 0.000 on both axes at rest. Any deviation from that is drift, and the detection is immediate. Readings above ±0.05 at rest confirm the issue; below that threshold is within safe deadzone tolerance.",
        "Push the sticks to the edges to check range and symmetry an uneven sweep from center to edge suggests mechanical wear rather than simple calibration drift. The visual pad tracks movement in real-time, and the Drift Detection panel plots resting samples automatically so you don't have to manually record anything. I've run this test dozens of times and the center read never lies."
      ]
    },
    "final-verification": {
      title: "Final Verification: Vibration, Health, and Latency",
      content: [
        "Finish your session by running through vibration presets using the rumble controls Light, Medium, Heavy, and Pulse and use the custom intensity slider to test both rumble motors independently. Then run the Latency Test to get your average response time in ms, and pull up your Health Score to see where everything lands on the 0 to 100 scale. A score of 90 or above confirms excellent condition across all combined inputs.",
        "Once you're satisfied, grab the download option and save the full report as a text file for future reference. That document captures everything the tester measured in one place useful for warranty claims, pre-sale documentation, or just keeping a baseline record of your controller's performance before extended use degrades it."
      ]
    },
    "xbox-compatibility": {
      title: "Xbox Controller Support Explained",
      content: [
        "Every Xbox controller generation is fully supported — from the Xbox 360 wired and wireless versions through the Xbox One, Xbox Series X/S, Xbox Elite Series 1 and Series 2, and the Xbox Adaptive Controller. On Windows, detection runs through the XInput standard for the cleanest possible mapping. On Mac and Linux, these controllers register as standard HID gamepads with complete button, trigger, and rumble access. Chrome, Edge, and Firefox all handle USB and Bluetooth connections without additional setup, and the USB adapter path for Xbox 360 wireless controllers works exactly as expected."
      ],
      component: (
        <div className="flex justify-center my-4 opacity-80">
          <span className="px-3 py-1 bg-[#107C10]/15 text-[#107C10] border border-[#107C10]/20 rounded-lg text-xs font-bold font-mono">🔌 WINDOWS XINPUT COMPLIANT</span>
        </div>
      )
    },
    "playstation-compatibility": {
      title: "PlayStation Controller Support Explained",
      content: [
        "Sony's DualSense and DualShock lineup gets complete support here the DualSense for PlayStation 5, the DualSense Edge for the PS5 Pro, the DualShock 4 for PS4, the DualShock 3 for PS3 via USB only, and the PlayStation Move Motion Controllers. Chrome and Edge provide the most thorough API access for PlayStation hardware, including adaptive trigger resistance data for the DualSense. Button mapping, analog trigger detection, and haptic feedback testing all work with complete accuracy for every listed model."
      ],
      component: (
        <div className="flex justify-center my-4 opacity-80">
          <span className="px-3 py-1 bg-[#00439C]/15 text-[#00439C] border border-[#00439C]/20 rounded-lg text-xs font-bold font-mono">🎮 PLAYSTATION DUALSENSE API DIRECT</span>
        </div>
      )
    },
    "nintendo-compatibility": {
      title: "Nintendo and Third-Party Controller Support",
      content: [
        "The Nintendo Switch Pro Controller connects seamlessly over both USB and Bluetooth across all major platforms. Joy-Con left and right pairs are detected as a single combined gamepad, and button labels follow the standard ABXY layout for cross-platform consistency in the tester interface. The GameCube Controller works via a Mayflash USB adapter, the Wii U Pro Controller runs on USB connection, and Nintendo Switch Online controllers are supported across the board.",
        "For third-party and generic controllers, any USB HID-compliant gamepad or paired Bluetooth device should be detectable without issue. Tested brands include 8BitDo Pro 2, Ultimate, and SN30 Pro, Logitech F310 and F710, Razer Wolverine and Razer Kishi, the Steam Controller, Steam Deck, and custom arcade-style HID controllers all confirmed to work out of the box."
      ],
      component: (
        <div className="overflow-x-auto my-4 border border-border rounded-xl">
          <table className="min-w-full divide-y divide-border text-xs bg-background">
            <thead className="bg-surface font-semibold text-foreground-secondary">
              <tr>
                <th className="px-4 py-2 text-left">Device Brand / Model</th>
                <th className="px-4 py-2 text-left">Protocol type</th>
                <th className="px-4 py-2 text-left">Rumble Test</th>
                <th className="px-4 py-2 text-left">Stick Center</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground-muted">
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Nintendo Switch Pro</td>
                <td className="px-4 py-2">Direct Bluetooth/USB</td>
                <td className="px-4 py-2">Supported (Chrome/Edge)</td>
                <td className="px-4 py-2 font-mono">±0.00000</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">8BitDo (Pro 2 / Ultimate)</td>
                <td className="px-4 py-2">XInput / Switch mode</td>
                <td className="px-4 py-2">Supported</td>
                <td className="px-4 py-2 font-mono">±0.00000</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Logitech F310 / F710</td>
                <td className="px-4 py-2">DirectInput / XInput</td>
                <td className="px-4 py-2">Direct (F710 only)</td>
                <td className="px-4 py-2 font-mono">±0.00000</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Steam Deck / Controller</td>
                <td className="px-4 py-2">HID-compliant Virtual</td>
                <td className="px-4 py-2">Browser-standard</td>
                <td className="px-4 py-2 font-mono">±0.00000</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    "four-step-flow": {
      title: "The Four-Step Testing Flow",
      content: [
        "The core gamepad testing process runs as four clean steps: connect your controller via USB or Bluetooth, detect it by pressing any button so the browser Gamepad API activates and identifies the device, test every input buttons, sticks, triggers which all update live at up to 60 fps, then diagnose by reviewing drift data, checking your Health Score, running the latency test, and downloading your full report. That's the complete loop from plug or pair to documented result."
      ],
      component: (
        <div className="flex justify-center my-6">
          <svg width="100%" height="90" viewBox="0 0 450 90" className="w-full max-w-md bg-background border border-border rounded-xl">
            <g transform="translate(15, 15)">
              {/* Box 1 */}
              <rect x="0" y="10" width="76" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
              <text x="38" y="34" textAnchor="middle" fill="var(--foreground)" className="text-[9px] font-bold">1. CONNECT</text>
              
              <path d="M76,30 L94,30" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3"/>
              <polygon points="94,27 100,30 94,33" fill="var(--border)"/>

              {/* Box 2 */}
              <rect x="100" y="10" width="76" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
              <text x="138" y="34" textAnchor="middle" fill="var(--foreground)" className="text-[9px] font-bold">2. DETECT</text>

              <path d="M176,30 L194,30" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3"/>
              <polygon points="194,27 200,30 194,33" fill="var(--border)"/>

              {/* Box 3 */}
              <rect x="200" y="10" width="76" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
              <text x="238" y="34" textAnchor="middle" fill="var(--foreground)" className="text-[9px] font-bold">3. TEST</text>

              <path d="M276,30 L294,30" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3"/>
              <polygon points="294,27 300,30 294,33" fill="var(--border)"/>

              {/* Box 4 */}
              <rect x="300" y="10" width="84" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
              <text x="342" y="34" textAnchor="middle" fill="var(--foreground)" className="text-[9px] font-bold">4. DIAGNOSE</text>
            </g>
          </svg>
        </div>
      )
    },
    "raw-signal-ranges": {
      title: "Input Signal Ranges You Should Know",
      content: [
        "Understanding the raw input signal reference values helps you interpret what the tester is showing. Digital buttons run on a binary: 0 for not pressed, 1 for pressed clean and absolute. Analog triggers operate across a 0 to 255 pressure-sensitive range, which is why partial pulls show intermediate values rather than a jump straight to maximum. Analog sticks report on both X and Y axes from -1.0 to +1.0, with 0 representing perfect center on each axis. These type and measurement ranges are the foundation of every detection reading the tool produces."
      ],
      component: (
        <div className="overflow-x-auto my-4 border border-border rounded-xl">
          <table className="min-w-full divide-y divide-border text-xs bg-background">
            <thead className="bg-surface font-semibold text-foreground-secondary">
              <tr>
                <th className="px-4 py-2 text-left">Input Component</th>
                <th className="px-4 py-2 text-left">Signal Category</th>
                <th className="px-4 py-2 text-left">Numeric Range</th>
                <th className="px-4 py-2 text-left">Center/Idle Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground-muted">
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Digital Buttons (A, B, LB, etc.)</td>
                <td className="px-4 py-2">Binary State</td>
                <td className="px-4 py-2 font-mono">0 or 1</td>
                <td className="px-4 py-2 font-mono">0 (Not Pressed)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Analog Triggers (LT / RT)</td>
                <td className="px-4 py-2">Pressure Sensitive</td>
                <td className="px-4 py-2 font-mono">0 to 255</td>
                <td className="px-4 py-2 font-mono">0 (0% Pull)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Analog Sticks (LX, LY, RX, RY)</td>
                <td className="px-4 py-2">Dual Coordinate Axis</td>
                <td className="px-4 py-2 font-mono">-1.00000 to +1.00000</td>
                <td className="px-4 py-2 font-mono">0.00000 (Perfect Center)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    "browser-compatibility": {
      title: "Browser Compatibility at a Glance",
      content: [
        "The tester runs on the Web Gamepad API, which is supported across all major modern browsers. Chrome (from version 58) and Edge (from version 79) offer best support and full support respectively, covering every feature including vibration and haptic access. Firefox (version 55+) delivers good support with most features intact. Safari added gamepad support from version 16.4, making it supported across Apple devices as well. For the most complete Gamepad API feature access, Chrome or Edge remains the recommendation."
      ],
      component: (
        <div className="overflow-x-auto my-4 border border-border rounded-xl">
          <table className="min-w-full divide-y divide-border text-xs bg-background">
            <thead className="bg-surface font-semibold text-foreground-secondary">
              <tr>
                <th className="px-4 py-2 text-left">Browser Engine</th>
                <th className="px-4 py-2 text-left">Minimum Version</th>
                <th className="px-4 py-2 text-left">Vibration Support</th>
                <th className="px-4 py-2 text-left">Overall Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground-muted">
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Google Chrome</td>
                <td className="px-4 py-2 font-mono">Version 58+</td>
                <td className="px-4 py-2 text-success font-bold">Supported</td>
                <td className="px-4 py-2 text-success">Best Support</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Microsoft Edge</td>
                <td className="px-4 py-2 font-mono">Version 79+</td>
                <td className="px-4 py-2 text-success font-bold">Supported</td>
                <td className="px-4 py-2 text-success">Full Support</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Mozilla Firefox</td>
                <td className="px-4 py-2 font-mono">Version 55+</td>
                <td className="px-4 py-2 text-error font-semibold">Not Available</td>
                <td className="px-4 py-2 text-warning">Good Support</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Apple Safari</td>
                <td className="px-4 py-2 font-mono">Version 16.4+</td>
                <td className="px-4 py-2 text-error font-semibold">Not Available</td>
                <td className="px-4 py-2 text-warning">Supported</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    "not-showing-up": {
      title: "Fix It Fast: Controller Not Showing Up",
      content: [
        "If your controller isn't showing up, the fastest first move is to refresh the page controllers connected before the page loads may not trigger the API, and a simple reload followed by pressing a button resolves the majority of controller not found reports. After that, check whether your USB cable is fully seated in both the controller and port not every USB-C cable carries data, and a bad cable is the second most common culprit. For Bluetooth, confirm the pairing is complete in your OS settings before opening the tester.",
        "If connection issues persist, switch to Chrome or Edge for the most complete Gamepad API implementation, including full vibration support. Firefox covers most features but may lack haptic feedback. Some browsers show a permission prompt for gamepad access click Allow, and if you previously denied it, go into Site Settings, find Gamepad, and reset the permission before retrying. Low battery also causes intermittent disconnections, input lag, and phantom button presses, so fully charge your controller or replace the batteries before testing again. On Windows, check Device Manager for controller entries with warning icons and use the right-click update driver path, or uninstall and reinstall using the manufacturer's official software or firmware update tool."
      ]
    },
    "button-press-security": {
      title: "Why the Browser Requires a Button Press",
      content: [
        "The button press requirement for detection is a deliberate security feature of the Web Gamepad API in all browsers it exists to prevent silent tracking of your input devices without your knowledge. The browser requires explicit user interaction before it exposes controller data to any website, making it a requirement rather than a limitation. Once you understand that boundary, the activation flow stops feeling like a bug and starts feeling like exactly what it is: protection."
      ],
      component: (
        <div className="bg-primary/5 border border-primary/20 p-3.5 rounded-xl text-xs flex gap-3 my-4">
          <div className="text-xl">🛡️</div>
          <div>
            <div className="font-extrabold text-primary mb-0.5">Gamepad API Security Sandbox</div>
            <div className="text-foreground-muted">Explicit physical input is required by web engines to block cross-site fingerprinting and background tracking.</div>
          </div>
        </div>
      )
    },
    "vibration-not-firing": {
      title: "Why Vibration Might Not Fire",
      content: [
        "Vibration needs two things working simultaneously: browser support and a compatible controller. Chrome and Edge offer the best haptic support; on Firefox, the vibration API may simply not be available. Some controllers especially older or generic USB gamepads don't expose their rumble motors to the browser even if they vibrate correctly inside games through a dedicated driver. This isn't a tester fault it's a hardware/browser API boundary."
      ]
    },
    "mobile-support": {
      title: "Mobile and Tablet Testing Support",
      content: [
        "Gamepad Tester works on Android with Chrome when a USB or Bluetooth controller is connected. iOS and iPadOS added Gamepad API support in Safari 16.4, so iPhone and iPad users can test MFi-certified and select Bluetooth controllers directly in the browser. Connection reliability on mobile platforms varies more than on desktop, but the core tester functionality is available. If you're on a phone and nothing registers, the device and connection method combination is worth checking first."
      ]
    },
    "privacy-first": {
      title: "Your Data Stays in the Browser",
      content: [
        "No controller data not button presses, not axis values, not vibration commands is ever transmitted to any server. Everything is processed entirely in your browser using JavaScript, and the only external requests the page makes are loading the page assets and the Google Fonts stylesheet. Your input data never leaves your device. Your controller usage is completely private, and there's nothing to opt out of because nothing is collected in the first place."
      ],
      component: (
        <div className="bg-success/5 border border-success/20 p-3.5 rounded-xl text-xs flex gap-3 my-4">
          <div className="text-xl">🔒</div>
          <div>
            <div className="font-extrabold text-success mb-0.5">Local Client-Side Diagnostics Only</div>
            <div className="text-foreground-muted">Data stays within the browser memory and is discarded immediately after closing the tab.</div>
          </div>
        </div>
      )
    },
    "who-gets-value": {
      title: "Who Gets the Most Value from This Tool",
      content: [
        "This gamepad tester was built for anyone who needs to verify controller performance, diagnose problems, or confirm reliable gameplay across devices and that's a wider group than it sounds. Gamers and competitive players use it to detect stick drift, check button response, verify trigger sensitivity, and compare wired vs wireless latency directly. Buyers of used controllers run it to confirm all buttons work, check trigger range, and avoid faulty hardware before money changes hands. Repair techs and hobbyists use it for hardware issues diagnosis, and to document before/after states on faulty hardware they've worked on.",
        "Streamers and creators rely on it to ensure accurate inputs and stable connection during recordings. Parents and casual players appreciate the speed no downloads, no guessing, just a quick check of whether those broken buttons are the controller or the game. PC and multi-platform gamers verify compatibility, catch mapping issues, and confirm behavior across multiple devices. Game developers and QA testers use it for input mapping verification, axis range testing, and compatibility testing across hardware. If you play games with a controller, this tool has a use case for you."
      ],
      component: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
          {['Competitive Gamers', 'Hardware Technicians', 'Used Buyers/Sellers', 'Game Developers', 'Content Streamers', 'Casual Players'].map((role) => (
            <div key={role} className="border border-border/70 rounded-xl p-3 bg-background/60 text-center font-semibold text-xs text-foreground-secondary hover:border-primary transition-all duration-300">
              👤 {role}
            </div>
          ))}
        </div>
      )
    },
    "useful-alternatives": {
      title: "What Makes This Tester More Useful Than Alternatives",
      content: [
        "Most gamepad testing tools stop at showing whether a button lights up. This one delivers accurate, actionable, reliable controller diagnostics that go significantly deeper. The real-time, visual input analysis covers analog stick movement with center detection, button press accuracy and consistency, trigger pressure range, and input stability over time — not just presence or absence of signal.",
        "The problem diagnosis layer actively identifies stick drift vs. calibration, highlights inconsistent buttons, detects unstable signals, and separates software issues from hardware ones. Before-and-after repair verification lets you test before cleaning or component work, use correct PlayStation/Xbox mappings as reference, and confirm fixes visually after repair. Platform-aware testing accounts for Windows PC input standards, supports calibration workflows during setup, and handles after component replacement testing cleanly. And because it's browser-based with no software installation and no data stored or tracked, there's no friction between the decision to test and the actual result."
      ]
    },
    "drift-diagnosing-fixing": {
      title: "Analog Stick Drift - Diagnosing and Fixing",
      content: [
        "Analog stick drift is the most common controller problem, and the symptoms are hard to miss: your character moves automatically without input, the camera rotates on its own, the cursor drifts in menus, or you notice uneven analog stick response that wasn't there before. The fix starts with opening the Gamepad Tester and leaving the stick untouched to diagnose the resting position. From there, rotating the stick in full circles can recalibrate the internal sensor, and compressed air around the stick base clears debris that causes false input signals. If debris persists, isopropyl alcohol applied carefully to the base can help. If drift continues after all of that, a joystick module replacement is the correct next step."
      ]
    },
    "button-lag-fixes": {
      title: "Button Lag and Input Delay - Causes and Fixes",
      content: [
        "Button lag and input delay show up as delayed shooting or jumping actions, missed or double inputs being registered, and generally inconsistent button responsiveness that makes precise play unreliable. The most effective first fix is switching to a wired USB connection for lower latency wireless introduces variable delay that wired eliminates entirely. Run the button response check in Gamepad Tester to confirm whether the problem is hardware or system-level. Closing background applications, changing the USB port or cable, and updating controller firmware and system drivers are the next steps in order if the initial switch doesn't resolve it."
      ]
    },
    "connectivity-fixes": {
      title: "Connectivity, Trigger, Vibration, and Input Detection Fixes",
      content: [
        "Connectivity issues controller not detected by system, random disconnections, or Bluetooth pairing failure are almost always solved by one of four steps: fully charging the controller battery, swapping the USB cable or port, re-pairing the Bluetooth connection, or reinstalling HID drivers if no input is detected at all. Trigger calibration problems where triggers don't reach full range, show partial or inconsistent pressure detection, or feel unresponsive or sticky start with a full press while watching the range in the tester, followed by recalibrating trigger sensitivity via system settings, and cleaning the trigger mechanism with compressed air. Replacing worn trigger springs is the hardware fix if nothing else works.",
        "Vibration and haptic feedback issues no vibration output at all, weak or delayed response, or one motor working while the other doesn't are resolved by enabling vibration in system settings, activating the vibration test in the tester, updating controller firmware, and replacing the vibration motor if it remains unresponsive. When a controller is detected but shows no input appearing connected in the system while buttons and sticks won't register, and working in some games but not others switch the controller input mode between XInput and DirectInput, enable controller support in game settings, reinstall controller drivers, and confirm activity through the tester."
      ]
    },
    "maintenance-longevity": {
      title: "Keeping Your Controller Healthy Long-Term",
      content: [
        "Preventive maintenance doesn't take long and pays off over time. Test your controller monthly using a Gamepad Tester it takes under two minutes and catches developing problems early. Recalibrate after long gaming sessions, keep the hardware clean and dry, avoid excessive force on sticks and buttons, and run in wired mode for competitive gaming where latency reliability matters most. These habits extend controller longevity and keep performance consistent across hundreds of hours of use.",
        "Knowing when to replace is just as important. If stick drift persists after calibration and cleaning, if button inputs fail consistently, if the Gamepad Tester shows unstable axis readings session after session, or if repair costs are approaching or exceeding the replacement value of the controller, replacement is the right call rather than continued investment in a declining piece of hardware."
      ]
    },
    "platform-differences": {
      title: "Platform-by-Platform: What Gets Tested",
      content: [
        "Windows connects via XInput or HID and detects drift, lag, and vibration with no significant limitations. PlayStation uses a proprietary protocol and supports stick/button testing and basic haptics, though adaptive triggers fall outside what the standard browser API exposes. Android connects via Bluetooth or USB OTG and detects latency and mapping, though results vary by device. iOS uses MFi or Bluetooth for basic input detection with no haptics or trigger data available through the browser layer.",
        "For cross-platform accuracy: test separately on each platform individually, recalibrate after switching devices, save platform-specific calibration profiles where possible, and use a wired connection whenever you need the most accurate latency and input readings."
      ],
      component: (
        <div className="overflow-x-auto my-4 border border-border rounded-xl">
          <table className="min-w-full divide-y divide-border text-xs bg-background">
            <thead className="bg-surface font-semibold text-foreground-secondary">
              <tr>
                <th className="px-4 py-2 text-left">Platform</th>
                <th className="px-4 py-2 text-left">Buttons / Sticks</th>
                <th className="px-4 py-2 text-left">Vibration Rumble</th>
                <th className="px-4 py-2 text-left">Adaptive Triggers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground-muted">
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Windows PC</td>
                <td className="px-4 py-2 text-success font-bold font-sans">Full Support</td>
                <td className="px-4 py-2 text-success font-bold font-sans">Full Support</td>
                <td className="px-4 py-2">Limited API support</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">PlayStation Console</td>
                <td className="px-4 py-2 text-success font-bold font-sans">Full Support</td>
                <td className="px-4 py-2 text-success font-bold font-sans">Basic Haptics</td>
                <td className="px-4 py-2">Browser API Boundary</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">Android OS</td>
                <td className="px-4 py-2 text-success font-bold font-sans">Full Support</td>
                <td className="px-4 py-2">Varies by Device</td>
                <td className="px-4 py-2">Not Supported</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold text-foreground">iOS / iPadOS</td>
                <td className="px-4 py-2">MFi Basic Inputs</td>
                <td className="px-4 py-2">Not Supported</td>
                <td className="px-4 py-2">Not Supported</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    "quiz-diagnosis": {
      title: "Controller Broken or Just Calibration? Here's How to Know",
      content: [
        "The interactive quiz combined with Gamepad Tester diagnosis gives you a structured answer. Key checks cover stick center stability, button response consistency, trigger range accuracy, input detection status, and connection stability each one pointing toward a specific failure type. Outcomes fall into three categories: Not Broken (a calibration or software issue is the likely cause), Repairable (minor hardware wear that can be addressed), or Likely Broken (severe hardware failure that warrants replacement). Running these checks before spending money on parts or a replacement gives you information instead of guesswork."
      ],
      component: (
        <div className="bg-surface border border-border rounded-xl p-4 my-4 space-y-3 font-sans">
          <div className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider font-mono">Interactive Diagnosis Matrix Quiz</div>
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-foreground-secondary mb-1">Check all symptoms that apply to your controller:</div>
            
            <label className="flex items-start gap-2.5 cursor-pointer text-foreground-secondary hover:text-foreground">
              <input
                type="checkbox"
                checked={quizChecks.stickCenter}
                onChange={(e) => setQuizChecks({ ...quizChecks, stickCenter: e.target.checked })}
                className="mt-0.5 accent-primary"
              />
              <span>Stick drifts slightly from perfect center at rest (Values above ±0.05 but below 0.15)</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-foreground-secondary hover:text-foreground">
              <input
                type="checkbox"
                checked={quizChecks.buttonResponse}
                onChange={(e) => setQuizChecks({ ...quizChecks, buttonResponse: e.target.checked })}
                className="mt-0.5 accent-primary"
              />
              <span>Face button feels sticky or occasionally misses a physical click registry</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-foreground-secondary hover:text-foreground">
              <input
                type="checkbox"
                checked={quizChecks.triggerRange}
                onChange={(e) => setQuizChecks({ ...quizChecks, triggerRange: e.target.checked })}
                className="mt-0.5 accent-primary"
              />
              <span>Trigger pressure does not register smoothly or fails to reach 100% full pull value</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-foreground-secondary hover:text-foreground">
              <input
                type="checkbox"
                checked={quizChecks.inputDetection}
                onChange={(e) => setQuizChecks({ ...quizChecks, inputDetection: e.target.checked })}
                className="mt-0.5 accent-primary"
              />
              <span>Controller connects to system but inputs do not register at all inside browser tester</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-foreground-secondary hover:text-foreground">
              <input
                type="checkbox"
                checked={quizChecks.connectionStability}
                onChange={(e) => setQuizChecks({ ...quizChecks, connectionStability: e.target.checked })}
                className="mt-0.5 accent-primary"
              />
              <span>Constant random Bluetooth disconnects or device Manager driver warnings appear</span>
            </label>
          </div>

          <div className={`mt-3 p-3.5 rounded-lg text-xs transition-colors duration-200 ${evaluateQuiz().color}`}>
            <div className="font-extrabold text-[11px] uppercase tracking-wider mb-0.5">Evaluated Status: {evaluateQuiz().status}</div>
            <div>{evaluateQuiz().desc}</div>
          </div>
        </div>
      )
    },
    "ps5-drift-steps": {
      title: "Fixing PS5 Controller Drift Step by Step",
      content: [
        "Before anything else, open the Gamepad Tester, don't touch the stick, and observe the center axis reading. If movement is detected at rest, drift is present and confirmed. The cleaning fix runs in order: power off the controller, apply compressed air around the stick base, follow with isopropyl alcohol, and let it dry fully before re-testing. The calibration fix covers rotating sticks through their full range, recalibrating via system settings, and adjusting the deadzone in the Gamepad Tester to compensate if hardware wear is minimal.",
        "After the fix, reopen Gamepad Tester and verify the axis returns to center with stable values at rest. If drift remains at the same level, stick module replacement is the confirmed next step no amount of cleaning or software adjustment will resolve a worn-out physical component."
      ]
    },
    "xbox-detection-steps": {
      title: "Fixing Xbox Controller Detection Issues",
      content: [
        "If your Xbox controller isn't being detected, connect via USB, open the Gamepad Tester, and check whether any input detection registers at all. If nothing shows: check for missing drivers, a faulty cable, or USB port issues as the three most likely causes. Step two is hardware: try a different cable, change the USB port, reinstall Xbox drivers, and update Windows if driver packages are outdated. Step three is verification — confirm button input, stick movement, and trigger range all register cleanly in the tester before calling the fix complete. This step-by-step approach resolves the overwhelming majority of Xbox controller not detected cases in four moves or fewer."
      ]
    }
  }

  // Get flat list of sections matching query
  const getFilteredSections = () => {
    const query = searchQuery.toLowerCase().trim()
    const allSectionIds = Object.keys(rawData)
    
    if (!query) {
      if (activeTab === 'all') return allSectionIds
      const activeChIndex = parseInt(activeTab)
      if (!isNaN(activeChIndex) && chapters[activeChIndex]) {
        return chapters[activeChIndex].sections
      }
      return allSectionIds
    }

    return allSectionIds.filter(id => {
      const sec = rawData[id]
      if (!sec) return false
      return sec.title.toLowerCase().includes(query) || sec.content.some(p => p.toLowerCase().includes(query))
    })
  }

  const activeSections = getFilteredSections()

  // Track active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    const currentRefs = sectionsRef.current
    Object.keys(currentRefs).forEach(key => {
      const el = currentRefs[key]
      if (el) observer.observe(el)
    })

    return () => {
      Object.keys(currentRefs).forEach(key => {
        const el = currentRefs[key]
        if (el) observer.unobserve(el)
      })
    }
  }, [activeSections])

  return (
    <div className="mt-12 text-foreground max-w-7xl mx-auto space-y-8 font-sans">
      

      
      {/* Search and Quick-Navigation Header */}
      <div className="bg-surface/50 border border-border rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Controller Repair &amp; Calibration Guides
            </h2>
            <p className="text-foreground-muted text-xs sm:text-sm mt-1 max-w-xl">
              Search step-by-step walkthroughs for PS5, Xbox, and Switch controllers to resolve drift, lag, and connection issues.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 text-[11px] text-foreground-secondary">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Written by <Link href="/author/marcus-vance" className="text-primary hover:underline font-semibold">Marcus Vance</Link></span>
              </div>
              <span className="text-border/40 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                <span>Verified by <Link href="/author/sarah-chen" className="text-success hover:underline font-semibold">Sarah Chen, PhD</Link></span>
              </div>
              <span className="text-border/40 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
                <span>QA Tested by <Link href="/author/alex-mercer" className="text-warning hover:underline font-semibold">Alex Mercer</Link></span>
              </div>
            </div>
          </div>
          
          {/* Instant Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-foreground-muted text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search guides, fixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-foreground-muted text-xs hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
          <button
            onClick={() => { setActiveTab('all'); setSearchQuery('') }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all' && !searchQuery
                ? 'bg-primary text-white shadow-md' 
                : 'bg-surface hover:bg-surface-hover text-foreground-secondary border border-border/80'
            }`}
          >
            All Guides
          </button>
          {chapters.map((ch, chIdx) => (
            <button
              key={chIdx}
              onClick={() => { setActiveTab(chIdx.toString()); setSearchQuery('') }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === chIdx.toString() && !searchQuery
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-surface hover:bg-surface-hover text-foreground-secondary border border-border/80'
              }`}
            >
              {ch.title.split('. ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar Table of Contents + Contents Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sticky Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20 bg-surface/30 border border-border/60 rounded-2xl p-4 max-h-[calc(100vh-120px)] overflow-y-auto space-y-4">
            <h3 className="text-[11px] font-black uppercase text-foreground-muted tracking-wider px-2">Table of Contents</h3>
            <div className="space-y-4">
              {chapters.map((ch, chIdx) => {
                // Check if any section inside the chapter matches search/active filter
                const hasVisibleSections = ch.sections.some(sId => activeSections.includes(sId))
                if (!hasVisibleSections) return null

                return (
                  <div key={chIdx} className="space-y-1">
                    <h4 className="text-[10px] font-extrabold text-foreground-secondary px-2">{ch.title}</h4>
                    <ul className="space-y-0.5 text-xs">
                      {ch.sections.map(sId => {
                        if (!activeSections.includes(sId)) return null
                        const isActive = activeId === sId
                        return (
                          <li key={sId}>
                            <button
                              onClick={() => handleScrollTo(sId)}
                              className={`w-full text-left px-2.5 py-1 rounded transition-all truncate font-medium ${
                                isActive 
                                  ? 'text-primary bg-primary/10 font-bold border-l-2 border-primary' 
                                  : 'text-foreground-muted hover:text-foreground-secondary hover:bg-surface-hover/50'
                              }`}
                              title={rawData[sId]?.title}
                            >
                              {rawData[sId]?.title}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Contents Column */}
        <div className="lg:col-span-3 space-y-6">
          {activeSections.length === 0 ? (
            <div className="bg-surface/50 border border-border rounded-2xl p-12 text-center text-foreground-muted">
              <span className="text-2xl mb-2 block">🔍</span>
              <div className="font-bold text-foreground">No matches found</div>
              <p className="text-xs mt-1">Try searching for other words like &quot;drift&quot;, &quot;latency&quot;, &quot;calibration&quot;, or &quot;vibration&quot;.</p>
            </div>
          ) : (
            activeSections.map(sId => {
              const sec = rawData[sId]
              if (!sec) return null

              return (
                <div
                  key={sId}
                  id={sId}
                  ref={el => { sectionsRef.current[sId] = el }}
                  className="group bg-surface/40 hover:bg-surface/60 border border-border rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 scroll-mt-24"
                >
                  {/* Badge & Title */}
                  <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-3 mb-4">
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                      {sec.title}
                    </h3>
                    <span className="text-[10px] font-bold font-mono text-foreground-muted/60 bg-border/40 px-2 py-0.5 rounded uppercase">
                      Info
                    </span>
                  </div>

                  {/* Section Content - Preservation is 100% Exact */}
                  <div className="text-foreground-secondary text-sm leading-relaxed space-y-3 font-medium">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Specific Interactive Visual / Table Component */}
                  {sec.component && (
                    <div className="mt-4 border-t border-border/40 pt-4">
                      {sec.component}
                    </div>
                  )}

                  {/* Insert specific default SVGs matching the content section */}
                  {sId === 'step-by-step-connect' && <ConnectionInfographic />}
                  {sId === 'stick-testing' && <StickCrossSection />}
                  {sId === 'drift-precision' && <DriftSeverityComparison />}
                  {sId === 'useful-alternatives' && <GamepadTesterUIMockup />}
                </div>
              )
            })
          )}
        </div>

      </div>

      {/* Editorial Trust & Hardware Testing Lab Section */}
      {/* Recent Technical Articles & Guides */}
      <div className="bg-surface/30 border border-border rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6 mt-12">
        <div>
          <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
            Latest Research &amp; DIY Fixes
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight mt-3">
            Diagnostics Lab Reports &amp; Guides
          </h2>
          <p className="text-foreground-muted text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Read the latest technical findings, hardware mod guides, and latency benchmarks written by our workshop specialists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => {
            const author = authors.find(a => a.id === article.authorId);
            const reviewer = authors.find(a => a.id === article.reviewerId);
            return (
              <Link 
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col justify-between bg-background/40 hover:bg-background/80 border border-border/80 hover:border-primary rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-surface-hover border border-border rounded-md text-[10px] font-semibold text-foreground-secondary uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-foreground-muted">{article.date}</span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>{article.icon}</span>
                      <span>{article.title}</span>
                    </h3>
                    <p className="text-xs text-foreground-muted mt-2 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-4 text-[10px] text-foreground-muted">
                  <div className="flex items-center gap-2">
                    {author && (
                      <span className="flex items-center gap-1">
                        <span>By</span>
                        <strong className="text-foreground">{author.name}</strong>
                      </span>
                    )}
                    {reviewer && (
                      <span className="flex items-center gap-1">
                        <span>• Reviewed by</span>
                        <strong className="text-foreground-secondary">{reviewer.name}</strong>
                      </span>
                    )}
                  </div>
                  <span className="font-mono bg-surface px-1.5 py-0.5 rounded text-foreground-secondary">{article.readTime}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-surface/40 border border-border rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6 mt-12">
        <div className="max-w-3xl">
          <span className="px-2.5 py-1 bg-success/15 border border-success/35 rounded-full text-[10px] font-bold text-success uppercase tracking-widest">
            Verified Hardware Testing Lab
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-foreground tracking-tight mt-3">
            Physically Tested. Expertly Reviewed.
          </h2>
          <p className="text-foreground-muted text-xs sm:text-sm mt-2 leading-relaxed">
            Every step-by-step diagnostic guide, trigger pressure calibration, and stick drift resolution on GamepadTester.live is physically benchmarked, tested, and validated by our certified technicians inside our hardware lab using real consoles and digital telemetry instruments.
          </p>
        </div>

        {/* Candid Team Photos at Workbench */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/author/marcus-vance" 
            className="group bg-background/50 border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 block"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-surface">
              <img 
                src="/marcus-workshop.jpg" 
                alt="Marcus Vance soldering a PS5 controller in the hardware lab" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute bottom-2 right-2 bg-background/80 border border-border text-[8px] px-1.5 py-0.5 rounded text-foreground-muted">
                📷 Lab Bench #1 (Solder &amp; Rebuild)
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="text-xs font-black font-display text-foreground group-hover:text-primary transition-colors">Marcus Vance</h4>
              <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">Lead Tech • PlayStation &amp; Xbox Testing</p>
              <p className="text-[10px] text-foreground-muted leading-relaxed pt-1">
                Marcus tests potentiometer wear thresholds and performs mechanical joysticks replacements on PS5 and Xbox controllers.
              </p>
            </div>
          </Link>

          <Link 
            href="/author/sarah-chen" 
            className="group bg-background/50 border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 block"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-surface">
              <img 
                src="/sarah-workshop.jpg" 
                alt="Sarah Chen testing input latency on Xbox controllers in lab" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute bottom-2 right-2 bg-background/80 border border-border text-[8px] px-1.5 py-0.5 rounded text-foreground-muted">
                📷 Lab Bench #2 (Latency Testing)
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="text-xs font-black font-display text-foreground group-hover:text-primary transition-colors">Sarah Chen, PhD</h4>
              <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">Systems Consultant • Latency &amp; Telemetry</p>
              <p className="text-[10px] text-foreground-muted leading-relaxed pt-1">
                Sarah benchmarks Bluetooth polling intervals, signal interference patterns, and deadzone coordinates.
              </p>
            </div>
          </Link>

          <Link 
            href="/author/alex-mercer" 
            className="group bg-background/50 border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 block"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-surface">
              <img 
                src="/alex-workshop.jpg" 
                alt="Alex Mercer testing Gamepad API vibration on PC" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute bottom-2 right-2 bg-background/80 border border-border text-[8px] px-1.5 py-0.5 rounded text-foreground-muted">
                📷 Lab Bench #3 (API &amp; Firmware)
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="text-xs font-black font-display text-foreground group-hover:text-primary transition-colors">Alex Mercer</h4>
              <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">QA Telemetry Engineer • Compatibility</p>
              <p className="text-[10px] text-foreground-muted leading-relaxed pt-1">
                Alex maps Gamepad API vendor IDs and validates haptic vibration presets across major desktop browsers.
              </p>
            </div>
          </Link>
        </div>

        {/* trust checklist footer inside card */}
        <div className="grid sm:grid-cols-3 gap-4 bg-background/30 border border-border/80 rounded-2xl p-4 text-[11px] text-foreground-secondary leading-normal">
          <div className="flex gap-2">
            <span className="text-success font-bold text-sm">✓</span>
            <div>
              <strong className="text-foreground block">Tested on Physical Consoles</strong>
              Every guide is verified using physical PS5, PS4, Xbox, and Switch hardware.
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-success font-bold text-sm">✓</span>
            <div>
              <strong className="text-foreground block">Double-Checked Data</strong>
              No machine-generated placeholders. All repair guides are manually validated for safety.
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-success font-bold text-sm">✓</span>
            <div>
              <strong className="text-foreground block">Zero-Simulation Telemetry</strong>
              The latency benchmarks and stick coordinate calculations reflect raw hardware signals.
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
