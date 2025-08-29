import { Contact } from '@/components/sections/contact'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Hire Chandra Sai Reddy | ML Engineer & Cloud Architect',
  description: 'Ready to hire a Machine Learning Engineer and Cloud Architect? Contact Chandra Sai Reddy for your next project. Specializing in AWS, ML systems, and cost optimization.',
  keywords: [
    'Contact Chandra Sai Reddy',
    'Hire ML Engineer',
    'Hire Cloud Architect',
    'AWS consultant',
    'Machine Learning consultant',
    'DevOps engineer for hire',
    'Atlanta ML engineer',
    'Remote cloud engineer'
  ],
  openGraph: {
    title: 'Contact Chandra Sai Reddy - Available for Hire',
    description: 'Get in touch to discuss your Machine Learning and Cloud Architecture needs.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  )
}