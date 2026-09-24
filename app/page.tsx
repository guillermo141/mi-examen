"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Buscador } from "./components/buscador";
import { EstadisticasComunidad } from "./components/EstadisticasComunidad";
import { SeccionAveIndividual } from "./components/SeccionAveIndividual";

const MapaBiodiversidad = dynamic(
  () => import("./components/MapaBiodiversidad"),
  { ssr: false }
);

const IDS_AVES_POPULARES = [
  4714,   // Águila Real
  3,      // Águila Pescadora
  5598,   // Búho Nival
  14886,  // Colibrí Garganta Rubí
  19350,  // Tucán Pico Iris
  9083,   // Cardenal Rojo
];

export default function Home() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [aveSeleccionadaId, setAveSeleccionadaId] = useState<number | string | null>(null);
  const seccionFichaRef = useRef<HTMLDivElement | null>(null);

  // La función principal que selecciona el ID y baja la pantalla
  const manejarAleatorio = () => {
    const idAzar = IDS_AVES_POPULARES[Math.floor(Math.random() * IDS_AVES_POPULARES.length)];
    setAveSeleccionadaId(idAzar);
  };

  // Escuchar la señal lanzada desde la Navbar superior
  useEffect(() => {
    const escucharEvento = () => {
      manejarAleatorio();
    };

    window.addEventListener("explorar-ave-aleatoria", escucharEvento);
    return () => {
      window.removeEventListener("explorar-ave-aleatoria", escucharEvento);
    };
  }, []);

  // Auto-scroll suave hacia la ficha cuando se selecciona un ave
  useEffect(() => {
    if (aveSeleccionadaId && seccionFichaRef.current) {
      setTimeout(() => {
        seccionFichaRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [aveSeleccionadaId]);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[560px] flex items-center justify-center text-center px-6 py-20 bg-emerald-950 text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
        >
          <source src="/aves.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-emerald-950/40 to-emerald-950/90 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="font-display text-4xl sm:text-6xl font-medium leading-tight text-white drop-shadow-md">
            Donde tu curiosidad aporta a la ciencia.
          </h1>
          <p className="mt-4 text-lg text-gray-100 max-w-2xl font-light">
            Identifica aves y especies mientras contribuyes a un catálogo vivo de la biodiversidad en la Tierra.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {/* Solo se deja el botón de Explorar el Catálogo */}
            <a
              href="#buscador"
              className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              Explorar el catálogo
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN BÚSQUEDA Y FICHA DEDICADA */}
      <section id="especies" className="scroll-mt-16">
        <section id="buscador" className="bg-[#f2f5ed] py-16 px-6 text-gray-900 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl text-emerald-950">
                Catálogo de Especies
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Busca cualquier ave por su nombre común o científico
              </p>
            </div>

            <MapaBiodiversidad
              aveId={aveSeleccionadaId}
              onSeleccionarEspecie={(nombre) => setTextoBusqueda(nombre)}
            />

            <Buscador
              valorInicial={textoBusqueda}
              onSeleccionarAve={(id) => setAveSeleccionadaId(id)}
            />

            {/* Ficha biológica con scroll automático */}
            {aveSeleccionadaId && (
              <div ref={seccionFichaRef} className="scroll-mt-20">
                <SeccionAveIndividual
                  aveId={aveSeleccionadaId}
                  onCerrar={() => setAveSeleccionadaId(null)}
                />
              </div>
            )}
          </div>
        </section>
      </section>

      <EstadisticasComunidad />
    </div>
  );
}