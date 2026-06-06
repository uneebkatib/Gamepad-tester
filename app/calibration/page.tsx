import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import GamepadCalibration from '@/components/GamepadCalibration'
import CalibrationContent from '@/components/CalibrationContent'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gamepad Calibration Tool - Fix Stick Drift & Jitter',
  description: 'Free online gamepad calibration tool. Fix stick drift, set deadzones, and test circularity for PS5, Xbox, and Switch controllers.',
  alternates: {
    canonical: 'https://gamepadtester.live/calibration',
  },
}

export default function CalibrationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-custom py-12">
        <GamepadCalibration />
        <CalibrationContent />
      </div>
      <Footer />
    </main>
  )
}
