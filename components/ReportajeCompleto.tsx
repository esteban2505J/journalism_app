"use client";

import { useState, useRef } from "react";

export default function ReportajeCompleto() {
  return (
    <section className="py-20 bg-white text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- CABECERA --- */}
        <div className="mb-16 border-b border-red-200 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
              Informe Especial
            </span>
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">
              Seguridad Ciudadana
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight text-balance">
            Armenia Quindío año en rojo: <br />
            <span className="text-red-700">el repunte de homicidios</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl font-serif leading-relaxed border-l-4 border-red-700 pl-6">
            La ciudad atraviesa en 2025 uno de los momentos más críticos en materia de seguridad de la última década.
          </p>
        </div>

        {/* --- CUERPO DEL REPORTAJE (2 COLUMNAS) --- */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 text-lg leading-relaxed text-gray-800">
          
          {/* === COLUMNA IZQUIERDA === */}
          <div className="space-y-8">
            <p>
              <span className="drop-cap text-6xl float-left mr-3 mt-[-8px] font-serif text-red-800 font-bold">A</span>
              rmenia atraviesa en 2025 uno de los momentos más críticos en materia de seguridad de la última década, al registrar un incremento de homicidios que no se veía desde 2016, cuando la ciudad alcanzó 119 muertes por arma de fuego.
            </p>

            <p>
              Las cifras preliminares de este año indican alrededor de 120 asesinatos, un aumento superior al 60 % frente a los 66 casos reportados en 2024, lo que evidencia un deterioro significativo en las dinámicas de violencia urbana. Este repunte se produce en medio de escenarios donde confluyen riñas, ajustes de cuentas, disputas por microterritorios de expendio de estupefacientes y la circulación permanente de armas blancas y de fuego.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-base shadow-sm">
              <h4 className="font-bold text-red-800 mb-2 border-b border-red-200 pb-2">Contexto Estadístico</h4>
              <p>
                A nivel departamental, datos del DANE muestran que en 2024 el Quindío registró 324 defunciones no fetales, de las cuales 113 correspondieron a agresiones, y que solo en Armenia se contabilizaron 83 muertes violentas, con una marcada prevalencia entre hombres jóvenes.
              </p>
            </div>

            <p>
              Estos indicadores configuran un panorama complejo que ha obligado tanto a las autoridades policiales como a las entidades judiciales y administrativas a replantear estrategias de control, prevención y articulación interinstitucional frente al crecimiento sostenido de la violencia letal.
            </p>

            {/* SECCIÓN GOBERNACIÓN */}
            <h3 className="text-2xl font-serif font-bold text-gray-900 mt-8 pt-8 border-t border-gray-200">
              La visión institucional
            </h3>
            
            <p>
              Desde la Gobernación del Quindío, la preocupación por el incremento de homicidios también ha sido reiterada. Francisco Bueno, director de Seguridad y Convivencia Ciudadana del departamento, señala que el aumento de la violencia en Armenia responde a una combinación de factores estructurales y a una transformación en las dinámicas del microtráfico urbano.
            </p>

            {/* BLOCKQUOTE CON ICONO SVG */}
            <blockquote className="relative p-6 italic bg-red-50/50 rounded-r-xl border-l-4 border-red-600 text-gray-700 my-6">
              {/* Icono de comillas SVG */}
              <svg className="absolute top-2 left-2 w-8 h-8 text-red-200 -z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.923 14.929 15.081C15.537 14.239 16.213 13.661 16.957 13.347L16.726 13.214C16.103 13.393 15.442 13.483 14.742 13.483C12.758 13.483 11.064 12.794 9.66 11.416C8.256 10.038 7.554 8.362 7.554 6.388C7.554 4.414 8.256 2.738 9.66 1.36C11.064 -0.018 12.758 -0.707 14.742 -0.707C16.726 -0.707 18.42 0.018 19.824 1.36C21.228 2.738 21.93 4.414 21.93 6.388C21.93 8.362 21.228 10.038 19.824 11.416L14.017 21ZM3.983 21L3.983 18C3.983 16.896 4.287 15.923 4.895 15.081C5.503 14.239 6.179 13.661 6.923 13.347L6.692 13.214C6.069 13.393 5.408 13.483 4.708 13.483C2.724 13.483 1.03 12.794 -0.374 11.416C-1.778 10.038 -2.48 8.362 -2.48 6.388C-2.48 4.414 -1.778 2.738 -0.374 1.36C1.03 -0.018 2.724 -0.707 4.708 -0.707C6.692 -0.707 8.386 0.018 9.79 1.36C11.194 2.738 11.896 4.414 11.896 6.388C11.896 8.362 11.194 10.038 9.79 11.416L3.983 21Z" transform="translate(2,2) scale(0.8)"/>
              </svg>
              “Estamos viendo que no se trata únicamente de organizaciones consolidadas, sino de pequeños grupos juveniles que controlan microterritorios y que se enfrentan por disputas mínimas que terminan escalando de forma letal”.
            </blockquote>

            <p>
              Según Bueno, la proliferación de armas blancas entre jóvenes, la facilidad de acceso a armas de fuego de bajo costo y la fragmentación de las economías ilegales han modificado por completo el panorama de seguridad.
            </p>

            {/* --- AUDIO 1 --- */}
            <div className="my-10">
               <AudioPlayer 
                 title="Análisis de Seguridad"
                 subtitle="Ingrid Rojas, Teniente Policía Metropolitana"
                 duration="3:45"
                 src="/audios/ingrid.mp3"
               />
            </div>

            <p>
              La Gobernación sostiene que, si bien se han reforzado los operativos con la Policía y la Fiscalía, el comportamiento de los homicidios revela un fenómeno más complejo, marcado por conflictos interpersonales, ausencia de oportunidades laborales y un deterioro social que exige intervenciones integrales y sostenidas.
            </p>
          </div>


          {/* === COLUMNA DERECHA === */}
          <div className="space-y-8">
            
            {/* SECCIÓN POLICÍA */}
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              Conflicto inmediato y territorial
            </h3>

            <p>
              La Policía Metropolitana de Armenia coincide en que la mayor parte de los homicidios registrados este año no están asociados a estructuras criminales de gran escala, sino a conflictos inmediatos que escalan con rapidez debido al porte extendido de armas blancas y la presencia de economías ilegales de baja intensidad.
            </p>

            <p>
              La teniente Ingrid Rojas, quien ha atendido múltiples casos en zonas críticas del sur, explica que los enfrentamientos suelen originarse en riñas entre jóvenes consumidores o expendedores, disputas por puntos de venta o tensiones derivadas del consumo de alcohol y estupefacientes.
            </p>

            <p className="font-medium text-red-800 border-l-2 border-red-800 pl-4">
              “Son situaciones que surgen en minutos; una discusión, un empujón, la presencia de un cuchillo y el desenlace fatal ocurre antes de que llegue la patrulla”, señala Rojas.
            </p>

            <div className="bg-gray-900 text-gray-300 p-6 rounded-xl my-6 shadow-lg">
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Zonas de Alerta Roja
              </h4>
              <p className="text-sm leading-relaxed">
                De acuerdo con los reportes policiales, barrios como 
                <span className="text-white font-bold mx-1">Los Quindos, La Virginia, Santander, Génesis y Colinas</span>
                concentran una proporción considerable de los hechos violentos, en un patrón que refleja la presión territorial sobre pequeños corredores de microtráfico y la vulnerabilidad de poblaciones jóvenes.
              </p>
            </div>

            {/* SECCIÓN FISCALÍA */}
            <h3 className="text-2xl font-serif font-bold text-gray-900 mt-8">
              Fragmentación criminal
            </h3>

            <p>
              La Fiscalía Seccional del Quindío advierte que el incremento de homicidios en 2025 está estrechamente relacionado con la fragmentación del microtráfico y la disputa por rutas de distribución dentro de la ciudad, así como con un aumento de los enfrentamientos de tipo instrumental entre estructuras locales.
            </p>
            
            <p>
              Según la entidad, aunque persiste la presencia de sicariato asociado a economías ilegales, una parte significativa de los casos responde a confrontaciones entre pequeños grupos vinculados al expendio y al consumo.
            </p>

            {/* --- AUDIO 2 --- */}
            <div className="my-10">
               <AudioPlayer 
                 title="Investigación en Curso"
                 subtitle="Reporte Fiscalía Seccional"
                 duration="4:12"
                 src="/audios/fiscalia.mp3"
               />
            </div>

            <p>
              La Fiscalía ha informado que este fenómeno se ve agravado por factores estructurales como el desempleo juvenil, la exclusión social y la ausencia de mecanismos efectivos de prevención en barrios vulnerables.
            </p>

            <h3 className="text-2xl font-serif font-bold text-gray-900 mt-8 pt-8 border-t border-gray-200">
              Conclusiones
            </h3>

            <p>
              Pese a los esfuerzos de las autoridades y el fortalecimiento de operativos, los indicadores muestran que la intervención operativa resulta insuficiente sin una estrategia que aborde las causas sociales que alimentan la violencia.
            </p>
            
            <p>
              Para las entidades, detener el ascenso de la violencia en Armenia exige no solo más operativos, sino una intervención integral que combine prevención, control territorial y reconstrucción del tejido social.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- COMPONENTE DE AUDIO ESTILIZADO SIN LIBRERÍAS --- */
function AudioPlayer({ title, subtitle, duration, src }: { title: string, subtitle: string, duration: string, src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-5 group ring-1 ring-transparent hover:ring-red-100">
      
      {/* Botón Play/Pause */}
      <button
        onClick={togglePlay}
        className="relative flex-shrink-0 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 active:scale-95 shadow-md group-hover:shadow-red-500/30"
        aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
      >
        {/* Anillo de pulso cuando suena */}
        {isPlaying && (
           <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-20"></span>
        )}
        
        {isPlaying ? (
          /* Icono Pause SVG */
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          /* Icono Play SVG */
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Info del Track */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">
            Escuchar
          </span>
          <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
            {/* Icono Volumen pequeño */}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            {duration}
          </span>
        </div>
        <h5 className="font-bold text-gray-900 text-base leading-tight truncate">{title}</h5>
        <p className="text-sm text-gray-500 truncate mt-0.5">{subtitle}</p>
      </div>
      
      {/* Icono Decorativo de Audio */}
      <div className="hidden sm:block text-gray-200 group-hover:text-red-100 transition-colors duration-300">
        {/* Icono Onda de audio abstracto */}
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </div>

      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={() => setIsPlaying(false)}
        controls={false} 
      />
    </div>
  );
}
