"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradients */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: y2 }}
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </motion.div>


      <div className="container mx-auto px-4 z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{ y: y1 }}
        >
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
              Chandra Sai Reddy
            </span>
          </motion.h1>

          {/* Rotating roles */}
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
                  <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground">
                    {role}
                  </h2>
                </div>
              ))}
            </div>
          </motion.div>

          {/* One-liner description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-2"
          >
            Specializing in AWS cloud architecture, machine learning solutions, and DevOps automation.
          </motion.p>

          {/* Education status */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-md md:text-lg text-muted-foreground/80 mb-12 italic"
          >
            Master's in Computer Science Student
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-all duration-200 font-medium"
            >
              Get In Touch
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}