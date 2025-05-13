"use client"

import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-context"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface SaveJobButtonProps {
  jobId: string
  initialSavedState?: boolean
  variant?: "outline" | "default"
  size?: "icon" | "default" | "sm" | "lg"
  className?: string
}

export default function SaveJobButton({ 
  jobId, 
  initialSavedState = false,
  variant = "outline",
  size = "icon",
  className = ""
}: SaveJobButtonProps) {
  const { user } = useAuth()
  const [isSaved, setIsSaved] = useState(initialSavedState)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user) return
      
      const { data } = await supabase
        .from('saved_jobs')
        .select('id')
        .eq('job_id', jobId)
        .eq('user_id', user.id)
        .single()
      
      setIsSaved(!!data)
    }

    checkSavedStatus()
  }, [jobId, user])

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
          .eq('job_id', jobId)
          .eq('user_id', user.id)

        if (error) throw error
        toast.success('Job removed from saved jobs')
      } else {
        const { error } = await supabase
          .from('saved_jobs')
          .insert({ job_id: jobId, user_id: user.id })

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

  return (
    <Button 
      variant={variant}
      size={size}
      className={className}
      onClick={toggleSave}
      disabled={isLoading}
      title={isSaved ? "Remove from saved jobs" : "Save job"}
    >
      <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
      <span className="sr-only">
        {isSaved ? 'Unsave job' : 'Save job'}
      </span>
    </Button>
  )
}