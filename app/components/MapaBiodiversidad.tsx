"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

interface Observacion {
  id: number;
  latitude: number;
  longitude: number;
  place_guess?: string;
  observed_on_string?: string;
}

interface MapaBiodiversidadProps {
  aveId?: number | string | null;
  onSeleccionarEspecie?: (nombre: string) => void;
}

function ControllerMapa({
  coordenadas,
  useMap,
}: {
  coordenadas: [number, number];
  useMap: () => any;
}) {
  const map = useMap();
  useEffect(() => {
    if (map && coordenadas) {
      map.setView(coordenadas, 6, { animate: true });
    }
  }, [coordenadas, map]);
  return null;
}

export default function MapaBiodiversidad({
  aveId,
  onSeleccionarEspecie,
}: MapaBiodiversidadProps) {
  const [isClient, setIsClient] = useState(false);
  const [Components, setComponents] = useState<any>(null);
  const [puntosAvistamiento, setPuntosAvistamiento] = useState<Observacion[]>([]);
  const [cargandoUbicaciones, setCargandoUbicaciones] = useState(false);

  useEffect(() => {
    setIsClient(true);
    Promise.all([import("react-leaflet"), import("leaflet")]).then(
      ([reactLeaflet, L]) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        setComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
          useMap: reactLeaflet.useMap,
        });
      }
    );
  }, []);

  useEffect(() => {
    if (!aveId) return;

    async function obtenerAvistamientos() {
      setCargandoUbicaciones(true);
      try {
        const res = await fetch(
          `https://api.inaturalist.org/v1/observations?taxon_id=${aveId}&geo=true&per_page=15`
        );
        if (res.ok) {
          const data = await res.json();
          const puntos = data.results
            .filter((obs: any) => obs.geojson?.coordinates)
            .map((obs: any) => ({
              id: obs.id,
              latitude: obs.geojson.coordinates[1],
              longitude: obs.geojson.coordinates[0],
              place_guess: obs.place_guess || "Ubicación observada",
              observed_on_string: obs.observed_on_string || "Reciente",
            }));
          setPuntosAvistamiento(puntos);
        }
      } catch (error) {
        console.error("Error al obtener las observaciones del mapa:", error);
      } finally {
        setCargandoUbicaciones(false);
      }
    }

    obtenerAvistamientos();
  }, [aveId]);

  if (!isClient || !Components) {
    return (
      <div className="w-full h-[360px] bg-emerald-950/5 rounded-2xl border border-emerald-900/10 flex items-center justify-center text-emerald-900/50 text-sm font-sans mb-8">
        Cargando mapa interactivo de biodiversidad...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, useMap } = Components;

  const centroActual: [number, number] =
    puntosAvistamiento.length > 0
      ? [puntosAvistamiento[0].latitude, puntosAvistamiento[0].longitude]
      : [19.0433, -98.1983];

  return (
    <div className="w-full h-[360px] rounded-2xl overflow-hidden border border-emerald-900/15 shadow-sm mb-8 z-0 relative">
      {cargandoUbicaciones && (
        <div className="absolute top-3 right-3 z-10 bg-emerald-950 text-white text-xs px-3 py-1.5 rounded-full shadow-md font-sans flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Obteniendo mapa de hábitat...</span>
        </div>
      )}

      <MapContainer
        center={centroActual}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <ControllerMapa coordenadas={centroActual} useMap={useMap} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {puntosAvistamiento.map((punto) => (
          <Marker key={punto.id} position={[punto.latitude, punto.longitude]}>
            <Popup>
              <div className="p-1 text-center font-sans">
                <p className="font-bold text-emerald-950 text-xs">
                  {punto.place_guess}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Observado: {punto.observed_on_string}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}