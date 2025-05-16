import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Building,
  MapPin,
  Users,
  ExternalLink,
  Briefcase,
  Globe,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"
import { capitalizeJobType, formatSalaryNumber } from "@/lib/utils"

interface CompanyData {
  id: string
  name: string
  logo: string
  website: string
  industry: string
  size: string
  description: string
  jobs: Array<{
    id: string
    title: string
    location: string
    job_type: string
    posted_date: string
    salary_min: string
    salary_max: string
    salary_currency: string
  }>
}

// interface companyName {
//   company_name: string
// }

interface PageProps {
  params: Promise<{ id: string }>
}

// export async function generateStaticParams() {
//   const supabase = createServerComponentClient({ cookies })
  
//   // Fetch unique company names from jobs table
//   const { data: companies } = await supabase
//     .from('jobs')
//     .select('company_name')
    
  
//   if (!companies) return []

//   // Convert company names to URL-friendly format and return as params
//   return companies.map((company: companyName) => ({
//     id: company.company_name.replace(/\s+/g, '-')
//   }))
// }

export default async function CompanyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = createServerComponentClient({ cookies })

  // Convert the URL-friendly ID back to company name
  const companyName = resolvedParams.id.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  // Fetch company data from Supabase
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('company_name', companyName)
    .order('posted_date', { ascending: false })

  if (error || !jobs || jobs.length === 0) {
    return notFound()
  }

  // Create company data from the first job (they all have the same company info)
  const firstJob = jobs[0]
  const company: CompanyData = {
    id: resolvedParams.id,
    name: firstJob.company_name,
    logo: firstJob.company_logo || '',
    website: firstJob.company_website || '',
    industry: firstJob.company_industry,
    size: firstJob.company_size,
    description: firstJob.company_description,
    jobs: jobs.map(job => ({
      id: job.id,
      title: job.title,
      location: job.location,
      job_type: job.job_type,
      posted_date: job.posted_date,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      salary_currency: job.salary_currency
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <Link
            href="/companies"
            className="inline-flex items-center text-sm font-medium mb-8"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to companies
          </Link>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Company Info */}
            <div className="md:col-span-2 space-y-8">
              <div className="flex gap-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-background flex-shrink-0">
                  <img
                    src={`https://logo.clearbit.com/${company.website}` || "/images/companyLogo.jpg"}
                    alt={`${company.name} logo`}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {company.industry}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {company.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <Link
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {company.website}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2>About {company.name}</h2>
                <p>{company.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Open Positions ({company.jobs.length})</h2>
                <div className="space-y-4">
                  {company.jobs.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/jobs/${job.id}`}>
                              <h3 className="text-lg font-semibold hover:underline">{job.title}</h3>
                            </Link>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {capitalizeJobType(job.job_type)}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {job.salary_min || job.salary_max ? 
                                  `${formatSalaryNumber(job.salary_min)} - ${formatSalaryNumber(job.salary_max)} ${job.salary_currency}` : 
                                  "Not specified"}
                              </div>
                            </div>
                          </div>
                          <Link href={`/jobs/${job.id}`}>
                            <Button>View Job</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Company Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Industry</span>
                      </div>
                      <Badge variant="secondary">{company.industry}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Company Size</span>
                      </div>
                      <Badge variant="secondary">{company.size}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Open Positions</span>
                      </div>
                      <Badge variant="secondary">{company.jobs.length}</Badge>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
