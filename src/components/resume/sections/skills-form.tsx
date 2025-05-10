"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import type { Skills, SkillItem } from "@/lib/types"
import { useState } from "react"

interface SkillsFormProps {
  data: Skills
  onChange: (data: Skills) => void
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newLevel, setNewLevel] = useState("Intermediate")

  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    const skill: SkillItem = {
      name: newSkill.trim(),
      level: newLevel,
    }

    onChange({
      items: [...data.items, skill],
    })

    setNewSkill("")
  }

  const handleRemoveSkill = (index: number) => {
    onChange({
      items: data.items.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Add Skills</Label>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. JavaScript, React, Project Management"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddSkill()
              }
            }}
          />
          <Select value={newLevel} onValueChange={setNewLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Skill Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddSkill}>
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Press Enter to quickly add a skill</p>
      </div>

      {data.items.length > 0 && (
        <div className="space-y-2">
          <Label>Your Skills</Label>
          <div className="flex flex-wrap gap-2 p-4 border rounded-md">
            {data.items.map((skill, index) => (
              <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                {skill.name}
                <span className="text-xs text-muted-foreground ml-1">({skill.level})</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 rounded-full ml-1 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleRemoveSkill(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Skill Categories</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 p-4 border rounded-md">
            <h4 className="font-medium">Technical Skills</h4>
            <p className="text-sm text-muted-foreground">Programming languages, frameworks, tools, databases, etc.</p>
            <div className="flex flex-wrap gap-1">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("JavaScript")}
              >
                JavaScript
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("React")}
              >
                React
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("Node.js")}
              >
                Node.js
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("Python")}
              >
                Python
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary" onClick={() => setNewSkill("SQL")}>
                SQL
              </Badge>
            </div>
          </div>
          <div className="space-y-2 p-4 border rounded-md">
            <h4 className="font-medium">Soft Skills</h4>
            <p className="text-sm text-muted-foreground">Communication, leadership, teamwork, problem-solving, etc.</p>
            <div className="flex flex-wrap gap-1">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("Communication")}
              >
                Communication
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("Leadership")}
              >
                Leadership
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("Problem Solving")}
              >
                Problem Solving
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setNewSkill("Teamwork")}
              >
                Teamwork
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
