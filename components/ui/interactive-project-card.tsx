"use client"

import { useState, useRef, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink, Award, Code, Play, Pause } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface InteractiveProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    longDescription?: string
    achievements?: string[]
    technologies: string[]
    github?: string
    liveUrl?: string
    patent?: string
    featured?: boolean
    previewVideo?: string
    previewImage?: string
    stats?: {
      stars?: number
      forks?: number
      commits?: number
    }
  }
  index: number
}

export function InteractiveProjectCard({ project, index }: InteractiveProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]))
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    mouseX.set((x - width / 2) / width)
    mouseY.set((y - height / 2) / height)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }
  
  const toggleVideo = () => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group"
    >
      <div className="relative glass-card-hover neon-border rounded-xl overflow-hidden bg-card/40 backdrop-blur-md">
        {/* Subtle gradient overlay - much darker */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
        </div>
        
        {/* Preview section */}
        {(project.previewVideo || project.previewImage) && (
          <div className="relative h-48 overflow-hidden bg-card/50">
            {project.previewVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={project.previewVideo}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                />
                <button
                  onClick={toggleVideo}
                  className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur rounded-full hover:bg-black/70 transition-colors"
                  data-cursor-magnetic
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={project.previewImage || '/placeholder-project.jpg'}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Live indicator */}
            {project.liveUrl && (
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-500/80 backdrop-blur rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-xs font-semibold">LIVE</span>
              </div>
            )}
          </div>
        )}
        
        {/* Content section */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {project.featured && (
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider">
                    Featured Project
                  </span>
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2 text-white">
                {project.title}
              </h3>
              
              {project.patent && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur rounded-full text-xs mb-3">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Patent: {project.patent}
                </div>
              )}
            </div>
            
            {/* Stats */}
            {project.stats && (
              <div className="flex gap-3 text-xs text-muted-foreground">
                {project.stats.stars && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {project.stats.stars}
                  </div>
                )}
                {project.stats.forks && (
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500">⑂</span>
                    {project.stats.forks}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 5).map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="px-3 py-1 text-xs bg-primary/10 backdrop-blur border border-primary/20 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all cursor-default"
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-3 py-1 text-xs bg-muted/50 backdrop-blur rounded-full">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
          
          {/* Achievements with animation */}
          {project.achievements && isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 space-y-2"
            >
              {project.achievements.slice(0, 2).map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{achievement}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                data-cursor-text="View Code"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </Link>
            )}
            
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                data-cursor-text="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </Link>
            )}
            
            <button
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 backdrop-blur border border-primary/20 hover:border-primary/40 rounded-lg transition-all"
              data-cursor-magnetic
            >
              <Code className="w-4 h-4" />
              <span className="text-sm">Explore</span>
            </button>
          </div>
        </div>
        
        {/* 3D depth layers */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  )
}
