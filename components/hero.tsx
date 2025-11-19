export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white py-20">
      <div className="absolute inset-0 opacity-50 bg-transparent">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800/20 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-50 bg-transparent">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-red-900/40 border border-red-600/50 rounded-full text-sm text-red-200 font-semibold">
              INVESTIGACIÓN
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-pretty leading-tight">
            Armenia, Quindío atraviesa uno de los años más violentos de la última década
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Entre enero y octubre de 2025 se han registrado más de 120 homicidios. Un incremento alarmante del 45%
            comparado con los 83 reportados durante todo 2024. La ciudad que fue conocida como "la Milagro" enfrenta una
            crisis de seguridad sin precedentes.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="#noticias"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-center"
            >
              Leer Investigación
            </a>
            <a
              href="#videos"
              className="px-6 py-3 border border-red-600/50 hover:bg-red-900/20 text-white font-semibold rounded-lg transition-colors text-center"
            >
              Ver Videos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
