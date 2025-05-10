"use client"

import type React from "react"

// import { useState } from "react"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
// import { toast } from "sonner"
// import { parseResume } from "@/lib/resume-parser"
// import { initialResumeData } from "@/lib/resume-data"
// import type { ResumeData } from "@/lib/types"

// interface ResumeUploaderProps {
//   onUploadSuccess: (data: ResumeData) => void
// }

export default function ResumeUploader(
  // { onUploadSuccess }: ResumeUploaderProps

) {
  // const [file, setFile] = useState<File | null>(null)
  // const [isUploading, setIsUploading] = useState(false)
  // const [error, setError] = useState<string | null>(null)

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0] || null
  //   setFile(selectedFile)
  //   setError(null)

  //   if (selectedFile) {
  //     handleUpload(selectedFile)
  //   }
  // }

  // const handleUpload = async (uploadFile: File) => {
  //   // Check file type
  //   if (
  //     uploadFile.type !== 'application/pdf' &&
  //     uploadFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  //   ) {
  //     setError("Please upload a PDF or Word document")
  //     return
  //   }

  //   // Check file size (max 5MB)
  //   if (uploadFile.size > 5 * 1024 * 1024) {
  //     setError("File size should be less than 5MB")
  //     return
  //   }

  //   setIsUploading(true)
  //   setError(null)

  //   try {
  //     // Parse the resume
  //     const parsedData = await parseResume(uploadFile)

  //     // Call onUploadSuccess with the parsed data
  //     const mergedData: ResumeData = {
  //       ...initialResumeData,
  //       ...parsedData,
  //       education: {
  //         items: parsedData.education?.items || []
  //       },
  //       experience: {
  //         items: parsedData.experience?.items || []
  //       },
  //       skills: {
  //         items: Array.from(new Set(parsedData.skills?.items || []))
  //       }
  //     }
  //     onUploadSuccess(mergedData)

  //     toast.success("Resume parsed successfully")
  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : "Failed to parse resume"
  //     setError(message)
  //     toast.error(message)
  //   } finally {
  //     setIsUploading(false)
  //     setFile(null)
  //   }
  // }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12">
        {/* <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Upload className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Upload your resume</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Upload your existing resume in PDF or Word format. We&apos;ll automatically parse the information to help you
              get started.
            </p>
          </div>

          <Input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={isUploading}
            className="max-w-xs"
          />
        </div> */}
        <h3 className="text-lg font-semibold">Coming soon...</h3>
      </div>

      {/* {file && (
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}
    </div>
  )
}
