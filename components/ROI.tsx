"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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

interface ROIProps {
  hideCasesTable?: boolean;
}

export function ROI({ hideCasesTable = false }: ROIProps) {
  // Navigation states between video phase (Phase 1) and calculator phase (Phase 2)
  const [showCalculator, setShowCalculator] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Calculator state
  const [hoursLost, setHoursLost] = useState<number>(120);
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [investment, setInvestment] = useState<number>(8500);

  // Clamped values used strictly for calculations to prevent NaN or extreme UI issues
  const clampedHoursLost = isNaN(hoursLost) ? 0 : Math.max(0, hoursLost);
  const clampedHourlyRate = isNaN(hourlyRate) ? 0 : Math.max(0, hourlyRate);
  const clampedInvestment = isNaN(investment) ? 0 : Math.max(0, investment);

  // Calculations (Assuming a conservative 80% process efficiency gain from optimization)
  const hoursRecoveredPerYear = Math.round(clampedHoursLost * 12 * 0.8);
  const annualSavings = Math.round(clampedHoursLost * 12 * clampedHourlyRate * 0.8);
  
  // Prevent division by zero
  const netRoi = clampedInvestment > 0 ? Math.round(((annualSavings - clampedInvestment) / clampedInvestment) * 100) : 0;

  // Payback period text
  const paybackPeriodMonths = annualSavings > 0 
    ? (clampedInvestment / (annualSavings / 12) > 24 
        ? "> 24 meses" 
        : `${(clampedInvestment / (annualSavings / 12)).toFixed(1)} meses`)
    : "N/D";

  // Helper to adjust values with +/- buttons
  const adjustValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentVal: number,
    min: number,
    max: number,
    step: number,
    increment: boolean
  ) => {
    const safeVal = isNaN(currentVal) ? min : currentVal;
    const newVal = safeVal + (increment ? step : -step);
    if (newVal >= min && newVal <= max) {
      setter(newVal);
    }
  };

  // Preset loading handler
  const setPreset = (type: "pyme-pequena" | "pyme-mediana" | "pyme-grande") => {
    if (type === "pyme-pequena") {
      setHoursLost(80);
      setHourlyRate(22);
      setInvestment(4500);
    } else if (type === "pyme-mediana") {
      setHoursLost(180);
      setHourlyRate(28);
      setInvestment(9500);
    } else if (type === "pyme-grande") {
      setHoursLost(350);
      setHourlyRate(35);
      setInvestment(22000);
    }
  };

  // Get active preset name
  const getActivePreset = () => {
    if (hoursLost === 80 && hourlyRate === 22 && investment === 4500) return "pequena";
    if (hoursLost === 180 && hourlyRate === 28 && investment === 9500) return "mediana";
    if (hoursLost === 350 && hourlyRate === 35 && investment === 22000) return "grande";
    return null;
  };
  const activePreset = getActivePreset();

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
            className="relative flex w-full min-h-screen items-center justify-center animate-fade-in-scale"
          >
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center"
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

              {/* Scroll / Return hint depending on context */}
              {hideCasesTable ? (
                <div className="animate-fade-in-up-delay-3 mt-16 flex flex-col items-center gap-2 text-xs text-slate-400">
                  <span>o sigue navegando</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 animate-bounce">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <Link href="/" className="group animate-fade-in-up-delay-3 mt-16 flex flex-col items-center gap-2 text-xs text-slate-400 hover:text-[#c2410c] transition-colors duration-300">
                  <span>Volver al inicio</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1">
                    <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              )}
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
              <div className="animate-fade-in-up flex flex-col gap-8 mb-12 sm:mb-16 sm:flex-row sm:items-start sm:justify-between">
                <article className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#c2410c]">
                    ROI (Retorno de Inversión)
                  </p>
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                    El retorno de la consultoría se mide en ahorros tangibles y tiempo recuperado.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-slate-300">
                    Diseñamos intervenciones con impacto financiero directo. Utiliza la calculadora interactiva inferior para estimar el potencial de optimización en tu organización basándote en datos reales.
                  </p>
                  <div className="mt-6 h-1 w-12 rounded bg-[#c2410c]" />
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
                <article className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <h3 className="text-lg font-bold text-white">Calculadora de Optimización</h3>
                      <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Inputs</span>
                    </div>

                    {/* SUGGESTED PRESETS */}
                    <div className="mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                        Cargar perfil sugerido por tamaño:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreset("pyme-pequena")}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-150 cursor-pointer ${
                            activePreset === "pequena"
                              ? "border-[#c2410c] bg-[#c2410c]/25 text-white shadow-[0_0_15px_rgba(194,65,12,0.2)]"
                              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20"
                          }`}
                        >
                          Pyme Pequeña
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreset("pyme-mediana")}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-150 cursor-pointer ${
                            activePreset === "mediana"
                              ? "border-[#c2410c] bg-[#c2410c]/25 text-white shadow-[0_0_15px_rgba(194,65,12,0.2)]"
                              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20"
                          }`}
                        >
                          Pyme Mediana
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreset("pyme-grande")}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-150 cursor-pointer ${
                            activePreset === "grande"
                              ? "border-[#c2410c] bg-[#c2410c]/25 text-white shadow-[0_0_15px_rgba(194,65,12,0.2)]"
                              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20"
                          }`}
                        >
                          Pyme Grande
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Slider 1: Hours Lost */}
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
                          <label htmlFor="hours-lost-range" className="text-sm font-semibold text-slate-200">
                            Horas ineficientes al mes
                          </label>
                          <span className="text-[10px] text-slate-400">(Reprocesos, ETLs, tareas manuales)</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => adjustValue(setHoursLost, hoursLost, 10, 500, 5, false)}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-slate-200 font-bold transition-all cursor-pointer text-base"
                            aria-label="Disminuir horas"
                          >
                            -
                          </button>
                          <div className="flex-1 bg-black/45 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-1">
                            <input
                              type="number"
                              value={hoursLost || ""}
                              onChange={(e) => setHoursLost(Number(e.target.value))}
                              onBlur={() => {
                                if (!hoursLost || hoursLost < 10) setHoursLost(10);
                                else if (hoursLost > 500) setHoursLost(500);
                              }}
                              className="w-16 bg-transparent text-center font-mono text-lg font-extrabold text-[#c2410c] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-xs text-slate-400 font-sans font-medium">h / mes</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => adjustValue(setHoursLost, hoursLost, 10, 500, 5, true)}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-slate-200 font-bold transition-all cursor-pointer text-base"
                            aria-label="Aumentar horas"
                          >
                            +
                          </button>
                        </div>
                        <input
                          id="hours-lost-range"
                          type="range"
                          min="10"
                          max="500"
                          step="5"
                          value={hoursLost || ""}
                          onChange={(e) => setHoursLost(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
                        />
                      </div>

                      {/* Slider 2: Hourly Rate */}
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
                          <label htmlFor="hourly-rate-range" className="text-sm font-semibold text-slate-200">
                            Coste medio hora de personal
                          </label>
                          <span className="text-[10px] text-slate-400">(Coste empresa con impuestos y SS)</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => adjustValue(setHourlyRate, hourlyRate, 15, 100, 1, false)}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-slate-200 font-bold transition-all cursor-pointer text-base"
                            aria-label="Disminuir coste"
                          >
                            -
                          </button>
                          <div className="flex-1 bg-black/45 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-1">
                            <input
                              type="number"
                              value={hourlyRate || ""}
                              onChange={(e) => setHourlyRate(Number(e.target.value))}
                              onBlur={() => {
                                if (!hourlyRate || hourlyRate < 15) setHourlyRate(15);
                                else if (hourlyRate > 100) setHourlyRate(100);
                              }}
                              className="w-12 bg-transparent text-center font-mono text-lg font-extrabold text-[#c2410c] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-xs text-slate-400 font-sans font-medium">€ / h</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => adjustValue(setHourlyRate, hourlyRate, 15, 100, 1, true)}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-slate-200 font-bold transition-all cursor-pointer text-base"
                            aria-label="Aumentar coste"
                          >
                            +
                          </button>
                        </div>
                        <input
                          id="hourly-rate-range"
                          type="range"
                          min="15"
                          max="100"
                          step="1"
                          value={hourlyRate || ""}
                          onChange={(e) => setHourlyRate(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
                        />
                      </div>

                      {/* Slider 3: Investment */}
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
                          <label htmlFor="investment-range" className="text-sm font-semibold text-slate-200">
                            Presupuesto estimado de optimización
                          </label>
                          <span className="text-[10px] text-slate-400">(Inversión para simplificar procesos)</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => adjustValue(setInvestment, investment, 2000, 50000, 500, false)}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-slate-200 font-bold transition-all cursor-pointer text-base"
                            aria-label="Disminuir inversión"
                          >
                            -
                          </button>
                          <div className="flex-1 bg-black/45 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-1">
                            <input
                              type="number"
                              value={investment || ""}
                              onChange={(e) => setInvestment(Number(e.target.value))}
                              onBlur={() => {
                                if (!investment || investment < 2000) setInvestment(2000);
                                else if (investment > 50000) setInvestment(50000);
                              }}
                              className="w-20 bg-transparent text-center font-mono text-lg font-extrabold text-[#c2410c] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-xs text-slate-400 font-sans font-medium">€</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => adjustValue(setInvestment, investment, 2000, 50000, 500, true)}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-slate-200 font-bold transition-all cursor-pointer text-base"
                            aria-label="Aumentar inversión"
                          >
                            +
                          </button>
                        </div>
                        <input
                          id="investment-range"
                          type="range"
                          min="2000"
                          max="50000"
                          step="500"
                          value={investment || ""}
                          onChange={(e) => setInvestment(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>

              {/* Calculator Results Dashboard */}
              <ScrollReveal variant="slide-left" delay={200}>
                <article className="rounded-2xl border border-white/15 bg-[#0b1421] p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-black/25 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(194,65,12,0.03),transparent_50%)] pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <h3 className="text-base font-bold text-white">Resultados de Ahorro Proyectados</h3>
                      <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase font-bold animate-pulse">Live</span>
                    </div>
                    
                    <div className="grid gap-6">
                      <div className="bg-black/50 border border-[#c2410c]/25 rounded-2xl p-5 shadow-inner">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-1">Ahorro Neto Proyectado (12 meses)</p>
                        <p className="text-3xl sm:text-4xl font-extrabold text-[#c2410c] font-mono tracking-tight">
                          {formatCurrency(annualSavings - investment)}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2.5">
                          Ahorro bruto anual de <span className="text-white font-mono">{formatCurrency(annualSavings)}</span> menos inversión de <span className="text-white font-mono">{formatCurrency(investment)}</span>.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/5 pt-4">
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wide">Tiempo Libre</p>
                          <p className="text-sm sm:text-base font-extrabold text-white mt-1 font-mono">{hoursRecoveredPerYear}h<span className="text-[9px] text-slate-500 font-sans font-medium">/año</span></p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wide">Retorno (ROI)</p>
                          <p className={`text-sm sm:text-base font-extrabold mt-1 font-mono ${netRoi > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                            {netRoi > 0 ? `+${netRoi}%` : `${netRoi}%`}
                          </p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wide">Amortizado</p>
                          <p className="text-xs sm:text-sm font-extrabold text-white mt-1 font-mono leading-none py-1">
                            {paybackPeriodMonths}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white block mb-1">Cálculo de eficiencia conservador:</strong> 
                      Asume recuperar el 80% del tiempo de ineficiencia reportado en base a auditorías previas de optimización de procesos.
                      <code className="block mt-2 font-mono text-[10px] text-orange-400/90">
                        ROI Neto = ((Ahorro Anual - Inversión) / Inversión) x 100
                      </code>
                    </div>

                    {hideCasesTable && (
                      <div className="mt-6 flex justify-end">
                        <Link
                          href="/roi"
                          className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-150 hover:border-[#c2410c]/40 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#132339]"
                        >
                          Ver casos de éxito
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          >
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            </div>

            {/* Minimalist ROI Table Comparative */}
            {!hideCasesTable && (
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
            )}
          </div>
        </div>
      )}
    </section>
  );
}
