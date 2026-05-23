'use client'

export default function Troubleshooting() {
  const troubleshootingItems = [
    {
      issue: 'Gamepad not recognized',
      solution: 'First, try reconnecting your gamepad. On Windows, update your controller drivers through Device Manager.',
      platform: 'All',
    },
    {
      issue: 'Buttons not responding',
      solution: 'Check if your gamepad needs calibration. Use our calibration tool in the diagnostics page.',
      platform: 'All',
    },
    {
      issue: 'Analog stick drift',
      solution: 'Calibrate your analog sticks using the built-in calibration tool to adjust dead zones.',
      platform: 'All',
    },
  ]

  return (
    <div className="space-y-6">
      {troubleshootingItems.map((item, index) => (
        <div key={index} className="card">
          <h3 className="text-xl font-semibold mb-2 text-accent">{item.issue}</h3>
          <p className="text-foreground-secondary mb-3">{item.solution}</p>
          <span className="inline-block bg-surface-hover px-3 py-1 rounded text-sm text-foreground-muted">
            {item.platform}
          </span>
        </div>
      ))}
    </div>
  )
}
