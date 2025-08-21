"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  User, 
  Award, 
  Users, 
  Target, 
  Code,
  GraduationCap,
  Calendar,
  MapPin,
  Trophy,
  Star,
  Briefcase,
  BookOpen,
  TrendingUp,
  Rocket
} from 'lucide-react'
import Image from 'next/image'

export function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const technicalSkills = {
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "Bash", "SQL", "YAML", "HTML/CSS"],
    "Cloud & Infrastructure": ["AWS EC2", "AWS S3", "AWS Lambda", "AWS ECS", "CloudFormation", "Google Cloud Platform", "Azure", "Terraform"],
    "Machine Learning & AI": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLP", "Computer Vision", "Hugging Face"],
    "DevOps & Tools": ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI", "Ansible", "CI/CD", "Linux"],
    "Databases": ["MySQL", "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Elasticsearch", "SQL Server"],
    "Web Development": ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "Django", "Flask", "REST APIs", "GraphQL"],
    "Monitoring & Security": ["CloudWatch", "Datadog", "Splunk", "IAM", "VPC", "Security Groups", "SSL/TLS"],
  }

  const leadershipExperiences = [
    {
      icon: Users,
      title: "Technical Lead",
      organization: "University Capstone Project",
      period: "Aug 2024 - Present",
      highlights: [
        "Led a team of 5 developers in building an AI-powered healthcare platform",
        "Reduced deployment time by 60% through microservices architecture",
        "Mentored junior developers on AWS best practices and ML implementations"
      ]
    },
    {
      icon: Briefcase,
      title: "Cloud Architecture Mentor",
      organization: "Georgia State University Tech Club",
      period: "Jan 2024 - Present",
      highlights: [
        "Conducted 10+ workshops on cloud computing and DevOps practices",
        "Mentored 15+ students in AWS certification preparation",
        "Organized hackathons with 50+ participants"
      ]
    },
    {
      icon: Rocket,
      title: "Open Source Contributor",      organization: "Various ML/AI Projects",
      period: "2023 - Present",
      highlights: [
        "Contributed to 5+ open-source ML projects on GitHub",
        "Received 100+ stars on personal AI/ML repositories",
        "Active contributor to TensorFlow and PyTorch communities"
      ]
    }
  ]

  const achievements = [
    {
      icon: Trophy,
      title: "Patent Published",
      description: "Patent No: 202441089264 for innovative cancer classification using RNN",
      year: "2024"
    },
    {
      icon: Award,
      title: "AWS Certified Solutions Architect",
      description: "Professional certification demonstrating cloud architecture expertise",
      year: "2024"
    },
    {
      icon: Star,
      title: "Dean's List",
      description: "Recognized for academic excellence with GPA above 3.8",
      year: "2024-2025"
    },
    {
      icon: Target,
      title: "Hackathon Winner",
      description: "1st place in Georgia Tech AI Hackathon for healthcare solution",
      year: "2024"
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mb-12"></div>
          
          {/* Top Section - About Me Text and Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-20">
            {/* Left Side - About Me Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate <span className="text-primary font-semibold">Machine Learning Engineer</span> and <span className="text-secondary font-semibold">Cloud Architect</span> currently pursuing my Master's in Computer Science at Georgia State University.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With expertise in building scalable ML systems and cloud infrastructure, I specialize in transforming complex data challenges into innovative solutions. My experience spans from developing real-time fraud detection systems to implementing MLOps pipelines that reduced deployment time by 75%.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I'm particularly interested in the intersection of <span className="text-accent font-semibold">AI/ML and cloud computing</span>, focusing on building production-ready systems that can scale efficiently. My recent work includes developing computer vision models for healthcare applications and optimizing cloud infrastructure for ML workloads.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me contributing to open-source projects, mentoring aspiring developers, or exploring the latest advancements in AI research. I believe in continuous learning and sharing knowledge with the tech community.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              {/* Profile Photo */}
              <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/Profile_photo.JPG" 
                  alt="Chandra Sai Reddy"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Education Section - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Master's Degree */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground">Master of Science in Computer Science</h4>
                    <p className="text-primary font-medium mt-1">Georgia State University</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Aug 2024 - May 2026
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Atlanta, GA
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary mt-3">GPA: 3.9/4.0</p>
                  </div>
                </div>
              </div>
              
              {/* Bachelor's Degree */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-primary shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground">Bachelor of Technology in Computer Science</h4>
                    <p className="text-secondary font-medium mt-1">VNR VJIET</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        2019 - 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Hyderabad, India
                      </span>
                    </div>
                    <p className="text-sm font-medium text-secondary mt-3">GPA: 8.5/10</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Skills Section - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Technical Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {Object.entries(technicalSkills).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <h4 className="font-semibold text-primary mb-4">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-background/80 text-foreground/80 border border-border/50 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership & Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Leadership & Experience</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {leadershipExperiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary shrink-0">
                      <exp.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-sm text-primary">{exp.organization}</p>
                      <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Achievements & Recognition</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="flex items-start gap-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary shrink-0">
                    <achievement.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                      <span className="text-xs text-primary font-medium">{achievement.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}