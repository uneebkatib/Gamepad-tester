import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Troubleshooting from '@/components/Troubleshooting'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Troubleshooting',
  description:
    'Find solutions to common gamepad issues. Driver guides, compatibility information, and FAQs for all platforms.',
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
