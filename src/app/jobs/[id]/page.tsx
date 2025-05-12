/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Calendar, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import NewsletterForm from "@/components/newsletter-form"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SaveJobButton from "@/components/save-job-button"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { formatRelativeDate, capitalizeJobType } from "@/lib/utils"

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function JobPage({ params, searchParams }: PageProps) {
  const supabase = createServerComponentClient({ cookies })
  
  // Fetch job from Supabase
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !job) return notFound()

  // Get user's session to check if job is saved
  const { data: { session } } = await supabase.auth.getSession()
  let isSaved = false
  
  if (session?.user) {
    const { data: savedJob } = await supabase
      .from('saved_jobs')
      .select('id')
      .eq('job_id', params.id)
      .eq('user_id', session.user.id)
      .single()
    
    isSaved = !!savedJob
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container m-auto px-4 py-8 md:px-6 md:py-12">
          <Link href="/jobs" className="inline-flex items-center text-sm font-medium mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to jobs
          </Link>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={`https://logo.clearbit.com/${job.company_website}` || "/images/companyLogo.jpg"}
                      alt={job.company_name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{job.company_name}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <SaveJobButton 
                    jobId={job.id} 
                    initialSavedState={isSaved}
                  />
                  <Button>
                    Apply Now
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Clock className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Job Type</h3>
                    <p className="text-sm">{capitalizeJobType(job.job_type)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <DollarSign className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Salary</h3>
                    <p className="text-sm">{job.salary_min || job.salary_max ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency} ` : "Not specified"}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Building className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Experience</h3>
                    <p className="text-sm">{job.experience}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Posted</h3>
                    <p className="text-sm">{formatRelativeDate(job.posted_date)}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose max-w-none">
                  <p>{job.description}</p>
                  <h3>Responsibilities:</h3>
                  <ul>
                    {job.responsibilities.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h3>Requirements:</h3>
                  <ul>
                    {job.requirements.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h3>Benefits:</h3>
                  <ul>
                    {job.benefits.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <h2 className="text-xl font-semibold w-full mb-2">Skills</h2>
                {job.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button size="lg" className="w-full md:w-auto">
                  Apply for this position
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">About {job.company_name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{job.company_description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Website</span>
                      <Link href={`https://${job.company_website}`} className="font-medium hover:underline">
                        {job.company_website}
                      </Link>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Industry</span>
                      <span>{job.company_industry}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Company size</span>
                      <span>{job.company_size}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View Company Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <NewsletterForm />
      <Footer />
    </div>
  )
}