import type { ResumeData } from "./types"

export const initialResumeData: ResumeData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: {
    text: "",
  },
  experience: {
    items: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        achievements: [""],
      },
    ],
  },
  education: {
    items: [
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        gpa: "",
      },
    ],
  },
  skills: {
    items: [],
  },
  projects: {
    items: [],
  },
  certifications: {
    items: [],
  },
}
