import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Internship } from "@/lib/resources-data"

interface InternshipCardProps {
  internship: Internship
}

export function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={internship.companyLogo || "/placeholder.svg"}
              alt={internship.company}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <h3 className="font-semibold text-lg">{internship.title}</h3>
              <p className="text-sm text-muted-foreground">{internship.company}</p>
            </div>
          </div>
          {internship.featured && <Badge className="bg-primary">Featured</Badge>}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {internship.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {internship.duration}
          </div>
          <div className="font-medium">{internship.stipend}</div>
          <p className="text-sm line-clamp-3 mt-2">{internship.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {internship.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="w-full flex items-center justify-between">
          <div className="text-xs text-muted-foreground flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Deadline: {internship.deadline}
          </div>
          <Link href="#" className="text-sm font-medium text-primary hover:underline">
            Apply Now
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
