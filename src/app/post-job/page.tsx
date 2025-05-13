/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-context"
import Header from "@/components/header" 
import Footer from "@/components/footer" 
import JobPostingForm from "@/components/job-posting/job-posting-form"
import JobPostingPreview from "@/components/job-posting/job-posting-preview"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function PostJobPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("form")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please sign in to post a job")
      router.push("/signin?redirect=/post-job")
    }
  }, [user, isLoading, router])

  const handleFormSubmit = (data: any) => {
    setFormData(data)
    setActiveTab("preview")
  }

  const handleEdit = () => {
    setActiveTab("form")
  }

  const handlePublish = async () => {
    if (!formData || !user) return
    setIsSubmitting(true)

    try {
      // Convert camelCase keys to lowercase for database compatibility
      const dbFormattedData = {
        ...formData,
        applicationemail: formData.applicationEmail,
        application_instructions: formData.applicationInstructions,
        application_url: formData.applicationUrl,
        company_description: formData.companyDescription,
        company_name: formData.companyName,
        company_website: formData.companyWebsite,
        company_industry: formData.companyIndustry,
        company_logo: formData.companyLogo,
        company_size: formData.companySize,
        company_location: formData.company_Location,
        company_type: formData.companyType,
        experience: formData.experienceLevel,
        is_featured: formData.isFeatured,
        is_remote: formData.isRemote,
        is_urgent: formData.isUrgent,
        salary_currency: formData.salaryCurrency,
        salary_min: formData.salaryMin,
        salary_max: formData.salaryMax,
        salary_period: formData.salaryPeriod,
        job_type: formData.jobType.toLowerCase().replace(' ', '-'),
        user_id: user.id,
        posted_date: new Date().toISOString()
      }
      // Remove the camelCase version
      delete dbFormattedData.applicationEmail;
      delete dbFormattedData.applicationInstructions;
      delete dbFormattedData.applicationUrl;
      delete dbFormattedData.companyDescription;
      delete dbFormattedData.companyName;
      delete dbFormattedData.companyWebsite;
      delete dbFormattedData.companyIndustry;
      delete dbFormattedData.companyLogo;
      delete dbFormattedData.companySize;
      delete dbFormattedData.company_Location;
      delete dbFormattedData.companyType;
      delete dbFormattedData.experienceLevel;
      delete dbFormattedData.isFeatured;
      delete dbFormattedData.isRemote;
      delete dbFormattedData.isUrgent;
      delete dbFormattedData.jobType;
      delete dbFormattedData.salaryCurrency;
      delete dbFormattedData.salaryMin;
      delete dbFormattedData.salaryMax;
      delete dbFormattedData.salaryPeriod;


      const { error } = await supabase
        .from('jobs')
        .insert([dbFormattedData])

      if (error) throw error

      toast.success("Your job listing has been published.")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Failed to publish job listing. Please try again.")
      console.error('Error publishing job:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container m-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
              <p className="text-muted-foreground">Fill out the form below to post a new remote job listing.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide comprehensive information to attract the best candidates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="preview" disabled={!formData}>
                      Preview
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="form" className="mt-6">
                    <JobPostingForm onSubmit={handleFormSubmit} initialData={formData} />
                  </TabsContent>
                  <TabsContent value="preview" className="mt-6">
                    {formData && (
                      <>
                        <JobPostingPreview job={formData} />
                        <div className="flex justify-between mt-8">
                          <Button variant="outline" onClick={handleEdit}>
                            Edit Job Details
                          </Button>
                          <Button onClick={handlePublish} disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Publishing...
                              </>
                            ) : (
                              "Publish Job"
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
