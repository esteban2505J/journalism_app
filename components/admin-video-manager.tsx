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

export default function AdminVideoManager() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", url: "", description: "" })
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("videos").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setVideos(data || [])
    } catch (err) {
      setError("Error al cargar videos")
    } finally {
      setLoading(false)
    }
  }

  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.title || !formData.url) {
      setError("Por favor completa todos los campos")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const { error } = await supabase.from("videos").insert([
        {
          title: formData.title,
          url: formData.url,
          description: formData.description,
        },
      ])

      if (error) throw error

      setFormData({ title: "", url: "", description: "" })
      setShowForm(false)
      await fetchVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteVideo(id: string) {
    try {
      const { error } = await supabase.from("videos").delete().eq("id", id)
      if (error) throw error
      await fetchVideos()
    } catch (err) {
      setError("Error al eliminar video")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Gestionar Videos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
        >
          {showForm ? "Cancelar" : "Nuevo Video"}
        </button>
      </div>

      {error && <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-600">{error}</div>}

      {showForm && (
        <form onSubmit={handleAddVideo} className="border border-accent/20 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Título *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
              placeholder="Título del video"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">URL (YouTube, Vimeo, etc.) *</label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground resize-none"
              rows={3}
              placeholder="Describe el video"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {submitting ? "Guardando..." : "Agregar Video"}
          </button>
        </form>
      )}

      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Videos Publicados</h3>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando...</div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No hay videos aún</div>
        ) : (
          <div className="grid gap-6">
            {videos.map((video) => (
              <div key={video.id} className="border border-accent/20 rounded-lg p-6">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-2">{video.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(video.created_at).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-600 font-semibold rounded-lg transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
