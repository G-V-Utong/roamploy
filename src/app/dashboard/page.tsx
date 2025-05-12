"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookmarkCheck, Bell, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { jobsData } from "@/lib/data"
import { supabase } from "@/lib/supabase"
import { capitalizeJobType } from "@/lib/utils"
import type { JobType } from "@/lib/types"

interface SavedJobRecord {
  job_id: string;
  jobs: JobType;
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [savedJobs, setSavedJobs] = useState<JobType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/signin")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('saved_jobs')
          .select(`
            job_id,
            jobs (*)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        const savedJobsData = data as unknown as SavedJobRecord[]
        const jobs = (savedJobsData ?? []).map(record => record.jobs)
        setSavedJobs(jobs)
      } catch (error) {
        console.error('Error fetching saved jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedJobs()
  }, [user])

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6 m-auto">
          <div className="grid gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground">Manage your job applications and profile</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+2 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savedJobs.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {savedJobs.length === 0 ? "Start saving jobs!" : "Ready to apply"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+10 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">75%</div>
                  <p className="text-xs text-muted-foreground">Add your skills to improve</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Track your recent job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobsData.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex-1">
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="text-sm text-muted-foreground">{job.companyName}</div>
                          <div className="text-sm">Applied on May 2, 2025</div>
                        </div>
                        <div className="text-sm font-medium text-yellow-500">In Review</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/applications">
                      <Button variant="outline" className="w-full">
                        View All Applications
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                  <CardDescription>Jobs you&apos;ve bookmarked for later</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="py-8 text-center text-muted-foreground">Loading saved jobs...</div>
                  ) : savedJobs.length > 0 ? (
                    <div className="space-y-4">
                      {savedJobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex-1">
                            <h3 className="font-medium">{job.title}</h3>
                            <div className="text-sm text-muted-foreground">{job.companyName}</div>
                            <div className="text-sm">{job.location}</div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/jobs/${job.id}`}>
                              <Button variant="default" size="sm">View</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <BookmarkCheck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>You haven&apos;t saved any jobs yet.</p>
                      <Link href="/jobs" className="mt-4 inline-block">
                        <Button variant="outline" size="sm">Browse Jobs</Button>
                      </Link>
                    </div>
                  )}
                  {savedJobs.length > 3 && (
                    <div className="mt-4">
                      <Link href="/saved-jobs">
                        <Button variant="outline" className="w-full">
                          View All Saved Jobs ({savedJobs.length})
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="grid gap-2">
                    <Link
                      href="/profile/resume"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Edit Resume</span>
                    </Link>
                    <Link
                      href="/saved-jobs"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <BookmarkCheck className="h-4 w-4" />
                      <span>Saved Jobs</span>
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </Link>
                    <Link
                      href="/profile/settings"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                  </nav>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Recommended Jobs</CardTitle>
                  <CardDescription>Based on your profile and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobsData.slice(0, 4).map((job) => (
                      <div key={job.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex-1">
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="text-sm text-muted-foreground">{job.companyName}</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              {job.location}
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              {capitalizeJobType(job.job_type)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/jobs/${job.id}`}>
                            <Button size="sm">View Job</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/jobs">
                      <Button variant="outline" className="w-full">
                        Browse All Jobs
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
