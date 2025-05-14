import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8 bg-primary">
      <div className="container m-auto flex flex-col gap-4 md:flex-row md:items-center md:gap-8 px-4 md:px-6">
        <div className="flex items-center">
          <span className="text-xl font-bold font-dancing-script text-black">Roamploy</span>
        </div>
        <nav className="flex gap-4 md:gap-6 flex-wrap">
          <Link href="/about" className="text-sm text-black">
            About
          </Link>
          <Link href="/privacy" className="text-sm text-black">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-black">
            Terms
          </Link>
          <Link href="#" className="text-sm text-black">
            Contact
          </Link>
        </nav>
        <div className="md:ml-auto flex gap-4">
          <Link href="#" className="text-sm text-black">
            Twitter
          </Link>
          <Link href="#" className="text-sm text-black">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
}
