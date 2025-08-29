"use client"

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TextReveal } from '@/components/ui/text-reveal'
import { MagneticButton } from '@/components/ui/micro-interactions'
import { HUDStats } from '@/components/ui/hud-stats'

export function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const roles = [
    "Full Stack Developer",
    "Cloud Architect",
    "ML Engineer",
    "DevOps Specialist"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 5000) // Increased from 3000ms to 5000ms for better readability
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid Perspective Background - Primary Effect */}
      <div className="grid-perspective" />
      
      {/* Digital Rain Effect - Disabled for performance, uncomment if needed */}
      {/* <div className="digital-rain opacity-30" /> */}
      
      {/* Minimalist Grid Background */}
      <div className="absolute inset-0 bg-background circuit-pattern">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Subtle Blue Gradient Accents */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: y2 }}
      >
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Content - Centered */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div 
              className="space-y-8 max-w-5xl"
              style={{ y: y1 }}
            >
              {/* Greeting and Name - Mobile Optimized with Larger Fonts */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                <span className="text-foreground font-normal text-3xl md:text-5xl lg:text-6xl">Hi, I'm</span>{' '}
                <br className="md:hidden" />
                <span className="text-blue-500">
                  Chandra Sai Reddy
                </span>
              </motion.h1>

              {/* Mobile-Optimized Role Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative h-14 md:h-16 lg:h-20 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRoleIndex}
                    initial={{ 
                      opacity: 0,
                      y: 20,
                      filter: 'blur(10px)'
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)'
                    }}
                    exit={{ 
                      opacity: 0,
                      y: -20,
                      filter: 'blur(10px)'
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative">
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl" />
                      
                      {/* Mobile-optimized text sizing - Increased for better readability */}
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold relative">
                        <span className="text-foreground">
                          {roles[currentRoleIndex]}
                        </span>
                      </h2>
                      
                      {/* Decorative elements */}
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-gradient-to-r from-transparent to-blue-500" />
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-gradient-to-l from-transparent to-blue-500" />
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Static decorative dots below */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {roles.map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: index === currentRoleIndex ? 1.5 : 1,
                        opacity: index === currentRoleIndex ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Specialization */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-12"
              >
                Specializing in AWS cloud architecture, machine learning solutions, and DevOps automation
              </motion.p>


            </motion.div>

            {/* HUD Stats - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 w-full max-w-4xl"
            >
              <HUDStats
                stats={[
                  { label: 'Projects', value: 15, suffix: '+' },
                  { label: 'Patents', value: 1 },
                  { label: 'Experience', value: 2, suffix: ' Years' },
                  { label: 'Technologies', value: 30, suffix: '+' }
                ]}
              />
            </motion.div>

            {/* Mobile-Optimized CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col gap-4 mt-12 justify-center max-w-sm sm:max-w-none mx-auto sm:flex-row"
            >
              <Link
                href="/projects"
                className="group px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium flex items-center justify-center gap-2 touch-manipulation min-h-[48px]"
                data-cursor-magnetic
                data-cursor-text="Explore"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4 bg-transparent text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium flex items-center justify-center gap-2 touch-manipulation min-h-[48px] relative overflow-hidden"
                data-cursor-magnetic
                data-cursor-text="Connect"
              >
                <span className="relative z-10">Let's Work Together</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
              </Link>
            </motion.div>
          </div>

          {/* Minimal scroll indicator - Centered at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted/50 rounded-full flex justify-center"
            >
              <motion.div 
                animate={{ y: [2, 8, 2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-blue-500 rounded-full mt-2" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
