"use client";

import { useEffect, useRef, useState } from "react";
import type { AveResumen } from "@/services/tipos";
import { TarjetaAve } from "./tarjetaAve/tarjetasAves";

type Estado = "inactivo" | "cargando" | "error" | "listo";

interface BuscadorProps {
  valorInicial?: string;
  onSeleccionarAve?: (id: number | string) => void;
}

export const Buscador = ({
  valorInicial = "",
  onSeleccionarAve,
}: BuscadorProps) => {
  const [consulta, setConsulta] = useState(valorInicial);
  const [resultados, setResultados] = useState<AveResumen[]>([]);
  const [estado, setEstado] = useState<Estado>("inactivo");
  const [estaEnfocado, setEstaEnfocado] = useState(false);
  const controladorRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (valorInicial) {
      setConsulta(valorInicial);
    }
  }, [valorInicial]);

  useEffect(() => {
    const texto = consulta.trim();

    controladorRef.current?.abort();

    if (texto.length < 2) {
      setEstado("inactivo");
      setResultados([]);
      return;
    }

    const idTimeout = setTimeout(async () => {
      const controlador = new AbortController();
      controladorRef.current = controlador;
      setEstado("cargando");

      try {
        const respuesta = await fetch(
          `/api/buscar-aves?q=${encodeURIComponent(texto)}`,
          { signal: controlador.signal }
        );

        if (!respuesta.ok) throw new Error("Falló la búsqueda");

        const datos: AveResumen[] = await respuesta.json();
        setResultados(datos);
        setEstado("listo");
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setEstado("error");
      }
    }, 300);

    return () => clearTimeout(idTimeout);
  }, [consulta]);

  return (
    <div className="w-full relative">
      {estaEnfocado && (
        <div
          onClick={() => setEstaEnfocado(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-all duration-300 z-10"
        />
      )}

      <label htmlFor="buscador-aves" className="sr-only">
        Buscar un ave
      </label>

      <div
        className={`relative flex items-center w-full max-w-2xl mx-auto transition-all duration-300 transform z-20 ${
          estaEnfocado ? "scale-105" : "scale-100"
        }`}
      >
        <svg
          className="w-5 h-5 absolute left-4 text-emerald-800/60 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          id="buscador-aves"
          type="text"
          value={consulta}
          onFocus={() => setEstaEnfocado(true)}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder="Buscar especie por nombre común o científico..."
          className="w-full pl-12 pr-10 py-3.5 bg-white text-emerald-950 font-sans text-base placeholder:text-emerald-800/50 rounded-xl border border-emerald-900/30 shadow-md outline-none focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/40 focus:shadow-xl transition-all duration-300"
        />

        {consulta && (
          <button
            onClick={() => {
              setConsulta("");
              setEstaEnfocado(false);
            }}
            type="button"
            className="absolute right-3.5 text-emerald-800/50 hover:text-emerald-900 text-sm font-bold bg-gray-100 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {estado === "inactivo" && (
        <p className="mt-8 text-center text-emerald-900/60 text-sm font-sans">
          Escribe al menos 2 letras para iniciar la búsqueda (ej. &ldquo;aguila&rdquo;, &ldquo;colibri&rdquo;).
        </p>
      )}

      {estado === "cargando" && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-emerald-900/10 p-3 animate-pulse shadow-sm"
            >
              <div className="aspect-[4/3] rounded-lg bg-emerald-950/10" />
              <div className="h-4 w-3/4 bg-emerald-950/10 rounded mt-3" />
              <div className="h-3 w-1/2 bg-emerald-950/10 rounded mt-2" />
            </div>
          ))}
        </div>
      )}

      {estado === "error" && (
        <p className="mt-8 text-center text-red-600 font-sans text-sm">
          Ocurrió un error al consultar las especies.
        </p>
      )}

      {estado === "listo" && resultados.length === 0 && (
        <p className="mt-8 text-center text-emerald-900/70 font-sans">
          Ningún ave coincide con &ldquo;{consulta}&rdquo;.
        </p>
      )}

      {estado === "listo" && resultados.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resultados.map((ave) => (
            <TarjetaAve
              key={ave.id}
              ave={ave}
              onSeleccionar={onSeleccionarAve}
            />
          ))}
        </div>
      )}
    </div>
  );
};