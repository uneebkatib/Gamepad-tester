import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | GamepadTester.live',
  description: 'Learn about our privacy policy. GamepadTester.live does not collect, store, or share any controller telemetry or personal data.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col font-sans">
      <Navigation />
      <div className="container-custom py-12 flex-1 max-w-4xl">
        <div className="space-y-8">
          <div>
            <span className="px-2.5 py-1 bg-success/15 border border-success/35 rounded-full text-[10px] font-bold text-success uppercase tracking-widest">
              Security &amp; Privacy
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mt-4">
              Privacy Policy
            </h1>
            <p className="text-foreground-muted text-xs sm:text-sm mt-2">
              Last Updated: June 6, 2026
            </p>
          </div>

          <div className="bg-surface/50 border border-border rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6 text-foreground-secondary leading-relaxed text-xs sm:text-sm">
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">1. Zero Server Telemetry</h2>
              <p>
                GamepadTester.live operates entirely on the client side. When you connect a PS5, PS4, Xbox, or Nintendo Switch controller, all inputs, button clicks, trigger values, and axis coordinates are processed inside your browser using the local Web Gamepad API. 
              </p>
              <p className="font-semibold text-primary">
                Absolutely no telemetry data is transmitted to, stored on, or processed by our servers.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">2. No Account Registration</h2>
              <p>
                You are never required to sign up, log in, or provide any personal details to use our testing dashboard. There are no profiles, credentials, or databases storing user information.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">3. Local Storage Preferences</h2>
              <p>
                Our application uses your browser's local storage solely to store interface configurations, such as your dark/light theme preference. This data never leaves your device and can be cleared at any time by emptying your browser cache.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">4. External Links</h2>
              <p>
                Our blog sections and expert profiles contain links to outer channels, such as email addresses (`@gamepadtester.live`) and third-party developer documentation. We do not control and are not responsible for the privacy practices of external sites.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">5. Contacting Us</h2>
              <p>
                If you have any questions regarding this policy or the technical execution of the Web Gamepad API on our site, feel free to contact our technical team at:
              </p>
              <div className="bg-background/40 border border-border rounded-xl p-4 font-mono text-[11px] text-foreground-secondary">
                Email: support@gamepadtester.live
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
