"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingDown, Target, Award, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

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

export function AchievementsImpact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const achievements = [
    {
      icon: TrendingDown,
      title: "40%",
      subtitle: "Cost Savings",
      description: "Helped businesses cut cloud spending through smarter architecture and automation",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "94%",
      subtitle: "System Accuracy",
      description: "Built intelligent systems that make better decisions than manual processes",
      color: "blue", 
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Award,
      title: "1",
      subtitle: "Published Patent",
      description: "Innovative cancer detection technology - Patent No: 202441089264",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "25+",
      subtitle: "Developers Mentored", 
      description: "Elevated team capabilities through workshops, code reviews, and best practices",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-background/95">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-muted/10" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >


          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <span className="text-foreground">
              Achievements & Impact
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
            className="text-muted-foreground max-w-3xl mx-auto text-sm"
          >
            Real results from building systems that matter. Here's the business impact I deliver.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.subtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              className="group will-change-transform"
            >
              <div className="glass-card-hover neon-border rounded-xl p-6 md:p-8 h-full relative overflow-hidden group touch-manipulation gpu-accelerated">
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300 will-change-opacity`} />
                
                {/* Icon - Mobile optimized */}
                <div className="mb-6 md:mb-8 relative z-10">
                  <div className={`inline-flex p-3 md:p-4 bg-gradient-to-br ${achievement.gradient} rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300 will-change-transform`}>
                    <achievement.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                </div>
                
                {/* Value - Mobile optimized */}
                <div className="mb-4 md:mb-6 relative z-10">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
                    {achievement.title.includes('%') || achievement.title === '1' ? (
                      <AnimatedCounter value={achievement.title} inView={inView} />
                    ) : (
                      achievement.title
                    )}
                  </div>
                  <div className="text-base md:text-lg font-semibold text-blue-500 group-hover:text-blue-600 transition-colors">
                    {achievement.subtitle}
                  </div>
                </div>
                
                {/* Description - Mobile optimized */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed relative z-10">
                  {achievement.description}
                </p>
                
                {/* Performance-optimized hover effect */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/30 transition-all duration-300 will-change-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}