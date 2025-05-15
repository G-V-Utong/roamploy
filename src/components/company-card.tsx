/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { Building, MapPin, Users, ExternalLink, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { capitalizeJobType } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-context"
import { useRouter } from "next/navigation"
// import { JobType } from "@/lib/types"

interface CompanyCardProps {
  company: {
    id: string
    name: string
    logo: string
    website: string
    industry: string
    size: string
    description: string
    jobs: Array<{
      id: string
      title: string
      location: string
      job_type: string
      posted_date: string
    }>
  }
  viewMode?: "grid" | "list"
}
// interface JobCardProps {
//   job: JobType
// }

export default function CompanyCard({ company, viewMode = "grid" }: CompanyCardProps) {
    const router = useRouter()
    const { user } = useAuth()

    const handleViewJob = (jobId: any) => {
        if (!user) {
          toast.error('Please sign in to view job details')
          router.push('/signin?redirect=/jobs/' + jobId)
          return
        }
        router.push(`/jobs/${jobId}`)
    }
    const handleViewCompany = () => {
        if (!user) {
          toast.error('Please sign in to view company details')
          router.push('/signin?redirect=/companies/' + company.id)
            return
        }
        router.push(`/companies/${company.id}`)
    }


  if (viewMode === "list") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-background flex-shrink-0">
              <img
                src={`https://logo.clearbit.com/${company.website}` || "/images/companyLogo.jpg"}
                alt={`${company.name} logo`}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    <Link href={`/companies/${company.id}`} className="hover:underline">
                      {company.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {company.industry}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {company.size}
                    </div>
                  </div>
                </div>
                <Link href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{company.description}</p>
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Open Positions ({company.jobs.length})</div>
                <div className="space-y-2">
                  {company.jobs.slice(0, 3).map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`} className="block">
                      <div className="flex justify-between items-center p-2 hover:bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <MapPin className="h-3 w-3" /> {job.location}
                          </div>
                        </div>
                        <Badge variant="secondary">{capitalizeJobType(job.job_type)}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
                {company.jobs.length > 3 && (
                  <Button variant="ghost" className="w-full mt-2" asChild>
                    <Link href={`/companies/${company.id}`}>
                      View all {company.jobs.length} positions
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-background">
              <img
                src={`https://logo.clearbit.com/${company.website}` || "/images/companyLogo.jpg"}
                alt={`${company.name} logo`}
                className="object-cover"
              />
            </div>
            <Link href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div>
            <h3 className="font-semibold">
              <Link href={`/companies/${company.id}`} className="hover:underline">
                {company.name}
              </Link>
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {company.industry}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {company.size}
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{company.description}</p>

          <div>
            <div className="text-sm font-medium mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Open Positions ({company.jobs.length})
            </div>
            {company.jobs.slice(0, 2).map((job) => (
              <div key={job.id} className="block cursor-pointer" onClick={() => handleViewJob(job.id)}>
                <div className="text-sm hover:bg-muted p-2 rounded-lg mb-1">
                  <div className="font-medium">{job.title}</div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </div>
                </div>
              </div>
            ))}
            {company.jobs.length > 2 && (
              <Button variant="ghost" size="sm" className="w-full mt-2" onClick={handleViewCompany}>
                View all {company.jobs.length} positions
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
