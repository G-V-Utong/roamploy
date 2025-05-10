import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { JobType } from "@/lib/types"

interface JobCardProps {
  job: JobType
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-md">
                <Image
                  src={job.companyLogo || "/placeholder.svg"}
                  alt={job.companyName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  <Link href={`/jobs/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span>{job.companyName}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {job.location}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Save job</span>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {job.jobType}
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4" />
              {job.salary}
            </div>
          </div>
          <p className="mt-4 text-sm line-clamp-2">{job.description}</p>
        </div>
        <div className="flex items-center justify-between bg-muted p-4">
          <span className="text-sm text-muted-foreground">Posted {job.postedDate}</span>
          <Link href={`/jobs/${job.id}`}>
            <Button>View Job</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
