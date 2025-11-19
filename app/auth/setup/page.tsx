"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const setupUsers = async () => {
    setLoading(true)
    setMessage("Creando usuarios...")

    try {
      // Crear usuario periodista
      const { data: periodista, error: errorPeriodista } = await supabase.auth.admin.createUser({
        email: "periodista@armenianews.com",
        password: "isapreciosa",
        email_confirm: true,
      })

      if (errorPeriodista) throw errorPeriodista

      // Crear usuario admin
      const { data: admin, error: errorAdmin } = await supabase.auth.admin.createUser({
        email: "admin@armenianews.com",
        password: "admin123456",
        email_confirm: true,
      })

      if (errorAdmin) throw errorAdmin

      setMessage(
        "✓ Usuarios creados correctamente. Ahora puedes iniciar sesión con: periodista@armenianews.com / isapreciosa",
      )
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Configuración Inicial</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Haz clic en el botón para crear los usuarios de prueba en la base de datos.
        </p>
        <button
          onClick={setupUsers}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded transition"
        >
          {loading ? "Creando usuarios..." : "Crear Usuarios"}
        </button>
        {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
      </div>
    </div>
  )
}
