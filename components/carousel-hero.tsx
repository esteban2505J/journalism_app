"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CarouselHero() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const slides = [
    {
      title: "Armenia, Quindío",
      subtitle: "Crisis de Seguridad 2025",
      image: "/images/armenia1-1.jpg",
      stat: "120 homicidios en 10 meses",
    },
    {
      title: "La Ciudad Milagro",
      subtitle: "Enfrentando la violencia urbana",
      image: "/images/scenadelcrimen.jpg",
      stat: "45% incremento desde 2024",
    },
    {
      title: "Investigación Periodística",
      subtitle: "Cobertura de la crisis de seguridad",
      image: "/images/homicidios2.webp",
      stat: "Edades 20-35 años: población afectada",
    },
  ]

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay, slides.length])

  const goToSlide = (index) => {
    setCurrent(index)
    setAutoplay(false)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoplay(false)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoplay(false)
  }

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Slides */}
      <div className="relative h-96 md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <p className="text-red-400 text-sm md:text-base font-semibold mb-3 tracking-wider">{slide.subtitle}</p>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-pretty max-w-3xl leading-tight">{slide.title}</h2>
              <p className="text-xl md:text-2xl text-red-300 font-semibold mb-8">{slide.stat}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-red-600/80 hover:bg-red-600 text-white p-2 md:p-3 rounded-full transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-red-600/80 hover:bg-red-600 text-white p-2 md:p-3 rounded-full transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 md:h-3 rounded-full transition-all ${
              index === current ? "w-8 bg-red-600" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Info Counter */}
      <div className="absolute top-6 right-6 z-30 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-white text-sm">
        <span className="font-semibold text-red-400">{current + 1}</span> / {slides.length}
      </div>
    </section>
  )
}
