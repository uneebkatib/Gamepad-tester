'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: '⚡',
    title: 'Real-Time Detection',
    description: 'Instantly detect and identify connected gamepads with live status updates.',
  },
  {
    icon: '🎯',
    title: 'Button Mapping',
    description: 'View all button inputs in real-time with visual layout representation.',
  },
  {
    icon: '📊',
    title: 'Advanced Diagnostics',
    description: 'Get detailed hardware information and performance metrics.',
  },
  {
    icon: '🎮',
    title: 'Vibration Testing',
    description: 'Test rumble and haptic feedback functionality.',
  },
  {
    icon: '🔧',
    title: 'Calibration Tools',
    description: 'Calibrate dead zones and optimize stick performance.',
  },
  {
    icon: '📱',
    title: 'Multi-Device',
    description: 'Works on desktop, mobile, and all major browsers.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-foreground-muted">Everything you need to test and diagnose your gamepad</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
