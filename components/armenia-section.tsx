"use client";

import { useState } from "react";
import Image from "next/image";

export default function ArmeniaSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-16">
          <span className="inline-block px-4 py-2 bg-red-900/40 border border-red-600/50 rounded-full text-sm text-red-400 font-semibold mb-6">
            LA CIUDAD
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground text-pretty">
            Armenia, Quindío
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Armenia enfrenta su año más violento en una década, con niveles de homicidio superiores a cualquier registro reciente.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">145</div>
            <p className="text-muted-foreground font-semibold">Homicidios en 2025</p>
            <p className="text-sm text-muted-foreground mt-1">Aumento superior al 60% vs 2024</p>
          </div>
          <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">75</div>
            <p className="text-muted-foreground font-semibold">Homicidios en 2024</p>
            <p className="text-sm text-muted-foreground mt-1">Período completo del año</p>
          </div>
          <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="text-4xl font-bold text-red-600 mb-2">20-35</div>
            <p className="text-muted-foreground font-semibold">Rango de edad principal</p>
            <p className="text-sm text-muted-foreground mt-1">Mayoría de las víctimas</p>
          </div>
        </div>

        {/* Main Content con columnas */}
        <div className="grid md:grid-cols-2 gap-12 items-start mt-12 relative">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Crisis de Seguridad en 2025</h3>
            
            <ul className="space-y-3 text-muted-foreground">
              <li className="text-black"><span className="font-bold text-red-600">Año más violento en una década:</span> Armenia registra niveles de homicidio que no se veían desde 2016.</li>
              <li className="text-black"><span className="font-bold text-red-600">Cifra histórica:</span> En 2025, la ciudad alcanza 145 homicidios, rompiendo el récord reciente (119 en 2016).</li>
              <li className="text-black"><span className="font-bold text-red-600">Aumento acelerado:</span> Subida de más del 60% respecto a 2024 (83 homicidios registrados).</li>
              <li className="text-black"><span className="font-bold text-red-600">Víctimas principales:</span> Hombres entre 20 y 35 años, mayor vulnerabilidad según el DANE.</li>
              <li className="text-black"><span className="font-bold text-red-600">Sectores críticos:</span> Los Quindos, La Virginia, Santander, Génesis y Colinas.</li>
              <li className="text-black"><span className="font-bold text-red-600">Presencia policial:</span> Aumentada en los barrios críticos, pero limitada por falta de colaboración ciudadana.</li>
            </ul>

            {/* Details controlado manualmente para detectar el estado */}
            <details open={isExpanded} onToggle={(e) => setIsExpanded(e.currentTarget.open)} >
           {/* Asegúrate de agregar 'list-none' para quitar el triángulo por defecto del navegador */}
              <summary className="list-none group relative flex items-center justify-between w-full  p-5 bg-white rounded-lg shadow-sm border-l-4 border-red-600 hover:shadow-md hover:bg-red-50 transition-all duration-300 cursor-pointer">
                
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-gray-800 group-hover:text-red-700 transition-colors">
                    {isExpanded ? "Ocultar análisis detallado" : "Leer contexto completo de la crisis"}
                  </span>
                  <span className="text-xs text-gray-500 font-medium mt-1">
                    {isExpanded ? "Click para colapsar" : "Tiempo de lectura: 2 min"}
                  </span>
                </div>

                {/* Círculo con icono animado */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? "bg-red-100 text-red-700 rotate-180" : "bg-red-200 text-gray-900 group-hover:bg-red-600 group-hover:text-white"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              
              <div className="mt-4 p-6 bg-red-50 border border-red-200 rounded-xl text-foreground text-sm leading-relaxed space-y-3">
                <p>Armenia cierra 2025 con una cifra que no se registraba desde 2016, cuando el municipio alcanzó 119 asesinatos con arma de fuego.</p>
                <p>Muchos homicidios están vinculados al microtráfico, pero también a riñas y enfrentamientos entre jóvenes que escalan rápidamente por el uso de armas blancas.</p>
                <p>La patrullera Ingrid Rojas describe que la mayoría de los casos involucra a hombres entre 20 y 35 años, vinculados al expendio, consumo o disputas menores que terminan en agresiones letales.</p>
                <p>Los barrios más críticos mantienen permanente presencia policial, pero el incremento de riñas y disputas convierte estas zonas en focos rojos. La falta de colaboración ciudadana dificulta esclarecimientos y capturas.</p>
                <p>Según DANE, Armenia reportó 83 muertes violentas en 2024 (78 hombres y 5 mujeres), ratificando la vulnerabilidad masculina joven.</p>
                <p>Las autoridades han realizado allanamientos, operativos y el “Plan Cazador”, aunque la Fiscalía subraya que la solución debe ser social y estructural.</p>
                <p className="font-semibold text-red-700">
                  El aumento de homicidios en 2025 responde a violencia interpersonal, disputa por microterritorios, desempleo y falta de oportunidades, con llamado a fortalecer el trabajo comunitario.
                </p>
              </div>
            </details>

            {/* Imagen que solo aparece cuando NO está expandido */}
            <div className={`mt-8 transition-all duration-500 ${isExpanded ? "opacity-0 scale-95 h-0 overflow-hidden" : "opacity-100"}`}>
              <div className="relative aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-red-900/30">
                <Image
                  src="\crisis-armenia.jpeg"   
                  alt="Crisis de seguridad en Armenia 2025"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Patrones y Causas de la Violencia</h3>
            
            <p className="text-black leading-relaxed">
              La violencia homicida en Armenia se concentra en jóvenes hombres, involucrados principalmente en conflictos de microtráfico, ajuste de cuentas y riñas espontáneas. Las autoridades consideran que la combinación de factores sociales, económicos y delictivos ha llevado la situación a niveles críticos.
            </p>

            <ul className="space-y-3 text-black ">
              <li><strong className="text-red-600">Sicariato:</strong> Disputas entre bandas por el control territorial.</li>
              <li><strong className="text-red-600">Microtráfico:</strong> Rivalidad por puntos de venta, consumo y distribución de drogas.</li>
              <li><strong className="text-red-600">Disputaes por empleo juvenil:</strong> Falta de oportunidades laborales legitima la violencia como salida para muchos jóvenes.</li>
              <li><strong className="text-red-600">Riñas callejeras:</strong> Peleas en espacios públicos que escalan rápido por presencia de armas blancas y de fuego.</li>
              <li><strong className="text-red-600">Venganzas personales:</strong> Ajuste de cuentas y violencia interpersonal derivada de conflictos previos.</li>
              <li><strong className="text-red-600">Consumo de sustancias psicoactivas:</strong> Factor recurrente en peleas y agresiones.</li>
              <li><strong className="text-red-600">Deficiente intervención social:</strong> La falta de programas preventivos fomenta la reincidencia y el deterioro del entorno barrial.</li>
            </ul>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Las autoridades, junto con la Fiscalía y Policía, han intensificado los allanamientos y reforzado operativos en las zonas críticas, pero subrayan que la intervención comunitaria es imprescindible para reducir la escalada de homicidios y transformar el panorama de seguridad.
            </p>

            {/* Imagen que solo aparece cuando ESTÁ expandido */}
            <div className={`mt-8 transition-all duration-700 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 h-0 overflow-hidden"}`}>
              <div className="relative aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-red-900/30">
                <Image
                  src="\crisis-armenia.jpeg"
                  alt="Crisis de seguridad en Armenia 2025"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
