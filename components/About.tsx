'use client'

export default function About() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-accent">Our Mission</h2>
        <p className="text-foreground-secondary leading-relaxed">
          GamepadTester.live is dedicated to providing free, professional-grade gamepad testing tools for everyone. Whether you're a casual gamer, developer, or enthusiast, our platform helps you understand and optimize your gaming controllers.
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-accent">Features</h2>
        <ul className="space-y-3 text-foreground-secondary">
          <li>✓ Real-time gamepad detection and monitoring</li>
          <li>✓ Advanced diagnostic tools for performance analysis</li>
          <li>✓ Comprehensive compatibility database</li>
          <li>✓ Driver guides and troubleshooting resources</li>
          <li>✓ Multi-browser and multi-device support</li>
          <li>✓ 100% privacy-first platform</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-accent">Privacy & Security</h2>
        <p className="text-foreground-secondary leading-relaxed">
          We value your privacy. GamepadTester.live operates entirely in your browser with no data collection or tracking. All gamepad testing is done locally on your device.
        </p>
      </div>
    </div>
  )
}
