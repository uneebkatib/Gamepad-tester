import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import GamepadTester from '@/components/GamepadTester'
import HomepageContent from '@/components/HomepageContent'
import Footer from '@/components/Footer'

import GamepadIcon from '@/components/GamepadIcon'

export const metadata: Metadata = {
  title: 'Gamepad Tester - PS5, Xbox, Joystick & Controller',
  description: 'Free gamepad tester for PS5, Xbox Series, Switch Pro, and PC joysticks. Detect stick drift, test buttons and triggers in your browser.',
  alternates: {
    canonical: 'https://gamepadtester.live',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="container-custom py-4 flex-1">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2 flex-wrap">
              <span>Gamepad Tester: <span className="text-primary">Free Online Controller &amp; Joystick Test</span></span>
            </h1>
            <p className="text-foreground-muted text-xs mt-1 max-w-2xl leading-normal">
              Test up to 4 controllers at once. Check buttons, analog sticks, joystick axes, triggers, and vibration in real time. Works with PS5, PS4, Xbox, Switch, and PC gamepads. No download, no signup, instant results.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 self-start md:self-center mt-2 md:mt-0">
            {[
              'Real-time input detection',
              'Stick drift & joystick drift detection',
              'Vibration & rumble testing',
              'Path tracing & deadzone mapping'
            ].map(f=>(
              <span key={f} className="bg-surface border border-border px-2.5 py-0.5 rounded-full text-[10px] text-foreground-muted">✓ {f}</span>
            ))}
          </div>
        </div>
        <GamepadTester />
        <HomepageContent />
      </div>
      <Footer />
    </main>
  )
}
