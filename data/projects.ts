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
  category?: 'project' | 'research' | 'thesis'
  confidential?: boolean
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
    featured: true,
    category: 'project'
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
    featured: true,
    category: 'project'
  }
]

export const researchProjects: Project[] = [
  {
    id: "d2d-communication",
    title: "Device-to-Device (D2D) Communication for Energy-Efficient Cellular Networks",
    description: "Undergraduate Research Assistant — UROP (2023–2024)",
    longDescription: "Investigated the role of D2D communication in improving spectral efficiency, energy efficiency, and latency in next-generation cellular networks.",
    achievements: [
      "Investigated the role of D2D communication in improving spectral efficiency, energy efficiency, and latency in next-generation cellular networks",
      "Designed deep learning–based power control strategies and resource allocation schemes to minimize interference and maximize throughput",
      "Achieved higher performance and reduced computation time compared to conventional methods, validated through simulation studies"
    ],
    technologies: ["Deep Learning", "5G Networks", "Python", "MATLAB", "Network Simulation", "Power Control", "Resource Allocation"],
    featured: false,
    category: 'research'
  },
  {
    id: "ddos-detection",
    title: "Detection and Prevention of DDoS Attacks using Machine Learning in Cloud Environment",
    description: "Individual Development Research Project — SRM University AP (2023–2024)",
    longDescription: "Designed and implemented ML-based intrusion detection models to classify benign vs. malicious network traffic in cloud environments.",
    achievements: [
      "Designed and implemented ML-based intrusion detection models (Logistic Regression, KNN, Naïve Bayes) to classify benign vs. malicious network traffic",
      "Achieved 97% detection accuracy using KNN and Logistic Regression, improving resiliency of cloud systems against large-scale DDoS attacks",
      "Integrated supplementary techniques (Captcha verification, IP blocking, rate limiting) to strengthen layered security",
      "Validated the framework using real traffic datasets (1,955+ records with 19 attributes), demonstrating practical applicability in cloud environments"
    ],
    technologies: ["Machine Learning", "Python", "Logistic Regression", "KNN", "Naïve Bayes", "Cloud Security", "Network Security", "DDoS Prevention"],
    featured: false,
    category: 'research'
  }
]

export const thesisProject: Project = {
  id: "cricket-umpire-robot",
  title: "Building an Intelligent Robot Umpire for Cricket",
  description: "Graduate Research Project — Automating Umpiring and Scoring Decisions (Non-disclosable Project)",
  longDescription: "Designed and developed a novel AI-powered robotic system for automating umpiring and scoring in cricket, integrating advanced computer vision and machine learning techniques.",
  achievements: [
    "Designed and developed a novel AI-powered robotic system for automating umpiring and scoring in cricket",
    "Integrated computer vision, machine learning, and real-time decision models to enhance accuracy and consistency in officiating",
    "Conducted extensive research on sports analytics, decision automation, and real-time data processing to build a scalable framework",
    "Project details and implementation remain confidential (non-disclosable)"
  ],
  technologies: ["Computer Vision", "Machine Learning", "AI", "Real-time Processing", "Sports Analytics", "Decision Automation", "Robotics", "Python", "Deep Learning"],
  featured: false,
  category: 'thesis',
  confidential: true
}