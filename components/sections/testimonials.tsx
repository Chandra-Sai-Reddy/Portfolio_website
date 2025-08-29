"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const testimonials = [
    {
      id: 1,
      name: "Dr. Ashwin Ashok",
      role: "Director of MORSE Studio, Associate Professor and Associate Graduate Director",
      content: "Chandra's work on the ML pipeline was exceptional. His ability to reduce costs while maintaining accuracy is remarkable.",
      rating: 5,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Senior DevOps Engineer",
      content: "One of the most talented cloud engineers I've worked with. His AWS expertise and problem-solving skills are outstanding.",
      rating: 5,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      name: "Jagadeesh Reddy",
      role: "Senior Software Engineer at The Home Depot",
      content: "I first met Chandra during his poster presentation on ML and Robotics research. His dedication, curiosity, and ability to quickly learn really stood out. Chandra's passion for ML, robotics, and software development is clear.",
      rating: 5,
      gradient: "from-blue-500 to-blue-600"
    }
  ]

  return (
    <section 
      ref={ref} 
      className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <span className="text-foreground">
              What People Say
            </span>
          </motion.h2>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base"
          >
            What colleagues and mentors say about working with me
          </motion.p>
        </motion.div>

        {/* Grid Layout - All Testimonials Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className={`glass-card neon-border rounded-xl p-6 h-full flex flex-col relative overflow-hidden hover:border-primary/50 transition-all duration-300`}>
                {/* Subtle gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Stars Rating */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-blue-500 text-blue-500" />
                  ))}
                </div>
                
                {/* Testimonial Content */}
                <blockquote className="text-sm md:text-base text-foreground mb-6 leading-relaxed font-medium flex-grow relative z-10">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-center gap-3 mt-auto relative z-10">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-blue-500 p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-500">
                        {testimonial.name.replace('Dr. ', '').charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                {/* Decorative quote mark */}
                <div className="absolute top-2 right-2 text-primary/10">
                  <Quote className="h-8 w-8" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}