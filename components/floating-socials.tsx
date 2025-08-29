"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function FloatingSocials() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const socials = [
    {
      icon: Github,
      href: 'https://github.com/Chandra-Sai-Reddy',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/chandra-sai-reddy/',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:donthireddy.chandu@gmail.com',
      label: 'Email',
    },
    {
      icon: FileText,
      href: '/contact#resume', // Link to resume section in contact page
      label: 'Resume',
    },
  ]
  
  if (!mounted) return null

  return (
    <>
      {/* Vertical Social Sidebar - Fixed Position on All Pages */}
      <div
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[999999] flex flex-col items-center gap-4"
        style={{ 
          position: 'fixed',
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        {/* Social Icons */}
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative p-3 md:p-3.5 bg-background/95 backdrop-blur-md border-2 border-border rounded-xl hover:border-blue-500 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 5 }}
              aria-label={`Visit ${social.label} profile`}
              title={social.label}
            >
              <social.icon className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover:text-blue-400 transition-colors" />
              
              {/* Tooltip - More Visible */}
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm border border-blue-500/50 rounded-lg text-sm text-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg shadow-blue-500/20">
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Vertical line connecting to bottom */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 80, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent"
        />
      </div>

      {/* Mobile Contact FAB - Bottom Right (Only on small mobile) */}
      <div 
        className="fixed bottom-20 right-6 z-[999999] sm:hidden"
        style={{ 
          position: 'fixed',
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Link
            href="/contact"
            className="group relative flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            data-cursor-magnetic
            aria-label="Contact me"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contact</span>
          </Link>
        </motion.div>
      </div>

      {/* Desktop Contact CTA - Right Side */}
    </>
  )
}
