import { SignJWT } from "jose"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    console.log("[v0] Login attempt with email:", email)

    if (!email || !password) {
      return Response.json({ error: "Email y contraseña requeridos" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("[v0] Supabase URL:", supabaseUrl)
    console.log("[v0] Service role key exists:", !!serviceRoleKey)

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[v0] Missing Supabase credentials")
      return Response.json({ error: "Configuración del servidor incompleta" }, { status: 500 })
    }

    const queryUrl = `${supabaseUrl}/rest/v1/users`

    console.log("[v0] Fetching from:", queryUrl)

    const userRes = await fetch(queryUrl, {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] User query status:", userRes.status)
    console.log("[v0] Response content type:", userRes.headers.get("content-type"))

    if (!userRes.ok) {
      const errorText = await userRes.text()
      console.error("[v0] Supabase error response:", errorText)
      return Response.json({ error: "Error consultando base de datos" }, { status: 500 })
    }

    const allUsers = await userRes.json()
    console.log("[v0] All users count:", Array.isArray(allUsers) ? allUsers.length : 0)

    // Find user by email manually
    const user = Array.isArray(allUsers) ? allUsers.find((u) => u.email === email) : null

    if (!user) {
      console.log("[v0] User not found with email:", email)
      return Response.json({ error: "Usuario no encontrado" }, { status: 401 })
    }

    console.log("[v0] User found:", { id: user.id, email: user.email, role: user.role })

    // In production, use bcrypt. For now, compare plaintext or stored hashes
    const storedPassword = user.password?.toString() || ""

    console.log("[v0] Password comparison - Provided length:", password.length, "Stored length:", storedPassword.length)

    // If password doesn't match exactly, it's wrong
    if (password !== storedPassword && storedPassword !== password) {
      console.log("[v0] Password mismatch")
      return Response.json({ error: "Contraseña incorrecta" }, { status: 401 })
    }

    // Verify role
    if (user.role !== "periodista") {
      console.log("[v0] User role is not periodista:", user.role)
      return Response.json({ error: "Acceso denegado. Solo periodistas pueden ingresar" }, { status: 403 })
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret")
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    console.log("[v0] JWT token created successfully")

    // Return response with Set-Cookie header
    const response = Response.json({
      success: true,
      userId: user.id,
      email: user.email,
      role: user.role,
      token: token, // Agregar token a la respuesta
    })

    response.headers.set("Set-Cookie", `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`)

    console.log("[v0] Login successful for:", email)
    return response
  } catch (error) {
    console.error("[v0] LOGIN ERROR:", error)
    return Response.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
