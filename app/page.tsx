import { Hero } from '@/components/sections/hero'
import { TechnicalSkills } from '@/components/sections/technical-skills'
import { AchievementsImpact } from '@/components/sections/achievements-impact'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { Testimonials } from '@/components/sections/testimonials'

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <TechnicalSkills />
      <AchievementsImpact />
      <FeaturedProjects />
      <Testimonials />
    </div>
  )
}