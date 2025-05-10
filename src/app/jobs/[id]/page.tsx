"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Calendar, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { jobsData } from "@/lib/data"
import NewsletterForm from "@/components/newsletter-form"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth/auth-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface JobPageProps {
  params: {
    id: string
  }
}

export default function JobPage({ params }: JobPageProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isApplying, setIsApplying] = useState(false)

  // In a real app, you would fetch this data from an API
  const job = jobsData.find((job) => job.id === params.id) || jobsData[0]

  const handleApply = () => {
    if (!user) {
      toast.error("Please sign in to apply for this job")
      router.push("/signin")
      return
    }

    setIsApplying(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Your application has been sent to the employer.")
      setIsApplying(false)
    }, 1500)
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
                    <Image
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.companyName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{job.companyName}</span>
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
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleApply} disabled={isApplying}>
                    {isApplying ? "Applying..." : "Apply Now"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Clock className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Job Type</h3>
                    <p className="text-sm">{job.jobType}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <DollarSign className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Salary</h3>
                    <p className="text-sm">{job.salary}</p>
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
                    <p className="text-sm">{job.postedDate}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose max-w-none">
                  <p>{job.description}</p>
                  <h3>Responsibilities:</h3>
                  <ul>
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h3>Requirements:</h3>
                  <ul>
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h3>Benefits:</h3>
                  <ul>
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <h2 className="text-xl font-semibold w-full mb-2">Skills</h2>
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button size="lg" className="w-full md:w-auto" onClick={handleApply} disabled={isApplying}>
                  {isApplying ? "Submitting application..." : "Apply for this position"}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">About {job.companyName}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{job.companyDescription}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Website</span>
                      <Link href="#" className="font-medium hover:underline">
                        {job.companyWebsite}
                      </Link>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Industry</span>
                      <span>{job.companyIndustry}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Company size</span>
                      <span>{job.companySize}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View Company Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
                  <div className="space-y-4">
                    {jobsData.slice(0, 3).map((similarJob) => (
                      <div key={similarJob.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium hover:underline">
                          <Link href={`/jobs/${similarJob.id}`}>{similarJob.title}</Link>
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{similarJob.companyName}</span>
                          <span>•</span>
                          <span>{similarJob.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <section className="bg-muted py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold mb-4">Never Miss a Remote Opportunity</h2>
              <p className="text-muted-foreground mb-6">
                Get personalized job alerts delivered straight to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
