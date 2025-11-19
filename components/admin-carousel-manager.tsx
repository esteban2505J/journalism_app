"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface CarouselImage {
  id: string
  image_url: string
  title: string
  subtitle: string
  stat: string
}

const DEFAULT_SLIDES = [
  {
    id: "slide-1",
    image_url: "/images/armenia1-1.jpg",
    title: "Armenia, Quindío",
    subtitle: "Crisis de Seguridad 2025",
    stat: "120 homicidios en 10 meses",
  },
  {
    id: "slide-2",
    image_url: "/images/scenadelcrimen.jpg",
    title: "La Ciudad Milagro",
    subtitle: "Enfrentando la violencia urbana",
    stat: "45% incremento desde 2024",
  },
  {
    id: "slide-3",
    image_url: "/images/homicidios2.webp",
    title: "Investigación Periodística",
    subtitle: "Cobertura de la crisis de seguridad",
    stat: "Edades 20-35 años: población afectada",
  },
]

export default function AdminCarouselManager() {
  const [slides, setSlides] = useState<CarouselImage[]>(DEFAULT_SLIDES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    subtitle: "",
    stat: "",
    preview: "",
  })

  const supabase = createClient()

  async function handleFileUpload(file: File) {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: string) {
    try {
      setError(null)
      setLoading(true)

      const { error } = await supabase
        .from("section_images")
        .update({
          image_url: formData.image_url,
          caption: formData.title,
          alt_text: formData.subtitle,
        })
        .eq("id", id)

      if (error) throw error

      setSlides(
        slides.map((slide) =>
          slide.id === id
            ? {
                ...slide,
                image_url: formData.image_url,
                title: formData.title,
                subtitle: formData.subtitle,
                stat: formData.stat,
              }
            : slide,
        ),
      )
      setEditingId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Gestionar Carrusel Principal</h2>

      {error && <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-600">{error}</div>}

      <div className="grid gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="border border-accent/20 rounded-lg p-6 hover:border-red-600/30 transition-colors"
          >
            <div className="flex gap-6">
              <div className="w-40 h-40 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={formData.preview || slide.image_url || "/placeholder.svg"}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                {editingId === slide.id ? (
                  <div className="space-y-4">
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
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Título Principal</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Subtítulo</label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Estadística</label>
                      <input
                        type="text"
                        value={formData.stat}
                        onChange={(e) => setFormData({ ...formData, stat: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(slide.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
                      >
                        {loading ? "Guardando..." : "Guardar"}
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null)
                          setFormData({ image_url: "", title: "", subtitle: "", stat: "", preview: "" })
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{slide.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>Subtítulo:</strong> {slide.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Estadística:</strong> {slide.stat}
                    </p>
                    <button
                      onClick={() => {
                        setEditingId(slide.id)
                        setFormData({
                          image_url: slide.image_url,
                          title: slide.title,
                          subtitle: slide.subtitle,
                          stat: slide.stat,
                          preview: slide.image_url,
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
