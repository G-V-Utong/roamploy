export interface JobType {
    id: string
    title: string
    companyName: string
    companyLogo: string
    location: string
    jobType: string
    salary: string
    experience: string
    description: string
    responsibilities: string[]
    requirements: string[]
    benefits: string[]
    skills: string[]
    postedDate: string
    companyDescription: string
    companyWebsite: string
    companyIndustry: string
    companySize: string
  }
  
  // Resume Types
  export interface PersonalInfo {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github: string
  }
  
  export interface Summary {
    text: string
  }
  
  export interface ExperienceItem {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
    achievements: string[]
  }
  
  export interface Experience {
    items: ExperienceItem[]
  }
  
  export interface EducationItem {
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    description: string
    gpa: string
  }
  
  export interface Education {
    items: EducationItem[]
  }
  
  export interface SkillItem {
    name: string
    level: string
  }
  
  export interface Skills {
    items: SkillItem[]
  }
  
  export interface ProjectItem {
    name: string
    description: string
    technologies: string
    link: string
    date: string
  }
  
  export interface Projects {
    items: ProjectItem[]
  }
  
  export interface CertificationItem {
    name: string
    issuer: string
    date: string
    id: string
    url: string
  }
  
  export interface Certifications {
    items: CertificationItem[]
  }
  
  export interface ResumeData {
    personal: PersonalInfo
    summary: Summary
    experience: Experience
    education: Education
    skills: Skills
    projects: Projects
    certifications: Certifications
  }
  