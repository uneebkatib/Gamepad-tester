import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Diagnostics from '@/components/Diagnostics'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Diagnostics',
  description:
    'Advanced gamepad diagnostics including hardware info, connection quality, dead zone detection, and performance metrics.',
}

export default function DiagnosticsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Gamepad Diagnostics</h1>
        <Diagnostics />
      </div>
      <Footer />
    </main>
  )
}
