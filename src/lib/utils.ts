import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { Company, JobType } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeJobType(jobType: string) {
  // Split by hyphen or space and capitalize each word
  return jobType?.split(/[-\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function formatRelativeDate(date: string | Date) {
  const now = new Date()
  const postedDate = new Date(date)
  const diffInDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60))
  const diffInMinutes = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return diffInMinutes === 0 ? 'Just now' : `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Yesterday'
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return months === 1 ? '1 month ago' : `${months} months ago`
  } else {
    const years = Math.floor(diffInDays / 365)
    return years === 1 ? '1 year ago' : `${years} years ago`
  }
}

export function formatSalaryNumber(value: string | number | undefined): string {
  if (!value) return ''
  return new Intl.NumberFormat().format(Number(value))
}

// export function extractCompanies(jobs: JobType[]): Company[] {
//   const companiesMap = new Map<string, Company>()

//   jobs.forEach((job) => {
//     if (!companiesMap.has(job.company_name)) {
//       companiesMap.set(job.company_name, {
//         id: job.company_name.toLowerCase().replace(/\s+/g, "-"),
//         name: job.company_name,
//         logo: job.companyLogo,
//         description: job.companyDescription,
//         industry: job.companyIndustry,
//         size: job.companySize,
//         website: job.company_website,
//         jobCount: 1,
//       })
//     } else {
//       const company = companiesMap.get(job.company_name)!
//       company.jobCount += 1
//       companiesMap.set(job.company_name, company)
//     }
//   })

//   return Array.from(companiesMap.values())
// }
