"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { allExperiences } from '@/data/experience'
import { Calendar, MapPin, Building, ChevronDown, Briefcase, Users, Microscope } from 'lucide-react'
import { useState } from 'react'
import { TextReveal } from '@/components/ui/text-reveal'

// Define experience categories
type ExperienceCategory = 'all' | 'work' | 'leadership' | 'research'

// Function to parse date from duration string
function parseDateFromDuration(duration: string): Date {
  // Extract the start date from duration string like "January 2024 – Present"
  const monthMap: { [key: string]: number } = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  // Handle "Present" or "Ongoing" as current date
  if (duration.includes('Present') || duration.includes('Ongoing')) {
    return new Date(); // Current date for ongoing positions
  }
  
  // Extract month and year from the start of duration
  const parts = duration.split('–')[0].trim().split(' ');
  const monthName = parts[0];
  const yearStr = parts[1];
  
  // Get month number, default to January if not found
  const month = monthMap[monthName] !== undefined ? monthMap[monthName] : 0;
  // Parse year, default to 2020 if not found
  const year = parseInt(yearStr) || 2020;
  
  return new Date(year, month);
}

// Sort experiences by date (newest first)
function sortExperiencesByDate(experiences: typeof allExperiences) {
  return [...experiences].sort((a, b) => {
    const dateA = parseDateFromDuration(a.duration);
    const dateB = parseDateFromDuration(b.duration);
    return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
  });
}

export function ExperienceTabbed() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<ExperienceCategory>('all')
  
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // Filter and sort experiences based on active tab
  const getFilteredExperiences = () => {
    let filtered = activeTab === 'all' 
      ? allExperiences 
      : allExperiences.filter(exp => exp.category?.includes(activeTab) || (activeTab === 'work' && !exp.category));
    
    // Sort by date (newest first)
    return sortExperiencesByDate(filtered);
  }
  
  const filteredExperiences = getFilteredExperiences();

  // Tab configuration with counts
  const tabs = [
    { id: 'all' as ExperienceCategory, label: 'All', icon: null, count: allExperiences.length },
    { id: 'work' as ExperienceCategory, label: 'Work', icon: Briefcase, count: allExperiences.filter(exp => exp.category?.includes('work') || !exp.category).length },
    { id: 'leadership' as ExperienceCategory, label: 'Leadership', icon: Users, count: allExperiences.filter(exp => exp.category?.includes('leadership')).length },
    { id: 'research' as ExperienceCategory, label: 'Research', icon: Microscope, count: allExperiences.filter(exp => exp.category?.includes('research')).length },
  ]

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Experience</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              My professional journey in development and research
            </p>
          </TextReveal>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex gap-2 p-1.5 bg-muted/50 backdrop-blur-sm rounded-xl border border-border/50">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active tab background */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-card shadow-sm rounded-lg border border-border/50"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                  
                  {/* Tab content */}
                  <span className="relative flex items-center gap-2">
                    {tab.icon && <tab.icon className="h-4 w-4" />}
                    {tab.label}
                    {tab.count > 0 && (
                      <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                        activeTab === tab.id 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Animated timeline line */}
            {filteredExperiences.length > 0 && (
              <motion.div 
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-primary/20"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ originY: 0 }}
              />
            )}
            
            {/* Experience Cards */}
            <AnimatePresence mode="sync">
              {filteredExperiences.length > 0 ? (
                filteredExperiences.map((exp, index) => (
                  <motion.div
                    key={`${activeTab}-${exp.id}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative mb-12 last:mb-0"
                  >
                    {/* Timeline dot with pulse animation */}
                    <motion.div 
                      className="absolute left-8 top-8 w-4 h-4 -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    >
                      <div className="w-4 h-4 bg-primary rounded-full relative">
                        <motion.div
                          className="absolute inset-0 bg-primary rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Experience card */}
                    <div className="pl-16">
                      <motion.div 
                        className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 cursor-pointer group"
                        onClick={() => toggleExpand(index)}
                        whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)' }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{exp.duration}</span>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          </motion.div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4 text-muted-foreground">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{exp.company}</span>
                          </div>
                          <span className="hidden md:inline">•</span>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        
                        {/* Expandable content */}
                        <AnimatePresence>
                          {expandedIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ul className="space-y-2 mb-4">
                                {exp.description.map((desc, i) => (
                                  <motion.li 
                                    key={i} 
                                    className="flex items-start"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    <span className="text-muted-foreground">{desc}</span>
                                  </motion.li>
                                ))}
                              </ul>
                              
                              <motion.div 
                                className="flex flex-wrap gap-2"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {exp.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Collapsed preview */}
                        {expandedIndex !== index && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {exp.technologies.length > 4 && (
                              <span className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                                +{exp.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              ) : (
                /* Empty state */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground">
                    No {activeTab === 'all' ? 'experiences' : activeTab} experiences available yet.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}