const auditPoints = [
  {
    title: "Datos y Analítica (ETLs/IA)",
    desc: "Optimización de flujos de datos (ETLs), modelado de datos, informes, analítica, scoring de negocio e Inteligencia Artificial práctica.",
    icon: (
      <svg className="h-6 w-6 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Canales e Integraciones",
    desc: "Integraciones de sistemas de CRM, Call Center, soluciones de telefonía, y automatización y carga eficiente de leads comerciales.",
    icon: (
      <svg className="h-6 w-6 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    title: "Campañas y Operación IT",
    desc: "Alineación de sistemas de marketing y acciones comerciales, resolviendo cuellos de botella mediante flujos y automatizaciones in-house.",
    icon: (
      <svg className="h-6 w-6 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    )
  }
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="bg-white px-5 py-20 text-[#132339] sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <article className="lg:sticky lg:top-28">
          <p className="text-sm font-bold tracking-wider text-[#c2410c] uppercase">
            Manifiesto
          </p>
          <h2 id="manifesto-title" className="mt-4 text-3xl font-extrabold sm:text-4xl leading-tight tracking-tight text-[#132339]">
            No necesitas contratar más software. Necesitas simplificar la relación entre tu equipo y tu IT.
          </h2>
          <div className="mt-6 h-1 w-12 bg-[#c2410c] rounded" />
        </article>
        
        <article className="rounded-2xl border border-[#dee6ed] bg-[#f8fafc] p-6 sm:p-10 shadow-sm transition duration-300 hover:border-[#667b99]/30">
          <p className="text-base sm:text-lg leading-8 text-[#667b99]">
            Inmersiona no audita procesos desde la comodidad de una teoría abstracta. Con un sólido background como **analista de negocio en procesos de IT**, mi experiencia abarca el diseño e implementación de sistemas críticos en el terreno: CRM, Call Center, integraciones de telefonía, automatización de cargas de leads, flujos de ETLs, modelado de datos, analítica corporativa e Inteligencia Artificial aplicada.
          </p>
          <p className="mt-6 text-base leading-7 text-[#667b99]">
            Nuestra convicción es absoluta: si trabajas **codo con codo con el personal que opera el software a diario**, puedes destapar los problemas reales que ningún reporte directivo es capaz de revelar. Lo mejor de todo es que el 90% de estas ineficiencias se resuelven habilitando y guiando a tu **propio equipo técnico in-house**, sin necesidad de costosas consultoras externas ni licencias de software adicionales.
          </p>
          
          <ul className="mt-10 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            {auditPoints.map((point) => (
              <li
                key={point.title}
                className="flex flex-col gap-4 rounded-xl border border-[#dee6ed] bg-white p-5 shadow-sm transition duration-200 hover:border-[#c2410c]/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c2410c]/5 border border-[#c2410c]/10">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#132339]">{point.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#667b99]">{point.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
