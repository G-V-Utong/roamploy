/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import NewsletterForm from "@/components/newsletter-form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SaveJobButton from "@/components/save-job-button";
import ShareButton from "@/components/share-button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { formatRelativeDate, capitalizeJobType, formatSalaryNumber } from "@/lib/utils";

interface JobData {
  id: string;
  title: string;
  company_name: string;
  company_website: string;
  location: string;
  description: string;
  job_type: string;
  experience: string;
  salary_min: string;
  salary_max: string;
  salary_currency: string;
  posted_date: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  company_description: string;
  company_industry: string;
  company_size: string;
  application_url?: string;
  applicationemail?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const supabase = createServerComponentClient({ cookies })
  
  // Fetch all job IDs from Supabase
  const { data: jobs } = await supabase
    .from('jobs')
    .select('id')
    .order('posted_date', { ascending: false })
  
  if (!jobs) return []

  // Return array of params objects
  return jobs.map((job) => ({
    id: job.id.toString()
  }))
}

export default async function JobPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const supabase = createServerComponentClient({ cookies });

  // Fetch job from Supabase
  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !job) return notFound();

  // Get user's session to check if job is saved
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let isSaved = false;

  if (session?.user) {
    const { data: savedJob } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("job_id", resolvedParams.id)
      .eq("user_id", session.user.id)
      .single();

    isSaved = !!savedJob;
  }

  // Helper function to get application link
  const getApplicationLink = (job: JobData) => {
    if (job.application_url) {
      let url = job.application_url;
      // Add https:// if the URL doesn't start with http:// or https://
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      // Try to parse the URL to ensure it's valid
      try {
        new URL(url);
        return url;
      } catch {
        // If URL is invalid, fallback to email
        return job.applicationemail ? `mailto:${job.applicationemail}` : "#";
      }
    }
    // Fallback to email if no URL
    return job.applicationemail ? `mailto:${job.applicationemail}` : "#";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container m-auto px-4 py-8 md:px-6 md:py-12">
          <Link
            href="/jobs"
            className="inline-flex items-center text-sm font-medium mb-8"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to jobs
          </Link>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={
                        `https://logo.clearbit.com/${job.company_website}` ||
                        "/images/companyLogo.jpg"
                      }
                      alt={job.company_name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{job.company_name}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ShareButton 
                    title={`${job.title} at ${job.company_name}`}
                    text={`Check out this job: ${job.title} at ${job.company_name}`}
                    url={`${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job.id}`}
                  />
                  <SaveJobButton jobId={job.id} initialSavedState={isSaved} />
                  <Link
                    href={getApplicationLink(job)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Clock className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Job Type</h3>
                    <p className="text-sm">{capitalizeJobType(job.job_type)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <DollarSign className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Salary</h3>
                    <p className="text-sm">
                      {job.salary_min || job.salary_max
                        ? `${formatSalaryNumber(job.salary_min)} - ${formatSalaryNumber(job.salary_max)} ${job.salary_currency} `
                        : "Not specified"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Building className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Experience</h3>
                    <p className="text-sm">{job.experience}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Posted</h3>
                    <p className="text-sm">
                      {formatRelativeDate(job.posted_date)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="prose">
                <h2>Job Description</h2>
                <p>{job.description}</p>

                <h3>Responsibilities</h3>
                <ul>
                  {job.responsibilities.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>Requirements</h3>
                <ul>
                  {job.requirements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>Benefits</h3>
                <ul>
                  {job.benefits.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t">
                <Link
                  href={getApplicationLink(job)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full md:w-auto">
                    Apply for this position{" "}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    About {job.company_name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {job.company_description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Website</span>
                      <Link
                        href={`https://${job.company_website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        {job.company_website}
                      </Link>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Industry</span>
                      <span>{job.company_industry}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Company size
                      </span>
                      <span>{job.company_size}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`https://${job.company_website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline"
                    >
                      <Button variant="outline" className="w-full">
                        View Company Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <section className="bg-muted py-12">
        <div className="container m-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated with Roamploy
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and receive the latest remote job
              openings directly in your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
