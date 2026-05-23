'use client'

import Link from 'next/link'
import GamepadIcon from '@/components/GamepadIcon'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4 flex items-center gap-2">
              <GamepadIcon size={24} /> GamepadTester
            </h3>
            <p className="text-foreground-muted text-sm">
              Professional gamepad testing platform with advanced diagnostics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>
                <Link href="/" className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/diagnostics" className="hover:text-accent transition">
                  Diagnostics
                </Link>
              </li>
              <li>
                <Link href="/compatibility" className="hover:text-accent transition">
                  Compatibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>
                <Link href="/troubleshooting" className="hover:text-accent transition">
                  Troubleshooting
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-foreground-muted">
          <p>&copy; {currentYear} GamepadTester.live. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
