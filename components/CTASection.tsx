'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/30 to-accent/30 border-y border-border">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container-custom text-center space-y-8"
      >
        <h2 className="text-4xl font-bold">Ready to Test Your Gamepad?</h2>
        <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
          Connect your gamepad and start testing immediately. No signup required.
        </p>
        <Link href="/tester" className="btn-primary inline-block text-lg">
          Start Testing Now →
        </Link>
      </motion.div>
    </section>
  )
}
