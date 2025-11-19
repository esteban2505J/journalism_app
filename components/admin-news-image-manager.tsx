"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface NewsImage {
  id: string
  title: string
  image_url: string
  category: string
  section_name: string
}

const DEFAULT_NEWS = [
  {
    id: "1",
    title: "Microtráfico y riñas: los principales motivos de muerte",
    image_url: "/microtr-fico-drogas-barrios-peligro.jpg",
    category: "Investigación",
    section_name: "news_1",
  },
  {
    id: "2",
    title: "Desempleo y desorientación juvenil: raíces del problema",
    image_url: "/j-venes-desempleo-barrio-calle-comunidad.jpg",
    category: "Análisis",
    section_name: "news_2",
  },
  {
    id: "3",
    title: "Sicariato: disputas por control territorial",
    image_url: "/investigaci-n-policial-criminal-stica-escena-crime.jpg",
    category: "Fiscalía",
    section_name: "news_3",
  },
  {
    id: "4",
    title: "Operativos coordinados: respuesta institucional",
    image_url: "/polic-a-operativo-seguridad-urbana-patrulla.jpg",
    category: "Reportaje",
    section_name: "news_4",
  },
]

export default function AdminNewsImageManager() {
  const [news, setNews] = useState<NewsImage[]>(DEFAULT_NEWS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ image_url: "", title: "", preview: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      setError(null)
      setLoading(true)

      const { data, error } = await supabase.from("section_images").select("*").like("section_name", "news%")

      if (error) throw error

      if (data && data.length > 0) {
        const newsItems = data.map((item: any) => ({
          id: item.id,
          title: item.caption || item.title || "",
          image_url: item.image_url || "",
          category: "Investigación",
          section_name: item.section_name,
        }))
        setNews(newsItems)
      }
    } catch (err) {
      console.log("[v0] Fetch news error:", err)
    } finally {
      setLoading(false)
    }
  }

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
        })
        .eq("id", id)

      if (error) {
        console.log("[v0] Update error:", error)
        throw error
      }

      setNews(
        news.map((item) => (item.id === id ? { ...item, image_url: formData.image_url, title: formData.title } : item)),
      )
      setEditingId(null)
      setFormData({ image_url: "", title: "", preview: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar")
      console.log("[v0] Update error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Gestionar Imágenes de Investigaciones</h2>

      {error && <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-600">{error}</div>}

      <div className="grid gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="border border-accent/20 rounded-lg p-6 hover:border-red-600/30 transition-colors"
          >
            <div className="flex gap-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={editingId === item.id ? formData.preview || item.image_url : item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Título</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
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
                        className="w-full px-3 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-red-600 text-foreground"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(item.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
                      >
                        {loading ? "Guardando..." : "Guardar"}
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null)
                          setFormData({ image_url: "", title: "", preview: "" })
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Categoría: {item.category}</p>
                    <button
                      onClick={() => {
                        setEditingId(item.id)
                        setFormData({ title: item.title, image_url: item.image_url, preview: item.image_url })
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
