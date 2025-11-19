"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Story {
  id: string
  title: string
  description: string
  content: string
  image_url: string | null
  author: string
  category: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export default function AdminStoriesManager() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image_url: "",
    category: "testimonio",
    featured: false,
    published: false,
    preview: "",
  })
  const supabase = createClient()

  useEffect(() => {
    const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null
    setUser({ email: userEmail || "admin@armenianews.com" } as any)
    fetchStories()
  }, [])

  async function fetchStories() {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("stories").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setStories(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar historias")
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(file: File) {
    try {
      const formDataFile = new FormData()
      formDataFile.append("file", file)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataFile,
      })
      if (!response.ok) throw new Error("Error en upload")
      const data = await response.json()
      return data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir archivo")
      throw err
    }
  }

  async function handleCreateStory(e: React.FormEvent) {
    e.preventDefault()
    const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : "admin"

    try {
      setError(null)
      const { error } = await supabase.from("stories").insert([
        {
          title: formData.title,
          description: formData.description,
          content: formData.content,
          image_url: formData.image_url || null,
          author: userEmail,
          category: formData.category,
          featured: formData.featured,
          published: formData.published,
        },
      ])

      if (error) {
        console.log("[v0] Insert error:", error)
        throw error
      }
      setFormData({
        title: "",
        description: "",
        content: "",
        image_url: "",
        category: "testimonio",
        featured: false,
        published: false,
        preview: "",
      })
      setShowForm(false)
      fetchStories()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear historia")
      console.log("[v0] Create story error:", err)
    }
  }

  async function handleDeleteStory(id: string) {
    try {
      const { error } = await supabase.from("stories").delete().eq("id", id)
      if (error) throw error
      fetchStories()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar historia")
    }
  }

  async function handleTogglePublished(id: string, published: boolean) {
    try {
      const { error } = await supabase.from("stories").update({ published: !published }).eq("id", id)
      if (error) throw error
      fetchStories()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar historia")
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground">Cargando historias...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Historias de Conciencia</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
        >
          {showForm ? "Cancelar" : "Nueva Historia"}
        </button>
      </div>

      {error && <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-600">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreateStory} className="border border-accent/20 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Título *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
              placeholder="Título de la historia..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Descripción *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
              rows={2}
              placeholder="Breve descripción..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Contenido *</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
              rows={6}
              placeholder="Contenido completo de la historia..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.currentTarget.files?.[0]
                if (file) {
                  try {
                    const url = await handleFileUpload(file)
                    setFormData({ ...formData, image_url: url })
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      setFormData((prev) => ({ ...prev, preview: e.target?.result as string }))
                    }
                    reader.readAsDataURL(file)
                  } catch (err) {
                    console.error("[v0] Upload failed:", err)
                  }
                }
              }}
              className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
              >
                <option value="testimonio">Testimonio</option>
                <option value="reflexión">Reflexión</option>
                <option value="propuesta">Propuesta</option>
              </select>
            </div>

            <label className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 accent-red-600"
              />
              <span className="text-sm font-semibold text-foreground">Destacada</span>
            </label>

            <label className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 accent-red-600"
              />
              <span className="text-sm font-semibold text-foreground">Publicada</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Crear Historia
          </button>
        </form>
      )}

      <div className="grid gap-6">
        {stories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No hay historias aún.</div>
        ) : (
          stories.map((story) => (
            <div
              key={story.id}
              className="border border-accent/20 rounded-lg p-6 hover:border-red-600/30 transition-colors"
            >
              <div className="flex gap-6">
                {story.image_url && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={story.image_url || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{story.title}</h3>
                      <p className="text-sm text-muted-foreground">{story.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          story.published ? "bg-green-600/20 text-green-600" : "bg-gray-600/20 text-gray-600"
                        }`}
                      >
                        {story.published ? "Publicada" : "Borrador"}
                      </span>
                      {story.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-600/20 text-yellow-600">
                          Destacada
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => handleTogglePublished(story.id, story.published)}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      {story.published ? "Despublicar" : "Publicar"}
                    </button>
                    <button
                      onClick={() => handleDeleteStory(story.id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
