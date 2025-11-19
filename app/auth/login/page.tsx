"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      console.log("[v0] Attempting login with:", email)

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      console.log("[v0] Response status:", res.status)
      console.log("[v0] Response headers:", res.headers.get("content-type"))

      if (!res.ok) {
        const errorText = await res.text()
        console.log("[v0] Error response:", errorText)

        try {
          const data = JSON.parse(errorText)
          setError(data.error || "Error de autenticación")
        } catch {
          setError("Error del servidor: " + errorText.substring(0, 50))
        }
        return
      }

      const data = await res.json()
      console.log("[v0] Login successful:", data)

      sessionStorage.setItem("auth_token", data.token || "authenticated")
      sessionStorage.setItem("user_id", data.userId)
      sessionStorage.setItem("user_email", data.email)
      sessionStorage.setItem("user_role", data.role)

      router.push("/admin")
      router.refresh()
    } catch (err) {
      console.log("[v0] Catch error:", err)
      setError("Error de conexión: " + (err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-700">Armenia News</h1>
          <p className="text-gray-600 mt-2">Panel de Periodistas</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
            required
          />
        </div>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Usuario: <span className="font-mono">periodista@armenianews.com</span>
        </p>
      </form>
    </div>
  )
}
