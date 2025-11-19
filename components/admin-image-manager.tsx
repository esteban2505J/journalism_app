"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface SectionImage {
  id: string
  section_name: string
  image_url: string
  alt_text: string | null
  caption: string | null
  updated_at: string
}

export default function AdminImageManager() {
  const [images, setImages] = useState<SectionImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ image_url: "", alt_text: "", caption: "" })
  const supabase = createClient()

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("section_images")
        .select("*")
        .order("section_name", { ascending: true })

      if (error) throw error
      setImages(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar imágenes")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: string) {
    try {
      setError(null)
      const { error } = await supabase
        .from("section_images")
        .update({
          image_url: formData.image_url,
          alt_text: formData.alt_text,
          caption: formData.caption,
        })
        .eq("id", id)

      if (error) throw error
      setEditingId(null)
      await fetchImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar imagen")
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground">Cargando imágenes...</div>
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Gestionar Imágenes de Secciones</h2>

      {error && <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-600">{error}</div>}

      <div className="grid gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="border border-accent/20 rounded-lg p-6 hover:border-red-600/30 transition-colors"
          >
            <div className="flex gap-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={img.image_url || "/placeholder.svg"}
                  alt={img.alt_text || img.section_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-4">{img.section_name}</h3>

                {editingId === img.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">URL de Imagen</label>
                      <input
                        type="url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Texto Alt</label>
                      <input
                        type="text"
                        value={formData.alt_text}
                        onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Descripción</label>
                      <input
                        type="text"
                        value={formData.caption}
                        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(img.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      <strong>URL:</strong> {img.image_url.substring(0, 50)}...
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Alt:</strong> {img.alt_text || "Sin descripción"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Caption:</strong> {img.caption || "Sin descripción"}
                    </p>
                    <button
                      onClick={() => {
                        setEditingId(img.id)
                        setFormData({
                          image_url: img.image_url,
                          alt_text: img.alt_text || "",
                          caption: img.caption || "",
                        })
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
