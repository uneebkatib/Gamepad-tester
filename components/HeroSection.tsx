'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="min-h-[600px] bg-gradient-to-b from-surface to-background flex items-center justify-center overflow-hidden py-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Test Your <span className="gradient-text">Gamepad</span> Professionally
            </h1>
            <p className="text-xl text-foreground-muted leading-relaxed">
              Advanced gamepad testing with real-time diagnostics, compatibility checking, and troubleshooting guides. Free, fast, and no installation required.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/tester" className="btn-primary">
                Start Testing →
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="pt-8 flex gap-8 text-sm text-foreground-muted">
              <div>✓ Real-time Detection</div>
              <div>✓ Advanced Diagnostics</div>
              <div>✓ Multi-Device Support</div>
            </div>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-border">
              <div className="text-6xl animate-bounce">🎮</div>
            </div>
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-accent rounded-2xl blur-3xl opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
