import crypto from "crypto"

// Hash de contraseña simple (en producción usar bcrypt)
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export function generateToken(userId: string): string {
  return crypto.randomBytes(32).toString("hex")
}
