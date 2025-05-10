"use client"

import type React from "react"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PersonalInfoForm from "@/components/resume/sections/personal-info-form"
import SummaryForm from "@/components/resume/sections/summary-form"
import ExperienceForm from "@/components/resume/sections/experience-form"
import EducationForm from "@/components/resume/sections/education-form"
import SkillsForm from "@/components/resume/sections/skills-form"
import ProjectsForm from "@/components/resume/sections/projects-form"
import CertificationsForm from "@/components/resume/sections/certifications-form"
import type { ResumeData } from "@/lib/types"

interface ResumeBuilderProps {
  resumeData: ResumeData
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
}

export default function ResumeBuilder({ resumeData, setResumeData }: ResumeBuilderProps) {
  const [expandedSection, setExpandedSection] = useState<string>("personal")

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  return (
    <div className="space-y-6">
      <Accordion
        type="single"
        collapsible
        value={expandedSection}
        onValueChange={setExpandedSection}
        className="w-full"
      >
        <AccordionItem value="personal">
          <AccordionTrigger className="text-lg font-medium">Personal Information</AccordionTrigger>
          <AccordionContent>
            <PersonalInfoForm data={resumeData.personal} onChange={(data) => updateResumeData("personal", data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger className="text-lg font-medium">Professional Summary</AccordionTrigger>
          <AccordionContent>
            <SummaryForm data={resumeData.summary} onChange={(data) => updateResumeData("summary", data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-medium">Work Experience</AccordionTrigger>
          <AccordionContent>
            <ExperienceForm data={resumeData.experience} onChange={(data) => updateResumeData("experience", data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-medium">Education</AccordionTrigger>
          <AccordionContent>
            <EducationForm data={resumeData.education} onChange={(data) => updateResumeData("education", data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-medium">Skills</AccordionTrigger>
          <AccordionContent>
            <SkillsForm data={resumeData.skills} onChange={(data) => updateResumeData("skills", data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects">
          <AccordionTrigger className="text-lg font-medium">Projects</AccordionTrigger>
          <AccordionContent>
            <ProjectsForm data={resumeData.projects} onChange={(data) => updateResumeData("projects", data)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications">
          <AccordionTrigger className="text-lg font-medium">Certifications</AccordionTrigger>
          <AccordionContent>
            <CertificationsForm
              data={resumeData.certifications}
              onChange={(data) => updateResumeData("certifications", data)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
