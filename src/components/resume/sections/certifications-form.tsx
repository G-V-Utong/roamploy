"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import type { Certifications, CertificationItem } from "@/lib/types"

interface CertificationsFormProps {
  data: Certifications
  onChange: (data: Certifications) => void
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleAddCertification = () => {
    const newItem: CertificationItem = {
      name: "",
      issuer: "",
      date: "",
      id: "",
      url: "",
    }

    const newItems = [...data.items, newItem]
    onChange({ items: newItems })
    setExpandedIndex(newItems.length - 1)
  }

  const handleRemoveCertification = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index)
    onChange({ items: newItems })

    if (expandedIndex === index) {
      setExpandedIndex(index > 0 ? index - 1 : newItems.length > 0 ? 0 : null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const handleCertificationChange = (index: number, field: keyof CertificationItem, value: string) => {
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
      {data.items.map((certification, index) => (
        <Card key={index} className={expandedIndex === index ? "border-primary" : ""}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <h3 className="font-medium">
                  {certification.name ? certification.name : `Certification ${index + 1}`}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCertification(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {expandedIndex === index && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Certification Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={certification.name}
                      onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${index}`}>Issuing Organization</Label>
                    <Input
                      id={`issuer-${index}`}
                      value={certification.issuer}
                      onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`date-${index}`}>Date Issued</Label>
                    <Input
                      id={`date-${index}`}
                      value={certification.date}
                      onChange={(e) => handleCertificationChange(index, "date", e.target.value)}
                      placeholder="June 2022"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`id-${index}`}>Credential ID (Optional)</Label>
                    <Input
                      id={`id-${index}`}
                      value={certification.id}
                      onChange={(e) => handleCertificationChange(index, "id", e.target.value)}
                      placeholder="ABC123XYZ"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`}>Credential URL (Optional)</Label>
                  <Input
                    id={`url-${index}`}
                    value={certification.url}
                    onChange={(e) => handleCertificationChange(index, "url", e.target.value)}
                    placeholder="https://www.credential.net/abc123xyz"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAddCertification} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Certification
      </Button>
    </div>
  )
}
