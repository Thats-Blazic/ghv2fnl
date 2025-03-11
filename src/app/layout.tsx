import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

// Optimizovano učitavanje fonta
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Ghost Force Studio',
  description: "LET'S MAKE YOU REMARKABLE",
  keywords: 'design, thumbnails, banners, gaming, music, branding, logo design',
  authors: [{ name: 'Ghost Force Studio' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Ghost Force Studio',
    description: "LET'S MAKE YOU REMARKABLE",
    url: 'https://ghostforcestudio.com',
    siteName: 'Ghost Force Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/projects/thumb/GHOST.jpg',
        width: 1200,
        height: 630,
        alt: 'Ghost Force Studio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghost Force Studio',
    description: 'Crafting brilliance. Defining you.',
    images: ['/projects/thumb/GHOST.jpg'],
  },
  icons: {
    icon: '/projects/fav.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preconnect za brže učitavanje fontova i eksternih resursa */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ibb.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        
        {/* Preload kritičnih resursa */}
        <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <link rel="dns-prefetch" href="https://i.ibb.co" />
        
        {/* Font Awesome - directly included with no integrity check to avoid issues */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/projects/fav.png" />
        
        {/* Preload key images */}
        <link rel="preload" as="image" href="/ghostweb.jpg" />
        <link rel="preload" as="image" href="/kickweb.jpg" />
      </head>
      <body className="bg-black">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
} 
