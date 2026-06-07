"use client";

import React, { useState } from "react";
import { DetailedNetworkMap } from "@/components/DetailedNetworkMap";
import { Navbar } from "@/components/Navbar";

const stepsDetail = [
  {
    idx: 0,
    num: "01",
    title: "Proceso observado",
    metric: "Trazabilidad del 100% de micro-procesos",
    desc: "Mapeamos en vivo la realidad diaria del usuario final en su puesto de trabajo real. En lugar de basarnos en manuales teóricos o informes de gerencia, nos sentamos físicamente con los empleados para entender cómo interactúan con el software operativo, registrando cada desviación, frustración, copia manual de información y retraso de sistema en tiempo real. Esta observación sobre el terreno ('Gemba Walk') nos permite capturar ineficiencias que de otro modo pasarían desapercibidas.",
    deliverables: [
      "Diagrama de flujos de trabajo real del puesto observado ('As-Is').",
      "Diario detallado de fricción y cuellos de botella en la experiencia del empleado.",
      "Inventario detallado de silos de información y software redundante."
    ],
    kpi: "Eficiencia en Auditoría"
  },
  {
    idx: 1,
    num: "02",
    title: "Fricción medida",
    metric: "Reducción promedio de 15 clics por proceso",
    desc: "Identificamos y cuantificamos clics innecesarios, datos duplicados y tiempos muertos. La fricción operativa no es una sospecha, es una métrica dura que medimos con exactitud: contabilizamos el número de pantallas que el agente debe abrir, los segundos perdidos en rellenar campos manuales redundantes en formularios mal diseñados y las tareas repetitivas de copiar y pegar entre herramientas que no se comunican. Esto nos permite traducir el desperdicio operativo a costes económicos directos para el negocio.",
    deliverables: [
      "Informe técnico de fricciones de usuario y desperdicio en tiempos y movimientos.",
      "Mapa de calor de ineficiencia por departamento y puesto operativo.",
      "Análisis de impacto financiero detallado del tiempo de trabajo desperdiciado."
    ],
    kpi: "Cuantificación de Fricción"
  },
  {
    idx: 2,
    num: "03",
    title: "Solución priorizada",
    metric: "Validación matemática del ROI antes de programar",
    desc: "Ordenamos mejoras prácticas de alto impacto basadas en retorno de inversión (ROI) operativo. No todas las ineficiencias merecen el mismo esfuerzo de desarrollo. Priorizamos las soluciones mediante una matriz de impacto/esfuerzo, estructurando un plan incremental ('Quick Wins' en primer lugar). Esto permite que la PYME comience a recuperar tiempo y eficiencia desde las primeras semanas de trabajo sin realizar inversiones sobredimensionadas ni detener la facturación ordinaria del negocio.",
    deliverables: [
      "Matriz de impacto, viabilidad y esfuerzo para la priorización lógica de soluciones.",
      "Plan de ruta tecnológica incremental detallado paso a paso.",
      "Plan matemático estructurado de estimación de retorno de inversión (ROI)."
    ],
    kpi: "Garantía de Retorno"
  },
  {
    idx: 3,
    num: "04",
    title: "Datos integrados",
    metric: "Sincronización automatizada de datos en 1 segundo",
    desc: "Conectamos CRM, bases de datos y flujos de información para asegurar trazabilidad total. Eliminamos por completo la necesidad de actualizar bases de datos independientes de forma manual. Sincronizamos las bases de datos de inventario, facturación y clientes de modo que la información introducida en cualquier punto de entrada del negocio se propague de manera instantánea a toda la organización, evitando errores humanos de transcripción y garantizando un único punto de verdad.",
    deliverables: [
      "Diseño de arquitectura unificada de bases de datos e integraciones de sistemas.",
      "Desarrollo e integración de conectores API estables y robustos.",
      "Panel automatizado de alertas de inconsistencia de datos e incidencias."
    ],
    kpi: "Integridad de Datos"
  },
  {
    idx: 4,
    num: "05",
    title: "Canales conectados",
    metric: "Aumento del 25% en la tasa de cierre comercial",
    desc: "Sincronizamos telefonía, CRM y scoring de leads mediante soluciones lógicas. Hacemos que cada interacción con el cliente cuente: integramos tu centralita VoIP para que el historial completo del cliente aparezca automáticamente en la pantalla de tus agentes antes de descolgar. Además, programamos motores de scoring algorítmico que analizan el comportamiento digital de cada cliente potencial, asignándolos automáticamente a los comerciales más capacitados y listos para cerrar la venta.",
    deliverables: [
      "Integración nativa de telefonía VoIP empresarial con fichas de cliente dinámicas.",
      "Motor de scoring de calidad de leads adaptado a las dinámicas de tu sector.",
      "Reglas inteligentes de asignación y enrutamiento automático de leads."
    ],
    kpi: "Efectividad de Canal"
  },
  {
    idx: 5,
    num: "06",
    title: "Impacto validado",
    metric: "Eficiencia contrastada codo con codo",
    desc: "Medimos la mejora de eficiencia codo con codo con quienes operan el software a diario. Nuestra labor no acaba cuando entregamos las integraciones técnicas. Volvemos al puesto de trabajo de tus operarios y nos sentamos con ellos a medir el antes y el después real. Certificamos la caída en el número de clics, la eliminación de transcripciones manuales y el aumento en el volumen de llamadas y conversiones exitosas, asegurando que el personal domine y adopte la tecnología felizmente.",
    deliverables: [
      "Auditoría técnica de tiempos y movimientos final ('To-Be') para contrastar el éxito.",
      "Certificado formal de impacto real y cumplimiento de metas de ROI.",
      "Guías operativas ultra-prácticas y sesiones personalizadas de adopción."
    ],
    kpi: "Certificación Operativa"
  }
];

export default function MapaOperativoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
  };

  const currentIdx = hoveredStep !== null ? hoveredStep : activeStep;
  const step = stepsDetail[currentIdx];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#132339]">
      <Navbar />

      {/* Dynamic inline styles for active hito detail panel fade-in-up transition */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUpDetail {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up-detail {
          animation: fadeInUpDetail 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Main Grid Content */}
      <main id="mapa-content" className="flex-1 bg-gradient-to-br from-[#132339]/90 via-[#0f1d30]/90 to-[#0a1421]/90 backdrop-blur-sm text-white py-12 px-5 sm:px-6 lg:px-8">
        <div className="relative z-20 mx-auto max-w-7xl">
          {/* Header Title Section */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c2410c]/30 bg-[#c2410c]/10 text-xs font-semibold tracking-wider text-[#f8fafc] uppercase mb-4">
              <span className="h-2 w-2 rounded-full bg-[#c2410c] animate-pulse" />
              Metodología detallada
            </span>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight text-white">
              Inmersiona <span className="text-[#c2410c]">Mapa Operativo</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              Una vista a pantalla completa del flujo de procesos de Inmersiona sobre la geografía de España. Explora en detalle cada una de nuestras 6 fases operativas sobre el terreno y descubre cómo mejoramos la rentabilidad de las PYMEs.
            </p>
          </div>

          {/* Interactive Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:items-start">
            {/* Sticky Left: Massive Spain Map (Symmetrically aligned and matching details card height) */}
            <div className="lg:sticky lg:top-28">
              <DetailedNetworkMap
                activeStep={activeStep}
                setActiveStep={handleStepClick}
                hoveredStep={hoveredStep}
                setHoveredStep={setHoveredStep}
              />
            </div>

            {/* Right: Focused single active step detailed card with premium fadeInUp animation (Fixed height to prevent oscillation) */}
            <div className="flex flex-col justify-start">
              <article
                key={step.idx}
                className="relative rounded-2xl border border-[#c2410c]/25 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 shadow-2xl shadow-black/40 animate-fade-in-up-detail flex flex-col justify-between h-[610px] sm:h-[570px] lg:h-[570px] overflow-hidden"
              >
                {/* Header status and KPI badge */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c2410c]/10 border border-[#c2410c]/30 text-base font-black text-[#c2410c]">
                      {step.num}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">Metodología</span>
                      <span className="text-sm font-black text-white uppercase tracking-wider leading-none">Fase Operativa</span>
                    </div>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase bg-[#1a4066]/30 border border-[#1a4066]/50 text-slate-300">
                    {step.kpi}
                  </span>
                </div>

                {/* Main description */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Deliverables list */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase mb-3.5 flex items-center gap-2">
                    <svg className="h-4.5 w-4.5 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Entregables Concretos de esta Fase
                  </h3>
                  <ul className="space-y-2.5">
                    {step.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-[#c2410c] shrink-0 mt-1.5 shadow-[0_0_6px_#c2410c]" />
                        <span className="leading-relaxed">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlighted KPI block */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#c2410c]/12 to-[#c2410c]/6 border border-[#c2410c]/25 flex items-center gap-4 shadow-inner">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c2410c] shadow-lg shadow-[#c2410c]/25">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#c2410c] uppercase tracking-widest block font-black leading-none mb-1">Métrica Clave Esperada</span>
                    <span className="text-sm sm:text-base font-extrabold text-white block">{step.metric}</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
