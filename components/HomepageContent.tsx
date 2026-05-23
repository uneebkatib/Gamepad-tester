'use client'
import React from 'react'

const ConnectionInfographic = () => (
  <div style={{display:'flex',justifyContent:'center',margin:'20px 0'}}>
    <svg width="100%" height="160" viewBox="0 0 400 160" style={{background:'var(--background)',border:'1px solid var(--border)',borderRadius:16,maxWidth:500}}>
      {/* Laptop shape */}
      <rect x="250" y="40" width="110" height="70" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      <rect x="260" y="48" width="90" height="54" rx="2" fill="#0f172a"/>
      <polygon points="230,110 380,110 370,116 240,116" fill="#475569"/>
      {/* Laptop screen mock UI */}
      <rect x="265" y="53" width="30" height="15" rx="1" fill="rgba(34,197,94,0.15)"/>
      <circle cx="330" cy="60" r="4" fill="var(--primary)"/>
      <line x1="265" y1="78" x2="345" y2="78" stroke="#334155" strokeWidth="1"/>
      <line x1="265" y1="88" x2="345" y2="88" stroke="#334155" strokeWidth="1"/>

      {/* Controller shape */}
      <path d="M50,80 C50,55 70,45 100,45 C130,45 150,55 150,80 C150,105 130,115 125,125 C120,135 110,135 100,115 C90,135 80,135 75,125 C70,115 50,105 50,80 Z" fill="#0f172a" stroke="#475569" strokeWidth="2"/>
      <circle cx="80" cy="80" r="10" fill="#1e293b" stroke="#334155"/>
      <circle cx="120" cy="80" r="10" fill="#1e293b" stroke="#334155"/>
      <circle cx="80" cy="80" r="4" fill="#475569"/>
      <circle cx="120" cy="80" r="4" fill="#475569"/>

      {/* Connection paths */}
      {/* USB path */}
      <path d="M100,45 C100,25 200,25 250,55" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="175" y="20" textAnchor="middle" fill="var(--primary)" fontSize="9" fontWeight="bold">USB Cable</text>

      {/* Bluetooth path */}
      <path d="M125,100 C155,115 220,115 250,90" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="20;0" dur="2s" repeatCount="indefinite" />
      </path>
      <text x="187" y="125" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">📶 Bluetooth Connection</text>
    </svg>
  </div>
)

const StickCrossSection = () => (
  <div style={{display:'flex',justifyContent:'center',margin:'20px 0'}}>
    <svg width="100%" height="180" viewBox="0 0 400 180" style={{background:'var(--background)',border:'1px solid var(--border)',borderRadius:16,maxWidth:500}}>
      {/* Stick Shaft */}
      <line x1="200" y1="20" x2="200" y2="100" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round"/>
      <rect x="170" y="10" width="60" height="15" rx="7" fill="#64748b"/>
      
      {/* Pivot dome */}
      <path d="M160,100 C160,75 240,75 240,100 Z" fill="#334155"/>
      <circle cx="200" cy="100" r="14" fill="#475569"/>

      {/* wiper assembly */}
      <line x1="200" y1="100" x2="250" y2="140" stroke="#f59e0b" strokeWidth="3"/>
      {/* metal wiper brush */}
      <circle cx="250" cy="140" r="5" fill="#f59e0b"/>

      {/* Carbon track arc */}
      <path d="M130,150 Q200,165 270,150" fill="none" stroke="#1e293b" strokeWidth="14" strokeLinecap="round"/>
      <path d="M140,150 Q200,163 260,150" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" opacity="0.85"/>

      {/* Wear area (scratched) */}
      <circle cx="225" cy="157" r="8" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M220,157 L230,157" stroke="#ef4444" strokeWidth="2"/>

      {/* Labels */}
      <text x="140" y="35" fill="var(--foreground-secondary)" fontSize="9" fontWeight="bold">🕹️ Stick Shaft</text>
      
      <text x="90" y="90" fill="var(--foreground-muted)" fontSize="9">Pivot Center</text>
      <path d="M135,90 L185,100" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 2"/>

      <text x="310" y="125" fill="#f59e0b" fontSize="9" fontWeight="bold">Metal Wiper</text>
      <path d="M305,125 L255,138" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2"/>

      <text x="90" y="165" fill="var(--primary)" fontSize="9" fontWeight="bold">Carbon Track</text>
      <path d="M135,162 L150,153" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2"/>

      <text x="315" y="165" fill="#ef4444" fontSize="9" fontWeight="bold">Degraded Spot</text>
      <path d="M310,162 L233,157" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2"/>
    </svg>
  </div>
)

const DriftSeverityComparison = () => (
  <div style={{display:'flex',justifyContent:'center',margin:'20px 0'}}>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,maxWidth:500,width:'100%',background:'var(--background)',border:'1px solid var(--border)',borderRadius:16,padding:16}}>
      {/* No Drift */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{background:'var(--surface)',borderRadius:'50%',border:'1px solid var(--border)'}}>
          <circle cx="60" cy="60" r="45" fill="none" stroke="var(--border)" strokeWidth="1"/>
          <line x1="60" y1="10" x2="60" y2="110" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2"/>
          <line x1="10" y1="60" x2="110" y2="60" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2"/>
          {/* Precise green center point */}
          <circle cx="60" cy="60" r="5" fill="rgb(34,197,94)"/>
          <circle cx="60" cy="60" r="1.5" fill="white"/>
        </svg>
        <span style={{fontSize:11,fontWeight:'bold',color:'rgb(34,197,94)'}}>No Drift (0.00000)</span>
      </div>

      {/* Severe Drift */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{background:'var(--surface)',borderRadius:'50%',border:'1px solid var(--border)'}}>
          <circle cx="60" cy="60" r="45" fill="none" stroke="var(--border)" strokeWidth="1"/>
          <line x1="60" y1="10" x2="60" y2="110" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2"/>
          <line x1="10" y1="60" x2="110" y2="60" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2"/>
          
          {/* Scattered offset points representing severe drift */}
          <circle cx="78" cy="42" r="6" fill="rgba(239,68,68,0.25)"/>
          <circle cx="76" cy="44" r="2" fill="rgb(239,68,68)"/>
          <circle cx="80" cy="40" r="2" fill="rgb(239,68,68)"/>
          <circle cx="77" cy="41" r="2" fill="rgb(239,68,68)"/>
          <circle cx="79" cy="43" r="2" fill="rgb(239,68,68)"/>
          
          {/* Drift vector line */}
          <line x1="60" y1="60" x2="78" y2="42" stroke="rgb(239,68,68)" strokeWidth="1.5"/>
        </svg>
        <span style={{fontSize:11,fontWeight:'bold',color:'rgb(239,68,68)'}}>Severe Drift (0.18520)</span>
      </div>
    </div>
  </div>
)

const GamepadTesterUIMockup = () => (
  <div style={{display:'flex',justifyContent:'center',margin:'20px 0'}}>
    <svg width="100%" height="150" viewBox="0 0 400 150" style={{background:'var(--background)',border:'1px solid var(--border)',borderRadius:16,maxWidth:500}}>
      {/* Header bar */}
      <rect x="15" y="15" width="370" height="20" rx="4" fill="var(--surface)"/>
      <circle cx="25" cy="25" r="3" fill="#ef4444"/>
      <circle cx="33" cy="25" r="3" fill="#f59e0b"/>
      <circle cx="41" cy="25" r="3" fill="#22c55e"/>
      <text x="60" y="28" fill="var(--foreground-muted)" fontSize="8">GamepadTester.live – Dashboard</text>

      {/* Dual Card split representation */}
      {/* Left representational card */}
      <rect x="15" y="45" width="175" height="90" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
      <text x="25" y="60" fill="var(--primary)" fontSize="8" fontWeight="bold">PLAYER #1 (Xbox Controller)</text>
      {/* Button grids */}
      <rect x="25" y="70" width="15" height="15" rx="3" fill="var(--primary)"/>
      <rect x="45" y="70" width="15" height="15" rx="3" fill="var(--background)" stroke="var(--border)"/>
      <rect x="65" y="70" width="15" height="15" rx="3" fill="var(--background)" stroke="var(--border)"/>
      <rect x="85" y="70" width="15" height="15" rx="3" fill="var(--background)" stroke="var(--border)"/>
      <rect x="25" y="90" width="15" height="15" rx="3" fill="var(--background)" stroke="var(--border)"/>
      <rect x="45" y="90" width="15" height="15" rx="3" fill="var(--background)" stroke="var(--border)"/>
      <rect x="65" y="90" width="15" height="15" rx="3" fill="var(--background)" stroke="var(--border)"/>
      <rect x="85" y="90" width="15" height="15" rx="3" fill="var(--background)" stroke="var(--border)"/>

      {/* Telemetry charts on right */}
      <rect x="210" y="45" width="175" height="90" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
      <circle cx="260" cy="90" r="28" fill="none" stroke="var(--border)" strokeWidth="1"/>
      {/* Path trace */}
      <circle cx="260" cy="90" r="18" fill="rgba(34,197,94,0.1)"/>
      <text x="260" y="93" textAnchor="middle" fill="rgb(34,197,94)" fontSize="7" fontWeight="bold">Avg Error 0%</text>

      {/* Axis values */}
      <text x="315" y="75" fill="var(--foreground-muted)" fontSize="7">AXIS 0</text>
      <text x="315" y="85" fill="rgb(34,197,94)" fontSize="8" fontWeight="bold">+0.00000</text>
      
      <text x="350" y="75" fill="var(--foreground-muted)" fontSize="7">AXIS 1</text>
      <text x="350" y="85" fill="rgb(34,197,94)" fontSize="8" fontWeight="bold">+0.00000</text>
    </svg>
  </div>
)

export default function HomepageContent() {
  return (
    <article className="mt-12 space-y-12 text-foreground max-w-4xl mx-auto border border-border bg-surface/50 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md">
      {/* Article Header - ONLY H2 ON THE PAGE */}
      <header className="border-b border-border pb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Real Gamepad Tester: Test Buttons, Sticks and Drift Fast
        </h2>
        <p className="text-foreground-muted text-sm sm:text-base mt-2">
          Use this free online gamepad tester to check every input on your PS5, PS4, Xbox, Switch Pro, or PC joystick and controller. Test buttons, analog sticks, triggers, stick drift, and vibration in seconds. No download needed and no data leaves your device.
        </p>
      </header>

      {/* 1. What Is a Gamepad Tester */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>🔍</span> What Is a Gamepad Tester and How Does It Work
        </h3>
        <div className="text-foreground-secondary text-sm sm:text-base leading-relaxed space-y-3">
          <p>
            A gamepad tester is a browser-based tool that uses the official{' '}
            <a 
              href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-semibold"
            >
              Gamepad API
            </a>{' '}
            built into modern browsers like Chrome, Edge, and Firefox to read every input from your controller in real time. There is no download, no registration, and no data collection. All processing happens locally on your device, so nothing is sent to any server. The tool runs on Windows, macOS, and Linux without any extra software.
          </p>
          <p>
            Once your controller is connected, the tester starts pulling input events in milliseconds, giving you frame-accurate readouts of every button press, stick position, joystick axis value, and trigger level. This is the same API that game engines use to read controller input, which means the data you see is accurate and reliable. Competitive gamers, speedrunners, repair shops, and developers all use a free gamepad tester to keep their equipment performing correctly.
          </p>
          <p className="font-semibold text-primary">
            Test your joystick and controller online now using the tool above.
          </p>
        </div>
      </section>

      {/* 2. How to Connect */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>🔌</span> How to Connect Your Controller to a Gamepad Tester
        </h3>
        <div className="text-foreground-secondary text-sm sm:text-base leading-relaxed mb-4">
          <p>
            Connecting your PS5, Xbox, Switch Pro, or PC joystick to the gamepad tester is straightforward and takes under a minute. The two supported methods are wired USB and wireless Bluetooth, and both work without installing any drivers or software.
          </p>
        </div>
        
        {/* Infographic SVG */}
        <ConnectionInfographic />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-background/80 border border-border p-5 rounded-2xl space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="text-primary">⚡</span> Wired USB Connection
            </h4>
            <p className="text-foreground-secondary text-xs sm:text-sm leading-relaxed">
              Connecting via a USB cable is the fastest and most reliable method. Plug your controller into any USB port on your computer, wait a moment for your operating system to recognize the device, then open the gamepad tester in your browser. The Gamepad API requires a physical button press to activate detection. This is a browser security rule, not a bug. Press any button once and your controller slot, index number, and device name will appear on screen immediately. Wired connections also give you more stable polling and lower input lag compared to Bluetooth, which is useful when testing trigger sensitivity or joystick drift precisely.
            </p>
          </div>
          <div className="bg-background/80 border border-border p-5 rounded-2xl space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="text-primary">📶</span> Wireless Bluetooth Connection
            </h4>
            <p className="text-foreground-secondary text-xs sm:text-sm leading-relaxed">
              For wireless connections, pair your controller through your device&apos;s system Bluetooth settings before opening the tester. Put the controller into pairing mode using its dedicated pairing button, complete the OS-level pairing process, then open the page and press any button to wake the detection. If the controller is not detected, try pressing F5 to reload the page, switch to a different USB port if using a dongle, or check that your battery is not low. A weak battery charge can cause unstable Bluetooth connections and intermittent detection failures on all controller types including PS5 DualSense and Xbox Series controllers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. What Does It Actually Check */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>📊</span> What Does a Gamepad Tester Actually Check
        </h3>
        <p className="text-foreground-secondary text-sm sm:text-base mb-2">
          A full gamepad tester covers every input type on your controller. Below is a breakdown of what each test covers and what to look for on PS5, PS4, Xbox, Switch Pro, and generic PC gamepads.
        </p>
        
        {/* UI Mockup SVG */}
        <GamepadTesterUIMockup />

        <div className="space-y-4 mt-4">
          {/* Button Testing */}
          <div className="border-l-2 border-primary pl-4 space-y-1">
            <h4 className="font-bold text-foreground text-base">Button Testing: Check Every Input in Real Time</h4>
            <p className="text-foreground-secondary text-sm leading-relaxed">
              The tester covers every digital button on your gamepad. This includes face buttons such as A, B, X, Y on Xbox or Cross, Circle, Square, Triangle on PlayStation, the D-pad in all four directions, shoulder bumpers, analog stick click buttons L3 and R3, and system buttons like Start, Select, Options, and Share. Each button highlights the moment it is pressed, so stuck or unresponsive buttons are immediately visible. You can also test simultaneous button presses to confirm that multiple inputs register at the same time without ghosting or cancellation, which matters for fighting games and fast-paced competitive titles.
            </p>
          </div>

          {/* Analog Stick Testing */}
          <div className="border-l-2 border-primary pl-4 space-y-1">
            <h4 className="font-bold text-foreground text-base">Analog Stick Testing: Detect Deadzone and Joystick Drift</h4>
            <p className="text-foreground-secondary text-sm leading-relaxed">
              The analog sticks and joystick axes are displayed with their exact real-time position on screen, including a visual trail of recent movement that builds as you move the stick in circles. The tester plots a heatmap of your stick travel, revealing drift amplitude and deadzone thresholds in a single view. For an accurate joystick drift reading, leave both sticks completely untouched and watch the axis values. Any movement detected while the stick is at rest is flagged with a severity grade. You can run a full{' '}
              <a href="https://gamepadtester.live" className="text-primary hover:underline font-semibold">
                stick drift test
              </a>{' '}
              and joystick drift test directly in your browser and receive a graded result from None through Mild, Moderate, and up to Severe without any additional software.
            </p>
          </div>

          {/* Trigger Testing */}
          <div className="border-l-2 border-primary pl-4 space-y-1">
            <h4 className="font-bold text-foreground text-base">Trigger Testing: Sensitivity and Input Range</h4>
            <p className="text-foreground-secondary text-sm leading-relaxed">
              Analog triggers such as L2 and R2 on PlayStation or LT and RT on Xbox are tested across their full pressure range from 0 percent to 100 percent. A real-time fill bar shows the response curve as you slowly press down, letting you spot dead spots, inconsistent travel zones, or a trigger that jumps from 0 to full without smooth linear movement. Trigger sensitivity problems are easy to catch here before they cause missed inputs in competitive play or racing games where precise pressure control matters.
            </p>
          </div>

          {/* Vibration / Rumble Testing */}
          <div className="border-l-2 border-primary pl-4 space-y-1">
            <h4 className="font-bold text-foreground text-base">Vibration and Rumble Testing</h4>
            <p className="text-foreground-secondary text-sm leading-relaxed">
              The vibration test lets you fire a single burst or run continuous rumble and judge motor strength by feel. Both left and right rumble motors are tested independently so you can confirm whether both are working or if one has failed silently. This is especially useful for PS5 DualSense haptic feedback testing and Xbox Series rumble motor checks, where a dead motor would noticeably reduce immersion in supported games.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What Is Stick Drift */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>🌀</span> What Is Stick Drift and Why It Happens
        </h3>
        
        {/* Analog Stick Cross Section SVG */}
        <StickCrossSection />

        <div className="text-foreground-secondary text-sm sm:text-base leading-relaxed space-y-3 mt-4">
          <p>
            Stick drift is when your analog stick or joystick registers movement even when you are not touching it, causing your character to walk on their own or the camera to slowly rotate. The root cause in almost every case is the small potentiometer inside each stick module, a sensor technology that has been in use since the 1970s. These potentiometers use a tiny metal wiper that rubs against a carbon track to measure stick position. Every time you move the stick, the wiper scratches the carbon film slightly.
          </p>
          <p>
            Over millions of input cycles, the carbon layer wears unevenly. Some areas get thin, some expose the ceramic substrate underneath, and the resistance readings the console receives become noisy and inconsistent. The console analog-to-digital converter reads this noise as actual stick movement, and that is drift. Dust, debris, and hand residue compound the problem by getting under the rubber housing and interfering with the sensor directly. Research from gaming repair communities suggests around 70 percent of players encounter this issue at some point in a controller&apos;s lifespan.
          </p>
          <p>
            Firmware bugs can also mimic hardware drift by causing ghost movement that has no physical cause. A factory dead zone shift is another source, especially on older controllers including Xbox 360, PS3, PS4, and early PS5 units that do not self-center perfectly at startup. Even a brand-new controller with clean internals can show a small center point offset. The{' '}
            <a 
              href="https://www.nacongaming.com/en/blog/ps5-controller-joystick-drift" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-semibold"
            >
              hall effect sensor
            </a>{' '}
            found in newer premium controllers avoids all of this by using magnets with no physical contact, which means no carbon dust, no wiper wear, and no drift from mechanical degradation over time.
          </p>
          <p className="font-semibold text-primary">
            Run a free joystick drift test above to check your controller right now.
          </p>
        </div>
      </section>

      {/* 5. How to Read Stick Drift Results */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>📈</span> How to Read Stick Drift Results on a Gamepad Tester
        </h3>
        
        {/* Drift Severity Comparison SVG */}
        <DriftSeverityComparison />

        <div className="text-foreground-secondary text-sm sm:text-base leading-relaxed space-y-3 mt-4">
          <p>
            The key thing to look for is movement detected at rest. Leave both analog sticks and joystick axes completely untouched for 10 to 15 seconds while the tester is running and watch the axis readings carefully.
          </p>
          <p>
            If the values sit stable at zero, your sticks are healthy. If you see any raw variance in the numbers or the heatmap shows an offset from the center point, you have at least some level of drift present. You can{' '}
            <a href="https://gamepadtester.live" className="text-primary hover:underline font-semibold">
              check your joystick drift
            </a>{' '}
            and stick drift quickly this way without any special equipment or additional software.
          </p>
          <p>
            The drift severity grade runs from None through to Severe. A reading in the Mild range might not affect most casual games, but in competitive titles even a 3 to 4 percent offset can cause camera creep or aim pull that affects accuracy. A Severe result means the stick is sending continuous false input that will impact gameplay in practically every game you play. The deadzone threshold shown in the results tells you how far your in-game deadzone settings would need to go to mask the drift, which is useful context when deciding whether to repair the controller or adjust settings as a temporary workaround.
          </p>
          <p className="font-semibold text-primary">
            Use the free online controller drift test above to check your PS5, Xbox, or PC joystick in seconds.
          </p>
        </div>
      </section>

      {/* 6. Hardware or Software? */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>💻</span> Is Your Drift Hardware or Software?
        </h3>
        <div className="text-foreground-secondary text-sm sm:text-base leading-relaxed space-y-3">
          <p>
            This question trips up many players. A software cause means the controller firmware has a calibration bug, the center point has shifted in the operating system, or a driver update introduced a false input signal. These are fixable without touching the hardware at all. A firmware update through the Xbox Accessories app or DS4Windows, or a simple soft reset of the controller, can resolve software-caused drift. If the drift disappears after recalibration or a reset, it was a software issue.
          </p>
          <p>
            If the drift returns within a few gaming sessions, or if your axis reading shows consistent offset even on a freshly rebooted system, the issue is hardware. At that point you are dealing with a worn potentiometer or a contaminated stick module that no amount of firmware adjustment will permanently fix.
          </p>
          <p>
            One well-documented pattern reported across repair communities: drift that gets noticeably worse at higher framerates is almost always a hardware issue. The analog-to-digital converter on the controller board reads electrical noise from the degraded carbon track faster when the polling rate is higher, making the drift more visible at 120fps than at 60fps. Increasing the deadzone slider in-game can mask mild drift temporarily, but too high a deadzone value introduces aim delay, which is a workaround and not a real solution.
          </p>
        </div>
      </section>

      {/* 7. Can You Fix Stick Drift */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>🛠️</span> Can You Fix Stick Drift After Testing?
        </h3>
        <div className="text-foreground-secondary text-sm sm:text-base leading-relaxed space-y-3">
          <p>
            Once your gamepad tester confirms drift, you have several options depending on the severity of the reading.
          </p>
          <p>
            For mild drift that started recently, compressed air blown under the rubber housing removes debris interfering with the potentiometer. This resolves the issue in roughly 30 to 40 percent of cases where contamination rather than physical wear is the cause. An isopropyl alcohol flush can go further. If the carbon layer is still intact but has surface corrosion or residue, cleaning can restore clean electrical contact temporarily.
          </p>
          <p>
            If cleaning does not hold and the drift returns within days, the analog stick module needs to be replaced. This is the only permanent fix when the carbon track has worn through to the ceramic substrate. Controllers including Xbox Series and Nintendo Switch Joy-Cons have official software calibration tools that let you correct center point offset yourself without opening the device. For PS5 DualSense controllers, there is a reset button on the back of the controller. Insert a paperclip, hold for five seconds, and this sometimes clears firmware-caused drift without any disassembly.
          </p>
          <p>
            If none of these steps resolve the issue, a{' '}
            <a 
              href="https://www.turtlebeach.com/blog/fix-controller-stick-drift-guide" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-semibold"
            >
              professional controller repair shop
            </a>{' '}
            can remove the faulty stick module, install a quality replacement, and run full calibration testing after the repair is complete.
          </p>
        </div>
      </section>

      {/* 8. Who Needs It */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
          <span>🎮</span> Who Needs a Gamepad Tester?
        </h3>
        <div className="text-foreground-secondary text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            <strong>Gamers</strong> who want accurate input use this free online controller tester to confirm their gamepad is responding correctly before a ranked match, tournament, or any session where precision matters.
          </p>
          <p>
            <strong>Developers</strong> debugging controller integration need raw joystick axis data, button indices, and exact input timing that no game interface provides. The browser-based gamepad tester gives direct access to Gamepad API output.
          </p>
          <p>
            <strong>Repair shops</strong> use it as a fast diagnostic starting point. Plug in the controller, run through every input including joystick drift and trigger range, and know exactly what is broken before opening the device.
          </p>
          <p>
            <strong>Used controller buyers</strong> should always run a two-minute controller drift test before handing over money. A quick check catches stuck buttons, trigger dead spots, and joystick drift that sellers will not mention.
          </p>
          <p>
            The tool supports over 30 controller types including PS3, PS4, PS5 DualSense, Xbox One, Xbox Series X and S, Nintendo Switch Pro Controller, Joy-Cons, and most generic USB and Bluetooth PC gamepads. Both wired and wireless connections are supported with no signup or download required.
          </p>
          <p className="font-semibold text-primary">
            Test your gamepad, joystick, and controller online free above.
          </p>
        </div>
      </section>
    </article>
  )
}
