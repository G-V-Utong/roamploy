"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import NewsletterForm from "@/components/newsletter-form"

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the user has already dismissed the modal
    const hasSeenModal = localStorage.getItem("newsletter-modal-seen")

    if (!hasSeenModal) {
      // Show modal after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Remember that the user has seen the modal
    localStorage.setItem("newsletter-modal-seen", "true")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Stay Updated with Roamploy</DialogTitle>
          <DialogDescription className="text-center">
            Subscribe to our newsletter and receive the latest remote job opportunities directly in your inbox.
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="p-4 pt-0">
          <div className="mb-6">
            <p className="text-center text-sm text-muted-foreground">
              Join thousands of remote workers who receive our weekly job alerts. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm onSuccess={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
