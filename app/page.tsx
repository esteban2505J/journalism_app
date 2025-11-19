"use client"
import Header from "@/components/header"
import CarouselHero from "@/components/carousel-hero"
import ArmeniaSection from "@/components/armenia-section"
import StatsSection from "@/components/stats-section"
import NewsGrid from "@/components/news-grid"
import VideoUploadSection from "@/components/video-upload-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CarouselHero />
      <ArmeniaSection />
      <StatsSection />
      <NewsGrid />
      <VideoUploadSection />
      <Footer />
    </div>
  )
}
