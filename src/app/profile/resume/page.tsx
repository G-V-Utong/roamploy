"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ResumeBuilder from "@/components/resume/resume-builder"
import ResumeUploader from "@/components/resume/resume-uploader"
import ResumePreview from "@/components/resume/resume-preview"
import { toast } from "sonner"
import { Loader2, Save, FileDown, Eye } from "lucide-react"
import { initialResumeData } from "@/lib/resume-data"
import { saveResume, getResume } from "@/lib/resume-service"
import type { ResumeData } from "@/lib/types"

export default function ResumePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("builder")
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin?redirect=/profile/resume")
    }
  }, [user, isLoading, router])

  // Load saved resume data from Supabase
  useEffect(() => {
    const loadResume = async () => {
      if (user) {
        try {
          const { data, error } = await getResume()
          if (error) throw error
          if (data) {
            setResumeData(data)
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to load resume'
          toast.error(message)
        }
      }
    }
    
    loadResume()
  }, [user])

  const handleSaveResume = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      const { error } = await saveResume(resumeData)
      if (error) throw error
      toast.success("Resume saved successfully!")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save resume. Please try again."
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportResume = () => {
    // In a real app, this would generate a PDF or DOCX file
    toast("Your resume has been exported successfully.")
  }

  const handleUploadSuccess = (data: ResumeData) => {
    setResumeData(data)
    setActiveTab("builder")
    toast("Your resume has been uploaded and parsed successfully.")
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
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Resume Builder</h1>
              <p className="text-muted-foreground">Create or upload your professional resume</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {isPreviewMode ? "Edit Resume" : "Preview Resume"}
              </Button>
              <Button variant="outline" onClick={handleExportResume} className="flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                Export
              </Button>
              <Button onClick={handleSaveResume} disabled={isSaving} className="flex items-center gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Resume
                  </>
                )}
              </Button>
            </div>
          </div>

          {isPreviewMode ? (
            <ResumePreview resumeData={resumeData} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
                <CardDescription>
                  Create a professional resume to showcase your skills and experience to potential employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="builder">Resume Builder</TabsTrigger>
                    <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                  </TabsList>
                  <TabsContent value="builder">
                    <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} />
                  </TabsContent>
                  <TabsContent value="upload">
                    <ResumeUploader onUploadSuccess={handleUploadSuccess} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
