import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CustomCursor } from '@/components/custom-cursor'
import { AnimationToggle } from '@/components/animation-toggle'
import { StructuredData } from '@/components/seo/structured-data'
import { PerformanceMonitor } from '@/components/performance/monitor'
import { FloatingSocials } from '@/components/floating-socials'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://chandrasaireddy.dev'),
  title: {
    default: 'Chandra Sai Reddy - ML Engineer & Cloud Architect',
    template: '%s | Chandra Sai Reddy'
  },
  description: 'Machine Learning Engineer and AWS Cloud Architect specializing in scalable ML systems, DevOps automation, and cost optimization. Master\'s student at Georgia State University. Available for hire.',
  keywords: [
    'Chandra Sai Reddy',
    'Machine Learning Engineer',
    'Cloud Architect', 
    'AWS Expert',
    'MLOps',
    'DevOps',
    'Python Developer',
    'React Developer',
    'Georgia State University',
    'ML Engineer for hire',
    'Cloud Engineer Atlanta',
    'AWS Solutions Architect',
    'TensorFlow Expert',
    'Docker Kubernetes',
    'Cost Optimization'
  ],
  authors: [{ name: 'Chandra Sai Reddy', url: 'https://chandrasaireddy.dev' }],
  creator: 'Chandra Sai Reddy',
  publisher: 'Chandra Sai Reddy',
  openGraph: {
    title: 'Chandra Sai Reddy - ML Engineer & Cloud Architect Available for Hire',
    description: 'Expert Machine Learning Engineer and AWS Cloud Architect with proven track record of reducing costs by 40% and building scalable ML systems. View portfolio and hire today.',
    type: 'website',
    locale: 'en_US',
    url: 'https://chandrasaireddy.dev',
    siteName: 'Chandra Sai Reddy Portfolio',
    images: [
      {
        url: '/Profile_photo.JPG',
        width: 1200,
        height: 630,
        alt: 'Chandra Sai Reddy - ML Engineer & Cloud Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chandra Sai Reddy - ML Engineer & Cloud Architect',
    description: 'Building scalable ML systems and optimizing cloud infrastructure. Available for hire.',
    images: ['/Profile_photo.JPG'],
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="canonical" href="https://chandrasaireddy.dev" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.variable}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-primary text-white px-4 py-2 rounded-lg font-medium"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingSocials />
          <PerformanceMonitor />
          <CustomCursor />
          <AnimationToggle />
          <div className="min-h-screen bg-background">
            
            <Navigation />
            <main id="main-content" className="relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
