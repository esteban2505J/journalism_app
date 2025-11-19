export default function StatsSection() {
  const stats = [
    {
      number: "120+",
      label: "Homicidios",
      period: "Enero - Octubre 2025",
      color: "from-red-600 to-red-700",
    },
    {
      number: "83",
      label: "Homicidios en 2024",
      period: "Todo el año",
      color: "from-amber-600 to-amber-700",
    },
    {
      number: "45%",
      label: "Incremento anual",
      period: "Aumento alarmante",
      color: "from-rose-600 to-rose-700",
    },
    {
      number: "20-35",
      label: "Edad promedio víctimas",
      period: "Principalmente hombres",
      color: "from-red-500 to-red-600",
    },
  ]

  return (
    <section id="datos" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-foreground mb-12 text-balance">Los Números de la Crisis</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border border-accent/20 hover:border-red-600/50 transition-all hover:shadow-lg hover:shadow-red-900/10 backdrop-blur-sm"
            >
              <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-lg mb-4 inline-block`}>
                <p className="text-3xl font-bold text-white">{stat.number}</p>
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2">{stat.label}</h4>
              <p className="text-sm text-muted-foreground">{stat.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
