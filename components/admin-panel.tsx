"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminImageManager from "@/components/admin-image-manager"
import AdminCarouselManager from "@/components/admin-carousel-manager"
import AdminNewsImageManager from "@/components/admin-news-image-manager"
import AdminStoriesManager from "@/components/admin-stories-manager"
import AdminVideoManager from "@/components/admin-video-manager"

type TabType = "carousel" | "images" | "noticias" | "stories" | "videos"

interface AdminPanelProps {
  userEmail: string
}

export default function AdminPanel({ userEmail }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("carousel")
  const router = useRouter()

  function handleLogout() {
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("user_role")
    sessionStorage.removeItem("user_email")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-accent/20 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              title="Volver a inicio"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Bienvenido, {userEmail}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-600 font-semibold rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-accent/20 bg-background/50 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {[
            { id: "carousel", label: "Carrusel" },
            { id: "images", label: "Gestionar Imágenes" },
            { id: "noticias", label: "Imágenes Noticias" },
            { id: "stories", label: "Historias" },
            { id: "videos", label: "Videos" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-4 px-2 font-semibold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-red-600 border-red-600"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === "carousel" && <AdminCarouselManager />}
        {activeTab === "images" && <AdminImageManager />}
        {activeTab === "noticias" && <AdminNewsImageManager />}
        {activeTab === "stories" && <AdminStoriesManager />}
        {activeTab === "videos" && <AdminVideoManager />}
      </main>
    </div>
  )
}
