'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'General', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormState({ name: '', email: '', subject: 'General', message: '' })
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col font-sans">
      <Navigation />
      <div className="container-custom py-12 flex-1 max-w-5xl">
        <div className="space-y-8">
          <div>
            <span className="px-2.5 py-1 bg-primary/15 border border-primary/35 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mt-4">
              Contact Our Diagnostics Team
            </h1>
            <p className="text-foreground-muted text-xs sm:text-sm mt-2 max-w-xl">
              Have feedback on stick coordinate calculations, a question about a repair guide, or a business inquiry? Reach our hardware specialists.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            
            {/* Contact Form (Glassmorphic) */}
            <div className="md:col-span-3 bg-surface/50 border border-border rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 bg-success/20 border border-success/35 text-success rounded-full flex items-center justify-center mx-auto text-xl">✓</div>
                  <h3 className="text-lg font-bold text-foreground">Message Sent Successfully!</h3>
                  <p className="text-xs text-foreground-muted max-w-xs mx-auto">
                    Thank you for reaching out. A hardware technician or support representative will respond to your inquiry shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border rounded-xl text-xs font-semibold text-foreground-secondary transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Marcus Vance"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted">Subject / Department</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition font-medium"
                    >
                      <option value="General">General Support</option>
                      <option value="Calibration">Telemetry &amp; Calibration Feedback</option>
                      <option value="Guides">DIY Repair Guides Feedback</option>
                      <option value="Business">Business Inquiries</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted">Your Message</label>
                    <textarea 
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Enter the details of your inquiry, including gamepad model if relevant..."
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition font-medium leading-relaxed resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary hover:bg-primary-hover border border-primary-hover text-xs font-bold text-white rounded-xl shadow-lg shadow-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Submitting Inquiry...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Channels */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Direct Emails */}
              <div className="bg-surface/50 border border-border rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
                <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Direct Contacts</h3>
                
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-foreground-muted block text-[10px] font-bold uppercase">Founder &amp; Workshop Tech</span>
                    <a href="mailto:marcus.vance@gamepadtester.live" className="text-primary hover:underline font-mono text-[11px]">marcus.vance@gamepadtester.live</a>
                  </div>
                  <div>
                    <span className="text-foreground-muted block text-[10px] font-bold uppercase">Systems &amp; Latency Consultant</span>
                    <a href="mailto:sarah.chen@gamepadtester.live" className="text-success hover:underline font-mono text-[11px]">sarah.chen@gamepadtester.live</a>
                  </div>
                  <div>
                    <span className="text-foreground-muted block text-[10px] font-bold uppercase">Firmware &amp; QA Telemetry</span>
                    <a href="mailto:alex.mercer@gamepadtester.live" className="text-warning hover:underline font-mono text-[11px]">alex.mercer@gamepadtester.live</a>
                  </div>
                  <div>
                    <span className="text-foreground-muted block text-[10px] font-bold uppercase">General Inquiries</span>
                    <a href="mailto:support@gamepadtester.live" className="text-foreground hover:underline font-mono text-[11px]">support@gamepadtester.live</a>
                  </div>
                </div>
              </div>

              {/* Lab Address */}
              <div className="bg-surface/50 border border-border rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-2.5">
                <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Lab Location</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  GamepadTester Hardware Lab<br />
                  404 Calibration Way, Suite 100<br />
                  San Francisco, CA 94107
                </p>
                <div className="text-[10px] text-foreground-muted">
                  Note: Our physical lab is dedicated to testing bench research and not open to unscheduled repair drop-offs. Please contact us via email first.
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
