"use client";

import Link from "next/link";

export const Navbar = () => {
  const manejarClickNavbar = (e: React.MouseEvent) => {
    e.preventDefault();
    // Dispara el evento global hacia la página
    window.dispatchEvent(new CustomEvent("explorar-ave-aleatoria"));
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 text-gray-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-2xl text-emerald-950 flex items-center gap-1 hover:opacity-90 transition-opacity"
        >
          <span>Mundo de</span>
          <span className="text-emerald-600 font-semibold">Aves</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#buscador" className="hover:text-emerald-700 transition-colors cursor-pointer">
            Buscador
          </a>
          <a href="#especies" className="hover:text-emerald-700 transition-colors cursor-pointer">
            Especies
          </a>
          <a href="#comunidad" className="hover:text-emerald-700 transition-colors cursor-pointer">
            Comunidad
          </a>
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          {/* Este botón ahora envía la señal que la página principal escucha */}
          <button
            type="button"
            onClick={manejarClickNavbar}
            className="bg-emerald-950 text-white px-4 py-2 rounded-lg hover:bg-emerald-900 transition-all text-xs font-semibold shadow-xs cursor-pointer active:scale-95"
          >
            Explorar Ave Aleatoria
          </button>
        </div>
      </div>
    </header>
  );
};