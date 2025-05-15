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
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const PAGE_SIZE = 20
  const [filters, setFilters] = useState<FilterState>({
    experience: [],
    jobType: [],
    skills: [],
    location: []
  })

  // Move fetchJobs into useCallback to prevent unnecessary recreation
  const fetchJobs = useCallback(async (filters: FilterState) => {
    setIsLoading(true)
    
    try {
      // First, get total count for pagination
      let countQuery = supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })

      // Apply filters to count query
      if (filters.experience.length > 0) {
        countQuery = countQuery.in('experience', filters.experience)
      }
      if (filters.jobType.length > 0) {
        countQuery = countQuery.in('job_type', filters.jobType.map(type => type.toLowerCase().replace(' ', '-')))
      }
      if (filters.location.length > 0) {
        const locationConditions = filters.location.map(loc => `location.ilike.%${loc}%`)
        countQuery = countQuery.or(locationConditions.join(','))
      }
      if (filters.skills.length > 0) {
        countQuery = countQuery.contains('skills', filters.skills)
      }
      if (searchTerm) {
        countQuery = countQuery.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,skills.cs.{${searchTerm}}`)
      }

      const { count, error: countError } = await countQuery
      
      if (countError) throw countError
      
      setTotalPages(Math.ceil((count || 0) / PAGE_SIZE))

      // Now fetch the actual data with pagination
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

      // Add pagination
      query = query
        .order('posted_date', { ascending: false })
        .range(currentPage * PAGE_SIZE, (currentPage * PAGE_SIZE) + PAGE_SIZE - 1)

      const { data, error } = await query

      if (error) throw error
      
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, currentPage, supabase])

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

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  // Reset pagination when filters change
  const applyFilters = () => {
    setCurrentPage(0)
    fetchJobs(filters)
  }

  // Handle search with pagination reset
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(0)
    fetchJobs(filters)
  }

  // Update useEffect
  useEffect(() => {
    fetchJobs(filters)
  }, [fetchJobs, filters])

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const current = currentPage + 1
    const total = totalPages
    const delta = 1 // Number of pages to show on each side of current page

    const range: (number | string)[] = []
    for (
      let i = Math.max(1, current - delta);
      i <= Math.min(total, current + delta);
      i++
    ) {
      range.push(i)
    }

    const firstNumber = range[0]
    if (typeof firstNumber === 'number' && firstNumber > 1) {
      if (firstNumber > 2) {
        range.unshift('...')
      }
      range.unshift(1)
    }

    const lastNumber = range[range.length - 1]
    if (typeof lastNumber === 'number' && lastNumber < total) {
      if (lastNumber < total - 1) {
        range.push('...')
      }
      range.push(total)
    }

    return range
  }

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
                  <Button 
                    variant="outline" 
                    size="icon" 
                    disabled={currentPage === 0} 
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &lt;
                  </Button>
                  {getPaginationNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className={page === currentPage + 1 ? "bg-primary text-primary-foreground" : ""}
                        onClick={() => handlePageChange(page - 1)}
                      >
                        {page}
                      </Button>
                    ) : (
                      <span key={index} className="text-muted-foreground">{page}</span>
                    )
                  ))}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    disabled={currentPage === totalPages - 1} 
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
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
