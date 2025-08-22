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
      skills: ["Python", "JavaScript", "TypeScript", "Java", "Bash", "SQL", "YAML"]
    },
    {
      category: "Cloud & Infrastructure",
      icon: Cloud,
      skills: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS ECS", "AWS CloudFormation", "Google Cloud Platform", "Azure"]
    },
    {
      category: "DevOps & Tools",
      icon: Container,
      skills: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "GitLab CI", "Ansible"]
    },
    {
      category: "Machine Learning",
      icon: Brain,
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLP", "Computer Vision"]
    },
    {
      category: "Databases",
      icon: Database,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Elasticsearch"]
    },
    {
      category: "Frameworks",
      icon: Layers,
      skills: ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "Django", "Flask"]
    },
    {
      category: "Monitoring & Security",
      icon: Shield,
      skills: ["CloudWatch", "Datadog", "Splunk", "IAM", "Security Groups", "VPC"]
    },
    {
      category: "Version Control",
      icon: GitBranch,
      skills: ["Git", "GitHub", "GitLab", "Bitbucket", "Code Review", "Branch Management"]
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            className="w-20 h-0.5 bg-primary mx-auto mb-12"
            initial={{ width: 0 }}
            animate={inView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {category.category}
                    </h3>
                  </div>
                  
                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}