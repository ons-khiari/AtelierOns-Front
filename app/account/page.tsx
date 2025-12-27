"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link";
import { User } from "lucide-react"

export default function AccountPage() {
  const router = useRouter()
  const { user, isLoggedIn, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    } else if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      })
    }
  }, [isLoggedIn, user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    await updateProfile(formData)
    setIsSaving(false)
    setIsEditing(false)
  }

  if (!isLoggedIn) return null

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              My Account
            </h1>
            <p className="text-muted-foreground">
              Manage your profile and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            {!isEditing ? (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="text-foreground">
                      {user?.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-border rounded-lg font-semibold hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/account/orders"
              className="p-6 bg-muted rounded-lg border border-border hover:border-primary transition text-center"
            >
              <h3 className="font-serif font-bold text-foreground mb-2">
                My Orders
              </h3>
              <p className="text-sm text-muted-foreground">
                View your order history
              </p>
            </Link>
            <Link
              href="/account/favorites"
              className="p-6 bg-muted rounded-lg border border-border hover:border-primary transition text-center"
            >
              <h3 className="font-serif font-bold text-foreground mb-2">
                My Favorites
              </h3>
              <p className="text-sm text-muted-foreground">View saved items</p>
            </Link>
            <Link
              href="/account/ratings"
              className="p-6 bg-muted rounded-lg border border-border hover:border-primary transition text-center"
            >
              <h3 className="font-serif font-bold text-foreground mb-2">
                My Reviews
              </h3>
              <p className="text-sm text-muted-foreground">View your ratings</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
