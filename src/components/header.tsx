"use client"

import Link from "next/link"
import { Menu, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container m-auto flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="text-3xl font-bold font-dancing-script text-primary">
            Roamploy
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="text-2xl font-bold font-dancing-script">
                Roamploy
              </Link>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-base font-medium">
                  Home
                </Link>
                <Link href="/jobs" className="text-base font-medium">
                  Browse Jobs
                </Link>
                <Link href="/companies" className="text-base font-medium">
                  Companies
                </Link>
                <Link href="/resources" className="text-base font-medium">
                  Resources
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-base font-medium">
                      Dashboard
                    </Link>
                    <Link href="/saved-jobs" className="text-base font-medium">
                      Saved Jobs
                    </Link>
                    <button
                      onClick={signOut}
                      className="flex items-center gap-2 text-base font-medium text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/signin" className="text-base font-medium">
                      Sign In
                    </Link>
                    <Link href="/signup" className="text-base font-medium">
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/jobs" className="text-sm font-medium">
            Browse Jobs
          </Link>
          <Link href="/companies" className="text-sm font-medium">
            Companies
          </Link>
          <Link href="/resources" className="text-sm font-medium">
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link href="/post-job">
            <Button>Post a Job</Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/saved-jobs" className="cursor-pointer">
                    Saved Jobs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="default">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
