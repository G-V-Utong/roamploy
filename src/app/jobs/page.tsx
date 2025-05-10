import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import JobCard from "@/components/job-card"
import { jobsData } from "@/lib/data"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function JobsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-muted py-8">
          <div className="container m-auto px-4 md:px-6">
            <div className="w-full max-w-3xl mx-auto space-y-2">
              <h1 className="text-2xl font-bold text-center mb-4">Find Your Perfect Remote Job</h1>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jobs by title, skill or keyword..."
                  className="w-full bg-background pl-10 pr-4 py-6 text-base"
                />
                <Button className="absolute right-1 top-1 h-10">Search</Button>
              </div>
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
                {jobsData.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
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
