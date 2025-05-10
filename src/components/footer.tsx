import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:gap-8 px-4 md:px-6">
        <div className="flex items-center">
          <span className="text-xl font-bold font-dancing-script">Roamploy</span>
        </div>
        <nav className="flex gap-4 md:gap-6 flex-wrap">
          <Link href="#" className="text-sm">
            About
          </Link>
          <Link href="#" className="text-sm">
            Privacy
          </Link>
          <Link href="#" className="text-sm">
            Terms
          </Link>
          <Link href="#" className="text-sm">
            Contact
          </Link>
        </nav>
        <div className="md:ml-auto flex gap-4">
          <Link href="#" className="text-sm">
            Twitter
          </Link>
          <Link href="#" className="text-sm">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
}
