"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Video {
  id: string
  title: string
  url: string
  description: string
  created_at: string
}

export default function VideoUploadSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isPeriodista, setIsPeriodista] = useState(false)
  
  // Estado del formulario
  const [formData, setFormData] = useState({ title: "", url: "", description: "" })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function init() {
      // Verificar rol (asumiendo que lo guardas en sessionStorage al hacer login)
      const role = sessionStorage.getItem("user_role")
      setUserRole(role)
      setIsPeriodista(role === "periodista")

      await fetchVideos()
    }

    init()
  }, [])

  async function fetchVideos() {
    try {
      setLoading(true)
      // Se asume que la tabla se llama "videos"
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setVideos(data || [])
    } catch (err) {
      console.log("Error fetching videos:", err)
      setError("No se pudieron cargar los videos.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.title || !formData.url) {
      setError("Por favor completa el título y la URL.")
      return
    }

    if (!isPeriodista) {
      setError("No tienes permisos para subir videos.")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const { error } = await supabase
        .from("videos")
        .insert([
          {
            title: formData.title,
            url: formData.url,
            description: formData.description,
          },
        ])
        .select()

      if (error) throw error

      setSuccess(true)
      setFormData({ title: "", url: "", description: "" })
      setTimeout(() => setSuccess(false), 3000)

      await fetchVideos()
    } catch (err) {
      console.log("Error submitting video:", err)
      setError("Error al guardar el video. Intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="videos" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        
  
        {/* --- GALERÍA DE VIDEOS --- */}
        <h3 className="text-4xl font-bold text-foreground mb-8 text-balance">Galería Multimedia</h3> 
        
        <div>
          {loading ? (
            <div className="flex justify-center py-12">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-accent/5 rounded-lg border border-dashed border-accent/20">
              No hay videos publicados aún.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group rounded-xl overflow-hidden border border-border bg-card hover:border-red-600/50 transition-all hover:shadow-lg hover:shadow-red-900/10 flex flex-col h-full"
                >
                  {/* Contenedor del Video */}
                  <div className="aspect-video bg-black relative w-full">
                    <iframe
                      src={extractEmbedUrl(video.url)}
                      title={video.title}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  {/* Información del Video */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h5 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h5>
                    {video.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {video.description}
                      </p>
                    )}
                    <div className="pt-4 mt-auto border-t border-border/50">
                      <time className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {new Date(video.created_at).toLocaleDateString("es-CO", {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Función auxiliar para extraer URL embedible
 * Soporta: YouTube Standard, Shorts, youtu.be y Vimeo
 */
function extractEmbedUrl(url: string): string {
  try {
    const cleanUrl = url.trim()

    if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
      let videoId = null

      // 1. YouTube Shorts
      if (cleanUrl.includes("/shorts/")) {
        const parts = cleanUrl.split("/shorts/")
        videoId = parts[1].split("?")[0].split("&")[0] // Limpia query params
      }
      // 2. Enlace corto youtu.be
      else if (cleanUrl.includes("youtu.be/")) {
        const parts = cleanUrl.split("youtu.be/")
        videoId = parts[1].split("?")[0].split("&")[0]
      }
      // 3. Enlace estándar v=
      else if (cleanUrl.includes("v=")) {
        const urlObj = new URL(cleanUrl)
        videoId = urlObj.searchParams.get("v")
      }
      // 4. Ya es embed
      else if (cleanUrl.includes("/embed/")) {
        const parts = cleanUrl.split("/embed/")
        videoId = parts[1].split("?")[0]
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }

    // Vimeo
    if (cleanUrl.includes("vimeo.com")) {
      const parts = cleanUrl.split("vimeo.com/")
      // Manejo simple para vimeo.com/123456
      const videoId = parts[1].split("?")[0] 
      return `https://player.vimeo.com/video/${videoId}`
    }

    return cleanUrl
  } catch (error) {
    console.error("Error parsing video URL:", error)
    return url
  }
}
