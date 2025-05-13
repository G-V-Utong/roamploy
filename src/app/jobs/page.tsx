"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, Filter, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import JobCard from "@/components/job-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { JobType } from "@/lib/types"

interface FilterState {
  experience: string[];
  jobType: string[];
  skills: string[];
  location: string[];
}

export default function JobsPage() {
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

  // Move fetchJobs into useCallback to prevent unnecessary recreation
  const fetchJobs = useCallback(async (filters: FilterState) => {
    setIsLoading(true)
    let query = supabase
      .from('jobs')
      .select('*')
      
    // Apply experience level filter
    if (filters.experience.length > 0) {
      query = query.in('experience', filters.experience)
    }

    // Apply job type filter
    if (filters.jobType.length > 0) {
      query = query.in('job_type', filters.jobType.map(type => type.toLowerCase().replace(' ', '-')))
    }

    // Apply location filter
    if (filters.location.length > 0) {
      const locationConditions = filters.location.map(loc => `location.ilike.%${loc}%`)
      query = query.or(locationConditions.join(','))
    }

    // Apply skills filter (skills is an array in the database)
    if (filters.skills.length > 0) {
      query = query.contains('skills', filters.skills)
    }

    // Apply search term if exists
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,skills.cs.{${searchTerm}}`)
    }

    // Order by posted date
    query = query.order('posted_date', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching jobs:', error)
      return
    }

    setJobs(data || [])
    setIsLoading(false)
  }, [searchTerm, supabase])

  // Handle filter changes
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

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchJobs(filters)
  }

  // Apply filters
  const applyFilters = () => {
    fetchJobs(filters)
  }

  // Update useEffect
  useEffect(() => {
    fetchJobs(filters)
  }, [fetchJobs, filters])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-muted py-8">
          <div className="container m-auto px-4 md:px-6">
            <div className="w-full max-w-3xl mx-auto space-y-2">
              <h1 className="text-2xl font-bold text-center mb-4">Find Your Perfect Remote Job</h1>
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
            </div>
          </div>
        </div>
        <div className="container px-4 py-8 md:px-6">
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
                      {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox 
                            id={level.toLowerCase().replace(' ', '-')}
                            checked={filters.experience.includes(level)}
                            onCheckedChange={() => handleFilterChange('experience', level)}
                          />
                          <label htmlFor={level.toLowerCase().replace(' ', '-')} className="text-sm">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Job Type</h4>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={type.toLowerCase().replace(' ', '-')}
                            checked={filters.jobType.includes(type)}
                            onCheckedChange={() => handleFilterChange('jobType', type)}
                          />
                          <label htmlFor={type.toLowerCase().replace(' ', '-')} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills</h4>
                    <div className="space-y-2">
                      {["React", "Node.js", "Python", "UI/UX Design"].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            id={skill.toLowerCase().replace(' ', '-')}
                            checked={filters.skills.includes(skill)}
                            onCheckedChange={() => handleFilterChange('skills', skill)}
                          />
                          <label htmlFor={skill.toLowerCase().replace(' ', '-')} className="text-sm">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Location</h4>
                    <div className="space-y-2">
                      {["Worldwide", "US Only", "Europe"].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox 
                            id={location.toLowerCase().replace(' ', '-')}
                            checked={filters.location.includes(location)}
                            onCheckedChange={() => handleFilterChange('location', location)}
                          />
                          <label htmlFor={location.toLowerCase().replace(' ', '-')} className="text-sm">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                </div>
              </div>
            </div>
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Remote Jobs</h2>
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
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    <p className="mt-2 text-muted-foreground">Loading jobs...</p>
                  </div>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No jobs found
                  </div>
                )}
              </div>
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" className="bg-primary text-primary-foreground">
                    1
                  </Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
