import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gamepadtester.live'

export const metadata: Metadata = {
  title: {
    default: 'GamepadTester.live - Professional Gamepad Tester & Diagnostics',
    template: '%s | GamepadTester.live',
  },
  description:
    'Test your gamepad/controller with advanced diagnostics, compatibility checking, and troubleshooting guides. Support for all gaming controllers.',
  keywords: [
    'gamepad tester',
    'controller tester',
    'game controller test',
    'gamepad diagnostics',
    'Xbox controller',
    'PlayStation controller',
    'PC gamepad',
  ],
  authors: [{ name: 'GamepadTester Team' }],
  creator: 'GamepadTester Team',
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'GamepadTester.live - Professional Gamepad Tester & Diagnostics',
    description:
      'Test your gamepad/controller with advanced diagnostics, compatibility checking, and troubleshooting guides.',
    siteName: 'GamepadTester.live',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'GamepadTester.live',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GamepadTester.live - Professional Gamepad Tester',
    description: 'Test your gamepad with advanced diagnostics and compatibility checking.',
    images: [`${baseUrl}/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  alternates: {
    canonical: baseUrl,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  interactiveWidget: 'resizes-content',
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={baseUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'GamepadTester.live',
              description:
                'Professional gamepad and controller testing platform with diagnostics',
              url: baseUrl,
              applicationCategory: 'UtilityApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
