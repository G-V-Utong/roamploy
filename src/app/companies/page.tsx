"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Filter, Building, MapPin, Briefcase, Users, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CompanyCard from "@/components/company-card"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Company {
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

export default function CompaniesPage() {
  const supabase = createClientComponentClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState<Company[]>([])

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true)
      try {
        const { data: jobs, error } = await supabase
          .from('jobs')
          .select('*')
          .order('posted_date', { ascending: false })

        if (error) throw error

        // Group jobs by company
        const companiesMap = new Map<string, Company>()
        
        jobs?.forEach(job => {
          if (!companiesMap.has(job.company_name)) {
            companiesMap.set(job.company_name, {
              id: job.company_name.toLowerCase().replace(/\s+/g, '-'),
              name: job.company_name,
              logo: job.company_logo || '',
              website: job.company_website || '',
              industry: job.company_industry,
              size: job.company_size,
              description: job.company_description,
              jobs: []
            })
          }

          companiesMap.get(job.company_name)?.jobs.push({
            id: job.id,
            title: job.title,
            location: job.location,
            job_type: job.job_type,
            posted_date: job.posted_date
          })
        })

        setCompanies(Array.from(companiesMap.values()))
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [supabase])

  // Get unique industries for filter
  const industries = useMemo(() => {
    const uniqueIndustries = new Set(companies.map((company) => company.industry))
    return Array.from(uniqueIndustries)
  }, [companies])

  // Get unique company sizes for filter
  const companySizes = useMemo(() => {
    const uniqueSizes = new Set(companies.map((company) => company.size))
    return Array.from(uniqueSizes)
  }, [companies])

  // Filter companies based on search query and filters
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.jobs.some(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()))

      // Industry filter
      const matchesIndustry = industryFilter === "all" || company.industry === industryFilter

      // Size filter
      const matchesSize = sizeFilter === "all" || company.size === sizeFilter

      return matchesSearch && matchesIndustry && matchesSize
    })
  }, [companies, searchQuery, industryFilter, sizeFilter])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading companies...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-muted py-8">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-2">
              <h1 className="text-2xl font-bold text-center mb-4">Discover Remote-Friendly Companies</h1>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search companies by name or industry..."
                  className="w-full bg-background pl-10 pr-4 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8 md:px-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="md:w-1/4 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-4">
                    <Filter className="h-4 w-4" /> Filters
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Industry</h4>
                      <Select value={industryFilter} onValueChange={setIndustryFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Industries</SelectItem>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Company Size</h4>
                      <Select value={sizeFilter} onValueChange={setSizeFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sizes</SelectItem>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSearchQuery("")
                          setIndustryFilter("all")
                          setSizeFilter("all")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Companies Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Total Companies</span>
                      </div>
                      <Badge variant="secondary">{companies.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Total Jobs</span>
                      </div>
                      <Badge variant="secondary">{companies.reduce((acc, company) => acc + company.jobs.length, 0)}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Industries</span>
                      </div>
                      <Badge variant="secondary">{industries.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Company Sizes</span>
                      </div>
                      <Badge variant="secondary">{companySizes.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredCompanies.length} {filteredCompanies.length === 1 ? "Company" : "Companies"}
                </h2>
                <div>
                  <Tabs value={viewMode} onValueChange={setViewMode} className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="grid">Grid</TabsTrigger>
                      <TabsTrigger value="list">List</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {filteredCompanies.length === 0 ? (
                <div className="text-center py-12">
                  <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No companies found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn&apos;t find any companies matching your search criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setIndustryFilter("all")
                      setSizeFilter("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} viewMode="list" />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
