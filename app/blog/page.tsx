'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { articles, authors } from '@/lib/blogData'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Hardware Mods', 'DIY Repair', 'Performance', 'Software API']

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-background flex flex-col font-sans">
      <Navigation />
      
      <div className="container-custom py-8 flex-1">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary uppercase tracking-widest">
            Expert Guides &amp; Resources
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-display text-foreground mt-4 mb-4 leading-tight">
            Controller Diagnostics &amp; Repair Blog
          </h1>
          <p className="text-foreground-muted text-sm md:text-base leading-relaxed">
            In-depth hardware reviews, DIY repair walkthroughs, and performance benchmarks. All articles are written and peer-reviewed by certified electrical engineers and console repair specialists.
          </p>
        </div>

        {/* EEAT Trust Signals Bar */}
        <div className="bg-surface/80 border border-border rounded-2xl p-6 mb-12 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🛡️</span>
            <h2 className="text-md font-bold font-display text-foreground uppercase tracking-wider">Editorial Integrity &amp; Review Guidelines</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-xs text-foreground-muted leading-relaxed">
            <div className="flex gap-2">
              <span className="text-primary font-bold text-base mt-0.5">✓</span>
              <div>
                <strong className="text-foreground font-semibold block">Sourced by Experts</strong>
                Written by active hardware repair technicians with years of soldering and repair experience.
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold text-base mt-0.5">✓</span>
              <div>
                <strong className="text-foreground font-semibold block">Double-Blind Peer Reviewed</strong>
                Every troubleshooting guide is cross-verified by an electrical systems engineer before publication.
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-primary font-bold text-base mt-0.5">✓</span>
              <div>
                <strong className="text-foreground font-semibold block">Open Standards Testing</strong>
                Measurements, drift tolerances, and haptics calibrate with ISO input device standards.
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column: Search, Categories, and Specialist Team Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Box */}
            <div className="bg-surface border border-border rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold font-display text-foreground-secondary uppercase tracking-wider mb-3">Search Guides</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-foreground-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-foreground-muted hover:text-foreground text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-surface border border-border rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold font-display text-foreground-secondary uppercase tracking-wider mb-3">Categories</h3>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      activeCategory === cat 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground-muted hover:text-foreground hover:bg-background'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Specialist Panel (EEAT Trust Card) */}
            <div className="bg-surface border border-border rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold font-display text-foreground-secondary uppercase tracking-wider mb-3">Editorial Review Panel</h3>
              <p className="text-[10px] text-foreground-muted mb-4 leading-normal">
                Our specialists ensure all content is up to date, factual, and safe for DIY hardware modifications. Click on any profile to see their contributions.
              </p>
              <div className="space-y-4">
                {authors.map(exp => (
                  <div key={exp.id} className="border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      {exp.avatar.startsWith('/') ? (
                        <img src={exp.avatar} alt={exp.name} className="w-7 h-7 rounded-full object-cover border border-border" />
                      ) : (
                        <span className="text-base bg-background border border-border/80 w-7 h-7 rounded-full flex items-center justify-center">{exp.avatar}</span>
                      )}
                      <div>
                        <Link href={`/author/${exp.id}`} className="text-xs font-bold text-foreground font-display leading-tight hover:text-primary transition">
                          {exp.name}
                        </Link>
                        <div className="text-[9px] text-primary font-medium">{exp.role}</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-foreground-muted leading-relaxed mt-1 line-clamp-3">
                      {exp.bio}
                    </p>
                    <a 
                      href={`mailto:${exp.email}`}
                      className="inline-flex items-center gap-1 text-[9px] text-accent hover:underline mt-2"
                    >
                      ✉️ {exp.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Blog Grid */}
          <div className="lg:col-span-3">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-surface border border-border border-dashed rounded-2xl">
                <span className="text-3xl">🔍</span>
                <h3 className="text-sm font-bold text-foreground mt-4">No guides match your filter</h3>
                <p className="text-xs text-foreground-muted mt-1">Try adjusting your search queries or category selection.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles.map(art => {
                  const author = authors.find(a => a.id === art.authorId);
                  const reviewer = authors.find(a => a.id === art.reviewerId);
                  return (
                    <div key={art.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="bg-background border border-border/80 px-2 py-0.5 rounded text-[10px] text-foreground-muted font-medium">
                            {art.icon} {art.category}
                          </span>
                          <span className="text-[10px] text-foreground-muted">{art.date}</span>
                        </div>
                        
                        <h3 className="text-base font-bold font-display text-foreground mb-2 leading-snug hover:text-primary transition">
                          <Link href={`/blog/${art.slug}`}>
                            {art.title}
                          </Link>
                        </h3>
                        
                        <p className="text-xs text-foreground-muted leading-relaxed line-clamp-3 mb-4">
                          {art.summary}
                        </p>
                      </div>
                      
                      <div>
                        {/* Fact Check Banner */}
                        <div className="bg-background/80 border border-border/60 p-2.5 rounded-lg mb-4 text-[10px] text-foreground-muted flex flex-col gap-0.5">
                          <div>
                            Author:{' '}
                            {author ? (
                              <Link href={`/author/${author.id}`} className="font-semibold text-foreground hover:text-primary transition">
                                {author.name}
                              </Link>
                            ) : (
                              <span className="font-semibold text-foreground">{art.authorId}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-success font-semibold">
                            <span>
                              ✓ Fact-checked by:{' '}
                              {reviewer ? (
                                <Link href={`/author/${reviewer.id}`} className="hover:underline">
                                  {reviewer.name}
                                </Link>
                              ) : (
                                <span>{art.reviewerId}</span>
                              )}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] text-foreground-muted">{art.readTime}</span>
                          <Link
                            href={`/blog/${art.slug}`}
                            className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 transition"
                          >
                            Read Article ➔
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
