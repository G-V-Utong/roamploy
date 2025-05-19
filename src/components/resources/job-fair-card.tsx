import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { JobFair } from "@/lib/resources-data"

interface JobFairCardProps {
  jobFair: JobFair
}

export function JobFairCard({ jobFair }: JobFairCardProps) {
  const formatLabel = (format: string) => {
    switch (format) {
      case "online":
        return "Online"
      case "in-person":
        return "In-Person"
      case "hybrid":
        return "Hybrid"
      default:
        return format
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={jobFair.organizerLogo || "/placeholder.svg"}
              alt={jobFair.organizer}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <h3 className="font-semibold text-lg">{jobFair.title}</h3>
              <p className="text-sm text-muted-foreground">Organized by {jobFair.organizer}</p>
            </div>
          </div>
          {jobFair.featured && <Badge className="bg-primary">Featured</Badge>}
        </div>

        <div className="mt-4 space-y-2">
          <Badge variant="outline">{formatLabel(jobFair.format)}</Badge>

          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {jobFair.date}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {jobFair.time}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {jobFair.location}
          </div>

          <p className="text-sm line-clamp-3 mt-2">{jobFair.description}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Participating Companies:</h4>
          <div className="flex flex-wrap gap-1">
            {jobFair.companies.slice(0, 5).map((company) => (
              <Badge key={company} variant="outline" className="text-xs">
                {company}
              </Badge>
            ))}
            {jobFair.companies.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{jobFair.companies.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button className="w-full" asChild>
          <Link href={jobFair.registrationLink}>Register Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
