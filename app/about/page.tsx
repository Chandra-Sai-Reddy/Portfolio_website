import { About } from '@/components/sections/about'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Chandra Sai Reddy | Cloud & DevOps Engineer',
  description: 'Learn about Chandra Sai Reddy, an experienced Cloud and DevOps Engineer specializing in AWS, Kubernetes, and MLOps. Master\'s student at Georgia State University with expertise in cloud automation and AI-driven applications.',
  keywords: [
    'About Chandra Sai Reddy',
    'Cloud Engineer background',
    'DevOps Engineer experience', 
    'Georgia State University',
    'AWS expertise',
    'Kubernetes',
    'MLOps',
    'Cloud automation',
    'Terraform',
    'CI/CD pipelines'
  ],
  openGraph: {
    title: 'About Chandra Sai Reddy - Cloud & DevOps Engineer',
    description: 'Experienced Cloud and DevOps Engineer with proven results in scalable infrastructure and MLOps solutions.',
    type: 'profile',
  },
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
    </div>
  )
}