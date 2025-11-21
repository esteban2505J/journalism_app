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
  const [formData, setFormData] = useState({ title: "", url: "", description: "" })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function init() {
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
      const { data, error } = await supabase.from("videos").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setVideos(data || [])
    } catch (err) {
      console.log("[v0] Error fetching videos:", err)
      setError("No se pudieron cargar los videos. La tabla podría no existir aún.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.title || !formData.url) {
      setError("Por favor completa todos los campos obligatorios")
      return
    }

    if (!isPeriodista) {
      setError("Solo periodistas verificados pueden subir videos")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const { data, error } = await supabase
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
      console.log("[v0] Error submitting video:", err)
      setError("Error al guardar el video. Por favor intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="videos" className="py- bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-foreground mb-12 text-balance">Galería de Videos</h3>  
        <div>
    
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Cargando videos...</div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No hay videos aún. Sé el primero en compartir uno.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group rounded-xl overflow-hidden border border-accent/20 hover:border-red-600/50 transition-all hover:shadow-lg hover:shadow-red-900/10"
                >
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                    <iframe
                      src={extractEmbedUrl(video.url)}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h5>
                    {video.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{video.description}</p>
                    )}
                    <time className="text-xs text-muted-foreground">
                      {new Date(video.created_at).toLocaleDateString("es-CO")}
                    </time>
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

function extractEmbedUrl(url: string): string {
  try {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be") ? url.split("youtu.be/")[1] : new URL(url).searchParams.get("v")
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1]
      return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  } catch {
    return url
  }
}
