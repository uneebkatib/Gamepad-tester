import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about GamepadTester.live, our mission to provide free, professional gamepad testing tools for everyone.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text">About GamepadTester.live</h1>
        <About />
      </div>
      <Footer />
    </main>
  )
}
