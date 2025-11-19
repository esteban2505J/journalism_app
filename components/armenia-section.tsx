export default function ArmeniaSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-16">
          <span className="inline-block px-4 py-2 bg-red-900/40 border border-red-600/50 rounded-full text-sm text-red-400 font-semibold mb-6">
            LA CIUDAD
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground text-pretty">Armenia, Quindío</h2>
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
            <div className="text-4xl font-bold text-red-600 mb-2">83</div>
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
        <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
          {/* Columna Izquierda */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Crisis de Seguridad en 2025</h3>
            <ul className="space-y-3 mb-4">
              <li>
                <span className="font-bold text-red-600">Año más violento en una década:</span>
                Armenia registra niveles de homicidio que no se veían desde 2016.
              </li>
              <li>
                <span className="font-bold">Cifra histórica:</span>
                En 2025, la ciudad alcanza 145 homicidios, rompiendo el récord reciente (119 en 2016).
              </li>
              <li>
                <span className="font-bold">Aumento acelerado:</span>
                Subida de más del 60% respecto a 2024 (83 homicidios registrados).
              </li>
              <li>
                <span className="font-bold">Víctimas principales:</span>
                Hombres entre 20 y 35 años, mayor vulnerabilidad según el DANE.
              </li>
              <li>
                <span className="font-bold">Sectores críticos:</span>
                Los Quindos, La Virginia, Santander, Génesis y Colinas.
              </li>
              <li>
                <span className="font-bold">Presencia policial:</span>
                Aumentada en los barrios críticos, pero limitada por falta de colaboración ciudadana.
              </li>
            </ul>
            <details className="mt-2">
              <summary className="cursor-pointer font-semibold text-red-700">Leer más detalles y contexto</summary>
              <div
                className="pt-3 rounded-lg p-4"
                style={{ backgroundColor: "#f4c6c8", color: "#222" }}
              >
                Armenia cierra 2025 con una cifra que no se registraba desde 2016, cuando el municipio alcanzó 119 asesinatos con arma de fuego.<br /><br />
                Muchos homicidios están vinculados al microtráfico, pero también a riñas y enfrentamientos entre jóvenes que escalan rápidamente por el uso de armas blancas.<br /><br />
                La patrullera Ingrid Rojas describe que la mayoría de los casos involucra a hombres entre 20 y 35 años, vinculados al expendio, consumo o disputas menores que terminan en agresiones letales.<br /><br />
                Los barrios más críticos mantienen permanente presencia policial, pero el incremento de riñas y disputas convierte estas zonas en focos rojos. La falta de colaboración ciudadana dificulta esclarecimientos y capturas.<br /><br />
                Según DANE, Armenia reportó 83 muertes violentas en 2024 (78 hombres y 5 mujeres), ratificando la vulnerabilidad masculina joven.<br /><br />
                Las autoridades han realizado allanamientos, operativos y el “Plan Cazador”, aunque la Fiscalía subraya que la solución debe ser social y estructural.<br /><br />
                El aumento de homicidios en 2025 responde a violencia interpersonal, disputa por microterritorios, desempleo y falta de oportunidades, con llamado a fortalecer el trabajo comunitario.
              </div>
            </details>
          </div>

          {/* Columna Derecha: Patrones y Causas ampliadas */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Patrones y Causas de la Violencia</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              La violencia homicida en Armenia se concentra en jóvenes hombres, involucrados principalmente en conflictos de microtráfico, ajuste de cuentas y riñas espontáneas. Las autoridades consideran que la combinación de factores sociales, económicos y delictivos ha llevado la situación a niveles críticos.
            </p>
            <ul className="space-y-3">
              <li><strong>Sicariato:</strong> Disputas entre bandas por el control territorial.</li>
              <li><strong>Microtráfico:</strong> Rivalidad por puntos de venta, consumo y distribución de drogas.</li>
              <li><strong>Desempleo juvenil:</strong> Falta de oportunidades laborales legitima la violencia como salida para muchos jóvenes.</li>
              <li><strong>Riñas callejeras:</strong> Peleas en espacios públicos que escalan rápido por presencia de armas blancas y de fuego.</li>
              <li><strong>Venganzas personales:</strong> Ajuste de cuentas y violencia interpersonal derivada de conflictos previos.</li>
              <li><strong>Consumo de sustancias psicoactivas:</strong> Factor recurrente en peleas y agresiones.</li>
              <li><strong>Deficiente intervención social:</strong> La falta de programas preventivos fomenta la reincidencia y el deterioro del entorno barrial.</li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
              Las autoridades, junto con la Fiscalía y Policía, han intensificado los allanamientos y reforzado operativos en las zonas críticas, pero subrayan que la intervención comunitaria es imprescindible para reducir la escalada de homicidios y transformar el panorama de seguridad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
