export const EstadisticasComunidad = () => {
  const estadisticas = [
    {
      id: 1,
      numero: "+10,500",
      etiqueta: "Especies Registradas",
      descripcion: "Aves catalogadas con taxonomía oficial",
    },
    {
      id: 2,
      numero: "+1.8 M",
      etiqueta: "Observaciones Validadas",
      descripcion: "Confirmadas con Grado de Investigación",
    },
    {
      id: 3,
      numero: "+50,000",
      etiqueta: "Naturalistas Activos",
      descripcion: "Ciudadanos y científicos colaborando",
    },
    {
      id: 4,
      numero: "135",
      etiqueta: "Regiones y Hábitats",
      descripcion: "Puntos de monitoreo en biodiversidad",
    },
  ];

  return (
    <section id="comunidad" className="bg-emerald-950 text-white py-20 px-6 scroll-mt-16 border-t border-emerald-900/40">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado de la sección */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold">
            Ciencia Ciudadana en Tiempo Real
          </span>
          <h2 className="font-display text-3xl sm:text-4xl mt-2 text-emerald-50">
            Impacto Global de la Comunidad
          </h2>
          <p className="text-emerald-200/70 text-sm mt-3 leading-relaxed font-sans">
            Cada avistamiento registrado contribuye a mapear patrones de migración, diversidad taxonómica y conservación de hábitats en todo el mundo.
          </p>
        </div>

        {/* Tarjetas de Estadísticas Sin Emojis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {estadisticas.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-emerald-900/30 border border-emerald-800/40 rounded-2xl p-6 text-center hover:border-emerald-500/40 hover:bg-emerald-900/50 transition-all duration-300 group relative"
            >
              <div className="text-xs font-mono text-emerald-400/60 mb-2">
                0{index + 1}
              </div>
              <p className="font-display text-3xl sm:text-4xl font-bold text-emerald-300 tracking-tight">
                {stat.numero}
              </p>
              <p className="font-sans text-sm font-medium text-emerald-100 mt-2">
                {stat.etiqueta}
              </p>
              <p className="font-sans text-xs text-emerald-200/50 mt-2 leading-snug">
                {stat.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Banner de Invitación / Llamado a la Acción */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-900 rounded-2xl p-8 sm:p-10 border border-emerald-700/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-display text-2xl font-medium text-white">
              ¿Quieres aportar tus avistamientos?
            </h3>
            <p className="text-emerald-200 text-sm mt-2 font-sans leading-relaxed">
              Únete a la red global de iNaturalist. Sube fotografías de las aves que encuentres y permite que la comunidad valide tus hallazgos.
            </p>
          </div>
          <a
            href="https://www.inaturalist.org/observations/upload"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-950 hover:bg-emerald-100 font-semibold px-6 py-3 rounded-xl transition-all shadow-md text-sm whitespace-nowrap cursor-pointer hover:scale-105"
          >
            Aportar una Observación
          </a>
        </div>
      </div>
    </section>
  );
};