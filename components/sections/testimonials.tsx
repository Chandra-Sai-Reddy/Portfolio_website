"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
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
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, transparent 0%, rgba(34, 197, 94, 0.03) 100%)",
            "linear-gradient(225deg, transparent 0%, rgba(34, 197, 94, 0.03) 100%)",
            "linear-gradient(45deg, transparent 0%, rgba(34, 197, 94, 0.03) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
          >
            What People Say
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          {/* Desktop Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group"
              >
                <motion.div 
                  className="bg-card border border-border rounded-xl p-6 relative h-full flex flex-col hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute -top-4 -right-4 text-8xl text-primary/10"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Quote />
                  </motion.div>
                  
                  <div className="mb-4 relative z-10">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </motion.div>
                    
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.3 + i * 0.1 }}
                          className="text-yellow-500"
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.p 
                    className="text-muted-foreground mb-6 italic flex-grow relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    "{testimonial.content}"
                  </motion.p>
                  
                  <motion.div 
                    className="border-t pt-4 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden relative max-w-lg mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-card border border-border rounded-xl p-6 relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mb-4">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}