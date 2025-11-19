import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
      },
    },
  })

  try {
    // Crear usuario periodista
    const { data: periodista, error: errorPeriodista } = await supabase.auth.admin.createUser({
      email: "periodista@armenianews.com",
      password: "isapreciosa",
      email_confirm: true,
    })

    if (errorPeriodista && !errorPeriodista.message.includes("already exists")) {
      throw errorPeriodista
    }

    // Crear usuario admin
    const { data: admin, error: errorAdmin } = await supabase.auth.admin.createUser({
      email: "admin@armenianews.com",
      password: "admin123456",
      email_confirm: true,
    })

    if (errorAdmin && !errorAdmin.message.includes("already exists")) {
      throw errorAdmin
    }

    return NextResponse.json({
      success: true,
      message: "Usuarios creados correctamente. Usa: periodista@armenianews.com / isapreciosa",
    })
  } catch (error: any) {
    console.error("[v0] Setup error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
