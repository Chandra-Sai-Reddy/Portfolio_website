"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences } from '@/data/experience'
import { Calendar, MapPin, Building, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { TextReveal } from '@/components/ui/text-reveal'

export function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience</h2>
          </TextReveal>

          <div className="max-w-4xl mx-auto relative">
            {/* Animated timeline line */}
            <motion.div 
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-primary/20"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ originY: 0 }}
            />
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline dot with pulse animation */}
                <motion.div 
                  className="absolute left-8 top-8 w-4 h-4 -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                >
                  <div className="w-4 h-4 bg-primary rounded-full relative">
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>
                </motion.div>
                
                {/* Experience card */}
                <div className="pl-16">
                  <motion.div 
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => toggleExpand(index)}
                    whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)' }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
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
                    
                    {/* Expandable content */}
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ul className="space-y-2 mb-4">
                            {exp.description.map((desc, i) => (
                              <motion.li 
                                key={i} 
                                className="flex items-start"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <span className="text-primary mr-2 mt-1">•</span>
                                <span className="text-muted-foreground">{desc}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          <motion.div 
                            className="flex flex-wrap gap-2"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Collapsed preview */}
                    {expandedIndex !== index && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 4 && (
                          <span className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                            +{exp.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
