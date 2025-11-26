"use client"

import Header from "@/components/header"
import CarouselHero from "@/components/carousel-hero"
import ArmeniaSection from "@/components/armenia-section"
import StatsSection from "@/components/stats-section"
// 1. Importamos el nuevo componente.
// Asegúrate de que la ruta coincida con el nombre de tu archivo (ej: reportaje-completo.tsx)
import ReportajeCompleto from "@/components/ReportajeCompleto" 
import NewsGrid from "@/components/news-grid"
import VideoUploadSection from "@/components/video-upload-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <CarouselHero />
        
        <ArmeniaSection />
        
        <StatsSection />

  
        <ReportajeCompleto />

        <VideoUploadSection />

        <NewsGrid />
      </main>

      <Footer />
    </div>
  )
}