import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { BackgroundSelector } from '@/components/background-selector'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chandra Sai Reddy - ML & Cloud Engineer',
  description: 'Machine Learning and Cloud Engineer specializing in AWS, MLOps, and scalable data pipelines. Master\'s student at Georgia State University.',
  keywords: 'Chandra Sai Reddy, Machine Learning, Cloud Engineer, AWS, MLOps, DevOps, Georgia State University',
  authors: [{ name: 'Chandra Sai Reddy' }],
  openGraph: {
    title: 'Chandra Sai Reddy - ML & Cloud Engineer',
    description: 'Machine Learning and Cloud Engineer specializing in AWS, MLOps, and scalable data pipelines.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background relative">
            <BackgroundSelector />
            <Navigation />
            <main className="relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}