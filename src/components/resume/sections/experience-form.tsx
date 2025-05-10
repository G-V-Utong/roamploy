"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import type { Experience, ExperienceItem } from "@/lib/types"

interface ExperienceFormProps {
  data: Experience
  onChange: (data: Experience) => void
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      achievements: [""],
    }

    const newItems = [...data.items, newItem]
    onChange({ items: newItems })
    setExpandedIndex(newItems.length - 1)
  }

  const handleRemoveExperience = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index)
    onChange({ items: newItems })

    if (expandedIndex === index) {
      setExpandedIndex(index > 0 ? index - 1 : newItems.length > 0 ? 0 : null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const handleExperienceChange = (index: number, field: keyof ExperienceItem, value: string) => {
    const newItems = [...data.items]
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    }
    onChange({ items: newItems })
  }

  const handleAchievementChange = (experienceIndex: number, achievementIndex: number, value: string) => {
    const newItems = [...data.items]
    const achievements = [...newItems[experienceIndex].achievements]
    achievements[achievementIndex] = value

    newItems[experienceIndex] = {
      ...newItems[experienceIndex],
      achievements,
    }

    onChange({ items: newItems })
  }

  const handleAddAchievement = (experienceIndex: number) => {
    const newItems = [...data.items]
    newItems[experienceIndex] = {
      ...newItems[experienceIndex],
      achievements: [...newItems[experienceIndex].achievements, ""],
    }
    onChange({ items: newItems })
  }

  const handleRemoveAchievement = (experienceIndex: number, achievementIndex: number) => {
    const newItems = [...data.items]
    const achievements = newItems[experienceIndex].achievements.filter((_, i) => i !== achievementIndex)

    newItems[experienceIndex] = {
      ...newItems[experienceIndex],
      achievements,
    }

    onChange({ items: newItems })
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {data.items.map((experience, index) => (
        <Card key={index} className={expandedIndex === index ? "border-primary" : ""}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <h3 className="font-medium">
                  {experience.title || experience.company
                    ? `${experience.title || "Position"} at ${experience.company || "Company"}`
                    : `Experience ${index + 1}`}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveExperience(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {expandedIndex === index && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${index}`}>Job Title</Label>
                    <Input
                      id={`title-${index}`}
                      value={experience.title}
                      onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                      placeholder="Senior Frontend Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                      id={`company-${index}`}
                      value={experience.company}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      value={experience.location}
                      onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      value={experience.startDate}
                      onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      placeholder="Jan 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      value={experience.endDate}
                      onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Job Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={experience.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    placeholder="Describe your role and responsibilities..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Key Achievements</Label>
                    <Button variant="outline" size="sm" onClick={() => handleAddAchievement(index)} className="h-8">
                      <Plus className="h-3 w-3 mr-1" /> Add Achievement
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex gap-2">
                        <Input
                          value={achievement}
                          onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                          placeholder="Increased website performance by 40%"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAchievement(index, achievementIndex)}
                          disabled={experience.achievements.length <= 1}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddExperience} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Work Experience
      </Button>
    </div>
  )
}
