import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Armenia Homicidios | Investigación Periodística",
  description:
    "Investigación periodística sobre la crisis de violencia y homicidios en Armenia, Quindío. Datos, reportajes y análisis de una ciudad en crisis.",
  keywords: "Armenia, Quindío, homicidios, violencia, investigación periodística, seguridad",
  generator: "v0.app",
  openGraph: {
    title: "Armenia Homicidios - Investigación Periodística",
    description: "Más de 120 homicidios en Armenia entre enero y octubre de 2025",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1557804506-669714128eb7?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Armenia investigación periodística",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
