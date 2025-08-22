"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'

export function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Professor, Georgia State University",
      content: "Chandra's work on the ML pipeline was exceptional. His ability to reduce costs while maintaining accuracy is remarkable.",
      rating: 5
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Senior DevOps Engineer",
      content: "One of the most talented cloud engineers I've worked with. His AWS expertise and problem-solving skills are outstanding.",
      rating: 5
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      role: "Tech Lead, Previous Team",
      content: "Chandra's leadership in our technical events boosted team engagement by 40%. A natural leader and innovator.",
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            Testimonials
          </motion.h2>
          <motion.div 
            className="w-20 h-0.5 bg-primary mx-auto mb-12"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 text-primary/20">
                <Quote className="h-16 w-16" />
              </div>
              
              {/* Testimonial Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-card border border-white/10 rounded-lg p-8"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-lg text-foreground mb-6 leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </div>
                    </div>
                    
                    {/* Navigation */}
                    <div className="flex gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="p-2 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="p-2 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-white/20 hover:bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}