"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects, researchProjects, thesisProject } from '@/data/projects'
import { Github, ExternalLink, Award, ArrowRight, BookOpen, Microscope, GraduationCap, Lock } from 'lucide-react'
import Link from 'next/link'
import { Tilt3D } from '@/components/ui/tilt-3d'
import { TextReveal } from '@/components/ui/text-reveal'

export function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-20 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects & Research</h2>

          {/* Featured Projects Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <Tilt3D key={project.id} className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 h-full flex flex-col hover:border-primary/50 transition-all duration-200 future-card depth-shadow volumetric-light"
                  >
                    {project.featured && (
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-xs text-primary font-semibold">Featured</span>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                    
                    {project.patent && (
                      <div className="mb-4 p-2 bg-primary/10 rounded text-sm">
                        <span className="font-semibold">Patent: </span>
                        <span>{project.patent}</span>
                      </div>
                    )}
                    
                    {project.achievements && (
                      <ul className="mb-4 space-y-2">
                        {project.achievements.slice(0, 3).map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-4 mt-auto">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          <span>Code</span>
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </Tilt3D>
              ))}
            </div>
          </div>

          {/* Thesis Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Thesis
            </h3>
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{thesisProject.title}</h3>
                      <p className="text-sm text-primary mb-3">{thesisProject.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Confidential</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{thesisProject.longDescription}</p>
                  
                  {thesisProject.achievements && (
                    <ul className="mb-4 space-y-2">
                      {thesisProject.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {thesisProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Research Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Microscope className="h-6 w-6 text-primary" />
              Research Work
            </h3>
            <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
              {researchProjects.map((research, index) => (
                <motion.div
                  key={research.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{research.title}</h3>
                        <p className="text-sm text-primary mb-3">{research.description}</p>
                      </div>
                      <BookOpen className="h-5 w-5 text-muted-foreground ml-4 flex-shrink-0" />
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{research.longDescription}</p>
                    
                    {research.achievements && (
                      <ul className="mb-4 space-y-2">
                        {research.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {research.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
