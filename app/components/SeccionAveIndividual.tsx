"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TaxonDetalle {
  id: number;
  name: string;
  preferred_common_name?: string;
  wikipedia_summary?: string;
  conservation_status?: {
    status_name: string;
  };
  ancestors?: { id: number; name: string; rank: string }[];
  default_photo?: {
    medium_url: string;
  };
  taxon_photos?: {
    photo: {
      medium_url: string;
    };
  }[];
}

const DICCIONARIO_RANGOS: Record<string, string> = {
  kingdom: "Reino",
  phylum: "Filo",
  subphylum: "Subfilo",
  superclass: "Superclase",
  class: "Clase",
  subclass: "Subclase",
  order: "Orden",
  family: "Familia",
  genus: "Género",
  species: "Especie",
};

export const SeccionAveIndividual = ({
  aveId,
  onCerrar,
}: {
  aveId: number | string;
  onCerrar: () => void;
}) => {
  const [ave, setAve] = useState<TaxonDetalle | null>(null);
  const [fotoActiva, setFotoActiva] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDetalle() {
      setCargando(true);
      try {
        const res = await fetch(
          `https://api.inaturalist.org/v1/taxa/${aveId}?locale=es`
        );
        if (res.ok) {
          const data = await res.json();
          const resultado = data.results?.[0] || null;
          setAve(resultado);
          setFotoActiva(resultado?.default_photo?.medium_url || null);
        }
      } catch (error) {
        console.error("Error al cargar ave:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarDetalle();
  }, [aveId]);

  const nombreComun = ave?.preferred_common_name || ave?.name || `Especie (${aveId})`;
  const nombreCientifico = ave?.name || "Taxón catalogado";
  const fotoPrincipal =
    fotoActiva ||
    ave?.default_photo?.medium_url ||
    "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?q=80&w=800&auto=format&fit=crop";

  const galeriaFotos = ave?.taxon_photos?.slice(0, 4) || [];

  return (
    <div id="ficha-ave" className="my-10 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-900/15 shadow-xl transition-all duration-500 animate-fade-in relative">
      {/* Botón de retorno/cierre */}
      <div className="flex justify-between items-center pb-6 mb-6 border-b border-emerald-900/10">
        <button
          onClick={onCerrar}
          className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-semibold text-xs px-4 py-2 rounded-full border border-emerald-900/15 transition-all cursor-pointer"
        >
          ← Volver a la búsqueda
        </button>

        <span className="text-xs font-mono text-emerald-700 uppercase tracking-widest font-semibold">
          Vista Biológica Detallada
        </span>
      </div>

      {cargando ? (
        <div className="py-20 text-center font-sans text-emerald-900/70">
          <div className="inline-block w-8 h-8 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium">Cargando datos del espécimen...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Encabezado Centrado */}
          <div className="bg-[#f2f5ed] rounded-2xl p-6 sm:p-8 border border-emerald-900/10 text-center flex flex-col items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-900/15 rounded-full text-[10px] font-mono text-emerald-800 uppercase tracking-widest font-semibold mb-3">
              <span></span>
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-emerald-950 tracking-tight">
              {nombreComun}
            </h2>

            <p className="text-base sm:text-lg italic font-sans text-emerald-800/80 font-medium mt-1">
              {nombreCientifico}
            </p>

            {ave?.conservation_status && (
              <div className="mt-4 pt-3 border-t border-emerald-900/10 w-full max-w-xs flex justify-center">
                <span className="bg-emerald-900 text-emerald-50 text-xs font-medium px-4 py-1.5 rounded-full">
                  Estado: {ave.conservation_status.status_name}
                </span>
              </div>
            )}
          </div>

          {/* Galería y Taxonomía */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-[16/10] bg-emerald-950/5 relative rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xs">
                <Image
                  src={fotoPrincipal}
                  alt={nombreComun}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {galeriaFotos.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {galeriaFotos.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFotoActiva(item.photo.medium_url)}
                      className={`aspect-square relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        fotoActiva === item.photo.medium_url
                          ? "border-emerald-700 ring-2 ring-emerald-600/30"
                          : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={item.photo.medium_url}
                        alt={`${nombreComun} ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Taxonomia */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-md">
              <h3 className="font-display text-lg font-medium text-emerald-100 mb-4 pb-2 border-b border-emerald-800/60">
                Taxonomía
              </h3>
              <ul className="space-y-3 font-sans text-xs">
                {ave?.ancestors?.slice(-6).map((anc) => {
                  const rangoEspanol =
                    DICCIONARIO_RANGOS[anc.rank.toLowerCase()] || anc.rank;
                  return (
                    <li key={anc.id} className="flex justify-between items-center text-emerald-200/80 border-b border-emerald-900/40 pb-1.5">
                      <span className="text-emerald-400 font-mono text-[11px] font-medium">{rangoEspanol}:</span>
                      <span className="font-semibold italic text-emerald-50">{anc.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Resumen Biológico */}
          <div className="bg-[#f2f5ed] rounded-2xl p-6 sm:p-8 border border-emerald-900/10">
            <h3 className="font-display text-xl font-medium text-emerald-950 mb-3">
              Información de la especie
            </h3>
            {ave?.wikipedia_summary ? (
              <div
                className="text-sm sm:text-base text-emerald-950/85 leading-relaxed font-sans space-y-3 prose-emerald max-w-none"
                dangerouslySetInnerHTML={{ __html: ave.wikipedia_summary }}
              />
            ) : (
              <p className="text-sm text-emerald-900/70 font-sans">
                Esta especie forma parte de la base taxonómica global.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};