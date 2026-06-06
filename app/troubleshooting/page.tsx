import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Troubleshooting from '@/components/Troubleshooting'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Controller Troubleshooting & Drift Fixes',
  description:
    'Expert-reviewed guides to fix controller stick drift, Bluetooth latency, incorrect button mappings, and device connection errors on PC, Mac, and consoles.',
  alternates: {
    canonical: 'https://gamepadtester.live/troubleshooting',
  },
}

export default function TroubleshootingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Troubleshooting</h1>
        <Troubleshooting />
      </div>
      <Footer />
    </main>
  )
}
