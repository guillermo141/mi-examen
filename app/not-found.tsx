import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f2f5ed] flex flex-col items-center justify-center px-6 text-center text-emerald-950">
      <div className="bg-white p-8 rounded-2xl border border-emerald-900/10 shadow-sm max-w-md w-full">
        <h1 className="font-display text-2xl font-medium text-emerald-950">
          Pagina no encontrada
        </h1>
        <p className="text-emerald-800/70 text-sm font-sans mt-2">
          La ruta a la que intentas acceder no existe en el catalogo.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all shadow-xs"
        >
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}