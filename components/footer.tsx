export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h5 className="font-bold text-lg mb-4">Armenia Homicidios</h5>
            <p className="text-sm opacity-70">
              Investigación periodística sobre la crisis de violencia en Armenia, Quindío.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-4">Enlaces Rápidos</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#datos" className="hover:opacity-100 opacity-70 transition-opacity">
                  Datos
                </a>
              </li>
              <li>
                <a href="#noticias" className="hover:opacity-100 opacity-70 transition-opacity">
                  Noticias
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:opacity-100 opacity-70 transition-opacity">
                  Videos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-4">Contacto</h5>
            <p className="text-sm opacity-70">
              Para reportes o información:
              <br />
              <a href="mailto:info@armeniahomicidios.co" className="hover:opacity-100 transition-opacity">
                info@armeniahomicidios.co
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-sm opacity-60">
            © 2025 Armenia Homicidios - Investigación Periodística. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
