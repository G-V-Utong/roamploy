import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import JobCard from "@/components/job-card"
import NewsletterForm from "@/components/newsletter-form"
import { supabase } from "@/lib/supabase"

export default async function HomePage() {
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .order('posted_date', { ascending: false })
  
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-12 md:py-24 relative">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/remote-work2.jpg"
              alt="Remote worker"
              className="w-full h-full object-cover opacity-15"
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
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search jobs by title, skill or keyword..."
                    className="w-full bg-background pl-10 pr-4 py-6 text-base"
                  />
                  <Button className="absolute right-1 top-1 h-10">Search</Button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    Software Development
                  </Button>
                  <Button variant="outline" size="sm">
                    Design
                  </Button>
                  <Button variant="outline" size="sm">
                    Marketing
                  </Button>
                  <Button variant="outline" size="sm">
                    Customer Support
                  </Button>
                  <Button variant="outline" size="sm">
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
                          <input type="checkbox" id="entry" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="entry" className="text-sm">
                            Entry Level
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="mid" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="mid" className="text-sm">
                            Mid Level
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="senior" className="h-4 w-4 rounded border-gray-300" />
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
                          <input type="checkbox" id="fulltime" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="fulltime" className="text-sm">
                            Full-time
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="parttime" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="parttime" className="text-sm">
                            Part-time
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="contract" className="h-4 w-4 rounded border-gray-300" />
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
                          <input type="checkbox" id="react" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="react" className="text-sm">
                            React
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="node" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="node" className="text-sm">
                            Node.js
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="python" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="python" className="text-sm">
                            Python
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="design" className="h-4 w-4 rounded border-gray-300" />
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
                          <input type="checkbox" id="worldwide" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="worldwide" className="text-sm">
                            Worldwide
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="us" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="us" className="text-sm">
                            US Only
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="europe" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="europe" className="text-sm">
                            Europe
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Apply Filters</Button>
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
                  {jobs?.map((job) => (
                    <JobCard key={job.id} job={job} />
                  )) ?? (
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
