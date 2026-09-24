"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900/40 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna 1: Branding / Descripción */}
        <div className="space-y-3">
          <Link
            href="/"
            className="font-display font-bold text-2xl text-white flex items-center gap-1 hover:opacity-90 transition-opacity"
          >
            <span>Mundo de</span>
            <span className="text-emerald-400 font-semibold">Aves</span>
          </Link>
          <p className="text-sm text-emerald-200/70 font-sans leading-relaxed max-w-sm">
            Plataforma interactiva para la exploración, identificación y catálogo global de especies avícolas en colaboración con la comunidad científica.
          </p>
        </div>

        {/* Columna 2: Enlaces rapidos */}
        <div className="space-y-3">
          <h4 className="font-display text-base font-semibold text-emerald-100">
            Navegación
          </h4>
          <ul className="space-y-2 text-xs text-emerald-200/80 font-sans">
            <li>
              <a href="#buscador" className="hover:text-emerald-400 transition-colors">
                Buscador de Especies
              </a>
            </li>
            <li>
              <a href="#especies" className="hover:text-emerald-400 transition-colors">
                Catálogo Global
              </a>
            </li>
            <li>
              <a href="#comunidad" className="hover:text-emerald-400 transition-colors">
                Estadísticas de Comunidad
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Creditos y Datos */}
        <div className="space-y-3">
          <h4 className="font-display text-base font-semibold text-emerald-100">
            Datos &amp; API
          </h4>
          <p className="text-xs text-emerald-200/70 font-sans leading-relaxed">
            Información de la biodiversidad, fotografías y registros taxonómicos provistos por la API pública de{" "}
            <a
              href="https://www.inaturalist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              iNaturalist
            </a>
            .
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/60 font-sans gap-4">
        <p>© {new Date().getFullYear()} Mundo de Aves. Todos los derechos reservados.</p>
        <p className="text-[11px]">Desarrollado con Next.js </p>
      </div>
    </footer>
  );
};