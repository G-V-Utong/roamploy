export interface BlogPost {
    id: string
    title: string
    excerpt: string
    author: string
    authorAvatar: string
    category: string
    readTime: string
    publishDate: string
    image: string
    featured?: boolean
    tags: string[]
  }
  
  export interface Internship {
    id: string
    title: string
    company: string
    companyLogo: string
    location: string
    duration: string
    stipend: string
    deadline: string
    description: string
    requirements: string[]
    skills: string[]
    featured?: boolean
  }
  
  export interface CareerEvent {
    id: string
    title: string
    organizer: string
    organizerLogo: string
    type: "seminar" | "bootcamp" | "workshop" | "course"
    format: "online" | "in-person" | "hybrid"
    startDate: string
    endDate: string
    location?: string
    price: string
    description: string
    topics: string[]
    featured?: boolean
  }
  
  export interface JobFair {
    id: string
    title: string
    organizer: string
    organizerLogo: string
    date: string
    time: string
    location: string
    format: "online" | "in-person" | "hybrid"
    description: string
    companies: string[]
    registrationLink: string
    featured?: boolean
  }
  
  // Sample Blog Posts
  export const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "10 Tips for Landing Your First Remote Job",
      excerpt:
        "Discover proven strategies to help you secure your first remote position in today's competitive job market.",
      author: "Emma Rodriguez",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Career Advice",
      readTime: "5 min",
      publishDate: "May 10, 2023",
      image: "/placeholder.svg?height=200&width=350",
      featured: true,
      tags: ["Remote Work", "Job Search", "Career Tips"],
    },
    {
      id: "2",
      title: "The Future of Remote Work: Trends to Watch in 2023",
      excerpt:
        "Explore emerging remote work trends that are shaping how companies and employees approach virtual collaboration.",
      author: "Michael Chen",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Industry Insights",
      readTime: "8 min",
      publishDate: "April 22, 2023",
      image: "/placeholder.svg?height=200&width=350",
      tags: ["Remote Work", "Future of Work", "Workplace Trends"],
    },
    {
      id: "3",
      title: "Building a Standout Remote Work Portfolio",
      excerpt: "Learn how to showcase your remote work skills and experience to attract top employers in your field.",
      author: "Sarah Johnson",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Portfolio Development",
      readTime: "6 min",
      publishDate: "March 15, 2023",
      image: "/placeholder.svg?height=200&width=350",
      tags: ["Portfolio", "Personal Branding", "Career Development"],
    },
    {
      id: "4",
      title: "Remote Work Tools Every Professional Should Master",
      excerpt:
        "Discover the essential tools and software that can boost your productivity and collaboration in a remote environment.",
      author: "David Park",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Productivity",
      readTime: "7 min",
      publishDate: "February 28, 2023",
      image: "/placeholder.svg?height=200&width=350",
      tags: ["Tools", "Productivity", "Software"],
    },
    {
      id: "5",
      title: "Overcoming Isolation: Building Community in Remote Teams",
      excerpt:
        "Strategies for maintaining connection and building strong relationships with colleagues while working remotely.",
      author: "Priya Sharma",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Remote Culture",
      readTime: "6 min",
      publishDate: "January 17, 2023",
      image: "/placeholder.svg?height=200&width=350",
      featured: true,
      tags: ["Team Building", "Remote Culture", "Communication"],
    },
    {
      id: "6",
      title: "Negotiating Salary for Remote Positions: What You Need to Know",
      excerpt:
        "Expert advice on how to navigate salary discussions for remote roles, including factors to consider beyond base pay.",
      author: "James Wilson",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Salary Negotiation",
      readTime: "9 min",
      publishDate: "December 5, 2022",
      image: "/placeholder.svg?height=200&width=350",
      tags: ["Salary", "Negotiation", "Benefits"],
    },
  ]
  
  // Sample Internships
  export const internships: Internship[] = [
    {
      id: "1",
      title: "Remote Software Engineering Intern",
      company: "TechCorp",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Remote (Worldwide)",
      duration: "3 months",
      stipend: "$2000/month",
      deadline: "June 30, 2023",
      description:
        "Join our engineering team to develop cutting-edge web applications using React and Node.js. You'll work on real projects with experienced mentors.",
      requirements: [
        "Currently pursuing a degree in Computer Science or related field",
        "Knowledge of JavaScript, HTML, and CSS",
        "Basic understanding of React or similar frameworks",
        "Strong problem-solving skills",
      ],
      skills: ["JavaScript", "React", "Node.js", "Git"],
      featured: true,
    },
    {
      id: "2",
      title: "Digital Marketing Intern",
      company: "GrowthLabs",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Remote (US Only)",
      duration: "6 months",
      stipend: "$1500/month",
      deadline: "May 15, 2023",
      description:
        "Assist our marketing team in creating and implementing digital marketing campaigns. Gain hands-on experience with SEO, content marketing, and social media strategy.",
      requirements: [
        "Currently pursuing a degree in Marketing, Communications, or related field",
        "Strong writing and communication skills",
        "Basic understanding of SEO and social media platforms",
        "Creative mindset and attention to detail",
      ],
      skills: ["Content Marketing", "SEO", "Social Media", "Analytics"],
      featured: true,
    },
    {
      id: "3",
      title: "UX/UI Design Intern",
      company: "DesignHub",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Remote (Europe)",
      duration: "4 months",
      stipend: "€1800/month",
      deadline: "May 20, 2023",
      description:
        "Work with our design team to create user-centered designs for web and mobile applications. You'll participate in the entire design process from research to implementation.",
      requirements: [
        "Currently pursuing a degree in Design, HCI, or related field",
        "Portfolio demonstrating UI/UX projects",
        "Proficiency with design tools like Figma or Sketch",
        "Understanding of user-centered design principles",
      ],
      skills: ["UI Design", "UX Research", "Figma", "Prototyping"],
      featured: false,
    },
    {
      id: "4",
      title: "Data Science Intern",
      company: "DataInsights",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Remote (Worldwide)",
      duration: "5 months",
      stipend: "$2200/month",
      deadline: "June 5, 2023",
      description:
        "Join our data science team to analyze large datasets and build predictive models. You'll work on real-world problems and gain experience with machine learning techniques.",
      requirements: [
        "Currently pursuing a degree in Data Science, Statistics, or related field",
        "Experience with Python and data analysis libraries",
        "Basic understanding of machine learning concepts",
        "Strong analytical and problem-solving skills",
      ],
      skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
      featured: false,
    },
    {
      id: "5",
      title: "Content Writing Intern",
      company: "ContentCraft",
      companyLogo: "/placeholder.svg?height=48&width=48",
      location: "Remote (US, UK, Canada)",
      duration: "3 months",
      stipend: "$1200/month",
      deadline: "May 25, 2023",
      description:
        "Create engaging content for blogs, social media, and marketing materials. Develop your writing skills while working with a team of experienced content creators.",
      requirements: [
        "Currently pursuing a degree in English, Journalism, Communications, or related field",
        "Excellent writing and editing skills",
        "Ability to research and write about various topics",
        "Attention to detail and creativity",
      ],
      skills: ["Content Writing", "Editing", "SEO Writing", "Research"],
      featured: false,
    },
  ]
  
  // Sample Career Development Events
  export const careerEvents: CareerEvent[] = [
    {
      id: "1",
      title: "Full-Stack Web Development Bootcamp",
      organizer: "CodeAcademy",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      type: "bootcamp",
      format: "online",
      startDate: "July 10, 2023",
      endDate: "October 2, 2023",
      price: "$1,999",
      description:
        "Intensive 12-week bootcamp covering front-end and back-end development. Learn HTML, CSS, JavaScript, React, Node.js, and more. Build a portfolio of projects to showcase to employers.",
      topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Express"],
      featured: true,
    },
    {
      id: "2",
      title: "Remote Work Success Strategies",
      organizer: "Future of Work Institute",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      type: "seminar",
      format: "online",
      startDate: "June 15, 2023",
      endDate: "June 15, 2023",
      price: "$49",
      description:
        "A comprehensive seminar on thriving in remote work environments. Learn productivity techniques, communication strategies, and work-life balance tips from remote work experts.",
      topics: ["Productivity", "Communication", "Work-Life Balance", "Remote Tools"],
      featured: true,
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      organizer: "DataLab",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      type: "course",
      format: "hybrid",
      startDate: "August 5, 2023",
      endDate: "September 30, 2023",
      location: "New York City + Online",
      price: "$1,200",
      description:
        "Learn the fundamentals of data science, including statistics, Python programming, data visualization, and machine learning. Suitable for beginners with basic programming knowledge.",
      topics: ["Python", "Statistics", "Data Visualization", "Machine Learning"],
      featured: false,
    },
    {
      id: "4",
      title: "UX Design Workshop Series",
      organizer: "DesignMasters",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      type: "workshop",
      format: "online",
      startDate: "July 8, 2023",
      endDate: "July 29, 2023",
      price: "$299",
      description:
        "Four-week workshop series covering user research, wireframing, prototyping, and usability testing. Learn practical skills you can immediately apply to your projects.",
      topics: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
      featured: false,
    },
    {
      id: "5",
      title: "Leadership Skills for Remote Managers",
      organizer: "Management Institute",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      type: "seminar",
      format: "online",
      startDate: "June 22, 2023",
      endDate: "June 23, 2023",
      price: "$199",
      description:
        "Two-day seminar focused on developing leadership skills for managing remote teams. Learn effective communication, team building, and performance management strategies.",
      topics: ["Leadership", "Team Management", "Communication", "Performance Reviews"],
      featured: false,
    },
  ]
  
  // Sample Job Fairs
  export const jobFairs: JobFair[] = [
    {
      id: "1",
      title: "Global Remote Work Expo",
      organizer: "RemoteFirst Alliance",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      date: "July 15-16, 2023",
      time: "9:00 AM - 5:00 PM EST",
      location: "Virtual Event",
      format: "online",
      description:
        "Connect with top remote-friendly companies from around the world. Attend workshops on remote job searching, interview preparation, and more.",
      companies: ["TechCorp", "InnovateSoft", "DesignHub", "CloudTech", "DataInsights"],
      registrationLink: "#",
      featured: true,
    },
    {
      id: "2",
      title: "Tech Careers Summit",
      organizer: "TechHire",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      date: "August 5, 2023",
      time: "10:00 AM - 4:00 PM PST",
      location: "San Francisco Convention Center + Online",
      format: "hybrid",
      description:
        "The largest tech career fair on the West Coast. Meet recruiters from leading tech companies, attend tech talks, and network with industry professionals.",
      companies: ["Google", "Microsoft", "Apple", "Amazon", "Meta", "Salesforce"],
      registrationLink: "#",
      featured: true,
    },
    {
      id: "3",
      title: "Digital Marketing Career Fair",
      organizer: "Marketing Professionals Network",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      date: "June 28, 2023",
      time: "11:00 AM - 3:00 PM EST",
      location: "Virtual Event",
      format: "online",
      description:
        "Specialized career fair for marketing professionals. Connect with companies hiring for digital marketing, content creation, SEO, and social media roles.",
      companies: ["GrowthLabs", "ContentCraft", "SocialSphere", "MarketEdge", "BrandBuilders"],
      registrationLink: "#",
      featured: false,
    },
    {
      id: "4",
      title: "Diversity in Tech Job Fair",
      organizer: "TechDiversity Coalition",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      date: "July 22, 2023",
      time: "9:00 AM - 2:00 PM CST",
      location: "Chicago Tech Hub + Online",
      format: "hybrid",
      description:
        "Job fair focused on promoting diversity and inclusion in the tech industry. Connect with companies committed to building diverse teams.",
      companies: ["IBM", "Adobe", "Cisco", "Shopify", "Stripe", "Twilio"],
      registrationLink: "#",
      featured: false,
    },
    {
      id: "5",
      title: "Entry-Level & Internship Expo",
      organizer: "CareerStart",
      organizerLogo: "/placeholder.svg?height=48&width=48",
      date: "August 12, 2023",
      time: "10:00 AM - 3:00 PM EST",
      location: "Virtual Event",
      format: "online",
      description:
        "Career fair specifically for students, recent graduates, and early-career professionals. Find entry-level positions and internships across various industries.",
      companies: ["TechCorp", "GrowthLabs", "FinanceFirst", "HealthInnovate", "EduTech"],
      registrationLink: "#",
      featured: false,
    },
  ]
  