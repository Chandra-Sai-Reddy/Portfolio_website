export interface Education {
  id: string
  degree: string
  field: string
  school: string
  location: string
  duration: string
  description?: string
}

export const education: Education[] = [
  {
    id: "masters",
    degree: "Master of Science",
    field: "Computer Science",
    school: "Georgia State University",
    location: "Atlanta, Georgia, USA",
    duration: "Expected May 2026",
    description: "Focus on Machine Learning, Cloud Computing, and Distributed Systems"
  },
  {
    id: "bachelors",
    degree: "Bachelor of Science",
    field: "Computer Science",
    school: "SRM University - AP",
    location: "Vijayawada, AP, India",
    duration: "April 2024",
    description: "Graduated with focus on Software Engineering and AI"
  }
]

export interface Achievement {
  id: string
  title: string
  description: string
  impact?: string
}

export const achievements: Achievement[] = [
  {
    id: "convener",
    title: "Technical Events Team Convener",
    description: "Served as Convener of the University's Technical Events Team",
    impact: "Boosted student engagement by 40% through strategic committee formation and large-scale web initiatives"
  },
  {
    id: "board-member",
    title: "Board Member - APP Design and Development Club",
    description: "Elevated the technical capabilities of 15+ junior developers",
    impact: "Drove 60% improvement in coding skills through tailored workshops and hands-on code reviews"
  },
  {
    id: "patent",
    title: "Patent Published",
    description: "MLOps and Cloud Engineering for Cancer Classification",
    impact: "Patent No: 202441089264 - Achieved 100% classification accuracy"
  },
  {
    id: "hackathon",
    title: "Hack SRM 2023 Winner",
    description: "Customer Review Sentiment Analysis Project",
    impact: "Analyzed 50,000+ reviews with 85% accuracy"
  }
]