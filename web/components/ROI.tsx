"use client";

import { useState, useCallback } from "react";
import { ScrollReveal } from "./ScrollReveal";

const roiRows = [
  {
    metric: "Problema inicial",
    caseOne: "Fuga de leads por retrasos de 24h en cargas manuales e integraciones inconsistentes.",
    caseTwo: "Agentes de Call Center perdiendo 2 minutos por llamada buscando datos en sistemas fragmentados.",
  },
  {
    metric: "Acción en el terreno",
    caseOne: "Optimización de la ETL de carga, limpieza de campos innecesarios en CRM y automatización in-house.",
    caseTwo: "Integración directa de la telefonía corporativa con el CRM, automatizando la ficha del cliente en pantalla.",
  },
  {
    metric: "Tiempo de proceso",
    caseOne: "De 24 horas de espera manual a asignación de leads en tiempo real (< 5 min).",
    caseTwo: "Reducción del tiempo medio de operación en 90 segundos por llamada.",
  },
  {
    metric: "Ahorro / Facturación recuperada",
    caseOne: "Incremento del 18% en conversión comercial y eliminación de cargas manuales.",
    caseTwo: "Equivalente a recuperar 120 horas de atención al cliente al mes sin nuevas contrataciones.",
  },
  {
    metric: "ROI Estimado (12 meses)",
    caseOne: "320% de retorno de la inversión",
    caseTwo: "280% de retorno de la inversión",
  },
];

export function ROI() {
  // Navigation states between video phase (Phase 1) and calculator phase (Phase 2)
  const [showCalculator, setShowCalculator] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Calculator state
  const [hoursLost, setHoursLost] = useState<number>(120);
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [investment, setInvestment] = useState<number>(8500);

  // Calculations (Assuming a conservative 80% process efficiency gain from optimization)
  const hoursRecoveredPerYear = Math.round(hoursLost * 12 * 0.8);
  const annualSavings = Math.round(hoursLost * 12 * hourlyRate * 0.8);
  
  // Prevent division by zero
  const netRoi = investment > 0 ? Math.round(((annualSavings - investment) / investment) * 100) : 0;

  // Format currency helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val);
  };

  const handleShowCalculator = useCallback(() => {
    setAnimKey((prev) => prev + 1);
    setShowCalculator(true);
  }, []);

  const handleShowVideo = useCallback(() => {
    setAnimKey((prev) => prev + 1);
    setShowCalculator(false);
  }, []);

  return (
    <section
      id="roi"
      aria-labelledby="roi-title"
      className="relative overflow-hidden bg-[#132339]"
    >
      {/* ═══════════════════════════════════════════════════════════════
          PHASE 1 — Cinematic Video Intro
          ═══════════════════════════════════════════════════════════════ */}
      {!showCalculator && (
        <ScrollReveal variant="fade">
          <div
            key={`video-${animKey}`}
            className="relative flex min-h-screen items-center justify-center animate-fade-in-scale"
          >
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/silueta.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#132339]/90 via-[#132339]/60 to-[#132339]/40" />

            {/* Content overlay */}
            <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-6 lg:px-8">
              {/* Badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-[#c2410c]/30 bg-[#c2410c]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#f8fafc]">
                <span className="h-2 w-2 rounded-full bg-[#c2410c] animate-pulse" />
                ROI (Retorno de Inversión)
              </div>

              {/* Title */}
              <h2
                id="roi-title"
                className="animate-fade-in-up-delay-1 mt-8 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                El retorno de la consultoría se mide en{" "}
                <span className="text-[#c2410c]">ahorros tangibles</span> y tiempo recuperado.
              </h2>

              {/* Subtitle */}
              <p className="animate-fade-in-up-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Diseñamos intervenciones con impacto financiero directo. Utiliza nuestra calculadora interactiva para estimar el potencial de optimización en tu organización.
              </p>

              {/* CTA Button — Hero-level prominence */}
              <div className="animate-fade-in-up-delay-3 mt-12 flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={handleShowCalculator}
                  className="group relative inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border-2 border-[#c2410c] bg-[#c2410c] px-10 py-4 text-base font-extrabold tracking-wide text-white shadow-[0_0_30px_rgba(194,65,12,0.4)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#a1350a] hover:border-[#a1350a] hover:shadow-[0_0_50px_rgba(194,65,12,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#132339] sm:text-lg sm:px-12 sm:py-5"
                >
                  <span className="absolute inset-0 rounded-2xl border-2 border-[#c2410c]/50 animate-ping pointer-events-none" />
                  
                  {/* Calculator icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" />
                  </svg>

                  Calcula tu ahorro

                  {/* Animated arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </button>

                <span className="text-xs font-medium text-slate-400/80 tracking-wide">Estimación gratuita e instantánea</span>
              </div>

              {/* Scroll hint */}
              <div className="animate-fade-in-up-delay-3 mt-16 flex flex-col items-center gap-2 text-xs text-slate-400">
                <span>o sigue navegando</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 animate-bounce">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PHASE 2 — Interactive Calculator + Comparison Table
          ═══════════════════════════════════════════════════════════════ */}
      {showCalculator && (
        <div className="relative bg-[#132339] px-5 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(194,65,12,0.06),transparent_40%)]" />
          
          <div className="relative z-20 mx-auto w-full max-w-6xl">
            <ScrollReveal variant="slide-up">
              <div className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <article className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#c2410c]">
                    ROI (Retorno de Inversión)
                  </p>
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                    El retorno de la consultoría se mide en ahorros tangibles y tiempo recuperado.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[#667b99]">
                    Diseñamos intervenciones con impacto financiero directo. Utiliza la calculadora interactiva inferior para estimar el potencial de optimización en tu organización basándote en datos reales.
                  </p>
                  <div className="mt-6 mb-12 h-1 w-12 rounded bg-[#c2410c]" />
                </article>

                <button
                  type="button"
                  onClick={handleShowVideo}
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-150 hover:border-[#c2410c]/40 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#132339]"
                  aria-label="Volver a ver el vídeo introductorio"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Volver al vídeo
                </button>
              </div>
            </ScrollReveal>

            {/* Dynamic ROI Calculator Widget */}
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] mb-16">
              <ScrollReveal variant="slide-right" delay={100}>
                <article className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 h-full">
                  <h3 className="text-lg font-bold text-white mb-6">Calculadora Interactiva de Optimización</h3>
                  
                  <div className="space-y-6">
                    {/* Slider 1: Hours Lost */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <label htmlFor="hours-lost-range">Horas perdidas al mes en procesos de IT ineficientes (ETLs, telefonía, leads...)</label>
                        <span className="text-[#c2410c]">{hoursLost} h</span>
                      </div>
                      <input
                        id="hours-lost-range"
                        type="range"
                        min="10"
                        max="500"
                        step="5"
                        value={hoursLost}
                        onChange={(e) => setHoursLost(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
                      />
                      <span className="text-[10px] text-[#667b99] block mt-1">Tiempo invertido en reprocesar datos, aprobaciones cruzadas o tareas manuales redundantes.</span>
                    </div>

                    {/* Slider 2: Hourly Rate */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <label htmlFor="hourly-rate-range">Coste medio de la hora de personal</label>
                        <span className="text-[#c2410c]">{hourlyRate} €/h</span>
                      </div>
                      <input
                        id="hourly-rate-range"
                        type="range"
                        min="15"
                        max="100"
                        step="1"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
                      />
                      <span className="text-[10px] text-[#667b99] block mt-1">Coste empresa promedio por hora (incluye seguridad social e impuestos).</span>
                    </div>

                    {/* Slider 3: Investment */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <label htmlFor="investment-range">Presupuesto / Inversión de optimización estimado</label>
                        <span className="text-[#c2410c]">{formatCurrency(investment)}</span>
                      </div>
                      <input
                        id="investment-range"
                        type="range"
                        min="2000"
                        max="50000"
                        step="500"
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
                      />
                      <span className="text-[10px] text-[#667b99] block mt-1">Presupuesto aproximado destinado a diagnosticar y simplificar tus operaciones.</span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>

              {/* Calculator Results Dashboard */}
              <ScrollReveal variant="slide-left" delay={200}>
                <article className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-black/25 h-full">
                  <div>
                    <h3 className="text-base font-bold text-white border-b border-white/10 pb-4 mb-6">Ahorro Estimado Proyectado (12 meses)</h3>
                    
                    <div className="grid gap-6">
                      <div>
                        <p className="text-xs text-[#667b99] uppercase tracking-wider font-semibold">Ahorro anual directo</p>
                        <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1">{formatCurrency(annualSavings)}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                        <div>
                          <p className="text-[10px] text-[#667b99] uppercase font-bold">Tiempo recuperado</p>
                          <p className="text-lg font-bold text-white mt-1">{hoursRecoveredPerYear} h / año</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#667b99] uppercase font-bold">Retorno neto (ROI)</p>
                          <p className={`text-lg font-extrabold mt-1 ${netRoi > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                            {netRoi > 0 ? `+${netRoi}%` : `${netRoi}%`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-xl bg-white/[0.03] border border-white/5 p-4 text-xs text-[#667b99] leading-relaxed">
                    <strong className="text-white">Fórmula de cálculo transparente:</strong> Ahorro estimado de 80% sobre horas de ineficiencia actuales x coste empresa x 12 meses.
                    <code className="block mt-2 font-mono text-[10px] text-orange-300">
                      ROI = ((Ahorro Anual - Inversión) / Inversión) x 100
                    </code>
                  </div>
                </article>
              </ScrollReveal>
            </div>

            {/* Minimalist ROI Table Comparative */}
            <ScrollReveal variant="slide-up" delay={300}>
              <article
                aria-labelledby="roi-table-title"
                className="overflow-hidden rounded-2xl border border-white/10 bg-white text-slate-900"
              >
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                  <h3 id="roi-table-title" className="text-lg font-bold text-[#132339]">
                    Casos Reales de Impacto Medible
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Comparativa de auditorías previas realizadas en España</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full border-collapse text-left text-sm">
                    <caption className="sr-only">
                      Comparación de rendimiento entre optimización de facturación y saneamiento comercial CRM
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100">
                        <th scope="col" className="w-1/4 px-6 py-4 font-extrabold text-[#132339]">
                          Métrica de Rendimiento
                        </th>
                        <th scope="col" className="w-3/8 px-6 py-4 font-extrabold text-[#132339]">
                          Caso 1: Optimización de Leads e Integraciones (ETL)
                        </th>
                        <th scope="col" className="w-3/8 px-6 py-4 font-extrabold text-[#132339]">
                          Caso 2: Integración Telefonía y CRM (Call Center)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {roiRows.map((row) => (
                        <tr
                          key={row.metric}
                          className="transition hover:bg-slate-50"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 align-top font-bold text-[#132339] text-xs bg-slate-50/50"
                          >
                            {row.metric}
                          </th>
                          <td className="px-6 py-4 align-top leading-6 text-slate-600 text-xs">
                            {row.caseOne}
                          </td>
                          <td className="px-6 py-4 align-top leading-6 text-slate-600 text-xs">
                            {row.caseTwo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </div>
      )}
    </section>
  );
}
