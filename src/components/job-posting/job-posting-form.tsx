"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ChevronRight, Plus, X } from "lucide-react"

const jobPostingSchema = z.object({
  // Job Details
  title: z.string().min(5, "Job title must be at least 5 characters"),
  jobType: z.string().min(1, "Please select a job type"),
  experienceLevel: z.string().min(1, "Please select an experience level"),
  location: z.string().min(1, "Please specify the job location"),
  salaryMin: z.string().min(1, "Please enter a minimum salary"),
  salaryMax: z.string().min(1, "Please enter a maximum salary"),
  salaryCurrency: z.string().min(1, "Please select a currency"),
  salaryPeriod: z.string().min(1, "Please select a salary period"),

  // Job Description
  description: z.string().min(100, "Job description must be at least 100 characters"),
  responsibilities: z.array(z.string().min(5, "Each responsibility must be at least 5 characters")),
  requirements: z.array(z.string().min(5, "Each requirement must be at least 5 characters")),
  benefits: z.array(z.string().min(5, "Each benefit must be at least 5 characters")),
  skills: z.array(z.string().min(2, "Each skill must be at least 2 characters")),

  // Company Details
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyWebsite: z.string().url("Please enter a valid URL"),
  companyDescription: z.string().min(50, "Company description must be at least 50 characters"),
  companyIndustry: z.string().min(2, "Please specify the company industry"),
  companySize: z.string().min(1, "Please select the company size"),

  // Application Details
  applicationEmail: z.string().email("Please enter a valid email"),
  applicationUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  applicationInstructions: z.string().optional(),

  // Additional Options
  isRemote: z.boolean(),
  isUrgent: z.boolean(),
  isFeatured: z.boolean(),
})

type JobPostingFormValues = z.infer<typeof jobPostingSchema>

interface JobPostingFormProps {
  onSubmit: (data: JobPostingFormValues) => void
  initialData?: JobPostingFormValues
}

export default function JobPostingForm({ onSubmit, initialData }: JobPostingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const defaultValues: JobPostingFormValues = {
    // Job Details
    title: "",
    jobType: "",
    experienceLevel: "",
    location: "Remote (Worldwide)",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    salaryPeriod: "yearly",

    // Job Description
    description: "",
    responsibilities: [""],
    requirements: [""],
    benefits: [""],
    skills: [""],

    // Company Details
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    companyIndustry: "",
    companySize: "",

    // Application Details
    applicationEmail: "",
    applicationUrl: "",
    applicationInstructions: "",

    // Additional Options
    isRemote: true,
    isUrgent: false,
    isFeatured: false,
  }

  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: initialData || defaultValues,
    mode: "onChange",
  })

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (data: JobPostingFormValues) => {
    onSubmit(data)
  }

  const addListItem = (fieldName: "responsibilities" | "requirements" | "benefits" | "skills") => {
    const currentItems = form.getValues(fieldName)
    form.setValue(fieldName, [...currentItems, ""])
  }

  const removeListItem = (fieldName: "responsibilities" | "requirements" | "benefits" | "skills", index: number) => {
    const currentItems = form.getValues(fieldName)
    if (currentItems.length > 1) {
      form.setValue(
        fieldName,
        currentItems.filter((_, i) => i !== index),
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Step 1: Job Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                        <SelectItem value="Mid Level">Mid Level</SelectItem>
                        <SelectItem value="Senior Level">Senior Level</SelectItem>
                        <SelectItem value="Lead">Lead</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Remote (Worldwide)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Salary Range</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Salary*</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 50000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Salary*</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 80000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="salaryCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                          <SelectItem value="AUD">AUD (A$)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaryPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Period*</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4 pt-2"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yearly" />
                          </FormControl>
                          <FormLabel className="font-normal">Yearly</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="monthly" />
                          </FormControl>
                          <FormLabel className="font-normal">Monthly</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hourly" />
                          </FormControl>
                          <FormLabel className="font-normal">Hourly</FormLabel>
                        </FormItem>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="isRemote"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Remote Job</FormLabel>
                        <FormDescription>This job can be done remotely</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isUrgent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Urgent Hiring</FormLabel>
                        <FormDescription>Mark as urgent hiring need</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Job</FormLabel>
                        <FormDescription>Highlight in featured section</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Job Description */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the job..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Responsibilities*</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => addListItem("responsibilities")}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              {form.watch("responsibilities").map((_, index) => (
                <div key={`responsibility-${index}`} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`responsibilities.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Responsibility ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("responsibilities", index)}
                    disabled={form.watch("responsibilities").length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Requirements*</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => addListItem("requirements")}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              {form.watch("requirements").map((_, index) => (
                <div key={`requirement-${index}`} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`requirements.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Requirement ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("requirements", index)}
                    disabled={form.watch("requirements").length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Benefits*</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => addListItem("benefits")}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              {form.watch("benefits").map((_, index) => (
                <div key={`benefit-${index}`} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`benefits.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Benefit ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("benefits", index)}
                    disabled={form.watch("benefits").length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Required Skills*</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => addListItem("skills")}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              {form.watch("skills").map((_, index) => (
                <div key={`skill-${index}`} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`skills.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`Skill ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("skills", index)}
                    disabled={form.watch("skills").length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Company Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. https://www.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of your company..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Software Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                        <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                        <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                        <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                        <SelectItem value="501-1000 employees">501-1000 employees</SelectItem>
                        <SelectItem value="1000+ employees">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Step 4: Application Details */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="applicationEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. jobs@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Email where applications will be sent</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Application URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. https://www.example.com/careers/apply" {...field} />
                  </FormControl>
                  <FormDescription>If you want candidates to apply through an external website</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific instructions for applicants..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Additional instructions or requirements for the application process</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous Step
          </Button>

          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep} className="flex items-center">
              Next Step <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">Preview Job Posting</Button>
          )}
        </div>
      </form>
    </Form>
  )
}
