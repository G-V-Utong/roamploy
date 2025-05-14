"use client"

import { useState, useEffect, useCallback } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import JobCard from "@/components/job-card"
import NewsletterForm from "@/components/newsletter-form"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { JobType } from "@/lib/types"
import Image from "next/image"

interface FilterState {
  experience: string[];
  jobType: string[];
  skills: string[];
  location: string[];
}

export default function HomePage() {
  const supabase = createClientComponentClient()
  const [jobs, setJobs] = useState<JobType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    experience: [],
    jobType: [],
    skills: [],
    location: []
  })

  const fetchJobs = useCallback(async (filters: FilterState) => {
    setIsLoading(true)
    let query = supabase
      .from('jobs')
      .select('*')
      
    if (filters.experience.length > 0) {
      query = query.in('experience', filters.experience)
    }

    if (filters.jobType.length > 0) {
      query = query.in('job_type', filters.jobType.map(type => type.toLowerCase().replace(' ', '-')))
    }

    if (filters.location.length > 0) {
      const locationConditions = filters.location.map(loc => `location.ilike.%${loc}%`)
      query = query.or(locationConditions.join(','))
    }

    if (filters.skills.length > 0) {
      query = query.contains('skills', filters.skills)
    }

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,skills.cs.{${searchTerm}}`)
    }

    query = query.order('posted_date', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching jobs:', error)
      return
    }

    setJobs(data || [])
    setIsLoading(false)
  }, [searchTerm, supabase])

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentFilters = [...prev[category]]
      const index = currentFilters.indexOf(value)
      
      if (index === -1) {
        currentFilters.push(value)
      } else {
        currentFilters.splice(index, 1)
      }

      return {
        ...prev,
        [category]: currentFilters
      }
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchJobs(filters)
  }

  const applyFilters = () => {
    fetchJobs(filters)
  }

  const handleCategoryClick = (category: string) => {
    setSearchTerm(category)
    fetchJobs({
      ...filters,
      skills: category === 'Software Development' ? ['React', 'Node.js', 'Python'] : [],
    })
  }

  useEffect(() => {
    fetchJobs(filters)
  }, [fetchJobs, filters])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-12 md:py-24 relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/remote-work2.jpg"
              alt="Remote worker"
              fill
              className="object-cover opacity-15"
            />
          </div>
          <div className="container m-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Find Your Perfect Remote Job with <span className="font-dancing-script text-primary text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Roamploy </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover thousands of remote opportunities across different fields and skills.
                </p>
              </div>
              <div className="w-full max-w-3xl space-y-2">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search jobs by title, skill or keyword..."
                    className="w-full bg-background pl-10 pr-4 py-6 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" className="absolute right-1 top-1 h-10">Search</Button>
                </form>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCategoryClick('Software Development')}
                  >
                    Software Development
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCategoryClick('Design')}
                  >
                    Design
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCategoryClick('Marketing')}
                  >
                    Marketing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCategoryClick('Customer Support')}
                  >
                    Customer Support
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCategoryClick('Project Management')}
                  >
                    Project Management
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 space-y-6">
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-4">
                    <Filter className="h-4 w-4" /> Filters
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Experience Level</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="entry"
                            checked={filters.experience.includes("Entry Level")}
                            onCheckedChange={() => handleFilterChange("experience", "Entry Level")}
                          />
                          <label htmlFor="entry" className="text-sm">
                            Entry Level
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mid"
                            checked={filters.experience.includes("Mid Level")}
                            onCheckedChange={() => handleFilterChange("experience", "Mid Level")}
                          />
                          <label htmlFor="mid" className="text-sm">
                            Mid Level
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="senior"
                            checked={filters.experience.includes("Senior Level")}
                            onCheckedChange={() => handleFilterChange("experience", "Senior Level")}
                          />
                          <label htmlFor="senior" className="text-sm">
                            Senior Level
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Job Type</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fulltime"
                            checked={filters.jobType.includes("Full-time")}
                            onCheckedChange={() => handleFilterChange("jobType", "Full-time")}
                          />
                          <label htmlFor="fulltime" className="text-sm">
                            Full-time
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="parttime"
                            checked={filters.jobType.includes("Part-time")}
                            onCheckedChange={() => handleFilterChange("jobType", "Part-time")}
                          />
                          <label htmlFor="parttime" className="text-sm">
                            Part-time
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="contract"
                            checked={filters.jobType.includes("Contract")}
                            onCheckedChange={() => handleFilterChange("jobType", "Contract")}
                          />
                          <label htmlFor="contract" className="text-sm">
                            Contract
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="react"
                            checked={filters.skills.includes("React")}
                            onCheckedChange={() => handleFilterChange("skills", "React")}
                          />
                          <label htmlFor="react" className="text-sm">
                            React
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="node"
                            checked={filters.skills.includes("Node.js")}
                            onCheckedChange={() => handleFilterChange("skills", "Node.js")}
                          />
                          <label htmlFor="node" className="text-sm">
                            Node.js
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="python"
                            checked={filters.skills.includes("Python")}
                            onCheckedChange={() => handleFilterChange("skills", "Python")}
                          />
                          <label htmlFor="python" className="text-sm">
                            Python
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="design"
                            checked={filters.skills.includes("UI/UX Design")}
                            onCheckedChange={() => handleFilterChange("skills", "UI/UX Design")}
                          />
                          <label htmlFor="design" className="text-sm">
                            UI/UX Design
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Location</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="worldwide"
                            checked={filters.location.includes("Worldwide")}
                            onCheckedChange={() => handleFilterChange("location", "Worldwide")}
                          />
                          <label htmlFor="worldwide" className="text-sm">
                            Worldwide
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="us"
                            checked={filters.location.includes("US Only")}
                            onCheckedChange={() => handleFilterChange("location", "US Only")}
                          />
                          <label htmlFor="us" className="text-sm">
                            US Only
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="europe"
                            checked={filters.location.includes("Europe")}
                            onCheckedChange={() => handleFilterChange("location", "Europe")}
                          />
                          <label htmlFor="europe" className="text-sm">
                            Europe
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                  </div>
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Featured Jobs</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select className="text-sm border rounded p-1">
                      <option>Most Recent</option>
                      <option>Relevance</option>
                      <option>Salary: High to Low</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center text-muted-foreground py-8">
                      Loading jobs...
                    </div>
                  ) : jobs.length > 0 ? (
                    jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No jobs found
                    </div>
                  )}
                </div>
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="mx-auto">
                    Load More Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12">
          <div className="container m-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated with Roamploy</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter and receive the latest remote job openings directly in your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
