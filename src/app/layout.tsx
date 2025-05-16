import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-context"
import NewsletterModal from "@/components/newsletter-modal"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://roamploy.com"),
  title: "Roamploy - Find Remote Jobs in Nigeria",
  description: "Discover remote job opportunities across different fields and skills from the comfort of your home in Nigeria.",
  openGraph: {
    title: "Roamploy - Find Remote Jobs in Nigeria",
    description:
      "Discover remote job opportunities across different fields and skills from the comfort of your home in Nigeria.",
    url: "https://roamploy.com",
    siteName: "Roamploy",
    images: [
      {
        url: "/images/metadata.jpg",
      },
    ],
    locale: "en-EN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${dancingScript.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
            <Toaster />
            <SpeedInsights/>
            <NewsletterModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
      {/* <script src="//web.webformscr.com/apps/fc3/build/loader.js" async sp-form-id="8a18dc650577ebfddc9532f21583cdaf0112a0c1685c6b14e38dbb3940c81af0"></script> */}
    </html>
  )
}
