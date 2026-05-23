#!/usr/bin/env node

/**
 * Sitemap generation script for SEO
 * Generates sitemap.xml for gamepadtester.live
 */

const fs = require('fs')
const path = require('path')

const baseUrl = 'https://gamepadtester.live'

const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/tester', priority: 0.9, changefreq: 'weekly' },
  { path: '/diagnostics', priority: 0.8, changefreq: 'weekly' },
  { path: '/compatibility', priority: 0.7, changefreq: 'monthly' },
  { path: '/troubleshooting', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'yearly' },
]

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
