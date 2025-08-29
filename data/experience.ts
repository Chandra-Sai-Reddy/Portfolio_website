export interface Experience {
  id: string
  title: string
  company: string
  location: string
  duration: string
  description: string[]
  technologies: string[]
  category?: ('work' | 'leadership' | 'research')[] // Optional category field
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
    technologies: ["AWS", "ECS", "Lambda", "Step Functions", "Python", "Docker", "Machine Learning", "RAG"],
    category: ["work"] // Tagged as work experience
  },
  {
    id: "sde-dsa",
    title: "SDE",
    company: "DSA - SRM University - AP",
    location: "Vijayawada, India",
    duration: "August 2023 – May 2024",
    description: [
      "Led development of a chatbot powered by NLP and machine learning algorithms, efficiently automating grievance resolution for over 10,000 students, resulting in a 60% reduction in response times and substantial improvements",
      "Increased efficiency of resolving student queries by 72% through integration of advanced machine learning models and real-time data processing techniques",
      "Optimized Chatbot performance by implementing NLP tokenizing and part-of-speech tagging, improving response accuracy by 43%"
    ],
    technologies: ["NLP", "Machine Learning", "Python", "Chatbot Development", "Natural Language Processing", "Data Processing", "AI"],
    category: ["work"] // Tagged as work experience
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
    technologies: ["Salesforce", "Salesforce DX", "VS Code", "Lightning Web Components", "Git", "CI/CD", "Apex"],
    category: ["work"] // Tagged as work experience
  }
]

// Leadership and Research Experiences
export const leadershipExperiences: Experience[] = [
  {
    id: "morse-research-assistant",
    title: "MORSE Studio - Research Assistant",
    company: "Research Lab | Georgia State University",
    location: "Atlanta, USA",
    duration: "January 2025 – Present",
    description: [
      "Assist in research and development activities focused on robotics, mobile systems, and AI-driven applications within the MORSE Studio initiative",
      "Conduct literature reviews and support experimental design in mobile robotics and autonomous systems",
      "Implement and test algorithms for navigation, perception, and decision-making in robotics platforms",
      "Work with hardware components including sensors, actuators, and embedded systems for real-world prototyping",
      "Collect, preprocess, and analyze experimental data to validate research hypotheses and improve models",
      "Prepare technical reports, documentation, and contribute to conference/journal publication drafts",
      "Collaborate with interdisciplinary teams to integrate AI, computer vision, and human–robot interaction into ongoing projects",
      "Support lab demonstrations, workshops, and outreach programs to showcase research outcomes"
    ],
    technologies: ["Robotics", "Mobile Systems", "AI", "Computer Vision", "Embedded Systems", "Machine Learning", "Autonomous Systems", "Hardware Prototyping"],
    category: ["research"]
  },
  {
    id: "morse-core-member",
    title: "MORSE Studio - Core Member",
    company: "Research Lab | Georgia State University",
    location: "Atlanta, USA",
    duration: "September 2024 – January 2025",
    description: [
      "Actively engaged as a core member in cutting-edge research on robotics, mobile systems, and AI-driven experiential learning under the MORSE Studio initiative",
      "Collaborate with faculty and peers on research projects in mobile robotics, autonomous systems, and human–robot interaction",
      "Lead experimental setups involving multi-robot coordination, sensor integration, and machine learning-based perception",
      "Contribute to the design and testing of AI frameworks for decision-making, navigation, and real-time adaptability in robotics systems",
      "Support technical documentation, research publications, and presentations at academic forums",
      "Mentor new lab members on tools, frameworks, and methodologies, ensuring smooth knowledge transfer and project sustainability",
      "Engage in interdisciplinary collaborations, connecting robotics research with applications in healthcare, education, and smart systems"
    ],
    technologies: ["Robotics", "Mobile Systems", "AI", "Machine Learning", "Human-Robot Interaction", "Autonomous Systems", "Multi-Robot Coordination"],
    category: ["research"]
  },
  {
    id: "morse-member",
    title: "MORSE Studio - Member",
    company: "Research Lab | Georgia State University",
    location: "Atlanta, USA",
    duration: "August 2024 – December 2024",
    description: [
      "Contribute to interdisciplinary research in robotics, mobile systems, and AI-driven applications under the guidance of MORSE Studio faculty",
      "Collaborate on projects involving mobile robotics, human–robot interaction, and applied AI systems",
      "Assist in prototyping, testing, and evaluating robotics solutions for real-world applications",
      "Engage in research discussions, contributing ideas to publications, technical reports, and experimental studies",
      "Participate in lab seminars, workshops, and collaborations with peers across engineering and computer science domains",
      "Gain hands-on experience with advanced robotics frameworks, sensors, and machine learning integration for autonomous decision-making"
    ],
    technologies: ["Robotics", "Mobile Systems", "AI", "Machine Learning", "Prototyping", "Autonomous Systems"],
    category: ["research"]
  },
  {
    id: "research-5g-networks",
    title: "Undergraduate Research Assistant — Communication for Energy-Efficient Cellular Networks",
    company: "Next Tech Lab | SRM University – AP",
    location: "Vijayawada, India",
    duration: "January 2024 – May 2024",
    description: [
      "Researched deep learning–based optimization techniques to enhance energy efficiency, spectral utilization, and latency reduction in next-generation (5G) cellular networks",
      "Investigated the role of D2D communication in improving energy efficiency, spectral efficiency, and latency performance for cellular systems"
    ],
    technologies: ["5G Networks", "Deep Learning", "D2D Communication", "Network Optimization", "Energy Efficiency", "Cellular Networks"],
    category: ["research"]
  },
  {
    id: "research-ddos-ml",
    title: "Individual Development Research (IDP) – Detection and Prevention of DDoS Attacks",
    company: "SRM University – AP",
    location: "Vijayawada, India",
    duration: "May 2023 – December 2023",
    description: [
      "Researched and developed machine learning–based frameworks to detect and mitigate Distributed Denial of Service (DDoS) attacks in cloud platforms",
      "Designed and implemented ML-based intrusion detection models (Logistic Regression, KNN, Naïve Bayes) to classify benign vs. malicious traffic"
    ],
    technologies: ["Machine Learning", "DDoS Detection", "Cloud Security", "Logistic Regression", "KNN", "Naïve Bayes", "Intrusion Detection"],
    category: ["research"]
  },
  {
    id: "technical-advisor",
    title: "Technical Event Advisor",
    company: "Student Council | SRM University - AP",
    location: "Vijayawada, India",
    duration: "August 2024 – Present",
    description: [
      "Provide strategic guidance and mentorship to the student council's technical team, ensuring innovation, efficiency, and quality in event execution",
      "Advise on technical planning, resource allocation, and execution strategies for cultural, academic, and professional events",
      "Mentor junior members of the technical team, fostering leadership skills and innovative thinking",
      "Guide the integration of digital tools, event platforms, and emerging technologies to enhance student engagement",
      "Support council leadership in decision-making by aligning technical feasibility with event goals",
      "Ensure knowledge transfer and sustainability of technical processes for future event teams"
    ],
    technologies: ["Leadership", "Mentorship", "Event Management", "Strategic Planning", "Digital Tools", "Team Building"],
    category: ["leadership"]
  },
  {
    id: "technical-executive",
    title: "Technical Event Executive",
    company: "Student Council | SRM University - AP",
    location: "Vijayawada, India",
    duration: "August 2023 – May 2024",
    description: [
      "Coordinated and executed technical aspects of major university events and festivals as part of the Student Council",
      "Directed technical planning and event execution, ensuring smooth operations for cultural and academic events",
      "Designed and managed event websites, integrating creative elements to enhance engagement and user experience",
      "Handled audiovisual setups, live-streaming tools, and digital platforms to ensure seamless event delivery",
      "Resolved on-site technical issues under pressure, minimizing downtime during high-profile programs"
    ],
    technologies: ["Event Management", "Web Development", "Live Streaming", "Technical Coordination", "Problem Solving"],
    category: ["leadership"]
  },  {
    id: "technical-convener",
    title: "Technical Event Convener",
    company: "Student Council | SRM University - AP",
    location: "Vijayawada, India",
    duration: "May 2022 – May 2024",
    description: [
      "Led the university's technical team in executing the technical backbone of student-led events and festivals",
      "Supervised a cross-functional technical team to deliver end-to-end event execution",
      "Conducted brainstorming sessions for event branding, websites, and technical setups",
      "Boosted student participation by 40% through interactive websites and innovative event formats",
      "Acted as the bridge between event committees, technical teams, and external vendors"
    ],
    technologies: ["Team Leadership", "Cross-functional Coordination", "Event Planning", "Website Development", "Vendor Management"],
    category: ["leadership"]
  },
  {
    id: "council-member",
    title: "Council Member",
    company: "Student Council | SRM University - AP",
    location: "Andhra Pradesh, India",
    duration: "May 2021 – May 2022",
    description: [
      "Actively contributed to event execution, planning, and technical support for student activities",
      "Supported the execution of flagship cultural and academic events with hands-on coordination",
      "Worked with peers and faculty to ensure flawless event flow and logistics",
      "Assisted in digital promotions and website development for events",
      "Enhanced the student experience by contributing to interactive event formats"
    ],
    technologies: ["Event Coordination", "Digital Marketing", "Web Development", "Logistics Management", "Team Collaboration"],
    category: ["leadership"]
  },  {
    id: "affiliate-member",
    title: "Affiliate Member",
    company: "Student Council | SRM University - AP",
    location: "Vijayawada, India",
    duration: "November 2020 – May 2021",
    description: [
      "Started as an affiliate member, supporting technical and organizational aspects of university events",
      "Assisted in planning and execution of cultural programs and student-led activities",
      "Supported website and digital content creation for events",
      "Coordinated with logistics and event teams for smooth event flow",
      "Engaged in student outreach and participation drives"
    ],
    technologies: ["Event Support", "Digital Content Creation", "Website Development", "Student Outreach", "Team Coordination"],
    category: ["leadership"]
  }
]

// Combine all experiences for the component
export const allExperiences: Experience[] = [...experiences, ...leadershipExperiences]