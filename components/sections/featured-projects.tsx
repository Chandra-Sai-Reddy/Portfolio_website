"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects, researchProjects } from '@/data/projects'
import { InteractiveProjectCard } from '@/components/ui/interactive-project-card'
import { KineticText } from '@/components/ui/kinetic-text'
import { Award, Microscope, Sparkles } from 'lucide-react'

export function FeaturedProjects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const featuredProjects = projects.filter(p => p.featured).slice(0, 2)

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0 aurora-bg opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >


          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <KineticText
              text="Featured Projects"
              className="text-foreground"
              scramble={false}
              gradient={false}
            />
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base"
          >
            Showcasing innovative solutions that combine machine learning, cloud engineering, and cutting-edge technologies
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredProjects.map((project, index) => (
            <InteractiveProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Research Projects Section */}
        {researchProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20"
          >
            <div className="text-center mb-12">


              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <KineticText
                  text="Research Projects"
                  className="text-foreground"
                  scramble={false}
                  gradient={false}
                />
              </h3>
              
              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {researchProjects.slice(0, 2).map((project, index) => (
                <InteractiveProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 glass-card-hover neon-border rounded-xl transition-all duration-300 group"
            data-cursor-magnetic
            data-cursor-text="View All"
          >
            <span className="font-semibold">View All Projects</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
