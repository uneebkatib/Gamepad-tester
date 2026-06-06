import React from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { articles, authors } from '@/lib/blogData'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return articles.map((art) => ({ slug: art.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.summary,
    keywords: article.tags,
    alternates: { canonical: article.canonical },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      url: article.canonical,
      images: article.heroImage ? [{ url: article.heroImage.src, alt: article.heroImage.alt }] : [],
    },
  }
}

const parseMarkdownLinks = (text: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [_, linkText, url] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    if (url) {
      parts.push(
        <Link 
          key={matchIndex} 
          href={url} 
          className="text-primary hover:underline font-semibold"
        >
          {linkText}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export default function ArticlePage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const author = authors.find((a) => a.id === article.authorId)
  const reviewer = authors.find((a) => a.id === article.reviewerId)
  const relatedArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.summary,
    image: article.heroImage?.src,
    datePublished: (() => {
      try {
        const d = new Date(article.date);
        return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
      } catch (e) {
        return new Date().toISOString().split('T')[0];
      }
    })(),
    author: author ? { '@type': 'Person', name: author.name, jobTitle: author.role, email: author.email } : undefined,
    reviewedBy: reviewer ? { '@type': 'Person', name: reviewer.name, jobTitle: reviewer.role, email: reviewer.email } : undefined,
    publisher: { '@type': 'Organization', name: 'GamepadTester.live' },
    mainEntityOfPage: article.canonical,
  }

  return (
    <main className="min-h-screen bg-background flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />

      <div className="container-custom py-8 flex-1">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-primary mb-6 transition">
          ← Back to Blog &amp; Repair Guides
        </Link>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-3">
            <article className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">

              {/* Hero Image */}
              {article.heroImage && (
                <div className="relative aspect-[2.4/1] w-full">
                  <Image
                    src={article.heroImage.src}
                    alt={article.heroImage.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Category */}
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                  <span>{article.icon} {article.category}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-black font-display text-foreground mb-5 leading-tight">
                  {article.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap gap-y-2 items-center gap-x-4 border-b border-border/60 pb-5 mb-6 text-xs text-foreground-muted">
                  <span>Published: <strong>{article.date}</strong></span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 bg-success/15 border border-success/35 text-success px-2.5 py-0.5 rounded-full font-semibold">
                    ✓ Reviewed by: {reviewer?.name ?? article.reviewerId}
                  </span>
                </div>

                {/* Summary pull-quote */}
                <div className="text-sm text-foreground font-medium leading-relaxed bg-background/50 border-l-4 border-primary p-5 rounded-r-xl mb-8">
                  {article.summary}
                </div>

                {/* Sections */}
                <div className="space-y-10 text-foreground-secondary text-sm leading-relaxed">
                  {article.sections.map((section, si) => (
                    <section key={si} className="space-y-4">
                      {section.heading && (
                        <h2 className="text-lg font-extrabold text-foreground border-b border-border/40 pb-2">
                          {section.heading}
                        </h2>
                      )}

                      {section.paragraphs.map((para, pi) => (
                        <p key={pi}>{parseMarkdownLinks(para)}</p>
                      ))}

                      {section.image && (
                        <figure className="my-4 space-y-2">
                          <div className="relative aspect-[2.4/1] w-full rounded-xl overflow-hidden border border-border">
                            <Image
                              src={section.image.src}
                              alt={section.image.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 672px"
                              className="object-cover"
                            />
                          </div>
                          {section.image.caption && (
                            <figcaption className="text-[10px] text-foreground-muted text-center italic">
                              {section.image.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </section>
                  ))}
                </div>

                {/* Internal CTA */}
                <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1 space-y-1">
                    <span className="text-xs font-bold text-primary block">Free Tool</span>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      Use our free Gamepad Tester to verify stick drift, check axis coordinates, run circularity tests, and calibrate deadzones — no download required.
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link href="/" className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-hover transition">
                      Test Your Controller
                    </Link>
                    <Link href="/calibration" className="px-4 py-2 bg-background border border-border text-foreground text-xs font-bold rounded-lg hover:bg-surface transition">
                      Calibration Tool
                    </Link>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-background border border-border/80 px-2 py-0.5 rounded text-xs text-foreground-muted">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Disclaimer */}
            <div className="bg-surface/50 border border-border/50 rounded-xl p-4 mt-6 text-xs text-foreground-muted leading-relaxed">
              <strong className="text-foreground block mb-1">Hardware Modification Disclaimer:</strong>
              DIY diagnostic checkups and repairs carry safety risks. Ensure all power supplies are unplugged and follow safety procedures. GamepadTester.live is not liable for components damaged during disassembly or repair attempts.
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* Author */}
            {author && (
              <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
                <span className="text-[10px] font-bold font-display text-primary uppercase tracking-widest block mb-3">Written By</span>
                <div className="flex items-center gap-2 mb-3">
                  {author.avatar.startsWith('/') ? (
                    <img src={author.avatar} alt={`${author.name} portrait`} className="w-10 h-10 rounded-full object-cover border border-border" />
                  ) : (
                    <span className="text-xl bg-background border border-border/80 w-10 h-10 rounded-full flex items-center justify-center">{author.avatar}</span>
                  )}
                  <div>
                    <Link href={`/author/${author.id}`} className="text-xs font-bold text-foreground hover:text-primary transition leading-tight block">
                      {author.name}
                    </Link>
                    <span className="text-[9px] text-foreground-muted">{author.role}</span>
                  </div>
                </div>
                <p className="text-[10px] text-foreground-secondary leading-relaxed mb-3">{author.bio}</p>
                <div className="space-y-1.5 border-t border-border/60 pt-3">
                  {author.credentials.slice(0, 1).map(c => (
                    <span key={c} className="block text-[8px] text-foreground-muted">🏅 {c}</span>
                  ))}
                  <a href={`mailto:${author.email}`} className="block text-[9px] text-accent hover:underline mt-1">✉️ {author.email}</a>
                </div>
              </div>
            )}

            {/* Reviewer */}
            {reviewer && (
              <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
                <span className="text-[10px] font-bold font-display text-success uppercase tracking-widest block mb-3">Technical Reviewer</span>
                <div className="flex items-center gap-2 mb-3">
                  {reviewer.avatar.startsWith('/') ? (
                    <img src={reviewer.avatar} alt={`${reviewer.name} portrait`} className="w-10 h-10 rounded-full object-cover border border-border" />
                  ) : (
                    <span className="text-xl bg-background border border-border/80 w-10 h-10 rounded-full flex items-center justify-center">{reviewer.avatar}</span>
                  )}
                  <div>
                    <Link href={`/author/${reviewer.id}`} className="text-xs font-bold text-foreground hover:text-primary transition leading-tight block">
                      {reviewer.name}
                    </Link>
                    <span className="text-[9px] text-foreground-muted">{reviewer.role}</span>
                  </div>
                </div>
                <p className="text-[10px] text-foreground-secondary leading-relaxed mb-3">{reviewer.bio}</p>
                <div className="space-y-1.5 border-t border-border/60 pt-3">
                  {reviewer.credentials.slice(0, 1).map(c => (
                    <span key={c} className="block text-[8px] text-foreground-muted">🏅 {c}</span>
                  ))}
                  <a href={`mailto:${reviewer.email}`} className="block text-[9px] text-accent hover:underline mt-1">✉️ {reviewer.email}</a>
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
                <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider mb-3">Recommended</h3>
                <div className="space-y-4">
                  {relatedArticles.map(art => (
                    <div key={art.id} className="border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                      <span className="text-[9px] text-foreground-muted block mb-1">{art.category}</span>
                      <Link href={`/blog/${art.slug}`} className="text-xs font-bold font-display text-foreground hover:text-primary leading-tight transition block">
                        {art.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools CTA sidebar */}
            <div className="bg-surface border border-border rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider">Free Tools</h3>
              <Link href="/" className="block text-xs text-foreground-muted hover:text-primary transition py-1.5 border-b border-border/40 last:border-0">
                🎮 Gamepad Tester
              </Link>
              <Link href="/calibration" className="block text-xs text-foreground-muted hover:text-primary transition py-1.5 border-b border-border/40 last:border-0">
                🎯 Calibration Tool
              </Link>
              <Link href="/troubleshooting" className="block text-xs text-foreground-muted hover:text-primary transition py-1.5">
                🔧 Troubleshooting Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
