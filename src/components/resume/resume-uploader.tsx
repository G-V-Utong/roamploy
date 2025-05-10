"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { initialResumeData } from "@/lib/resume-data"
import type { ResumeData } from "@/lib/types"

interface ResumeUploaderProps {
  onUploadSuccess: (data: ResumeData) => void
}

export default function ResumeUploader({ onUploadSuccess }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    // Check file type
    const fileType = file.name.split(".").pop()?.toLowerCase()
    if (!["pdf", "doc", "docx"].includes(fileType || "")) {
      setError("Please upload a PDF or Word document")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // In a real app, this would send the file to a server for parsing
      // For demo purposes, we'll simulate a successful upload after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate parsed data (in a real app, this would come from the server)
      // For demo, we'll use the initial data with the filename as the name
      const parsedData: ResumeData = {
        ...initialResumeData,
        personal: {
          ...initialResumeData.personal,
          fullName: file.name.split(".")[0].replace(/_/g, " "),
        },
      }

      onUploadSuccess(parsedData)
    } catch (err) {
      setError("Failed to upload and parse your resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload your resume</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Upload your existing resume in PDF or Word format. We'll automatically parse the information to help you
                get started.
              </p>
            </div>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="max-w-xs"
            />
          </div>
        </div>

        {file && (
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Processing..." : "Process Resume"}
              </Button>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Supported Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 border rounded-lg">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            <div>
              <p className="font-medium">PDF</p>
              <p className="text-sm text-muted-foreground">Adobe PDF documents</p>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            <div>
              <p className="font-medium">DOC</p>
              <p className="text-sm text-muted-foreground">Microsoft Word documents</p>
            </div>
          </div>
          <div className="flex items-center p-4 border rounded-lg">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            <div>
              <p className="font-medium">DOCX</p>
              <p className="text-sm text-muted-foreground">Microsoft Word documents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
