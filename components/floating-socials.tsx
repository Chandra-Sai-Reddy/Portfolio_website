"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import Link from 'next/link'

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
      download: true
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
    >      {socials.map((social, index) => (
        <motion.div
          key={social.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        >
          {social.download ? (
            <a
              href={social.href}
              download
              className="group flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 border border-border/50"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ) : (
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 border border-border/50"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}