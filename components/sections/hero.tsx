"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Code, Cloud, Brain, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TextReveal } from '@/components/ui/text-reveal'
import { MagneticButton } from '@/components/ui/micro-interactions'
import { HUDStats } from '@/components/ui/hud-stats'

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  
  const roles = [
    "Machine Learning Engineer",
    "Cloud Architect",
    "AWS Specialist",
    "MLOps Engineer",
    "Full Stack Developer"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid Perspective Background */}
      <div className="grid-perspective" />
      
      {/* Digital Rain Effect */}
      <div className="digital-rain opacity-30" />
      
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

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 text-primary/20"
      >
        <Code size={40} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-32 text-primary/20"
      >
        <Cloud size={50} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-32 text-primary/20"
      >
        <Brain size={45} />
      </motion.div>

      <div className="container mx-auto px-4 z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{ y: y1 }}
        >
          {/* Main heading with Text Reveal */}
          <TextReveal>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-primary">
                Chandra Sai Reddy
              </span>
            </motion.h1>
          </TextReveal>

          {/* Rotating roles with minimal styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-12 md:h-16 mb-6"
          >
            <div className="relative overflow-hidden h-full flex items-center justify-center">
              {roles.map((role, index) => (
                <div
                  key={role}
                  className={`absolute transition-all duration-500 transform ${
                    index === currentRoleIndex
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <h2 className="text-2xl md:text-4xl font-light text-muted-foreground">
                    {role}
                  </h2>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Minimal description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-2 font-light"
          >
            Building scalable cloud architectures and intelligent systems
          </motion.p>

          {/* Education status - subtle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-md md:text-lg text-muted-foreground/60 mb-12"
          >
            Master's in Computer Science • Georgia State University
          </motion.p>

          {/* CTA Buttons - Monochrome style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent text-foreground border border-border rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Minimal scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-primary rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}