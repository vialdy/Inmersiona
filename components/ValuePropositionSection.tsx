"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

const callouts = [
  "Menos trabajo manual, menos procesos duplicados y decisiones con trazabilidad.",
  "Menos clicks innecesarios, más automatización real y equipos enfocados en el negocio.",
  "Menos software costoso, más integración de sistemas y control absoluto de tus datos.",
  "Menos informes teóricos, más soluciones sobre el terreno y retorno de inversión medible."
];

export function ValuePropositionSection() {
  const [currentCalloutIndex, setCurrentCalloutIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Rotate callout phrases every 5.5 seconds (5000ms pause + 500ms transition time)
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentCalloutIndex((prev) => (prev + 1) % callouts.length);
        setFade(true);
      }, 500);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="value-proposition"
      aria-labelledby="value-title"
      className="bg-white border-y border-[#dee6ed] px-5 py-20 text-[#132339] sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Self-contained styling block for unique micro-animations and staggered fade-in */}
      <style>{`
        @keyframes clock-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-clock-spin {
          animation: clock-spin 4s linear infinite;
        }

        @keyframes gear-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-gear-spin {
          animation: gear-spin 8s linear infinite;
        }

        @keyframes user-bounce-1 {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-2px); opacity: 1; }
        }
        @keyframes user-bounce-2 {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
        @keyframes user-bounce-3 {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-2.5px); opacity: 1; }
        }
        .animate-user-1 {
          animation: user-bounce-1 1.8s ease-in-out infinite;
        }
        .animate-user-2 {
          animation: user-bounce-2 1.8s ease-in-out infinite 0.3s;
        }
        .animate-user-3 {
          animation: user-bounce-3 1.8s ease-in-out infinite 0.6s;
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-1 {
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 100ms forwards;
        }
        .animate-fade-2 {
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 250ms forwards;
        }
        .animate-fade-3 {
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 400ms forwards;
        }
      `}</style>

      <div className="relative z-20 mx-auto w-full max-w-6xl">
        {/* Balanced lg:items-center layout to ensure perfect vertical alignment on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center items-start">
          
          {/* Left Column: Consultant Profile Card (Clean, static, perfectly proportioned) */}
          <div className="col-span-12 lg:col-span-5">
            <ScrollReveal variant="slide-right">
              <div className="relative overflow-hidden rounded-2xl border border-[#dee6ed] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                
                {/* Profile Image Wrap */}
                <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[340px] xl:h-[380px] overflow-hidden rounded-xl bg-slate-100 border border-[#dee6ed]/40">
                  <Image
                    src="/consultant.png"
                    alt="Ignacio de la Torre, Socio de Operaciones en Inmersiona"
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </div>

                {/* Consultant Info & Quote */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#132339] tracking-tight">
                        Ignacio de la Torre
                      </h3>
                      <p className="text-sm font-semibold text-[#667b99] mt-0.5">
                        Socio de Operaciones en Inmersiona
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c2410c]/10 text-[10px] font-black tracking-wider text-[#c2410c] uppercase">
                      Garantía Gemba
                    </span>
                  </div>

                  <div className="mt-5 border-t border-[#dee6ed]/60 pt-5 relative">
                    {/* Styled quote icon */}
                    <svg className="absolute -top-1.5 -left-1.5 h-8 w-8 text-[#c2410c]/5 pointer-events-none transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.988zm-12 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-sm leading-relaxed text-[#132339] font-medium italic relative z-10">
                      &quot;No enviamos informes teóricos desde oficinas lejanas. Nos sentamos físicamente con tus empleados en sus puestos reales, registramos cada ineficiencia en sus pantallas y garantizamos el retorno de la inversión sobre el terreno.&quot;
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5 pt-4 border-t border-[#dee6ed]/40">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <svg className="h-4 w-4 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                      </svg>
                      15+ años optimizando operaciones
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <svg className="h-4 w-4 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                      </svg>
                      Acompañamiento 100% presencial
                    </span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Title, Callout and Benefits List with Balanced Spacing */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Header */}
            <ScrollReveal variant="slide-left" delay={50}>
              <article className="mb-6">
                <span className="inline-flex px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-[#1a4066]/10 text-[#132339] mb-4">
                  Valor Añadido
                </span>
                <h2
                  id="value-title"
                  className="text-3xl font-extrabold sm:text-4xl tracking-tight leading-tight text-[#132339]"
                >
                  Garantías reales: Impacto directo medido en el puesto de trabajo
                </h2>
                <div className="mt-4 h-1 w-12 bg-[#c2410c] rounded" />
              </article>
            </ScrollReveal>

            {/* Accent Callout Block with a smooth text rotation and min-height to prevent layout shifts */}
            <ScrollReveal variant="slide-left" delay={150}>
              <div className="relative overflow-hidden rounded-2xl border-l-4 border-[#c2410c] bg-[#c2410c]/5 p-6 sm:p-8 border-y border-r border-[#dee6ed]/60 transition-all duration-300 hover:shadow-sm mb-6 min-h-[110px] sm:min-h-[96px] flex items-center">
                <div className="absolute top-0 right-0 h-32 w-32 bg-[radial-gradient(circle_at_100%_0%,rgba(194,65,12,0.06),transparent_70%)] pointer-events-none" />
                <p
                  className={`text-lg sm:text-xl font-extrabold tracking-tight text-[#132339] leading-relaxed relative z-10 transition-opacity duration-500 ${
                    fade ? "opacity-100" : "opacity-0"
                  }`}
                >
                  &quot;{callouts[currentCalloutIndex]}&quot;
                </p>
              </div>
            </ScrollReveal>

            {/* Vertical Stack of Benefits with Beautiful Contrast and Guaranteed Staggered Animation */}
            <div className="flex flex-col gap-5">
              
              {/* Card 1: Diagnóstico Rápido */}
              <ScrollReveal variant="slide-up" delay={100}>
                <article
                  className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-[#dee6ed] bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:bg-white hover:border-[#c2410c]/30 hover:scale-[1.01] hover:shadow-md"
                >
                  {/* Icon Block with Hover Micro-Animation */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c2410c]/10 border border-[#c2410c]/20">
                    <svg className="h-5 w-5 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2.5} />
                      <path
                        className="origin-[12px_12px] group-hover:animate-clock-spin"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 8v4l3 3"
                      />
                    </svg>
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 flex flex-col justify-between gap-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#132339] leading-snug">
                        Diagnóstico Rápido
                      </h3>
                      <span className="inline-flex w-fit items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c2410c]/10 text-[10px] font-extrabold tracking-wider text-[#c2410c] uppercase">
                        10 días
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#667b99]">
                      para entregar un diagnóstico accionable. Plazo cerrado para auditar tus sistemas y entregarte una hoja de ruta práctica.
                    </p>
                  </div>
                </article>
              </ScrollReveal>

              {/* Card 2: Revisado con Usuarios */}
              <ScrollReveal variant="slide-up" delay={200}>
                <article
                  className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-[#dee6ed] bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:bg-white hover:border-[#c2410c]/30 hover:scale-[1.01] hover:shadow-md"
                >
                  {/* Icon Block with Hover Micro-Animation */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c2410c]/10 border border-[#c2410c]/20">
                    <svg className="h-5 w-5 text-[#c2410c]" fill="none" viewBox="0 0 24 24">
                      {/* Left user */}
                      <g className="group-hover:animate-user-1 origin-bottom">
                        <circle cx="6" cy="10" r="2" stroke="currentColor" strokeWidth={2.5} />
                        <path d="M2 18a3 3 0 015.356-1.857" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
                      </g>
                      {/* Right user */}
                      <g className="group-hover:animate-user-3 origin-bottom">
                        <circle cx="18" cy="10" r="2" stroke="currentColor" strokeWidth={2.5} />
                        <path d="M22 18a3 3 0 00-5.356-1.857" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
                      </g>
                      {/* Center user */}
                      <g className="group-hover:animate-user-2 origin-bottom">
                        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth={2.5} />
                        <path d="M7 18a5 5 0 0110 0" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
                      </g>
                      {/* Bottom line */}
                      <path d="M2 20h20" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 flex flex-col justify-between gap-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#132339] leading-snug">
                        Revisado con Usuarios
                      </h3>
                      <span className="inline-flex w-fit items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c2410c]/10 text-[10px] font-extrabold tracking-wider text-[#c2410c] uppercase">
                        IT operativo
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#667b99]">
                      procesos, datos e integraciones revisados con usuarios. Analizamos tus flujos codo con codo en el puesto de trabajo real.
                    </p>
                  </div>
                </article>
              </ScrollReveal>

              {/* Card 3: Soluciones Aterrizadas */}
              <ScrollReveal variant="slide-up" delay={300}>
                <article
                  className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-[#dee6ed] bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:bg-white hover:border-[#c2410c]/30 hover:scale-[1.01] hover:shadow-md"
                >
                  {/* Icon Block with Hover Micro-Animation */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c2410c]/10 border border-[#c2410c]/20">
                    <svg className="h-5 w-5 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <g className="origin-[12px_12px] group-hover:animate-gear-spin">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2.5} />
                      </g>
                    </svg>
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 flex flex-col justify-between gap-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#132339] leading-snug">
                        Soluciones Aterrizadas
                      </h3>
                      <span className="inline-flex w-fit items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c2410c]/10 text-[10px] font-extrabold tracking-wider text-[#c2410c] uppercase">
                        Equipo inhouse
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#667b99]">
                      soluciones aterrizadas antes de comprar más tecnología. Habilitamos y guiamos a tu equipo para resolver el problema sin licencias añadidas.
                    </p>
                  </div>
                </article>
              </ScrollReveal>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
