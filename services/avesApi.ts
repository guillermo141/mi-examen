import { notFound } from "next/navigation";
import type { AveResumen, AveDetalle } from "./tipos";

// API pública y gratuita usada en este proyecto: iNaturalist
// No requiere autenticación. Documentación: https://api.inaturalist.org/v1/docs
const BASE_URL = "https://api.inaturalist.org/v1";

// Tipo mínimo de lo que responde iNaturalist para no usar "any" en todos lados
interface TaxonApi {
  id: number;
  name: string;
  preferred_common_name?: string;
  iconic_taxon_name?: string;
  rank?: string;
  default_photo?: { medium_url?: string } | null;
  ancestors?: { name: string; rank: string }[];
  conservation_status?: { status_name?: string } | null;
  wikipedia_summary?: string | null;
  wikipedia_url?: string | null;
}

async function fetchConTiempoLimite(
  url: string,
  msTiempoLimite = 8000,
): Promise<Response> {
  const controlador = new AbortController();
  const idAviso = setTimeout(() => controlador.abort(), msTiempoLimite);
  try {
    return await fetch(url, { signal: controlador.signal });
  } finally {
    clearTimeout(idAviso);
  }
}

function mapearResumen(taxon: TaxonApi): AveResumen {
  return {
    id: taxon.id,
    nombreComun: taxon.preferred_common_name ?? null,
    nombreCientifico: taxon.name,
    foto: taxon.default_photo?.medium_url ?? null,
  };
}

// -----------------------------------------------------------------------
// Búsqueda de aves por nombre. Usada por la ruta /api/buscar-aves.
// Se filtran los resultados para quedarnos solo con la clase Aves,
// ya que la API busca en todo el árbol de la vida.
// -----------------------------------------------------------------------
export async function buscarAves(consulta: string): Promise<AveResumen[]> {
  const url = `${BASE_URL}/taxa?q=${encodeURIComponent(consulta)}&per_page=24&locale=es`;
  const respuesta = await fetchConTiempoLimite(url);

  if (!respuesta.ok) {
    throw new Error("La API de iNaturalist respondió con un error.");
  }

  const json = await respuesta.json();
  const taxones: TaxonApi[] = json.results ?? [];

  return taxones
    .filter((taxon) => taxon.iconic_taxon_name === "Aves")
    .map(mapearResumen);
}

// -----------------------------------------------------------------------
// Detalle de un ave por su id de iNaturalist.
// -----------------------------------------------------------------------
export async function obtenerAvePorId(id: string): Promise<AveDetalle> {
  const respuesta = await fetchConTiempoLimite(
    `${BASE_URL}/taxa/${id}?locale=es`,
  );

  if (respuesta.status === 404) {
    notFound();
  }

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la información de esta ave.");
  }

  const json = await respuesta.json();
  const taxon: TaxonApi | undefined = json.results?.[0];

  if (!taxon) {
    notFound();
  }

  const buscarAncestroPorRango = (rango: string) =>
    taxon.ancestors?.find((a) => a.rank === rango)?.name ?? null;

  return {
    ...mapearResumen(taxon),
    reino: buscarAncestroPorRango("kingdom"),
    clase: buscarAncestroPorRango("class"),
    orden: buscarAncestroPorRango("order"),
    familia: buscarAncestroPorRango("family"),
    genero: buscarAncestroPorRango("genus"),
    estadoConservacion: taxon.conservation_status?.status_name ?? null,
    resumenWikipedia: taxon.wikipedia_summary
      ? taxon.wikipedia_summary.replace(/<[^>]+>/g, "") // quita etiquetas HTML
      : null,
    wikipediaUrl: taxon.wikipedia_url ?? null,
  };
}