"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login?redirected=true")
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-background">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
