"use client"
// import Link from "next/link"
import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { JobType } from "@/lib/types"
import { formatRelativeDate, capitalizeJobType, formatSalaryNumber } from "@/lib/utils"
import { useAuth } from "@/components/auth/auth-context"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface JobCardProps {
  job: JobType
}

export default function JobCard({ job }: JobCardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if job is saved when component mounts
    const checkSavedStatus = async () => {
      if (!user) return
      
      const { data } = await supabase
        .from('saved_jobs')
        .select('id')
        .eq('job_id', job.id)
        .eq('user_id', user.id)
        .single()
      
      setIsSaved(!!data)
    }

    checkSavedStatus()
  }, [job.id, user])

  const toggleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save jobs')
      return
    }

    setIsLoading(true)
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('saved_jobs')
          .delete()
          .eq('job_id', job.id)
          .eq('user_id', user.id)

        if (error) throw error
        toast.success('Job removed from saved jobs')
      } else {
        const { error } = await supabase
          .from('saved_jobs')
          .insert({ job_id: job.id, user_id: user.id })

        if (error) throw error
        toast.success('Job saved successfully')
      }
      setIsSaved(!isSaved)
    } catch (error) {
      toast.error('Failed to save job')
      console.error('Error toggling job save:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewJob = () => {
    if (!user) {
      toast.error('Please sign in to view job details')
      router.push('/signin?redirect=/jobs/' + job.id)
      return
    }
    router.push(`/jobs/${job.id}`)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-md bg-background">
                <img
                  src={`https://logo.clearbit.com/${job.company_website}` || "/images/companyLogo.jpg"}
                  alt={`${job.company_name} logo`}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg hover:underline cursor-pointer" onClick={handleViewJob}>
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span>{job.company_name}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {job.location}
                  </div>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={toggleSave}
              disabled={isLoading}
            >
              <Bookmark 
                className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} 
              />
              <span className="sr-only">
                {isSaved ? 'Unsave job' : 'Save job'}
              </span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="outline">+{job.skills.length - 4} more</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {capitalizeJobType(job.job_type)}
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4" />
              {job.salary_min || job.salary_max ? 
                `${formatSalaryNumber(job.salary_min)} - ${formatSalaryNumber(job.salary_max)} ${job.salary_currency}` : 
                "Not specified"}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <span className="text-sm text-muted-foreground">
            Posted {formatRelativeDate(job.created_at)}
          </span>
          <Button onClick={handleViewJob}>View Job</Button>
        </div>
      </CardContent>
    </Card>
  )
}
