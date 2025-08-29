"use client"

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Chandra Sai Reddy",
    "jobTitle": "Machine Learning Engineer & Cloud Architect",
    "url": "https://chandrasaireddy.dev",
    "sameAs": [
      "https://www.linkedin.com/in/chandra-sai-reddy/",
      "https://github.com/Chandra-Sai-Reddy"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Georgia State University",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Atlanta",
          "addressRegion": "GA",
          "addressCountry": "US"
        }
      },
      {
        "@type": "EducationalOrganization", 
        "name": "SRM University AP",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Vijayawada",
          "addressRegion": "Andhra Pradesh",
          "addressCountry": "IN"
        }
      }
    ],
    "knowsAbout": [
      "Machine Learning",
      "Cloud Computing",
      "AWS",
      "Python",
      "DevOps",
      "MLOps",
      "React",
      "Node.js",
      "Docker",
      "Kubernetes",
      "TensorFlow",
      "PyTorch"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "AWS Certified Solutions Architect"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "AWS FinOps Certified"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
