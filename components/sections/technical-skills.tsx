"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Cloud, 
  Code, 
  Database, 
  Cpu, 
  Shield, 
  GitBranch,
  Server,
  Container,
  Brain,
  Layers,
  Terminal,
  Monitor
} from 'lucide-react'

export function TechnicalSkills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const skillCategories = [
    {
      category: "Languages",
      icon: Code,
      color: "from-primary to-primary/70",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "Bash", "SQL", "YAML"]
    },
    {
      category: "Cloud & Infrastructure",
      icon: Cloud,
      color: "from-secondary to-secondary/70",
      skills: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS ECS", "AWS CloudFormation", "Google Cloud Platform", "Azure"]
    },
    {
      category: "DevOps & Tools",
      icon: Container,
      color: "from-primary to-primary/70",
      skills: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "GitLab CI", "Ansible"]
    },
    {
      category: "Machine Learning",
      icon: Brain,
      color: "from-secondary to-secondary/70",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLP", "Computer Vision"]
    },
    {
      category: "Databases",
      icon: Database,
      color: "from-primary to-primary/70",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Elasticsearch"]
    },
    {
      category: "Frameworks",
      icon: Layers,
      color: "from-secondary to-secondary/70",
      skills: ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "Django", "Flask"]
    },
    {
      category: "Monitoring & Security",
      icon: Shield,
      color: "from-primary to-primary/70",
      skills: ["CloudWatch", "Datadog", "Splunk", "IAM", "Security Groups", "VPC"]
    },
    {
      category: "Version Control",
      icon: GitBranch,
      color: "from-secondary to-secondary/70",
      skills: ["Git", "GitHub", "GitLab", "Bitbucket", "Code Review", "Branch Management"]
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">{category.category}</h3>
                  </div>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + skillIndex * 0.05 + 0.6
                        }}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-background/80 text-foreground/80 border border-border/50 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              <span className="font-semibold">Also experienced with:</span> REST APIs, GraphQL, Microservices, 
              CI/CD Pipelines, Agile/Scrum, Test-Driven Development, System Design, Data Structures & Algorithms
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}