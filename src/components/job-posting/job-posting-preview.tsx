/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Clock, DollarSign, Building, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface JobPostingPreviewProps {
  job: any
}

export default function JobPostingPreview({ job }: JobPostingPreviewProps) {
  // Format salary display
  const formatSalary = () => {
    const currency =
      job.salaryCurrency === "USD"
        ? "$"
        : job.salaryCurrency === "EUR"
          ? "€"
          : job.salaryCurrency === "GBP"
            ? "£"
            : job.salaryCurrency === "CAD"
              ? "C$"
              : job.salaryCurrency === "AUD"
                ? "A$"
                : job.salaryCurrency === "NGN" 
                ? "₦"
                : ""

    const period =
      job.salaryPeriod === "yearly"
        ? "per year"
        : job.salaryPeriod === "monthly"
          ? "per month"
          : job.salaryPeriod === "hourly"
            ? "per hour"
            : ""

    return `${currency}${job.salaryMin} - ${currency}${job.salaryMax} ${period}`
  }

  return (
    <div className="space-y-8">
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-background flex items-center justify-center">
              <span className="text-xl font-bold">{job.companyName.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{job.companyName}</span>
                <span>•</span>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {job.location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.isUrgent && <Badge variant="destructive">Urgent</Badge>}
            {job.isFeatured && <Badge variant="default">Featured</Badge>}
            {job.isRemote && <Badge variant="secondary">Remote</Badge>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Clock className="h-5 w-5 mb-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Job Type</h3>
            <p className="text-sm">{job.jobType}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <DollarSign className="h-5 w-5 mb-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Salary</h3>
            <p className="text-sm">{formatSalary()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Building className="h-5 w-5 mb-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Experience</h3>
            <p className="text-sm">{job.experienceLevel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Calendar className="h-5 w-5 mb-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Posted</h3>
            <p className="text-sm">Today</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{job.description}</p>

          <h3>Responsibilities:</h3>
          <ul>
            {job.responsibilities.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Requirements:</h3>
          <ul>
            {job.requirements.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Benefits:</h3>
          <ul>
            {job.benefits.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <h2 className="text-xl font-semibold w-full mb-2">Skills</h2>
        {job.skills.map((skill: string, index: number) => (
          <Badge key={index} variant="secondary" className="text-sm">
            {skill}
          </Badge>
        ))}
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">About {job.companyName}</h2>
        <p className="text-muted-foreground mb-4">{job.companyDescription}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Website</span>
            <span className="font-medium">{job.companyWebsite}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Industry</span>
            <span>{job.companyIndustry}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Company size</span>
            <span>{job.companySize}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-semibold mb-4">How to Apply</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Application Email</span>
            <span className="font-medium">{job.applicationEmail}</span>
          </div>
          {job.applicationUrl && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Application URL</span>
              <span className="font-medium">{job.applicationUrl}</span>
            </div>
          )}
        </div>
        {job.applicationInstructions && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="text-sm font-medium mb-2">Application Instructions:</h3>
            <p className="text-sm whitespace-pre-line">{job.applicationInstructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}
