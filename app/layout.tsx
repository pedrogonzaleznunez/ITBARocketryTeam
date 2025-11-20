import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ITBA Rocketry Team | Innovación en Propulsión Espacial',
  description: 'Equipo de cohetes del ITBA dedicado a la innovación en tecnología aeroespacial y propulsión avanzada.',
  keywords: ['rocketry', 'aerospace', 'ITBA', 'propulsion', 'space', 'engineering'],
  authors: [{ name: 'ITBA Rocketry Team' }],
  creator: 'ITBA Rocketry Team',
  metadataBase: new URL('https://itbarocketry.com'),
  
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://itbarocketry.com',
    title: 'ITBA Rocketry Team | Innovación en Propulsión Espacial',
    description: 'Equipo de cohetes del ITBA dedicado a la innovación en tecnología aeroespacial y propulsión avanzada.',
    siteName: 'ITBA Rocketry Team',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ITBA Rocketry Team',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'ITBA Rocketry Team | Innovación en Propulsión Espacial',
    description: 'Equipo de cohetes del ITBA dedicado a la innovación en tecnología aeroespacial y propulsión avanzada.',
    images: ['/og-image.jpg'],
    creator: '@itbarocketry',
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
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" dir="ltr" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

