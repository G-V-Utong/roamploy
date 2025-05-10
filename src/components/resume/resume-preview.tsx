"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Calendar, Building, GraduationCap, Award } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface ResumePreviewProps {
  resumeData: ResumeData
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personal, summary, experience, education, skills, projects, certifications } = resumeData

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8">
        {/* Header */}
        <div className="space-y-4 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{personal.fullName || "Your Name"}</h1>
            {personal.title && <p className="text-lg text-muted-foreground">{personal.title}</p>}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Summary */}
        {summary.text && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
            <p className="text-muted-foreground">{summary.text}</p>
          </div>
        )}

        {/* Experience */}
        {experience.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            <div className="space-y-4">
              {experience.items.map((job, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building className="h-3 w-3" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {job.startDate} - {job.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  {job.description && <p className="text-sm">{job.description}</p>}
                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {education.items.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />
                        <span>{edu.institution}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {edu.startDate} - {edu.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  {edu.description && <p className="text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.items.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              {projects.items.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{project.name}</h3>
                    {project.date && <div className="text-sm text-muted-foreground">{project.date}</div>}
                  </div>
                  {project.description && <p className="text-sm">{project.description}</p>}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.split(",").map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            <div className="space-y-4">
              {certifications.items.map((cert, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">{cert.name}</h3>
                    </div>
                    {cert.date && <div className="text-sm text-muted-foreground">{cert.date}</div>}
                  </div>
                  {cert.issuer && <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
