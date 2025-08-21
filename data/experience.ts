export interface Experience {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    id: "morse",
    title: "Machine Learning and Cloud Engineer (AWS)",
    company: "MORSE Studio - Georgia State University",
    location: "Atlanta, USA",
    duration: "September 2024 – Present",
    description: [
      "Engineered and deployed a low-cost, multi-modal data processing pipeline on AWS, reducing the total cost of ownership by over 80% compared to existing solutions",
      "Enhanced system scalability by improving resource utilization by 25% through containerizing lightweight AI models for deployment on Amazon ECS",
      "Optimized system performance to achieve a 94% decision accuracy rate by orchestrating video, audio, and RAG pipelines using AWS Step Functions"
    ],
    technologies: ["AWS", "ECS", "Lambda", "Step Functions", "Python", "Docker", "Machine Learning", "RAG"]
  },
  {
    id: "salesforce",
    title: "Salesforce DevOps Engineer",
    company: "Onsite",
    location: "Hyderabad, India",
    duration: "April 2022 – June 2022",
    description: [
      "Accelerated deployment frequency by streamlining the release pipeline, reducing manual errors by 30%",
      "Administered and customized developer environments using Salesforce DX and VS Code, accelerating team development timelines by 35%",
      "Managed the Salesforce application lifecycle, facilitating continuous integration by deploying Lightning Web Components"
    ],
    technologies: ["Salesforce", "Salesforce DX", "VS Code", "Lightning Web Components", "Git", "CI/CD", "Apex"]
  }
]