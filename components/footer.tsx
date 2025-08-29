"use client"

import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-500 mb-2">
              CSR
            </h3>
            <p className="text-muted-foreground text-sm">
              Machine Learning & Cloud Engineer
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Building intelligent systems at scale
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-blue-500 transition-colors text-sm">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-blue-500 transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-muted-foreground hover:text-blue-500 transition-colors text-sm">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-blue-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/Chandra-Sai-Reddy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border/50 hover:border-primary hover:text-blue-500 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/chandra-sai-reddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border/50 hover:border-primary hover:text-blue-500 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:donthireddy.chandu@gmail.com"
                className="p-2 rounded-lg border border-border/50 hover:border-primary hover:text-blue-500 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              donthireddy.chandu@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Chandra Sai Reddy. All rights reserved.
          </p>
          
          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </footer>
  )
}