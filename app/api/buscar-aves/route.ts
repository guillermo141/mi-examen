import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json([]);
  }

  try {
    // Pedimos a iNaturalist strictly solo especies de aves (taxon_id=3)
    const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
      q
    )}&taxon_id=3&rank=species&per_page=12&locale=es`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json([]);
    }

    const data = await res.json();

    // Mapeamos únicamente especies que contengan foto válida
    const aves = (data.results || [])
      .filter((item: any) => item.default_photo?.medium_url)
      .map((item: any) => ({
        id: item.id,
        nombreComun: item.preferred_common_name || item.name,
        nombreCientifico: item.name,
        foto: item.default_photo?.medium_url,
      }));

    return NextResponse.json(aves);
  } catch (error) {
    console.error("Error en API buscar-aves:", error);
    return NextResponse.json([], { status: 500 });
  }
}