import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles, authors } from '@/lib/blogData'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate static params for Next.js build-time pre-rendering
export function generateStaticParams() {
  return authors.map((auth) => ({
    slug: auth.id,
  }))
}

export default function AuthorPage({ params }: PageProps) {
  const author = authors.find((a) => a.id === params.slug)

  if (!author) {
    notFound()
  }

  // Articles written or reviewed by this expert
  const contributedArticles = articles.filter(
    (art) => art.authorId === author.id || art.reviewerId === author.id
  )

  // Person schema markup for E-E-A-T trust signals
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': author.name,
    'jobTitle': author.role,
    'email': author.email,
    'description': author.bio,
    'knowsAbout': [
      'Game Controllers',
      'Hardware Engineering',
      'Potentiometers',
      'Electrical Engineering',
      'Input Latency Calibration'
    ]
  }

  return (
    <main className="min-h-screen bg-background flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navigation />
      
      <div className="container-custom py-8 flex-1">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-primary mb-8 transition"
        >
          ← Back to Blog &amp; Reviewers List
        </Link>

        {/* Profile Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-border/60">
            {author.avatar.startsWith('/') ? (
              <img src={author.avatar} alt={author.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-border" />
            ) : (
              <span className="text-4xl sm:text-5xl bg-background border border-border/80 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
                {author.avatar}
              </span>
            )}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-4xl font-black font-display text-foreground leading-tight">
                {author.name}
              </h1>
              <div className="text-sm text-primary font-semibold font-display tracking-wide uppercase">
                {author.role}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {author.credentials.map(c => (
                  <span key={c} className="bg-background border border-border/60 text-foreground-secondary text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                    🏅 {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-xs font-bold font-display text-foreground-secondary uppercase tracking-wider mb-2">Professional Biography</h2>
            <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed mb-6">
              {author.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/40">
              <div className="text-xs text-foreground-muted">
                Contact: <a href={`mailto:${author.email}`} className="text-accent font-semibold hover:underline">{author.email}</a>
              </div>
              <span className="text-xs text-foreground-muted">
                Trust Status: <strong className="text-success font-semibold">✓ Verified Resident Specialist</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Contributions Grid */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-display text-foreground mb-6">
            Guides Authored or Reviewed by {author.name}
          </h2>
          
          {contributedArticles.length === 0 ? (
            <div className="text-center py-10 bg-surface/50 border border-border border-dashed rounded-xl">
              <p className="text-sm text-foreground-muted">No guides published or reviewed yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributedArticles.map(art => {
                const isAuthor = art.authorId === author.id
                const reviewPartner = isAuthor 
                  ? authors.find(a => a.id === art.reviewerId)
                  : authors.find(a => a.id === art.authorId)

                return (
                  <div key={art.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-background border border-border/80 px-2 py-0.5 rounded text-[10px] text-foreground-muted font-medium">
                          {art.icon} {art.category}
                        </span>
                        <span className="text-[10px] text-foreground-muted">{art.date}</span>
                      </div>
                      
                      <h3 className="text-sm font-bold font-display text-foreground mb-2 leading-snug hover:text-primary transition">
                        <Link href={`/blog/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h3>
                      
                      <p className="text-xs text-foreground-muted leading-relaxed line-clamp-3 mb-4">
                        {art.summary}
                      </p>
                    </div>
                    
                    <div>
                      {/* Contribution type banner */}
                      <div className="bg-background/80 border border-border/60 p-2.5 rounded-lg mb-4 text-[10px] text-foreground-muted flex flex-col gap-0.5">
                        <div>
                          Status:{' '}
                          <span className={`font-bold uppercase tracking-wider ${isAuthor ? 'text-primary' : 'text-success'}`}>
                            {isAuthor ? 'Author' : 'Technical Reviewer'}
                          </span>
                        </div>
                        {reviewPartner && (
                          <div className="text-[9px]">
                            {isAuthor ? 'Reviewed by: ' : 'Author: '}
                            <Link href={`/author/${reviewPartner.id}`} className="font-semibold text-foreground hover:underline">
                              {reviewPartner.name}
                            </Link>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] text-foreground-muted">{art.readTime}</span>
                        <Link
                          href={`/blog/${art.slug}`}
                          className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 transition"
                        >
                          Read Guide ➔
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
      
      <Footer />
    </main>
  )
}
