export interface JobType {
    id: string
    title: string
    company_name: string
    companyLogo?: string  // Optional company logo URL
    location: string
    job_type: string
    salary: string
    experience: string
    description: string
    responsibilities: string[]
    requirements: string[]
    benefits: string[]
    skills: string[]
    postedDate: string
    companyDescription: string
    company_website: string
    companyIndustry: string
    companySize: string
    created_at: string
    updated_at: string
    salary_min: string
    salary_max: string
    salary_currency: string
    is_featured: boolean
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

  export interface Company {
    id: string
    name: string
    logo: string
    description: string
    industry: string
    size: string
    website: string
    jobCount: number
  }

  export type EventFormat = 'online' | 'in-person' | 'hybrid';
export type EventType = 'seminar' | 'bootcamp' | 'workshop' | 'course';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  author_avatar: string;
  authorAvatar: string; // For component compatibility
  category: string;
  read_time: string;
  readTime: string; // For component compatibility
  publish_date: string;
  publishDate: string; // For component compatibility
  image: string;
  featured?: boolean;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  company_logo: string;
  companyLogo: string; // For component compatibility
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  description: string;
  requirements: string[];
  skills: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CareerEvent {
  id: string;
  title: string;
  organizer: string;
  organizer_logo: string;
  organizerLogo: string; // For component compatibility
  type: EventType;
  format: EventFormat;
  start_date: string;
  startDate: string; // For component compatibility
  end_date: string;
  endDate: string; // For component compatibility
  location?: string;
  price: string;
  description: string;
  topics: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface JobFair {
  id: string;
  title: string;
  organizer: string;
  organizer_logo: string;
  organizerLogo: string; // For component compatibility
  date: string;
  time: string;
  location: string;
  format: EventFormat;
  description: string;
  companies: string[];
  registration_link: string;
  registrationLink: string; // For component compatibility
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}
