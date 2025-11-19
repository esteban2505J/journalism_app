"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminPanel from "@/components/admin-panel"

export default function AdminPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const role = sessionStorage.getItem("user_role")
    const email = sessionStorage.getItem("user_email")
    const token = sessionStorage.getItem("auth_token")

    console.log("[v0] Admin page - Role:", role, "Email:", email, "Token:", !!token)

    if (!token || role !== "periodista") {
      console.log("[v0] Admin access denied - redirecting to login")
      router.push("/auth/login")
      return
    }

    setUserRole(role)
    setUserEmail(email)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando panel administrativo...</p>
        </div>
      </div>
    )
  }

  if (!userRole || userRole !== "periodista") {
    return null
  }

  return <AdminPanel userEmail={userEmail || ""} />
}
