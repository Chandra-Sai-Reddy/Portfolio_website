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
  Rocket,
  Monitor,
  Database,
  Cloud,
  Container,
  Brain,
  Settings
} from 'lucide-react'
import Image from 'next/image'
import { SkillProgress } from '@/components/ui/skill-progress'
import { TextReveal, StaggeredTextReveal } from '@/components/ui/text-reveal'
import { AnimatedCounter } from '@/components/ui/micro-interactions'

export function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const technicalSkillsDetailed = [
    {
      category: "Programming Languages",
      icon: Code,
      iconColor: "bg-blue-500",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
      level: "Expert",
      experience: "3+ exp",
      count: 9,
      description: "Proficient in multiple paradigms including OOP, functional, and procedural programming",
      skills: [
        { name: "JavaScript", level: "Expert", percentage: 90 },
        { name: "TypeScript", level: "Advanced", percentage: 85 },
        { name: "Python", level: "Advanced", percentage: 88 },
        { name: "Java", level: "Advanced", percentage: 85 },
        { name: "C++", level: "Advanced", percentage: 80 },
        { name: "Dart", level: "Proficient", percentage: 75 },
        { name: "Kotlin", level: "Proficient", percentage: 75 },
        { name: "Solidity", level: "Proficient", percentage: 70 },
        { name: "SQL", level: "Advanced", percentage: 85 }
      ]
    },
    {
      category: "Frontend Development", 
      icon: Settings,
      iconColor: "bg-blue-500",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
      level: "Expert",
      experience: "3+ exp", 
      count: 5,
      description: "Creating responsive, interactive, and performant user interfaces with modern frameworks",
      skills: [
        { name: "React.js", level: "Expert", percentage: 90 },
        { name: "Next.js", level: "Advanced", percentage: 85 },
        { name: "Tailwind CSS", level: "Advanced", percentage: 88 },
        { name: "Three.js", level: "Proficient", percentage: 75 },
        { name: "Android SDK", level: "Advanced", percentage: 80 }
      ]
    },
    {
      category: "Backend & Databases",
      icon: Database,
      iconColor: "bg-blue-500", 
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
      level: "Expert",
      experience: "3+ exp",
      count: 5,
      description: "Building scalable server-side applications and managing both SQL and NoSQL databases",
      skills: [
        { name: "Node.js", level: "Advanced", percentage: 88 },
        { name: "Express.js", level: "Advanced", percentage: 85 },
        { name: "Flask", level: "Proficient", percentage: 75 },
        { name: "MongoDB", level: "Advanced", percentage: 85 },
        { name: "Firebase", level: "Expert", percentage: 90 }
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      iconColor: "bg-blue-500",
      borderColor: "border-blue-500/30", 
      hoverBorder: "hover:border-blue-500/60",
      level: "Advanced",
      experience: "2+ exp",
      count: 6,
      description: "Designing and implementing cloud infrastructure with automated deployment pipelines",
      skills: [
        { name: "AWS EC2", level: "Expert", percentage: 95 },
        { name: "AWS S3", level: "Expert", percentage: 92 },
        { name: "AWS Lambda", level: "Advanced", percentage: 88 },
        { name: "AWS ECS", level: "Advanced", percentage: 85 },
        { name: "CloudFormation", level: "Advanced", percentage: 82 },
        { name: "GCP", level: "Advanced", percentage: 80 }
      ]
    },
    {
      category: "ML & Data Science",
      icon: Brain,
      iconColor: "bg-blue-500",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
      level: "Advanced", 
      experience: "2+ exp",
      count: 7,
      description: "Developing intelligent systems using machine learning and deep learning techniques",
      skills: [
        { name: "TensorFlow", level: "Advanced", percentage: 85 },
        { name: "PyTorch", level: "Advanced", percentage: 83 },
        { name: "Scikit-learn", level: "Expert", percentage: 90 },
        { name: "Keras", level: "Advanced", percentage: 82 },
        { name: "OpenCV", level: "Advanced", percentage: 80 },
        { name: "NLP", level: "Advanced", percentage: 78 },
        { name: "Computer Vision", level: "Advanced", percentage: 85 }
      ]
    },
    {
      category: "Blockchain & Web3",
      icon: Code,
      iconColor: "bg-blue-500",
      borderColor: "border-blue-500/30",
      hoverBorder: "hover:border-blue-500/60",
      level: "Advanced",
      experience: "2+ exp", 
      count: 7,
      description: "Building decentralized applications and smart contracts on blockchain platforms",
      skills: [
        { name: "Ethereum", level: "Advanced", percentage: 78 },
        { name: "Smart Contracts", level: "Advanced", percentage: 80 },
        { name: "Web3.js", level: "Proficient", percentage: 72 },
        { name: "Solidity", level: "Proficient", percentage: 70 },
        { name: "DeFi", level: "Proficient", percentage: 68 },
        { name: "NFT Development", level: "Proficient", percentage: 70 },
        { name: "Hardhat", level: "Proficient", percentage: 75 }
      ]
    }
  ]

  // Helper function to get proficiency color - Only Blue
  const getProficiencyColor = (level: string) => {
    return "text-blue-500" // All levels use blue-500
  }

  // Helper function to get progress bar color - Only Blue  
  const getProgressBarColor = (level: string) => {
    return "bg-blue-500" // All progress bars use blue-500
  }

  const technicalSkills = {
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "Bash", "SQL", "YAML", "HTML/CSS"],
    "Cloud & Infrastructure": ["AWS EC2", "AWS S3", "AWS Lambda", "AWS ECS", "CloudFormation", "Google Cloud Platform", "Azure", "Terraform"],
    "Machine Learning & AI": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLP", "Computer Vision", "Hugging Face"],
    "DevOps & Tools": ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI", "Ansible", "CI/CD", "Linux"],
    "Databases": ["MySQL", "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Elasticsearch", "SQL Server"],
    "Web Development": ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "Django", "Flask", "REST APIs", "GraphQL"],
    "Monitoring & Security": ["CloudWatch", "Datadog", "Splunk", "IAM", "VPC", "Security Groups", "SSL/TLS"],
  }
  
  // Top skills with percentages for circular progress
  const topSkills = [
    { name: "Python", percentage: 95, category: "ml" },
    { name: "AWS", percentage: 90, category: "cloud" },
    { name: "Machine Learning", percentage: 88, category: "ml" },
    { name: "React/Next.js", percentage: 85, category: "web" },
    { name: "Docker", percentage: 87, category: "devops" },
    { name: "TensorFlow", percentage: 85, category: "ml" },
  ]

  const leadershipExperiences = [
    {
      icon: BookOpen,
      title: "Research Assistantship",
      organization: "Georgia State University",
      period: "Jan 2025 - Present",
      highlights: [
        "Working on Non-disclosable project",
        "Conducting research in advanced machine learning and AI applications",
        "Collaborating with faculty on cutting-edge research initiatives"
      ]
    },
    {
      icon: Users,
      title: "Board Member",
      organization: "App Design and Development Club",
      period: "2023 - 2024",
      highlights: [
        "Led technical initiatives and mentored junior developers to improve their programming skills",
        "Mentored 15+ junior developers",
        "Improved core programming skills by 68%",
        "Conducted tailored workshops and code reviews",
        "Implemented project-based training programs"
      ]
    },
    {
      icon: Users,
      title: "Technical Lead",
      organization: "SRM - AP University",
      period: "Aug 2024 - Present",
      highlights: [
        "Led a team of 5 developers in building an AI-powered healthcare platform",
        "Reduced deployment time by 60% through microservices architecture",
        "Mentored junior developers on AWS best practices and ML implementations"
      ]
    },
    {
      icon: Rocket,
      title: "Core Member of MORSE Studio",
      organization: "Mobile and Robotics Systems Experiential Research Lab in GSU",
      period: "Sep 2024 - Present",
      highlights: [
        "Contributing to mobile and robotics systems research",
        "Developing innovative solutions for real-world applications",
        "Collaborating with interdisciplinary teams on research projects"
      ]
    },
    {
      icon: Briefcase,
      title: "Cloud Architecture Mentor",
      organization: "Georgia State University Tech Club",
      period: "Sep 2024 - Present",
      highlights: [
        "Conducted 10+ workshops on cloud computing and DevOps practices",
        "Mentored 15+ students in AWS certification preparation",
        "Organized hackathons with 50+ participants"
      ]
    },
    {
      icon: Code,
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
      title: "AWS Certified Solutions Architect and FinOps",
      description: "Professional certification demonstrating cloud architecture expertise",
      year: "2025"
    },
    {
      icon: Star,
      title: "Dean's List (Out of State Tuition Waiver)",
      description: "Recognized for academic excellence with GPA above 3.8",
      year: "2024-2025"
    },
    {
      icon: Target,
      title: "Hackathon Winner",
      description: "1st place in Hack SRM - AP Hackathon for healthcare solution",
      year: "2024"
    },
    {
      icon: Trophy,
      title: "App Development Hackathon Winner",
      description: "Winner of App Development Hackathon organized by SRM University AP",
      year: "2023"
    },
    {
      icon: Award,
      title: "Top 5 University Hackathon",
      description: "Top 5 teams at University Level Hackathon among 180+ Teams organized by SRM-AP",
      year: "2023-2024"
    },
    {
      icon: Users,
      title: "Chapter Leadership",
      description: "Led an 80+ member chapter in achieving goals focused on community service, academics, and unit improvement",
      year: "2023-2024"
    },
    {
      icon: Trophy,
      title: "School Games Federation - Cricket Captain",
      description: "1st Place Andhra Pradesh Cricket - Won as Captain of SRM University AP Cricket team",
      year: "2023-2024"
    },
    {
      icon: Briefcase,
      title: "Events Convenor - Student Council",
      description: "Elected to represent over 8000 students of SRM AP for two consecutive years. Successfully organised cultural and technical events",
      year: "2023-2024"
    },
    {
      icon: BookOpen,
      title: "MUN Conference Organizing Head",
      description: "Hosted and organised the first ever Model United Nations Conference in SRM University AP",
      year: "2023"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-foreground text-center">About Me</h2>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 mb-12"
          />
          
          {/* Top Section - About Me Text and Photo - Perfectly Aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto mb-20">
            {/* Left Side - About Me Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-foreground leading-relaxed text-sm md:text-base mb-4">
                  I'm Chandra Sai Reddy, a <span className="text-blue-500 font-semibold">Cloud and DevOps Engineer</span> with a passion for building scalable cloud-native solutions and exploring the intersection of cloud computing and machine learning. I'm currently pursuing my Master's in Computer Science at Georgia State University, where I continue to deepen my expertise in distributed systems, automation, and AI-driven applications.
                </p>
                <p className="text-foreground leading-relaxed text-sm md:text-base mb-4">
                  With hands-on experience in <span className="text-blue-500 font-semibold">AWS, Kubernetes, Terraform, and CI/CD pipelines</span>, I enjoy designing solutions that are both cost-effective and high-performing. My work has spanned from deploying AI-powered real-time decision systems to architecting secure, efficient infrastructure pipelines — always with a focus on scalability and optimization.
                </p>
                <p className="text-foreground leading-relaxed text-sm md:text-base">
                  I'm particularly interested in <span className="text-blue-500 font-semibold">MLOps and cloud automation</span>, where I've developed projects ranging from a patent-published cancer classification pipeline to award-winning NLP-based applications. I thrive on turning complex challenges into innovative solutions that make technology more accessible and impactful.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Photo - Aligned with Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center lg:justify-start lg:sticky lg:top-24"
            >
              {/* Profile Photo - Matching text alignment */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-full lg:max-w-sm lg:h-auto lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/Profile_photo.JPG" 
                  alt="Chandra Sai Reddy"
                  width={400}
                  height={400}
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
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">Education</h3>
            
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 mb-8"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Master's Degree */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm md:text-base text-foreground">Master of Science in Computer Science</h4>
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
                  <div className="p-2 rounded-lg bg-primary shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm md:text-base text-foreground">Bachelor of Technology in Computer Science</h4>
                    <p className="text-primary font-medium mt-1">SRM - AP</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Aug 2020 - May 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Vijayawada, India
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary mt-3">GPA: 8.5/10</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Skills Section - Card Design */}
          <motion.div
            id="technical-skills"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-foreground">
              Technical Skills
            </h3>
            
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 mb-12"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {technicalSkillsDetailed.map((category, index) => {
                const averageProficiency = Math.round(
                  category.skills.reduce((acc, skill) => acc + skill.percentage, 0) / category.skills.length
                )

                return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`bg-card/90 backdrop-blur-sm border ${category.borderColor} rounded-2xl p-6 ${category.hoverBorder} transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10`}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${category.iconColor} rounded-xl shadow-lg`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm md:text-base">{category.category}</h4>
                        <span className="text-xs text-muted-foreground">{category.count} skills</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">{category.level}</div>
                      <div className="text-xs text-muted-foreground">{category.experience}</div>
                    </div>
                  </div>

                  {/* Category Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills with Progress Bars */}
                  <div className="space-y-3 mb-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 + skillIndex * 0.05 }}
                        className="space-y-2"
                      >
                        {/* Skill Name and Level */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className={`text-xs font-semibold ${getProficiencyColor(skill.level)}`}>
                            {skill.level} {skill.percentage}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-background/50 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.percentage}%` } : {}}
                            transition={{ 
                              duration: 1, 
                              delay: 0.8 + index * 0.1 + skillIndex * 0.05,
                              ease: "easeOut" 
                            }}
                            className={`h-full rounded-full ${getProgressBarColor(skill.level)}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Average Proficiency Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="border-t border-border/30 pt-4 mt-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Proficiency</span>
                      <span className="text-sm md:text-base font-bold text-primary">{averageProficiency}%</span>
                    </div>
                  </motion.div>
                </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Leadership & Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">Leadership & Experience</h3>
            
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 mb-8"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                    <div className="p-2 rounded-lg bg-primary shrink-0">
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
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">Achievements & Recognition</h3>
            
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 mb-8"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="flex items-start gap-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-primary shrink-0">
                    <achievement.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-foreground flex-1">{achievement.title}</h4>
                      <span className="text-xs text-primary font-medium shrink-0 min-w-[70px] text-right">{achievement.year}</span>
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