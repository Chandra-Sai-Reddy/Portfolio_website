"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'

export function FloatingSocials() {
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
      href: '/resume.pdf',
      label: 'Resume',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-8 bottom-8 z-40 hidden lg:flex flex-col gap-4"
    >
      {socials.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target={social.href.startsWith('http') ? '_blank' : undefined}
          rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="group relative p-3 bg-background border border-white/10 rounded-lg hover:border-primary transition-all duration-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
          whileHover={{ x: 5 }}
          aria-label={social.label}
        >
          <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          
          {/* Tooltip */}
          <span className="absolute left-full ml-3 px-2 py-1 bg-background border border-white/10 rounded text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {social.label}
          </span>
        </motion.a>
      ))}
      
      {/* Vertical line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 100 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="w-px bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-4"
      />
    </motion.div>
  )
}