import { Projects } from '@/components/sections/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Chandra Sai Reddy | ML & Cloud Engineering Portfolio',
  description: 'Explore Chandra Sai Reddy\'s Machine Learning and Cloud Engineering projects. Real-world applications including cost optimization, ML pipelines, and scalable cloud solutions.',
  keywords: [
    'Chandra Sai Reddy projects',
    'Machine Learning projects',
    'Cloud Engineering portfolio',
    'AWS projects',
    'ML pipeline projects',
    'DevOps automation',
    'Cost optimization case studies',
    'Python projects',
    'React applications'
  ],
  openGraph: {
    title: 'Projects by Chandra Sai Reddy - ML & Cloud Engineering',
    description: 'Innovative ML and cloud projects with proven business impact and technical excellence.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <Projects />
    </div>
  )
}