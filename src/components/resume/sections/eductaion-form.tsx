"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import type { Education, EducationItem } from "@/lib/types"

interface EducationFormProps {
  data: Education
  onChange: (data: Education) => void
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleAddEducation = () => {
    const newItem: EducationItem = {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      gpa: "",
    }

    const newItems = [...data.items, newItem]
    onChange({ items: newItems })
    setExpandedIndex(newItems.length - 1)
  }

  const handleRemoveEducation = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index)
    onChange({ items: newItems })

    if (expandedIndex === index) {
      setExpandedIndex(index > 0 ? index - 1 : newItems.length > 0 ? 0 : null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
    const newItems = [...data.items]
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    onChange({ items: newItems })
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {data.items.map((education, index) => (
        <Card key={index} className={expandedIndex === index ? "border-primary" : ""}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <h3 className="font-medium">
                  {education.degree || education.institution
                    ? `${education.degree || "Degree"} at ${education.institution || "Institution"}`
                    : `Education ${index + 1}`}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveEducation(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {expandedIndex === index && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input
                      id={`degree-${index}`}
                      value={education.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                    <Input
                      id={`institution-${index}`}
                      value={education.institution}
                      onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                      placeholder="University of Technology"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      value={education.location}
                      onChange={(e) => handleEducationChange(index, "location", e.target.value)}
                      placeholder="Boston, MA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      value={education.startDate}
                      onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                      placeholder="Sep 2016"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      value={education.endDate}
                      onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                      placeholder="May 2020"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
                    <Input
                      id={`gpa-${index}`}
                      value={education.gpa}
                      onChange={(e) => handleEducationChange(index, "gpa", e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={education.description}
                    onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                    placeholder="Relevant coursework, honors, activities, etc."
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddEducation} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Education
      </Button>
    </div>
  )
}
