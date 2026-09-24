import Image from "next/image";
import type { AveResumen } from "@/services/tipos";

export const TarjetaAve = ({
  ave,
  onSeleccionar,
}: {
  ave: AveResumen;
  onSeleccionar?: (id: number | string) => void;
}) => {
  const nombreMostrar = ave.nombreComun ?? ave.nombreCientifico;

  return (
    <div
      onClick={() => onSeleccionar && onSeleccionar(ave.id)}
      className="group block rounded-2xl overflow-hidden border border-emerald-900/15 bg-white hover:border-emerald-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="aspect-[4/3] bg-emerald-950/5 relative overflow-hidden">
        {ave.foto ? (
          <Image
            src={ave.foto}
            alt={nombreMostrar}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-emerald-900/40 text-xs font-sans">
            Sin fotografía disponible
          </div>
        )}
      </div>

      <div className="p-4 bg-emerald-950 text-white min-h-[88px] flex flex-col justify-center">
        <p className="font-display text-base sm:text-lg font-medium leading-snug tracking-tight text-emerald-50 group-hover:text-emerald-300 transition-colors line-clamp-1">
          {nombreMostrar}
        </p>
        <p className="text-xs italic font-sans text-emerald-200/70 mt-1 tracking-wide line-clamp-1">
          {ave.nombreCientifico}
        </p>
      </div>
    </div>
  );
};