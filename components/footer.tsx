"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, Copyright, ExternalLink, Heart } from 'lucide-react'

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/Chandra-Sai-Reddy", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/chandra-sai-reddy/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:donthireddy.chandu@gmail.com", label: "Email" },
    { icon: Phone, href: "tel:+16786150897", label: "Phone" }
  ]

  const quickLinks = [
    { href: "/about", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/resume.pdf", label: "Resume", external: true }
  ]

  return (
    <motion.footer 
      className="w-full pt-12 pb-4 border-t bg-background/60 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3 
              className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Chandra Sai Reddy
            </motion.h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Machine Learning & Cloud Engineer based in Atlanta,
              specialized in AWS, MLOps, and scalable AI solutions.
            </p>
          </motion.div>          
          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {link.external ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      {link.label} <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Connect */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-bold">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-bold">Contact Info</h3>
            <motion.div 
              className="space-y-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p whileHover={{ x: 5 }} className="cursor-default">
                Atlanta, Georgia, USA
              </motion.p>
              <motion.p whileHover={{ x: 5 }} className="cursor-default">
                +1 (678) 615-0897
              </motion.p>
              <motion.p whileHover={{ x: 5 }} className="cursor-default">
                donthireddy.chandu@gmail.com
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div 
          className="mt-12 border-t pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              className="flex items-center text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              <Copyright className="mr-1 h-3.5 w-3.5" />
              <span>{new Date().getFullYear()} Chandra Sai Reddy. All rights reserved.</span>
            </motion.div>
            <motion.div 
              className="text-sm text-muted-foreground flex items-center gap-1.5"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Built with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
              </motion.div>
              <span>using Next.js & TypeScript</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}