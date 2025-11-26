"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const role = sessionStorage.getItem("user_role")
    setUserRole(role)
    setLoading(false)
  }, [])

  function handleLogout() {
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("user_id")
    sessionStorage.removeItem("user_role")
    setUserRole(null)
    router.push("/")
  }

  return (
    <header className="border-b border-accent/30 bg-background sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Armenia Crisis de Seguridad en 2025</h1>
            <p className="text-xs text-muted-foreground">Investigación Periodística</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#noticias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Noticias
          </a>
          <Link href="/historias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Historias
          </Link>
          <a href="#videos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Videos
          </a>
          <a href="#datos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Datos
          </a>

          {!loading && (
            <>
              {userRole === "periodista" ? (
                <>
                  <Link
                    href="/admin"
                    className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-sm px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                >
                  Ingresar
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
