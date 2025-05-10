"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth/auth-context"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await resetPassword(email)
      if (success) {
        setIsSubmitted(true)
        toast.success("If an account exists with that email, you'll receive a password reset link.")
      } else {
        toast.error("Failed to send reset link. Please try again.")
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="flex justify-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold font-dancing-script">Roamploy</span>
              </div>
            </div>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Forgot password</CardTitle>
                <CardDescription className="text-center">
                  Enter your email address and we&apos;ll send you a link to reset your password
                </CardDescription>
              </CardHeader>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending reset link..." : "Send reset link"}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                      Remember your password?{" "}
                      <Link href="/signin" className="text-primary underline-offset-4 hover:underline">
                        Sign in
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              ) : (
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-muted p-6 text-center">
                    <h3 className="mb-2 text-lg font-medium">Check your email</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      We&apos;ve sent a password reset link to <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Didn&apos;t receive the email? Check your spam folder or{" "}
                      <button
                        type="button"
                        className="text-primary underline-offset-4 hover:underline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        try again
                      </button>
                    </p>
                  </div>
                  <div className="text-center">
                    <Link href="/signin" className="text-primary underline-offset-4 hover:underline">
                      Back to sign in
                    </Link>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
