import Image from "next/image";
import Link from "next/link";

interface TaxonDetalle {
  id: number;
  name: string;
  preferred_common_name?: string;
  wikipedia_summary?: string;
  default_photo?: {
    medium_url: string;
  };
  ancestors?: { id: number; name: string; rank: string }[];
}

async function obtenerDetalle(id: string): Promise<TaxonDetalle | null> {
  try {
    const res = await fetch(`https://api.inaturalist.org/v1/taxa/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.[0] || null;
  } catch {
    return null;
  }
}

export default async function PaginaAveDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // En Next.js 15, params DEBE ser esperado con await
  const { id } = await params;
  const ave = await obtenerDetalle(id);

  const nombreComun = ave?.preferred_common_name || ave?.name || `Especie (${id})`;
  const nombreCientifico = ave?.name || "Taxón catalogado";
  const foto =
    ave?.default_photo?.medium_url ||
    "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?q=80&w=800&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-[#f2f5ed] text-emerald-950 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-950 mb-6 transition-colors"
        >
          ← Volver al inicio
        </Link>

        <div className="bg-white rounded-2xl p-8 border border-emerald-900/10 shadow-xs mb-8">
          <span className="text-xs font-mono text-emerald-700 uppercase tracking-widest font-semibold">
            Ficha de Especie
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-emerald-950 mt-1">
            {nombreComun}
          </h1>
          <p className="text-base italic font-sans text-emerald-800/80 mt-1">
            {nombreCientifico}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="aspect-[16/10] bg-emerald-950/5 relative rounded-2xl overflow-hidden border border-emerald-900/10 shadow-sm">
              <Image
                src={foto}
                alt={nombreComun}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-xs">
              <h2 className="font-display text-xl text-emerald-950 mb-3">
                Información del espécimen
              </h2>
              {ave?.wikipedia_summary ? (
                <div
                  className="text-sm text-emerald-900/80 leading-relaxed font-sans space-y-2"
                  dangerouslySetInnerHTML={{ __html: ave.wikipedia_summary }}
                />
              ) : (
                <p className="text-sm text-emerald-900/70 font-sans leading-relaxed">
                  Esta especie forma parte del registro taxonómico global de aves en iNaturalist.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-md">
              <h3 className="font-display text-lg text-emerald-100 mb-4 pb-2 border-b border-emerald-800/60">
                Taxonomía
              </h3>
              <ul className="space-y-3 font-sans text-xs">
                {ave?.ancestors?.map((anc) => (
                  <li key={anc.id} className="flex justify-between items-center text-emerald-200/80">
                    <span className="capitalize text-emerald-400/80 font-mono">{anc.rank}:</span>
                    <span className="font-medium italic text-emerald-100">{anc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}