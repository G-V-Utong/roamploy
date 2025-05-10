"use client"

import type React from "react"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Summary } from "@/lib/types"

interface SummaryFormProps {
  data: Summary
  onChange: (data: Summary) => void
}

export default function SummaryForm({ data, onChange }: SummaryFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      text: e.target.value,
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.text}
          onChange={handleChange}
          placeholder="Experienced software developer with a passion for creating user-friendly applications..."
          className="min-h-[150px]"
        />
        <p className="text-sm text-muted-foreground">
          Write a brief summary highlighting your professional background, key skills, and career goals. Keep it concise
          (3-5 sentences) and focused on your most relevant qualifications.
        </p>
      </div>
    </div>
  )
}
