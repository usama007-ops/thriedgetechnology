import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import  Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'Thrill Edge Technologies | Innovation Redefined',
  description: 'Cutting-edge technology solutions for modern enterprises. Experience innovation with Thrill Edge Technologies.',
  generator: 'v0.app',
  applicationName: 'Thrill Edge Technologies',
  keywords: ['technology', 'innovation', 'enterprise solutions', 'digital transformation'],
  authors: [{ name: 'Thrill Edge Technologies' }],
  creator: 'Thrill Edge Technologies',
  publisher: 'Thrill Edge Technologies',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thrilledge.com',
    siteName: 'Thrill Edge Technologies',
    title: 'Thrill Edge Technologies | Innovation Redefined',
    description: 'Cutting-edge technology solutions for modern enterprises.',
    images: [
      {
        url: 'https://thrilledge.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Thrill Edge Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thrilledge',
    title: 'Thrill Edge Technologies | Innovation Redefined',
    description: 'Cutting-edge technology solutions for modern enterprises.',
    images: ['https://thrilledge.com/twitter-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#00d4ff',
  initialScale: 1,
  width: 'device-width',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://thrilledge.com" />
      </head>
      <body className={`${inter.variable} antialiased bg-[background] text-foreground`} suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
