import { ExperienceTabbed } from '@/components/sections/experience-tabbed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience - Chandra Sai Reddy',
  description: 'Professional experience in Machine Learning, Cloud Engineering, and Software Development',
}

export default function ExperiencePage() {
  return (
    <div className="pt-20">
      <ExperienceTabbed />
    </div>
  )
}