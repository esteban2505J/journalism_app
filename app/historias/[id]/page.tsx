"use client"

import { useEffect, useState } from "react"
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
  created_at: string
}

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<Story | null>(null)
  const [relatedStories, setRelatedStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchStory() {
      try {
        setLoading(true)

        // Fetch main story
        const { data: storyData, error: storyError } = await supabase
          .from("stories")
          .select("*")
          .eq("id", params.id)
          .eq("published", true)
          .single()

        if (storyError) throw new Error("Historia no encontrada")
        setStory(storyData)

        // Fetch related stories (same category)
        if (storyData) {
          const { data: related } = await supabase
            .from("stories")
            .select("*")
            .eq("category", storyData.category)
            .eq("published", true)
            .neq("id", params.id)
            .limit(3)

          setRelatedStories(related || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar historia")
        console.log("[v0] Error fetching story:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando historia...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <p className="text-red-600 font-semibold mb-6">{error || "Historia no encontrada"}</p>
          <Link
            href="/historias"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
          >
            Volver a Historias
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      {story.image_url && (
        <div className="w-full h-96 md:h-[500px] overflow-hidden">
          <img src={story.image_url || "/placeholder.svg"} alt={story.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-red-600/10 text-red-600 text-sm font-bold rounded-full capitalize">
              {story.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">{story.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{story.description}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-accent/20 pt-6">
            <span className="font-semibold">Por {story.author}</span>
            <span>•</span>
            <time>
              {new Date(story.created_at).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-invert max-w-none mb-16">
          <div className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">{story.content}</div>
        </div>

        {/* Back Link */}
        <Link
          href="/historias"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
        >
          ← Volver a Historias
        </Link>
      </article>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="py-20 bg-red-900/5 border-t border-accent/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12">Historias Relacionadas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedStories.map((relatedStory) => (
                <Link
                  key={relatedStory.id}
                  href={`/historias/${relatedStory.id}`}
                  className="group rounded-xl overflow-hidden border border-accent/20 hover:border-red-600/50 transition-all hover:shadow-lg hover:shadow-red-900/10"
                >
                  {relatedStory.image_url && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={relatedStory.image_url || "/placeholder.svg"}
                        alt={relatedStory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-red-600 transition-colors">
                      {relatedStory.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedStory.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
