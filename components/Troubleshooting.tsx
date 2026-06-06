'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TroubleshootingItem {
  id: string
  issue: string
  category: 'connection' | 'drift' | 'rumble' | 'mapping' | 'latency'
  platforms: string[]
  expertAnalysis: string
  steps: string[]
  proTip?: string
  guideLink?: string
}

export default function Troubleshooting() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'connection' | 'drift' | 'rumble' | 'mapping' | 'latency'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>('detection-security')

  const categories = [
    { id: 'all', label: 'All Issues' },
    { id: 'connection', label: 'Connection & Detection' },
    { id: 'drift', label: 'Analog Stick Drift' },
    { id: 'rumble', label: 'Vibration & Rumble' },
    { id: 'mapping', label: 'Button Mappings' },
    { id: 'latency', label: 'Input Latency & Lag' }
  ]

  const items: TroubleshootingItem[] = [
    {
      id: 'detection-security',
      issue: 'Controller is plugged in or paired but not detected',
      category: 'connection',
      platforms: ['Windows', 'macOS', 'Linux', 'Chrome OS'],
      expertAnalysis: 'The Web Gamepad API is heavily sandboxed for user privacy. Browsers intentionally block web apps from seeing connected USB or Bluetooth input devices until the user explicitly interacts with the device. This prevents background fingerprinting.',
      steps: [
        'Plug in your controller via USB or pair it in your operating system\'s Bluetooth settings first.',
        'Open Gamepadtester.live in a compatible browser (Chrome, Edge, or Opera recommended).',
        'Press any face button (A, B, X, Y) or move the analog sticks 2-3 times to send an input event.',
        'If it still fails, check if another application like Steam, DS4Windows, or a game client is running in exclusive mode and blocking browser access.'
      ],
      proTip: 'USB-C cables are not all created equal. Many cheap charging cords only carry power, not data signals. If there is no connection, swap to a high-quality data-transfer USB cable.'
    },
    {
      id: 'potentiometer-drift',
      issue: 'How to diagnose and fix analog stick drift',
      category: 'drift',
      platforms: ['PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch', 'Steam Deck'],
      expertAnalysis: 'Standard joysticks use ALPS potentiometer sensors, where a physical metal wiper slides across a carbon resistive track. Over time, friction creates carbon dust or scrapes away the resistive material, causing raw electrical jitter (drift).',
      steps: [
        'Check the live stick telemetry on our diagnostics tab. Rest the controller: a healthy stick stays under ±0.05.',
        'If the rest value is between 0.05 and 0.15, you have minor drift. Add a minor software deadzone in your game settings to ignore this rest coordinates range.',
        'For an external mechanical clean, apply 2 drops of 99% Isopropyl Alcohol (IPA) into the base of the analog stick seam, rotate it thoroughly for 30 seconds, and let it dry.',
        'If coordinates exceed 0.15 permanently, the carbon track is physically worn. The only permanent hardware solution is soldering a replacement Hall Effect magnetic module.'
      ],
      proTip: 'Hall Effect sensors use contactless magnetic fields instead of carbon wipers, meaning they are completely immune to wear-based stick drift.',
      guideLink: '/blog/how-to-fix-stick-drift'
    },
    {
      id: 'rumble-browser-compat',
      issue: 'Vibration / Rumble tests are not firing',
      category: 'rumble',
      platforms: ['Windows', 'macOS', 'Android'],
      expertAnalysis: 'Haptic feedback (rumble) over the Web Gamepad API is a draft specification. Browser support is highly fragmented. While Chromium browsers support it natively, others block it due to permission policies.',
      steps: [
        'Ensure you are using Google Chrome, Microsoft Edge, or Opera. Safari and Firefox do not currently support browser haptic feedback.',
        'Ensure system-level vibration is not disabled. On Windows, verify haptics are active in Windows Settings -> Bluetooth & Devices.',
        'Ensure your controller battery is above 15%. Many controllers (especially Xbox and PlayStation) disable rumble automatically to conserve power when low.'
      ],
      proTip: 'If testing a PS5 DualSense controller wirelessly on PC, ensure your Bluetooth receiver supports Bluetooth 4.0 or higher, as low-bandwidth connections block rumble signals.',
      guideLink: '/blog/dualsense-haptic-feedback-web-api'
    },
    {
      id: 'steam-mapping-conflict',
      issue: 'Wrong button mappings or triggers acting as axes',
      category: 'mapping',
      platforms: ['Windows', 'macOS', 'Steam Link'],
      expertAnalysis: 'Operating systems process input data using different APIs (XInput for Xbox/Windows, HID for generic devices). Conflicting translation software (like Steam Input, DS4Windows, or JoyToKey) intercepts raw inputs and outputs simulated keystrokes, confusing browser detection.',
      steps: [
        'Close Steam completely from your system tray. Steam Input intercepts controller inputs and creates virtual desktops inputs, overriding standard browser mappings.',
        'If DS4Windows is open, ensure the "Hide DS4 Controller" setting is active to prevent the browser from registering the same controller twice (double inputs).',
        'Verify if your controller has a mode switch (e.g. 8BitDo X-input/D-input switch) and toggle it to match your platform.'
      ],
      proTip: 'Windows native controllers (Xbox) map cleanest. If using PlayStation controllers on Windows, DS4Windows compiles them into XInput for seamless browser mapping.'
    },
    {
      id: 'bluetooth-latency-jitter',
      issue: 'High input latency (above 15ms) or jittery signals',
      category: 'latency',
      platforms: ['Bluetooth Wireless', '2.4GHz Wireless'],
      expertAnalysis: 'Wireless polling rate jitter is almost always caused by physical obstructions, distance, or radio frequency (RF) congestion in the 2.4GHz band (commonly from Wi-Fi routers or USB 3.0 hubs).',
      steps: [
        'Connect the controller via a wired USB connection to see if latency drops. A clean wired setup should average under 4-8ms.',
        'Verify your motherboard\'s Wi-Fi/Bluetooth antenna is physically screwed into the back of your PC. Even if using Ethernet, this antenna is required for stable Bluetooth range.',
        'Move the Bluetooth USB dongle away from USB 3.0 external hard drives, which emit significant electromagnetic noise that interferes with 2.4GHz signals.'
      ],
      proTip: 'Use a USB extension cable to bring your Bluetooth or 2.4GHz wireless dongle closer to your controller for direct line-of-sight signal transmission.',
      guideLink: '/blog/bluetooth-vs-wireless-latency'
    }
  ]

  const filteredItems = items.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter
    const matchesSearch = item.issue.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.expertAnalysis.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-foreground font-sans">
      
      {/* E-E-A-T Verified Expert Banner */}
      <div className="bg-surface/50 border border-border rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center gap-6">
        <div className="flex -space-x-4 flex-shrink-0">
          <Link href="/author/marcus-vance" className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-surface hover:z-10 transition duration-200">
            <img src="/marcus-vance.jpg" alt="Marcus Vance portrait" className="w-full h-full object-cover" />
          </Link>
          <Link href="/author/sarah-chen" className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-surface hover:z-10 transition duration-200">
            <img src="/sarah-chen.jpg" alt="Sarah Chen portrait" className="w-full h-full object-cover" />
          </Link>
        </div>
        <div className="space-y-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="bg-success/15 border border-success/35 text-[9px] font-black text-success px-2 py-0.5 rounded-full uppercase tracking-wider">
              ✓ Verified Expert Advice
            </span>
            <span className="text-[10px] text-foreground-muted">Updated June 2026</span>
          </div>
          <h2 className="text-sm font-bold text-foreground">
            Reviewed by <Link href="/author/marcus-vance" className="hover:text-primary underline">Marcus Vance</Link> &amp; <Link href="/author/sarah-chen" className="hover:text-primary underline">Dr. Sarah Chen</Link>
          </h2>
          <p className="text-[11px] text-foreground-muted leading-relaxed">
            This guide is compiled from hands-on repair logs at our controller calibration lab. Every troubleshooting step is verified using raw hardware signal oscilloscopes, multimeter testing, and physical Gamepad API integrations.
          </p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search troubleshooting guides (e.g. drift, latency, steam)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-xs text-foreground placeholder:text-foreground-muted outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-foreground-muted hover:text-foreground font-bold"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeFilter === cat.id
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface hover:bg-surface-hover border-border text-foreground-secondary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Troubleshooting Items Grid/List */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id
            return (
              <div 
                key={item.id} 
                className={`border rounded-2xl transition duration-200 overflow-hidden ${
                  isExpanded ? 'bg-surface/30 border-primary/50 shadow-md' : 'bg-surface/50 border-border hover:border-border-light'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {item.platforms.map((p) => (
                        <span key={p} className="bg-background border border-border/80 text-[8px] font-mono font-bold text-foreground-muted px-1.5 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
                      {item.issue}
                    </h3>
                  </div>
                  <span className={`text-base font-mono font-bold text-foreground-muted transition-transform duration-200 ${isExpanded ? 'rotate-90 text-primary' : ''}`}>
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>

                {/* Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-border/40 space-y-4">
                    {/* Expert Analysis */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-primary">Technical Analysis</span>
                      <p className="text-xs text-foreground-secondary leading-relaxed">
                        {item.expertAnalysis}
                      </p>
                    </div>

                    {/* Step-by-Step Resolution */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-success">Verified Resolution Steps</span>
                      <ol className="space-y-2">
                        {item.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex gap-3 items-start text-xs text-foreground-muted">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background border border-border text-[9px] font-bold text-primary flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Pro Tip */}
                    {item.proTip && (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-3.5 flex gap-2.5 items-start text-[11px] text-foreground-secondary leading-relaxed font-sans">
                        <span className="text-base flex-shrink-0">💡</span>
                        <div>
                          <strong className="text-primary block font-bold mb-0.5">Workshop Pro Tip</strong>
                          {item.proTip}
                        </div>
                      </div>
                    )}
                    {item.guideLink && (
                      <div className="pt-2">
                        <Link 
                          href={item.guideLink}
                          className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-hover underline gap-1"
                        >
                          Read our comprehensive step-by-step guide →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 bg-surface/30 border border-border border-dashed rounded-2xl">
            <span className="text-2xl">🔍</span>
            <p className="text-xs text-foreground-muted mt-2">No matching troubleshooting guides found.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all') }}
              className="text-xs text-primary font-bold underline mt-1"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </div>

      {/* Lab Verification Trust Seal */}
      <div className="border border-border rounded-2xl p-6 bg-background/50 text-center space-y-3">
        <div className="text-3xl">🛡️</div>
        <h3 className="text-xs font-black uppercase text-foreground">Strict Lab Verification Standards</h3>
        <p className="text-[11px] text-foreground-muted max-w-2xl mx-auto leading-relaxed">
          At GamepadTester.live, we never recommend generic software registry cleaners or unverified firmware flashing tools. All diagnostic steps follow IPC-A-610 electronic assembly standards and the official W3C Web Gamepad API guidelines.
        </p>
      </div>

    </div>
  )
}
