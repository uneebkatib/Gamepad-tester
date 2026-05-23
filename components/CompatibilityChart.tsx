'use client'

export default function CompatibilityChart() {
  const controllers = [
    { name: 'Xbox Series X/S', usb: '✅', bt: '✅', chrome: '✅', firefox: '✅', edge: '✅', safari: '⚠️', os: 'Win/Mac/Linux' },
    { name: 'Xbox One', usb: '✅', bt: '✅', chrome: '✅', firefox: '✅', edge: '✅', safari: '⚠️', os: 'Win/Mac/Linux' },
    { name: 'Xbox 360', usb: '✅', bt: '—', chrome: '✅', firefox: '✅', edge: '✅', safari: '⚠️', os: 'Win/Linux' },
    { name: 'PS5 DualSense', usb: '✅', bt: '✅', chrome: '✅', firefox: '⚠️', edge: '✅', safari: '❌', os: 'Win/Mac/Linux' },
    { name: 'PS4 DualShock 4', usb: '✅', bt: '✅', chrome: '✅', firefox: '✅', edge: '✅', safari: '⚠️', os: 'Win/Mac/Linux' },
    { name: 'Switch Pro', usb: '✅', bt: '✅', chrome: '✅', firefox: '⚠️', edge: '✅', safari: '❌', os: 'Win/Mac/Linux' },
    { name: 'Switch Joy-Con', usb: '—', bt: '⚠️', chrome: '⚠️', firefox: '❌', edge: '⚠️', safari: '❌', os: 'Win/Mac' },
    { name: 'Generic / 3rd Party', usb: '✅', bt: '⚠️', chrome: '✅', firefox: '✅', edge: '✅', safari: '❌', os: 'Win/Mac/Linux' },
  ]

  const legend = [
    { sym: '✅', label: 'Fully Supported' },
    { sym: '⚠️', label: 'Partial / Limited' },
    { sym: '❌', label: 'Not Supported' },
    { sym: '—', label: 'Not Applicable' },
  ]

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {legend.map(l => (
          <span key={l.sym} className="flex items-center gap-1.5 text-sm text-foreground-secondary bg-surface px-3 py-1.5 rounded-lg border border-border">
            <span>{l.sym}</span> {l.label}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Controller</th>
              <th className="text-center py-3 px-3 font-semibold text-foreground">USB</th>
              <th className="text-center py-3 px-3 font-semibold text-foreground">BT</th>
              <th className="text-center py-3 px-3 font-semibold text-foreground">Chrome</th>
              <th className="text-center py-3 px-3 font-semibold text-foreground">Firefox</th>
              <th className="text-center py-3 px-3 font-semibold text-foreground">Edge</th>
              <th className="text-center py-3 px-3 font-semibold text-foreground">Safari</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">OS</th>
            </tr>
          </thead>
          <tbody>
            {controllers.map((c, i) => (
              <tr key={i} className={`border-b border-border transition-colors hover:bg-surface/60 ${i % 2 === 0 ? '' : 'bg-surface/30'}`}>
                <td className="py-3 px-4 font-medium text-foreground">{c.name}</td>
                <td className="py-3 px-3 text-center">{c.usb}</td>
                <td className="py-3 px-3 text-center">{c.bt}</td>
                <td className="py-3 px-3 text-center">{c.chrome}</td>
                <td className="py-3 px-3 text-center">{c.firefox}</td>
                <td className="py-3 px-3 text-center">{c.edge}</td>
                <td className="py-3 px-3 text-center">{c.safari}</td>
                <td className="py-3 px-4 text-foreground-muted text-xs">{c.os}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-foreground-muted">
        * Safari on iOS/macOS has limited Gamepad API support. Chrome and Edge provide the best experience for all controller types. Vibration (rumble) requires Chrome/Edge.
      </p>
    </div>
  )
}
