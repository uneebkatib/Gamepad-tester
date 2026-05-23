import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import CompatibilityChart from '@/components/CompatibilityChart'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Compatibility Chart',
  description:
    'Check gamepad compatibility across browsers and devices. Search our extensive database of supported controllers.',
}

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Compatibility Chart</h1>
        <CompatibilityChart />
      </div>
      <Footer />
    </main>
  )
}
