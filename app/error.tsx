"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">
        Algo salió mal
      </h1>
      <p className="mt-2 text-[var(--color-texto-tenue)]">
        No se pudo cargar la información. Puede ser un problema temporal de
        la API.
      </p>
      <button
        onClick={reset}
        className="mt-6 px-4 py-2 rounded border border-[var(--color-acento)] text-[var(--color-acento-suave)] hover:bg-[var(--color-superficie)] transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}