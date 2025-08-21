export interface Skill {
  name: string
  category: string
  level: number // 1-100
}

export const skillCategories = {
  "Cloud & DevOps": [
    { name: "AWS EC2", category: "Cloud & DevOps", level: 95 },
    { name: "AWS S3", category: "Cloud & DevOps", level: 95 },
    { name: "AWS Lambda", category: "Cloud & DevOps", level: 90 },
    { name: "AWS ECS", category: "Cloud & DevOps", level: 90 },
    { name: "AWS EKS", category: "Cloud & DevOps", level: 85 },
    { name: "AWS RDS", category: "Cloud & DevOps", level: 85 },
    { name: "Docker", category: "Cloud & DevOps", level: 90 },
    { name: "Kubernetes", category: "Cloud & DevOps", level: 85 },
    { name: "Terraform", category: "Cloud & DevOps", level: 85 },
    { name: "CloudFormation", category: "Cloud & DevOps", level: 80 },
  ],
  "CI/CD & Automation": [
    { name: "GitLab CI", category: "CI/CD & Automation", level: 90 },
    { name: "GitHub Actions", category: "CI/CD & Automation", level: 90 },
    { name: "Jenkins", category: "CI/CD & Automation", level: 85 },
    { name: "Git", category: "CI/CD & Automation", level: 95 },
  ],
  "Programming & Scripting": [
    { name: "Python", category: "Programming & Scripting", level: 95 },
    { name: "Bash", category: "Programming & Scripting", level: 85 },
    { name: "YAML", category: "Programming & Scripting", level: 90 },
    { name: "JavaScript", category: "Programming & Scripting", level: 80 },
    { name: "TypeScript", category: "Programming & Scripting", level: 75 },
  ],  "Monitoring & Security": [
    { name: "CloudWatch", category: "Monitoring & Security", level: 90 },
    { name: "Splunk", category: "Monitoring & Security", level: 85 },
    { name: "IAM", category: "Monitoring & Security", level: 90 },
    { name: "Security Groups", category: "Monitoring & Security", level: 85 },
    { name: "Vulnerability Scanning", category: "Monitoring & Security", level: 80 },
  ],
  "Databases": [
    { name: "MySQL", category: "Databases", level: 85 },
    { name: "DynamoDB", category: "Databases", level: 80 },
    { name: "PostgreSQL", category: "Databases", level: 80 },
    { name: "MongoDB", category: "Databases", level: 75 },
  ],
  "Machine Learning": [
    { name: "TensorFlow", category: "Machine Learning", level: 85 },
    { name: "PyTorch", category: "Machine Learning", level: 80 },
    { name: "Scikit-learn", category: "Machine Learning", level: 85 },
    { name: "NLP", category: "Machine Learning", level: 80 },
    { name: "Computer Vision", category: "Machine Learning", level: 75 },
  ],
  "Other": [
    { name: "Linux", category: "Other", level: 90 },
    { name: "FinOps", category: "Other", level: 85 },
    { name: "Salesforce", category: "Other", level: 75 },
    { name: "Agile/Scrum", category: "Other", level: 85 },
  ]
}