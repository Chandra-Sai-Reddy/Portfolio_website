"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { education, achievements } from '@/data/education'
import { GraduationCap, Trophy, Calendar, MapPin } from 'lucide-react'

export function Education() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-20 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Education & Achievements</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="bg-card border border-border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-2">{edu.degree}</h4>
                  <p className="text-primary mb-2">{edu.field}</p>
                  <p className="font-medium mb-2">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.location} • {edu.duration}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}