import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { CareerEvent } from "@/lib/resources-data"

interface CareerEventCardProps {
  event: CareerEvent
}

export function CareerEventCard({ event }: CareerEventCardProps) {
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

  const typeLabel = (type: string) => {
    switch (type) {
      case "seminar":
        return "Seminar"
      case "bootcamp":
        return "Bootcamp"
      case "workshop":
        return "Workshop"
      case "course":
        return "Course"
      default:
        return type
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={event.organizerLogo || "/placeholder.svg"}
              alt={event.organizer}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.organizer}</p>
            </div>
          </div>
          {event.featured && <Badge className="bg-primary">Featured</Badge>}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{typeLabel(event.type)}</Badge>
            <Badge variant="outline">{formatLabel(event.format)}</Badge>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {event.startDate === event.endDate ? event.startDate : `${event.startDate} - ${event.endDate}`}
          </div>

          {event.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {event.location}
            </div>
          )}

          <div className="font-medium">{event.price}</div>
          <p className="text-sm line-clamp-3 mt-2">{event.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {event.topics.map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link href="#" className="text-sm font-medium text-primary hover:underline">
          Learn More & Register
        </Link>
      </CardFooter>
    </Card>
  )
}
