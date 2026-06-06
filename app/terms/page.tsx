import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Use | GamepadTester.live',
  description: 'Read the Terms of Use for GamepadTester.live. Our browser-based controller diagnostics tool is provided free of charge.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col font-sans">
      <Navigation />
      <div className="container-custom py-12 flex-1 max-w-4xl">
        <div className="space-y-8">
          <div>
            <span className="px-2.5 py-1 bg-warning/15 border border-warning/35 rounded-full text-[10px] font-bold text-warning uppercase tracking-widest">
              Agreement &amp; Terms
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mt-4">
              Terms of Use
            </h1>
            <p className="text-foreground-muted text-xs sm:text-sm mt-2">
              Last Updated: June 6, 2026
            </p>
          </div>

          <div className="bg-surface/50 border border-border rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6 text-foreground-secondary leading-relaxed text-xs sm:text-sm">
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using GamepadTester.live, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">2. Authorized Use &amp; Commercial Policy</h2>
              <p>
                Our diagnostic telemetry dashboard, testing utilities, and repair guides are provided completely free of charge. You may use our site for personal diagnostics or at a commercial repair workshop (e.g., to benchmark customer repairs), provided you do not charge clients for access to the software interface itself.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">3. DIY Repair &amp; Soldering Disclaimer</h2>
              <p className="text-warning font-semibold">
                WARNING: Hardware repairs, including opening controller shells, prying potentiometers, cleaning with chemical agents, or soldering replacements carry inherent risks.
              </p>
              <p>
                Our guides, steps, and suggestions are based on professional workshop experience but do not guarantee success. GamepadTester.live and its team are not responsible or liable for any damage to your controllers, console components, computers, or personal injury resulting from attempting repair procedures.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">4. Intellectual Property</h2>
              <p>
                The custom code, visual indicators, oscilloscope graphs, custom SVGs, articles, and author write-ups displayed on GamepadTester.live are protected by copyright laws. You may not copy, scraping, redistribute, or replicate these assets without express written consent.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">5. Termination &amp; Adjustments</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any portion of this diagnostic service at any time without prior notice.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
