"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";

/* ───────────────────────────────────────────────────────
   DATA MODEL
   ─────────────────────────────────────────────────────── */

interface Phase {
  num: string;
  tag: string;
  title: string;
  body: string;
  deliverables: string[];
}

const gembaPhases: Phase[] = [
  {
    num: "01",
    tag: "PLANIFICACIÓN",
    title: "Definición de Objetivos IT",
    body: "Acordamos el flujo crítico de IT, los canales implicados (telefonía, CRM, ETLs) y la métrica de eficiencia antes de auditar los sistemas en vivo. Establecemos el alcance exacto de la inmersión y definimos las condiciones de éxito medibles.",
    deliverables: [
      "Documento de alcance y objetivos de la auditoría operativa.",
      "Identificación de los flujos críticos a observar en planta.",
      "Métricas de referencia (baseline) para medir el antes y después.",
    ],
  },
  {
    num: "02",
    tag: "ALINEACIÓN",
    title: "Comunicación al Equipo",
    body: "Explicamos al equipo que no buscamos evaluar su rendimiento personal, sino entender la fricción y los bloqueos en sus herramientas de trabajo del día a día. Generamos confianza para que compartan sus frustraciones reales.",
    deliverables: [
      "Sesión de presentación y alineación con el equipo operativo.",
      "Protocolo de observación no intrusiva validado con RRHH.",
      "Canal de comunicación abierto para feedback anónimo.",
    ],
  },
  {
    num: "03",
    tag: "INMERSIÓN",
    title: "Shadowing con el Usuario",
    body: "Trabajamos codo con codo con el usuario final para mapear clics innecesarios, re-escritura manual de datos e integraciones costosas que nadie ha cuestionado. Documentamos cada micro-proceso tal y como ocurre en la realidad.",
    deliverables: [
      "Diagrama de flujos de trabajo real del puesto observado ('As-Is').",
      "Diario detallado de fricción y cuellos de botella.",
      "Inventario de silos de información y software redundante.",
    ],
  },
  {
    num: "04",
    tag: "RESOLUCIÓN",
    title: "Causa Raíz & Solución In-House",
    body: "Identificamos las mejoras viables y diseñamos la solución de forma que pueda ser resuelta directamente por tu propio equipo de IT in-house. Priorizamos Quick Wins de alto impacto que generan retorno desde la primera semana.",
    deliverables: [
      "Informe de causa raíz con priorización impacto/esfuerzo.",
      "Plan de ruta tecnológica incremental paso a paso.",
      "Estimación de ROI por cada mejora propuesta.",
    ],
  },
];

const shadowingPhases: Phase[] = [
  {
    num: "01",
    tag: "ACOMPAÑAMIENTO",
    title: "Inmersión en la Jornada Real",
    body: "Nos sentamos físicamente con tus empleados durante su jornada laboral diaria completa. No auditamos desde una sala de juntas: vivimos su realidad operativa para entender cómo interactúan realmente con el software y los procesos.",
    deliverables: [
      "Registro cronológico completo de la jornada laboral observada.",
      "Mapa de interacciones empleado-sistema a lo largo del día.",
      "Identificación de momentos críticos de frustración y bloqueo.",
    ],
  },
  {
    num: "02",
    tag: "DETECCIÓN",
    title: "Brechas entre Teoría y Práctica",
    body: "Revelamos la diferencia real entre lo que la dirección cree que ocurre y lo que realmente pasa en el puesto de trabajo. Esta brecha es donde se esconden las ineficiencias más costosas e invisibles de tu organización.",
    deliverables: [
      "Informe de brechas: percepción directiva vs. realidad operativa.",
      "Mapa de calor de ineficiencia por departamento y puesto.",
      "Catálogo de workarounds no documentados del equipo.",
    ],
  },
  {
    num: "03",
    tag: "CUANTIFICACIÓN",
    title: "Fricción Medida en Métricas Duras",
    body: "Traducimos las ineficiencias observadas a números concretos: clics innecesarios, minutos perdidos por proceso, coste económico del desperdicio operativo. La fricción deja de ser una sospecha y se convierte en una métrica accionable.",
    deliverables: [
      "Informe técnico de fricciones con impacto económico calculado.",
      "Análisis de tiempo perdido por empleado/día en tareas redundantes.",
      "Benchmark de eficiencia vs. estándar del sector.",
    ],
  },
  {
    num: "04",
    tag: "ACCIÓN",
    title: "Plan de Mejora Priorizado por ROI",
    body: "Estructuramos un roadmap de mejoras ordenado por retorno de inversión e impacto inmediato. No todas las ineficiencias merecen el mismo esfuerzo: priorizamos los Quick Wins que tu equipo puede implementar desde la primera semana.",
    deliverables: [
      "Matriz de impacto/esfuerzo con priorización de soluciones.",
      "Plan de implementación incremental con hitos semanales.",
      "Estimación matemática de ROI por cada mejora propuesta.",
    ],
  },
];

type Track = "gemba" | "shadowing";
type Direction = "forward" | "backward";

/* ───────────────────────────────────────────────────────
   COMPONENT
   ─────────────────────────────────────────────────────── */

export function Methodology() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [direction, setDirection] = useState<Direction>("forward");
  const panelRef = useRef<HTMLDivElement>(null);

  const phases = selectedTrack === "gemba" ? gembaPhases : shadowingPhases;
  const totalSteps = phases.length + 1; // phases + CTA
  const isOnCTA = currentPhase >= phases.length;

  // Focus the panel whenever currentPhase changes
  useEffect(() => {
    if (selectedTrack !== null && panelRef.current) {
      panelRef.current.focus({ preventScroll: true });
    }
  }, [currentPhase, selectedTrack]);

  const goNext = useCallback(() => {
    if (currentPhase < phases.length) {
      setDirection("forward");
      setCurrentPhase((p) => p + 1);
    }
  }, [currentPhase, phases.length]);

  const goPrev = useCallback(() => {
    if (currentPhase > 0) {
      setDirection("backward");
      setCurrentPhase((p) => p - 1);
    }
  }, [currentPhase]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setDirection(step > currentPhase ? "forward" : "backward");
        setCurrentPhase(step);
      }
    },
    [currentPhase, totalSteps]
  );

  const selectTrack = useCallback((track: Track) => {
    setSelectedTrack(track);
    setCurrentPhase(0);
    setDirection("forward");
  }, []);

  const resetTrack = useCallback(() => {
    setSelectedTrack(null);
    setCurrentPhase(0);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  const animationClass =
    direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <section
      id="methodology"
      aria-labelledby="methodology-title"
      className="bg-[#f8fafc]/70 backdrop-blur-sm border-y border-[#dee6ed] px-5 py-20 text-[#132339] sm:px-6 sm:py-24 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <ScrollReveal variant="slide-up">
          <article className="max-w-3xl">
            <p className="text-sm font-bold tracking-wider text-[#c2410c] uppercase">
              Metodología
            </p>
            <h2
              id="methodology-title"
              className="mt-4 text-3xl font-extrabold sm:text-4xl tracking-tight leading-tight"
            >
              Elige tu proceso de inmersión operativa.
            </h2>
            <p className="mt-3 text-base text-[#667b99] leading-relaxed max-w-2xl">
              Dos metodologías contrastadas para descubrir y resolver ineficiencias.
              Avanza paso a paso y descubre cuál encaja mejor con tu operación.
            </p>
            <div className="mt-6 h-1 w-12 bg-[#c2410c] rounded mb-10" />
          </article>
        </ScrollReveal>

        {/* ─── TRACK SELECTOR ─── */}
        {selectedTrack === null && (
          <div className="grid gap-6 sm:grid-cols-2 overflow-x-hidden p-2 -m-2">
            {/* Gemba Walk Card */}
            <ScrollReveal variant="slide-from-left-full" duration={900} className="w-full">
              <button
                type="button"
                onClick={() => selectTrack("gemba")}
                className="group relative w-full rounded-2xl border border-[#dee6ed] bg-white p-7 sm:p-8 text-left shadow-sm transition-all duration-300 hover:border-[#c2410c]/40 hover:shadow-lg hover:shadow-[#c2410c]/5 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] cursor-pointer"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c2410c]/10 mb-5 transition-colors duration-300 group-hover:bg-[#c2410c]/15">
                  <svg className="h-7 w-7 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#132339] mb-2">
                  Gemba Walk
                </h3>
                <p className="text-sm text-[#667b99] leading-relaxed mb-6">
                  Observación directa en el lugar real de trabajo. Caminamos tus flujos operativos donde se crea el valor, no desde una sala de juntas.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#c2410c] group-hover:gap-3 transition-all duration-300">
                  Explorar proceso
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </ScrollReveal>

            {/* Job Shadowing Card */}
            <ScrollReveal variant="slide-from-right-full" duration={900} className="w-full">
              <button
                type="button"
                onClick={() => selectTrack("shadowing")}
                className="group relative w-full rounded-2xl border border-[#dee6ed] bg-white p-7 sm:p-8 text-left shadow-sm transition-all duration-300 hover:border-[#c2410c]/40 hover:shadow-lg hover:shadow-[#c2410c]/5 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] cursor-pointer"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#132339]/8 mb-5 transition-colors duration-300 group-hover:bg-[#132339]/12">
                  <svg className="h-7 w-7 text-[#132339]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#132339] mb-2">
                  Job Shadowing
                </h3>
                <p className="text-sm text-[#667b99] leading-relaxed mb-6">
                  Acompañamiento completo en la jornada laboral diaria. Revelamos la brecha entre la teoría corporativa y la práctica real del puesto.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#132339] group-hover:gap-3 transition-all duration-300">
                  Explorar proceso
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </ScrollReveal>
          </div>
        )}

        {/* ─── PIPELINE VIEW ─── */}
        {selectedTrack !== null && (
          <div className="animate-scale-in">
            {/* Back to selector */}
            <button
              type="button"
              onClick={resetTrack}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#667b99] hover:text-[#132339] transition-colors duration-200 mb-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] rounded-lg px-2 py-1 -ml-2"
            >
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Cambiar metodología
            </button>

            {/* Track title badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${selectedTrack === "gemba" ? "bg-[#c2410c]/10" : "bg-[#132339]/8"}`}>
                {selectedTrack === "gemba" ? (
                  <svg className="h-5 w-5 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-[#132339]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-[#667b99] uppercase tracking-widest">Proceso activo</p>
                <h3 className="text-lg font-extrabold text-[#132339]">
                  {selectedTrack === "gemba" ? "Gemba Walk" : "Job Shadowing"}
                </h3>
              </div>
            </div>

            {/* ─── PROGRESS BAR ─── */}
            <div className="mb-10 overflow-x-auto py-8 -my-8 no-scrollbar">
              <div
                role="tablist"
                aria-label="Fases del proceso"
                className="flex items-center px-4 min-w-max"
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                {Array.from({ length: totalSteps }).map((_, idx) => {
                  const isActive = idx === currentPhase;
                  const isCompleted = idx < currentPhase;
                  const isCTA = idx === phases.length;
                  const isLast = idx === totalSteps - 1;

                  return (
                    <div key={idx} className="flex items-center flex-shrink-0">
                      {/* Node */}
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="phase-panel"
                        aria-label={isCTA ? "Solicitar diagnóstico" : `Fase ${idx + 1}: ${phases[idx]?.title}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => goToStep(idx)}
                        className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-xs font-extrabold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 cursor-pointer ${
                          isActive
                            ? "bg-[#c2410c] text-white shadow-lg shadow-[#c2410c]/30 scale-110"
                            : isCompleted && !isCTA
                            ? "bg-transparent text-[#c2410c] hover:scale-125"
                            : isCompleted
                            ? "bg-[#c2410c]/15 text-[#c2410c] hover:bg-[#c2410c]/25"
                            : "bg-[#dee6ed] text-[#667b99] hover:bg-[#d0d8e2]"
                        }`}
                      >
                        {isCTA ? (
                          isCompleted || isActive ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          )
                        ) : isCompleted ? (
                          <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12 L20.66 7 A10 10 0 1 0 20.66 17 Z" />
                          </svg>
                        ) : (
                          phases[idx]?.num
                        )}

                        {/* Active pulse ring */}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full border-2 border-[#c2410c]/40 animate-ping" />
                        )}
                      </button>

                      {/* Connector line */}
                      {!isLast && (
                        <div
                          className={`h-[2px] w-8 sm:w-12 lg:w-16 transition-colors duration-500 ${
                            idx < currentPhase ? "bg-[#c2410c]/30" : "bg-[#dee6ed]"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── PHASE CONTENT PANEL ─── */}
            <div
              ref={panelRef}
              id="phase-panel"
              role="tabpanel"
              aria-live="polite"
              aria-atomic="true"
              tabIndex={-1}
              className="outline-none"
            >
              {!isOnCTA ? (
                /* Regular phase card */
                <article
                  key={`${selectedTrack}-${currentPhase}`}
                  className={`rounded-2xl border border-[#dee6ed] bg-white p-6 sm:p-8 lg:p-10 shadow-sm ${animationClass}`}
                >
                  {/* Phase header */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                      selectedTrack === "gemba"
                        ? "bg-[#c2410c]/10 text-[#c2410c]"
                        : "bg-[#132339]/8 text-[#132339]/70"
                    }`}>
                      {phases[currentPhase].tag}
                    </span>
                    <span className="text-xs font-bold text-[#667b99]">
                      Fase {currentPhase + 1} de {phases.length}
                    </span>
                  </div>

                  {/* Title & body */}
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#132339] leading-tight mb-4">
                    {phases[currentPhase].title}
                  </h4>
                  <p className="text-sm sm:text-base text-[#667b99] leading-relaxed mb-8 max-w-3xl">
                    {phases[currentPhase].body}
                  </p>

                  {/* Deliverables */}
                  <div className="border-t border-[#dee6ed] pt-6">
                    <h5 className="text-xs font-bold text-[#132339] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Entregables de esta fase
                    </h5>
                    <ul className="space-y-3">
                      {phases[currentPhase].deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex gap-3 items-start text-sm text-[#667b99]">
                          <span className="h-2 w-2 rounded-full bg-[#c2410c] shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#dee6ed]">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={currentPhase === 0}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#667b99] hover:text-[#132339] hover:bg-[#132339]/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#667b99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg>
                      Anterior
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#132339] text-sm font-bold text-white hover:bg-[#0f1d30] transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2"
                    >
                      Siguiente
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </article>
              ) : (
                /* CTA Final Panel */
                <article
                  key={`${selectedTrack}-cta`}
                  className={`rounded-2xl bg-gradient-to-br from-[#132339] via-[#0f1d30] to-[#0a1421] p-8 sm:p-10 lg:p-12 text-center ${animationClass}`}
                >
                  {/* Success icon */}
                  <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#c2410c]/15 border-2 border-[#c2410c]/30">
                      <svg className="h-10 w-10 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                    Has completado el recorrido de{" "}
                    <span className="text-[#c2410c]">
                      {selectedTrack === "gemba" ? "Gemba Walk" : "Job Shadowing"}
                    </span>
                  </h4>
                  <p className="text-base text-slate-300 leading-relaxed max-w-xl mx-auto mb-8">
                    {selectedTrack === "gemba"
                      ? "Ahora ya conoces cómo observamos tus flujos de trabajo en el terreno. Solicita tu diagnóstico gratuito y te mostramos exactamente dónde están las ineficiencias más costosas de tu operación."
                      : "Ahora ya sabes cómo revelamos la brecha entre la teoría directiva y la práctica real. Solicita tu diagnóstico gratuito y descubramos juntos las oportunidades ocultas de tu negocio."}
                  </p>

                  {/* CTA Button */}
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#c2410c] text-white text-base font-bold shadow-lg shadow-[#c2410c]/25 hover:bg-[#a1350a] hover:shadow-xl hover:shadow-[#c2410c]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#132339]"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Solicitar diagnóstico gratuito
                  </a>

                  {/* Secondary actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] rounded-lg px-3 py-1.5"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg>
                      Volver al proceso
                    </button>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                    <button
                      type="button"
                      onClick={resetTrack}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] rounded-lg px-3 py-1.5"
                    >
                      Explorar otra metodología
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </article>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
