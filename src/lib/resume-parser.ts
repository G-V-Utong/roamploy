// import pdfjs from './pdf-init'
// import mammoth from 'mammoth'
// import type { ResumeData, EducationItem as EducationItemType, ExperienceItem as ExperienceItemType, SkillItem } from './types'

// export async function extractTextFromPDF(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer()
//   const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
//   let fullText = ''

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i)
//     const textContent = await page.getTextContent()
//     const pageText = textContent.items
//       .map((item) => {
//         if ('str' in item) {
//           return item.str
//         }
//         return ''
//       })
//       .join(' ')
//     fullText += pageText + '\n'
//   }

//   return fullText.trim()
// }

// export async function extractTextFromDOCX(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer()
//   const result = await mammoth.extractRawText({ arrayBuffer })
//   return result.value.trim()
// }

// interface Section {
//   title: string
//   content: string[]
// }

// function extractSections(text: string): Section[] {
//   // Common section titles in resumes
//   const sectionTitles = [
//     'EDUCATION',
//     'EXPERIENCE',
//     'WORK EXPERIENCE',
//     'SKILLS',
//     'PROJECTS',
//     'CERTIFICATIONS',
//     'SUMMARY',
//     'OBJECTIVE',
//   ]

//   const sections: Section[] = []
//   let currentSection: Section | null = null

//   // Split text into lines and process each line
//   const lines = text.split('\n').map(line => line.trim()).filter(line => line)

//   for (const line of lines) {
//     // Check if line is a section title
//     const upperLine = line.toUpperCase()
//     const isTitle = sectionTitles.some(title => upperLine.includes(title))

//     if (isTitle) {
//       if (currentSection) {
//         sections.push(currentSection)
//       }
//       currentSection = { title: line, content: [] }
//     } else if (currentSection) {
//       currentSection.content.push(line)
//     }
//   }

//   if (currentSection) {
//     sections.push(currentSection)
//   }

//   return sections
// }



// function findEducation(sections: Section[]): EducationItemType[] {
//   const educationSection = sections.find(s => 
//     s.title.toUpperCase().includes('EDUCATION')
//   )

//   if (!educationSection) return []

//   return educationSection.content.map(entry => ({
//     institution: entry,
//     degree: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//     description: '',
//     gpa: ''
//   }))
// }



// function findExperience(sections: Section[]): ExperienceItemType[] {
//   const experienceSection = sections.find(s => 
//     s.title.toUpperCase().includes('EXPERIENCE')
//   )

//   if (!experienceSection) return []

//   return experienceSection.content.map(entry => ({
//     title: '',
//     company: entry,
//     location: '',
//     startDate: '',
//     endDate: '',
//     description: '',
//     achievements: []
//   }))
// }

// function findSkills(sections: Section[]): SkillItem[] {
//   const skillsSection = sections.find(s => 
//     s.title.toUpperCase().includes('SKILLS')
//   )

//   if (!skillsSection) return []

//   return skillsSection.content.flatMap(line => 
//     line.split(/[,|•]/).map(skill => skill.trim())
//   )
//     .filter(skill => skill)
//     .map(skill => ({
//       name: skill,
//       level: ''
//     }))
// }

// export async function parseResume(file: File): Promise<Partial<ResumeData>> {
//   let text: string

//   if (file.type === 'application/pdf') {
//     text = await extractTextFromPDF(file)
//   } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//     text = await extractTextFromDOCX(file)
//   } else {
//     throw new Error('Unsupported file type')
//   }

//   const sections = extractSections(text)

//   return {
//     education: { items: findEducation(sections) },
//     experience: { items: findExperience(sections) },
//     skills: { items: findSkills(sections) },
//   }
// }
