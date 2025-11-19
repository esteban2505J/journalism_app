"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

interface Story {
  id: string
  title: string
  description: string
  content: string
  image_url: string | null
  author: string
  category: string
  featured: boolean
  created_at: string
}

export default function HistoriasPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchStories()
  }, [])

  async function fetchStories() {
    try {
      setLoading(true)
      const query = supabase.from("stories").select("*").eq("published", true)

      const { data, error } = await query
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })

      if (error) throw error
      setStories(data || [])
    } catch (err) {
      console.log("[v0] Error fetching stories:", err)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["testimonio", "reflexión", "propuesta"]
  const filteredStories = selectedCategory ? stories.filter((s) => s.category === selectedCategory) : stories

  const featuredStory = filteredStories.find((s) => s.featured)
  const otherStories = filteredStories.filter((s) => !s.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-red-900/10 to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">Historias de Conciencia</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Testimonios, reflexiones y propuestas para transformar la realidad de violencia en Armenia
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-accent/20 sticky top-16 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === null ? "bg-red-600 text-white" : "bg-accent/20 text-foreground hover:bg-accent/40"
              }`}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${
                  selectedCategory === cat ? "bg-red-600 text-white" : "bg-accent/20 text-foreground hover:bg-accent/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section className="py-16 bg-gradient-to-br from-red-900/5 to-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {featuredStory.image_url && (
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={featuredStory.image_url || "/placeholder.svg"}
                    alt={featuredStory.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              <div>
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full">DESTACADA</span>
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">{featuredStory.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{featuredStory.description}</p>
                <p className="text-foreground leading-relaxed mb-8">{featuredStory.content.substring(0, 300)}...</p>
                <Link
                  href={`/historias/${featuredStory.id}`}
                  className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                >
                  Leer Historia Completa
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Cargando historias...</div>
          ) : otherStories.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No hay historias en esta categoría</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/historias/${story.id}`}
                  className="group rounded-xl overflow-hidden border border-accent/20 hover:border-red-600/50 transition-all hover:shadow-lg hover:shadow-red-900/10"
                >
                  {story.image_url && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={story.image_url || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="inline-block mb-3">
                      <span className="px-3 py-1 bg-red-600/10 text-red-600 text-xs font-bold rounded-full capitalize">
                        {story.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-red-600 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{story.description}</p>
                    <time className="text-xs text-muted-foreground">
                      {new Date(story.created_at).toLocaleDateString("es-CO")}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
