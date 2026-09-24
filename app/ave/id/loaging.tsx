export default function Cargando() {
  return (
    <div className="pt-10 animate-pulse">
      <div className="h-4 w-32 bg-[var(--color-superficie)] rounded mb-4" />
      <div className="aspect-[16/9] rounded-lg bg-[var(--color-superficie)]" />
      <div className="h-8 w-2/3 bg-[var(--color-superficie)] rounded mt-6" />
      <div className="h-4 w-1/3 bg-[var(--color-superficie)] rounded mt-3" />
    </div>
  );
}