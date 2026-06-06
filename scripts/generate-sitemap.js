#!/usr/bin/env node

/**
 * Sitemap generation script for SEO
 * Generates sitemap.xml for gamepadtester.live including blog articles and author profiles
 */

const fs = require('fs')
const path = require('path')

const baseUrl = 'https://gamepadtester.live'

const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/calibration', priority: 0.9, changefreq: 'weekly' },
  { path: '/troubleshooting', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms', priority: 0.5, changefreq: 'yearly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
]

// Dynamically parse articles and authors from blogData.ts
try {
  const blogDataPath = path.join(__dirname, '..', 'lib', 'blogData.ts')
  if (fs.existsSync(blogDataPath)) {
    const blogDataContent = fs.readFileSync(blogDataPath, 'utf8')

    // Extract article slugs
    const slugMatches = [...blogDataContent.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)]
    slugMatches.forEach((match) => {
      const slug = match[1]
      // Ensure we don't add duplicates
      if (!routes.some(r => r.path === `/blog/${slug}`)) {
        routes.push({ path: `/blog/${slug}`, priority: 0.7, changefreq: 'monthly' })
      }
    })

    // Extract author IDs from the authors array section
    const authorsSection = blogDataContent.split('export const articles')[0]
    const authorIdMatches = [...authorsSection.matchAll(/id:\s*['"`]([^'"`]+)['"`]/g)]
    authorIdMatches.forEach((match) => {
      const authorId = match[1]
      if (!routes.some(r => r.path === `/author/${authorId}`)) {
        routes.push({ path: `/author/${authorId}`, priority: 0.6, changefreq: 'monthly' })
      }
    })
  }
} catch (err) {
  console.error('[Sitemap Generator] Error parsing blogData:', err)
}

const generateSitemap = () => {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  const publicDir = path.join(__dirname, '..', 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent)
  console.log('✓ Sitemap generated at public/sitemap.xml')
}

generateSitemap()
