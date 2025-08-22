"use client"

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingDown, Target, Award, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export function AchievementsImpact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const achievements = [
    {
      icon: TrendingDown,
      title: "80%",
      subtitle: "Cost Reduction",
      description: "Reduced infrastructure costs through optimized AWS pipeline design",
    },
    {
      icon: Target,
      title: "94%",
      subtitle: "ML Accuracy",
      description: "Achieved high decision accuracy in real-time analysis systems",
    },
    {
      icon: Award,
      title: "1",
      subtitle: "Patent Published",
      description: "Patent No: 202441089264 for cancer classification using RNN",
    },
    {
      icon: Users,
      title: "60%",
      subtitle: "Team Improvement",
      description: "Elevated 15+ developers' skills through workshops and reviews",
    }
  ]

  // Animated counter component
  function AnimatedCounter({ value, inView }: { value: string, inView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0)
    const numericValue = parseInt(value)
    
    useEffect(() => {
      if (inView) {
        const timer = setInterval(() => {
          setDisplayValue(prev => {
            if (prev < numericValue) {
              return Math.min(prev + Math.ceil(numericValue / 20), numericValue)
            }
            return prev
          })
        }, 50)
        
        return () => clearInterval(timer)
      }
    }, [inView, numericValue])
    
    return <span>{displayValue}{value.includes('%') ? '%' : ''}</span>
  }

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
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
            Achievements & Impact
          </motion.h2>
          <motion.div 
            className="w-20 h-0.5 bg-primary mx-auto mb-12"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.subtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="bg-card border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Value */}
                  <div className="mb-2">
                    <div className="text-3xl font-bold text-foreground">
                      {achievement.title.includes('%') || achievement.title === '1' ? (
                        <AnimatedCounter value={achievement.title} inView={inView} />
                      ) : (
                        achievement.title
                      )}
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {achievement.subtitle}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}