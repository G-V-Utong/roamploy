"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import type { Projects, ProjectItem } from "@/lib/types"

interface ProjectsFormProps {
  data: Projects
  onChange: (data: Projects) => void
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleAddProject = () => {
    const newItem: ProjectItem = {
      name: "",
      description: "",
      technologies: "",
      link: "",
      date: "",
    }

    const newItems = [...data.items, newItem]
    onChange({ items: newItems })
    setExpandedIndex(newItems.length - 1)
  }

  const handleRemoveProject = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index)
    onChange({ items: newItems })

    if (expandedIndex === index) {
      setExpandedIndex(index > 0 ? index - 1 : newItems.length > 0 ? 0 : null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const handleProjectChange = (index: number, field: keyof ProjectItem, value: string) => {
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
      {data.items.map((project, index) => (
        <Card key={index} className={expandedIndex === index ? "border-primary" : ""}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <h3 className="font-medium">{project.name ? project.name : `Project ${index + 1}`}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveProject(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {expandedIndex === index && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Project Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`date-${index}`}>Date</Label>
                    <Input
                      id={`date-${index}`}
                      value={project.date}
                      onChange={(e) => handleProjectChange(index, "date", e.target.value)}
                      placeholder="2023"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    placeholder="Describe the project, your role, and key achievements..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                  <Input
                    id={`technologies-${index}`}
                    value={project.technologies}
                    onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                  />
                  <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`link-${index}`}>Project Link (Optional)</Label>
                  <Input
                    id={`link-${index}`}
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                    placeholder="https://github.com/yourusername/project"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddProject} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Project
      </Button>
    </div>
  )
}
