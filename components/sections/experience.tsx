"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences } from '@/data/experience'
import { Calendar, MapPin, Building } from 'lucide-react'

export function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12"></div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border -ml-px md:left-8"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-8 w-3 h-3 bg-primary rounded-full -translate-x-1/2 md:left-8"></div>
                
                <div className="pl-8 md:pl-20">
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold mb-2 md:mb-0">{exp.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{exp.company}</span>
                      </div>
                      <span className="hidden md:inline">•</span>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span className="text-muted-foreground">{desc}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}