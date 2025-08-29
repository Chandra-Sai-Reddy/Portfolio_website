"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { KineticText } from '@/components/ui/kinetic-text'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Cloud, 
  Code, 
  Database, 
  Container,
  Brain,
  Terminal,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react'



export function TechnicalSkills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  // State to track expanded skill categories
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  
  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedCategories(newExpanded)
  }

  const skillCategories = [
    {
      category: "Languages",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      proficiency: "Expert",
      years: "3+",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "Bash", "SQL", "YAML"]
    },
    {
      category: "Cloud & Infrastructure", 
      icon: Cloud,
      color: "from-blue-500 to-blue-600",
      proficiency: "Advanced",
      years: "2+",
      skills: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS ECS", "CloudFormation", "GCP", "Azure"]
    },
    {
      category: "DevOps & Tools",
      icon: Container,
      color: "from-blue-500 to-blue-600", 
      proficiency: "Expert",
      years: "3+",
      skills: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "GitLab CI", "Ansible"]
    },
    {
      category: "Machine Learning",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
      proficiency: "Advanced", 
      years: "2+",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLP", "Computer Vision"]
    },
    {
      category: "Databases",
      icon: Database,
      color: "from-blue-500 to-blue-600",
      proficiency: "Expert",
      years: "3+", 
      skills: ["MySQL", "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Elasticsearch"]
    },
    {
      category: "Frameworks",
      icon: Terminal,
      color: "from-blue-500 to-blue-600",
      proficiency: "Advanced",
      years: "2+",
      skills: ["React", "Next.js", "Node.js", "FastAPI", "Flask", "Django", "Spring Boot"]
    }
  ]



  return (
    <section ref={ref} className="py-24 bg-muted/30 relative overflow-hidden" aria-labelledby="skills-heading">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >


          <h2 id="skills-heading" className="text-2xl md:text-3xl font-bold mb-4">
            <KineticText
              text="Technical Skills"
              className="text-foreground"
              scramble={false}
              gradient={false}
            />
          </h2>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-3xl mx-auto text-sm leading-relaxed"
          >
            From building intelligent systems to managing cloud infrastructure at scale.
            <br />
            <span className="text-blue-500 font-medium">Here's how I can help your business grow.</span>
          </motion.p>
        </motion.div>

        {/* Key Strengths Overview - Better Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto"
        >
          <div className="text-center glass-card p-8 rounded-xl group hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-3">95%</div>
            <div className="text-sm text-muted-foreground font-medium">Cloud Architecture Expertise</div>
          </div>
          <div className="text-center glass-card p-8 rounded-xl group hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-3">88%</div>
            <div className="text-sm text-muted-foreground font-medium">ML/AI Implementation</div>
          </div>
          <div className="text-center glass-card p-8 rounded-xl group hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-3">92%</div>
            <div className="text-sm text-muted-foreground font-medium">DevOps Automation</div>
          </div>
        </motion.div>



        {/* Performance-Optimized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="group relative will-change-transform"
              whileHover={{ y: -2 }}
            >
              <div className="glass-card-hover neon-border rounded-xl p-6 md:p-8 touch-manipulation gpu-accelerated">
                {/* Mobile-optimized header */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${category.color} bg-opacity-20 group-hover:scale-105 transition-transform will-change-transform`}>
                      <category.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">{category.category}</h3>
                      <div className="text-xs md:text-sm text-primary font-medium">{category.proficiency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{category.years} exp</div>
                  </div>
                </div>
                
                {/* Mobile-optimized skills list */}
                <div className="space-y-2 md:space-y-3">
                  {(expandedCategories.has(category.category) ? category.skills : category.skills.slice(0, 5))
                    .map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.2, 
                        delay: categoryIndex * 0.05 + skillIndex * 0.02 
                      }}
                      className="flex items-center gap-3 group/skill cursor-default touch-manipulation"
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 group-hover/skill:scale-125 transition-transform will-change-transform" />
                      <span className="text-sm md:text-base text-muted-foreground group-hover/skill:text-foreground transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                  
                  {/* Expandable toggle button */}
                  {category.skills.length > 5 && (
                    <motion.button
                      onClick={() => toggleCategory(category.category)}
                      className="flex items-center gap-2 text-xs text-blue-500 hover:text-blue-400 transition-colors mt-3 group/expand touch-manipulation min-h-[32px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {expandedCategories.has(category.category) ? (
                        <>
                          <ChevronUp className="w-3 h-3 group-hover/expand:translate-y-[-1px] transition-transform" />
                          <span>Show Less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3 group-hover/expand:translate-y-[1px] transition-transform" />
                          <span>+{category.skills.length - 5} more</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
                
                {/* Performance-optimized hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none will-change-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* What Sets Me Apart - Streamlined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
            Why Choose Me
          </h3>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-xl group hover:scale-105 transition-all duration-300">
              <h4 className="font-semibold mb-3 text-blue-500 text-sm">💰 Proven Cost Savings</h4>
              <p className="text-muted-foreground leading-relaxed">
                Reduced cloud infrastructure costs by 30-50% through intelligent architecture and optimization.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl group hover:scale-105 transition-all duration-300">
              <h4 className="font-semibold mb-3 text-blue-500 text-sm">🚀 Full-Stack Expertise</h4>
              <p className="text-muted-foreground leading-relaxed">
                Handle everything from initial design to production deployment and monitoring.
              </p>
            </div>
          </div>
        </motion.div>



        {/* Prominent View All Skills CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="text-center">
            <Link
              href="/about#technical-skills"
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-blue-500 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              data-cursor-magnetic
              data-cursor-text="View Skills"
            >
              <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>View all skills</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
