import Image from "next/image"
import { CalendarIcon, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { BlogPost } from "@/lib/resources-data"

interface BlogCardProps {
  blog: BlogPost
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
        {blog.featured && <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>}
      </div>
      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{blog.category}</Badge>
          </div>
          <h3 className="font-semibold text-lg line-clamp-2">{blog.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{blog.excerpt}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={blog.authorAvatar || "/placeholder.svg"}
            alt={blog.author}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-xs">{blog.author}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {blog.publishDate}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {blog.readTime}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}