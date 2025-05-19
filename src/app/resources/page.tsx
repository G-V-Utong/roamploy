"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCard } from "@/components/resources/blog-card";
import { InternshipCard } from "@/components/resources/internship-card";
import { CareerEventCard } from "@/components/resources/career-event-card";
import { JobFairCard } from "@/components/resources/job-fair-card";
import { supabase } from "@/lib/supabase";
import { BlogPost, Internship, CareerEvent, JobFair } from "@/lib/types";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Loading from "./loading";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("blogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [careerEvents, setCareerEvents] = useState<CareerEvent[]>([]);
  const [jobFairs, setJobFairs] = useState<JobFair[]>([]);

  // Filters for each tab
  const [blogCategory, setBlogCategory] = useState("all");
  const [internshipLocation, setInternshipLocation] = useState("all");
  const [eventType, setEventType] = useState("all");
  const [eventFormat, setEventFormat] = useState("all");
  const [fairFormat, setFairFormat] = useState("all");

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    setIsLoading(true);
    try {
      // Fetch blogs
      const { data: blogsData, error: blogsError } = await supabase
        .from("blogs")
        .select("*")
        .order("publish_date", { ascending: false });
      if (blogsError) throw blogsError;
      // Map database fields to component props
      setBlogs(
        blogsData.map((blog) => ({
          ...blog,
          authorAvatar: blog.author_avatar,
          readTime: blog.read_time,
          publishDate: blog.publish_date,
        }))
      );

      // Fetch internships
      const { data: internshipsData, error: internshipsError } = await supabase
        .from("internships")
        .select("*")
        .order("deadline", { ascending: true });
      if (internshipsError) throw internshipsError;
      // Map database fields to component props
      setInternships(
        internshipsData.map((internship) => ({
          ...internship,
          companyLogo: internship.company_logo,
        }))
      );

      // Fetch career events
      const { data: eventsData, error: eventsError } = await supabase
        .from("career_events")
        .select("*")
        .order("start_date", { ascending: true });
      if (eventsError) throw eventsError;
      // Map database fields to component props
      setCareerEvents(
        eventsData.map((event) => ({
          ...event,
          organizerLogo: event.organizer_logo,
          startDate: event.start_date,
          endDate: event.end_date,
        }))
      );

      // Fetch job fairs
      const { data: fairsData, error: fairsError } = await supabase
        .from("job_fairs")
        .select("*")
        .order("date", { ascending: true });
      if (fairsError) throw fairsError;
      // Map database fields to component props
      setJobFairs(
        fairsData.map((fair) => ({
          ...fair,
          organizerLogo: fair.organizer_logo,
          registrationLink: fair.registration_link,
        }))
      );
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Filter blog posts
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      blogCategory === "all" || blog.category === blogCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter internships
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      internshipLocation === "all" ||
      internship.location
        .toLowerCase()
        .includes(internshipLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  // Filter career events
  const filteredEvents = careerEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = eventType === "all" || event.type === eventType;
    const matchesFormat = eventFormat === "all" || event.format === eventFormat;
    return matchesSearch && matchesType && matchesFormat;
  });

  // Filter job fairs
  const filteredFairs = jobFairs.filter((fair) => {
    const matchesSearch =
      fair.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fair.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = fairFormat === "all" || fair.format === fairFormat;
    return matchesSearch && matchesFormat;
  });

  // Get unique blog categories
  const blogCategories = [
    "all",
    ...new Set(blogs.map((blog) => blog.category)),
  ];

  // Get unique internship locations
  const internshipLocations = [
    "all",
    ...new Set(internships.map((internship) => internship.location)),
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <Loading />
        <Footer/>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container m-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Career Resources</h1>

        <Tabs
          defaultValue="blogs"
          className="space-y-4"
          onValueChange={setActiveTab}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <TabsList className="h-10">
              <TabsTrigger value="blogs" className="text-sm">
                Blogs
              </TabsTrigger>
              <TabsTrigger value="internships" className="text-sm">
                Internships
              </TabsTrigger>
              <TabsTrigger value="events" className="text-sm">
                Career Development
              </TabsTrigger>
              <TabsTrigger value="fairs" className="text-sm">
                Job Fairs
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeTab === "blogs" && (
              <Select value={blogCategory} onValueChange={setBlogCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {blogCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {activeTab === "internships" && (
              <Select
                value={internshipLocation}
                onValueChange={setInternshipLocation}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {internshipLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {activeTab === "events" && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="seminar">Seminars</SelectItem>
                    <SelectItem value="bootcamp">Bootcamps</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="course">Courses</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={eventFormat} onValueChange={setEventFormat}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Formats</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab === "fairs" && (
              <Select value={fairFormat} onValueChange={setFairFormat}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <TabsContent value="blogs" className="space-y-4">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No blog posts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="internships" className="space-y-4">
            {filteredInternships.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No internships found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No career events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <CareerEventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="fairs" className="space-y-4">
            {filteredFairs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No job fairs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFairs.map((fair) => (
                  <JobFairCard key={fair.id} jobFair={fair} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
