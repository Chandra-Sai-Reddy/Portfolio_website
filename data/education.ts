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
    location: "Atlanta, GA, USA",
    duration: "Aug 2024 - May 2026",
    description: "Focus on Machine Learning, Cloud Computing, and Distributed Systems"
  },
  {
    id: "bachelors",
    degree: "Bachelor of Technology",
    field: "Computer Science",
    school: "SRM - AP",
    location: "Vijayawada, India",
    duration: "Aug 2020 - May 2024",
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
    id: "patent",
    title: "Patent Published",
    description: "MLOps and Cloud Engineering for Cancer Classification",
    impact: "Patent No: 202441089264 - Achieved 100% classification accuracy"
  },
  {
    id: "aws-finops",
    title: "AWS Certified Solutions Architect and FinOps",
    description: "Professional certification demonstrating cloud architecture expertise",
    impact: "Demonstrated expertise in cloud cost optimization and architecture design"
  },
  {
    id: "deans-list",
    title: "Dean's List (Out of State Tuition Waiver)",
    description: "Recognized for academic excellence with GPA above 3.8",
    impact: "Achieved outstanding academic performance earning tuition waiver"
  },
  {
    id: "hackathon-srm",
    title: "Hack SRM - AP 2024 Winner",
    description: "1st place in Hack SRM - AP Hackathon for healthcare solution",
    impact: "Developed innovative healthcare solution beating 100+ teams"
  },
  {
    id: "app-dev-hackathon",
    title: "App Development Hackathon Winner 2023",
    description: "Winner of App Development Hackathon organized by SRM University AP",
    impact: "Created award-winning mobile application demonstrating technical excellence"
  },
  {
    id: "top5-hackathon",
    title: "Top 5 University Level Hackathon",
    description: "Top 5 teams at University Level Hackathon among 180+ Teams",
    impact: "Competed against 180+ teams securing top 5 position at SRM-AP"
  },
  {
    id: "chapter-lead",
    title: "Chapter Leadership",
    description: "Led an 80+ member chapter in achieving organizational goals",
    impact: "Successfully managed community service, academics, and unit improvement initiatives"
  },
  {
    id: "cricket-captain",
    title: "School Games Federation Cricket Captain",
    description: "1st Place Andhra Pradesh Cricket - Captain of SRM University AP team",
    impact: "Led team to victory in state-level cricket championship"
  },
  {
    id: "convener",
    title: "Events Convenor - Student Council SRM AP",
    description: "Elected to represent over 8000 students for two consecutive years (2023-2024)",
    impact: "Successfully organized and managed cultural and technical events demonstrating excellent leadership"
  },
  {
    id: "mun-head",
    title: "MUN Conference Organizing Head",
    description: "Hosted and organized the first ever Model United Nations Conference (2023)",
    impact: "Pioneered and successfully executed first MUN conference at SRM University AP"
  }
]