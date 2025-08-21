export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  achievements: string[]
  technologies: string[]
  github?: string
  liveUrl?: string
  patent?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: "cancer-classification",
    title: "MLOps and Cloud Engineering for Cancer Classification",
    description: "Patent-published ML system achieving 100% classification accuracy for cancer detection",
    longDescription: "Engineered a scalable data pipeline to preprocess and manage a large-scale dataset with over 20,531 gene features and 801 samples, ensuring data integrity and availability for machine learning workflows.",
    achievements: [
      "Engineered scalable data pipeline for 20,531 gene features and 801 samples",
      "Automated model development lifecycle using CI/CD-like approach for RNN architectures",
      "Achieved 100% classification accuracy with optimized neural networks",
      "Reduced computational overhead by 50% through hyperparameter tuning"
    ],
    technologies: ["Python", "TensorFlow", "AWS", "Docker", "CI/CD", "RNN", "MLOps"],
    patent: "202441089264",
    featured: true
  },
  {
    id: "sentiment-analysis",
    title: "Customer Review Sentiment Analysis",
    description: "NLP model analyzing 50,000+ customer reviews with 85% accuracy",
    longDescription: "Spearheaded the development and deployment of a Natural Language Processing model for large-scale sentiment analysis, driving strategic product enhancements.",
    achievements: [
      "Analyzed over 50,000 customer reviews with 85% accuracy rate",
      "Leveraged insights to drive 15% increase in customer satisfaction",
      "Implemented real-time sentiment classification system",
      "Won Hack SRM 2023 competition"
    ],
    technologies: ["Python", "NLP", "BERT", "Flask", "AWS", "PostgreSQL", "Docker"],
    github: "https://github.com/Chandra-Sai-Reddy",
    featured: true
  }
]