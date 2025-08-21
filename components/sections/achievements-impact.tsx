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
      color: "from-primary to-secondary"
    },
    {
      icon: Target,
      title: "94%",
      subtitle: "ML Accuracy",
      description: "Achieved high decision accuracy in real-time analysis systems",
      color: "from-secondary to-primary"
    },
    {
      icon: Award,
      title: "1",
      subtitle: "Patent Published",
      description: "Patent No: 202441089264 for cancer classification using RNN",
      color: "from-primary to-secondary"
    },
    {
      icon: Users,
      title: "60%",
      subtitle: "Team Improvement",
      description: "Elevated 15+ developers' skills through workshops and reviews",
      color: "from-secondary to-primary"
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
    <section className="py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #06b6d4 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%)",
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
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            Achievements & Impact
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.subtitle}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${achievement.color} mb-4 shadow-lg group-hover:shadow-2xl transition-shadow`}
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <achievement.icon className="h-10 w-10 text-white" />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <h3 className="text-4xl font-bold mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {achievement.title === "1" ? achievement.title : (
                      <AnimatedCounter value={achievement.title} inView={inView} />
                    )}
                  </h3>
                  <p className="text-lg font-semibold mb-2">{achievement.subtitle}</p>
                </motion.div>
                
                <motion.p 
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {achievement.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}