"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function NewsGrid() {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Microtráfico y riñas: los principales motivos de muerte",
      excerpt:
        "Análisis detallado de cómo el control de puntos de venta de drogas y las riñas callejeras son los principales motores de homicidios en barrios como Pinares y Los Quindos.",
      category: "Investigación",
      date: "15 de noviembre, 2025",
      image: "/images/microtrafico.jpeg",
    },
    {
      id: 2,
      title: "Desempleo y desorientación juvenil: raíces del problema",
      excerpt:
        "Según la teniente Ingrid Rojas, el desempleo y la falta de oportunidades para jóvenes entre 20-35 años alimenta la participación en actividades ilícitas.",
      category: "Análisis",
      date: "14 de noviembre, 2025",
      image: "/images/desempleoJuvenil.jpeg",
    },
    {
      id: 3,
      title: "Sicariato: disputas por control territorial",
      excerpt:
        "La Fiscalía identifica el sicariato y las disputas entre bandas criminales como los principales motores de la violencia en Armenia durante 2025.",
      category: "Fiscalía",
      date: "13 de noviembre, 2025",
      image: "/images/levantamiento.jpeg",
    },
    {
      id: 4,
      title: "Operativos coordinados: respuesta institucional",
      excerpt:
        "Policía y Fiscalía fortalecen operativos coordinados para combatir la violencia, aunque la desconfianza y percepción de inseguridad continúa en aumento entre los ciudadanos.",
      category: "Reportaje",
      date: "12 de noviembre, 2025",
      image: "/images/operativos.jpeg",
    },
  ])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      const { data, error } = await supabase.from("section_images").select("*").eq("section_name", "news")

      if (error) throw error

      if (data && data.length > 0) {
        const newsItems = data.map((item: any) => ({
          id: item.id,
          title: item.caption || "Investigación",
          excerpt: item.alt_text || "Análisis periodístico",
          category: "Investigación",
          date: new Date(item.created_at).toLocaleDateString("es-CO"),
          image: item.image_url,
        }))
        setNews(newsItems)
      }
    } catch (err) {
      console.log("[v0] Fetch news error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="noticias" className="py-20 bg-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-foreground mb-12 text-balance">Investigaciones y Reportajes</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="group rounded-xl overflow-hidden border border-accent/20 hover:border-red-600/50 transition-all hover:shadow-xl hover:shadow-red-900/10 cursor-pointer"
            >
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-red-600/20 text-red-600 text-xs font-semibold rounded-full border border-red-600/30">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>

                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-red-600 transition-colors leading-tight">
                  {item.title}
                </h4>

                <p className="text-muted-foreground text-sm leading-relaxed">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
