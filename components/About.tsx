'use client'

import Link from 'next/link'

export default function About() {
  const team = [
    {
      id: 'marcus-vance',
      name: 'Marcus Vance',
      role: 'Founder & Lead Controller Repair Technician',
      email: 'marcus.vance@gamepadtester.live',
      bio: 'Marcus has 12+ years of experience repairing and modding console controllers. He founded GamepadTester.live to build a free, zero-install diagnostic tool that gives everyday gamers access to lab-grade telemetry data.',
      avatar: '/marcus-vance.jpg',
      badge: 'Founder'
    },
    {
      id: 'sarah-chen',
      name: 'Sarah Chen, PhD',
      role: 'Senior Hardware Systems Consultant',
      email: 'sarah.chen@gamepadtester.live',
      bio: 'An expert in electrical signal processing, Sarah consults on Bluetooth polling, micro-contact noise filters, and coordinates calibration algorithms to ensure browser measurement accuracy.',
      avatar: '/sarah-chen.jpg',
      badge: 'Systems Consultant'
    },
    {
      id: 'alex-mercer',
      name: 'Alex Mercer',
      role: 'QA Hardware & Telemetry Engineer',
      email: 'alex.mercer@gamepadtester.live',
      bio: 'Alex benchmarks controller response behaviors and maintains our database of hardware vendor ID maps across 50+ gamepad models annually.',
      avatar: '/alex-mercer.jpg',
      badge: 'QA Engineer'
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto text-foreground font-sans">
      
      {/* Introduction Hero Card */}
      <div className="bg-surface/50 border border-border rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md space-y-6">
        <div>
          <span className="px-2.5 py-1 bg-primary/15 border border-primary/35 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
            Our Mission &amp; Purpose
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground mt-4 leading-tight">
            Democratizing Precision Hardware Diagnostics
          </h2>
          <p className="text-foreground-secondary text-xs sm:text-sm mt-3 leading-relaxed max-w-3xl">
            GamepadTester.live was built on a simple premise: gamers shouldn’t have to purchase expensive hardware oscilloscopes or install suspicious driver packages just to check if their controllers are functioning correctly. Our tools run 100% in your browser, keeping your data entirely local while providing professional-grade diagnostic telemetry.
          </p>
        </div>
      </div>

      {/* The Story & Founder Section */}
      <div className="grid md:grid-cols-3 gap-8 items-start">
        
        {/* Founder Spot (Large Card) */}
        <div className="md:col-span-2 bg-surface/50 border border-border rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            How We Started
          </h3>
          <p className="text-foreground-secondary text-xs sm:text-sm leading-relaxed">
            In 2024, our founder, Marcus Vance, was managing a console repair workshop. He noticed a recurring problem: customers were throwing away controllers with simple, repairable analog stick drift, or spending money replacing parts when the actual issue was basic Bluetooth signal interference on their PC.
          </p>
          <p className="text-foreground-secondary text-xs sm:text-sm leading-relaxed">
            To diagnose controllers quickly at his test bench, Marcus designed a raw Web Gamepad API dashboard. As other technicians and customers started requesting access, he realized the utility deserved a public, ad-free website. That experimental bench tool evolved into GamepadTester.live.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-center bg-background/50 border border-border/80 rounded-2xl p-5 mt-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primary bg-surface flex-shrink-0">
              <img src="/marcus-vance.jpg" alt="Marcus Vance portrait" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="text-sm font-bold text-foreground">Marcus Vance</h4>
                <span className="bg-primary/10 border border-primary/20 text-[9px] text-primary px-1.5 py-0.5 rounded font-black uppercase">Founder</span>
              </div>
              <p className="text-[10px] text-foreground-muted">Lead Repair Technician • marcus.vance@gamepadtester.live</p>
              <p className="text-[11px] text-foreground-secondary italic pt-1">
                &ldquo;My goal was to build a site that helps gamers diagnose issues in 60 seconds flat, using raw client-side signals only.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Quick Facts Card */}
        <div className="bg-surface/50 border border-border rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-5">
          <h3 className="text-md font-black text-foreground uppercase tracking-wider">Lab Standards</h3>
          <ul className="space-y-3.5 text-xs text-foreground-muted">
            <li className="flex gap-2">
              <span className="text-success font-bold">✓</span>
              <div>
                <strong className="text-foreground block">Zero Server Telemetry</strong>
                All inputs are processed in-memory and discarded on tab close.
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">✓</span>
              <div>
                <strong className="text-foreground block">Physical Lab Testing</strong>
                All connection and calibration guides are hand-tested on real PS5/Xbox consoles.
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-success font-bold">✓</span>
              <div>
                <strong className="text-foreground block">Zero Installer Files</strong>
                We will never ask you to install an executable, extension, or driver.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Meet the Rest of the Team */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Our Research &amp; Testing Specialists
          </h3>
          <p className="text-foreground-muted text-xs sm:text-sm mt-1">
            Meet the engineers and analysts who maintain our calibration databases and telemetry code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Link 
              key={member.id}
              href={`/author/${member.id}`}
              className="group bg-surface/50 border border-border rounded-2xl p-5 hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-surface flex-shrink-0">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{member.name}</h4>
                    <p className="text-[9px] text-foreground-muted">{member.role}</p>
                  </div>
                </div>
                <p className="text-[11px] text-foreground-secondary leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="border-t border-border/40 pt-3 mt-4 flex items-center justify-between text-[9px] text-foreground-muted">
                <span>{member.email}</span>
                <span className="bg-surface px-1.5 py-0.5 rounded font-mono font-bold">{member.badge}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
