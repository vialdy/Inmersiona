"use client";

import React from "react";

// Forward-only progressive wave coordinates flowing from West (Sevilla) to East Coast (Barcelona)
// Generously distributed over a larger map of Spain (900x720) matching actual geographic positioning.
const steps = [
  {
    num: "01",
    title: "Proceso observado",
    x: 240,
    y: 510
  },
  {
    num: "02",
    title: "Fricción medida",
    x: 315,
    y: 578
  },
  {
    num: "03",
    title: "Solución priorizada",
    x: 395,
    y: 430
  },
  {
    num: "04",
    title: "Datos integrados",
    x: 465,
    y: 330
  },
  {
    num: "05",
    title: "Canales conectados",
    x: 585,
    y: 225
  },
  {
    num: "06",
    title: "Impacto validado",
    x: 720,
    y: 215
  }
];

// Highly stylized highway segments connecting nodes with perfect C1-tangent continuity.
const segments = [
  { d: "M 240,510 C 270,532 292.5,578 315,578", targetIdx: 1 },
  { d: "M 315,578 C 350,578 360,475 395,430", targetIdx: 2 },
  { d: "M 395,430 C 430,385 435,350 465,330", targetIdx: 3 },
  { d: "M 465,330 C 510,300 540,230 585,225", targetIdx: 4 },
  { d: "M 585,225 C 630,220 690,215 720,215", targetIdx: 5 }
];

interface DetailedNetworkMapProps {
  activeStep: number;
  setActiveStep: (idx: number) => void;
  hoveredStep: number | null;
  setHoveredStep: (idx: number | null) => void;
}

export function DetailedNetworkMap({
  activeStep,
  setActiveStep,
  hoveredStep,
  setHoveredStep
}: DetailedNetworkMapProps) {
  const currentIdx = hoveredStep !== null ? hoveredStep : activeStep;

  return (
    <div className="relative w-full h-auto min-h-[300px] md:h-[570px] lg:h-[570px] flex flex-col justify-between items-center rounded-2xl border border-[#c2410c]/25 bg-white/[0.03] p-6 backdrop-blur-sm shadow-xl shadow-black/25">
      {/* Dynamic inline styles for active hito pulsing */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseActiveLarge {
          0% {
            transform: scale(0.95);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.4;
          }
        }
        .node-pulse-ring-large {
          transform-origin: center;
          animation: pulseActiveLarge 2.5s ease-in-out infinite;
        }
      `}} />

      <div className="hidden md:flex flex-1 w-full justify-center items-center min-h-0">
        <svg
          viewBox="0 100 900 540"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle glowing Spain outline PNG serving as dynamic background */}
          <image
            href="/mapa_espana.png?v=3"
            x="-15"
            y="-105"
            width="930"
            height="930"
            className="pointer-events-none"
            // eslint-disable-next-line react/forbid-dom-props
            style={{
              filter: "opacity(0.35) brightness(1.2)"
            }}
          />

          {/* 1. Background Inactive Road Base */}
          {segments.map((seg, idx) => (
            <g key={`base-seg-${idx}`}>
              <path
                d={seg.d}
                fill="none"
                stroke="#1a4066"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />
              <path
                d={seg.d}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8,9"
                opacity="0.3"
              />
            </g>
          ))}

          {/* 2. Static Active Illuminated Road Segments */}
          {segments.map((seg, idx) => {
            const isSegmentActive = currentIdx >= seg.targetIdx;
            return (
              <g
                key={`active-seg-${idx}`}
                className="transition-all duration-500 ease-out"
                // eslint-disable-next-line react/forbid-dom-props
                style={{ opacity: isSegmentActive ? 1 : 0 }}
              >
                {/* Glowing Asphalt Glow base */}
                <path
                  d={seg.d}
                  fill="none"
                  stroke="#c2410c"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.25"
                />
                {/* Glowing Core Edge */}
                <path
                  d={seg.d}
                  fill="none"
                  stroke="#c2410c"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 0 5px #c2410c)"
                  opacity="0.9"
                />
                {/* High Contrast Bright Center Dash Divider */}
                <path
                  d={seg.d}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8,9"
                  opacity="0.9"
                />
              </g>
            );
          })}

          {/* 3. Interactive Step Nodes */}
          {steps.map((step, idx) => {
            const isActive = idx === currentIdx;
            return (
              <g
                key={step.num}
                className="cursor-pointer group/node focus:outline-none"
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                tabIndex={0}
                aria-label={`Paso ${step.num}: ${step.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveStep(idx);
                  }
                }}
              >
                {/* Ping expander for active step */}
                {isActive && (
                  <circle
                    cx={step.x}
                    cy={step.y}
                    r="30"
                    fill="none"
                    stroke="#c2410c"
                    strokeWidth="2"
                    className="node-pulse-ring-large"
                    // eslint-disable-next-line react/forbid-dom-props
                    style={{ transformOrigin: `${step.x}px ${step.y}px` }}
                  />
                )}

                {/* Outer interactive hover zone */}
                <circle
                  cx={step.x}
                  cy={step.y}
                  r="27"
                  className="fill-transparent stroke-none cursor-pointer"
                />

                {/* Solid Point Circle (Radius 21, diameter 42) */}
                <circle
                  cx={step.x}
                  cy={step.y}
                  r="21"
                  className={`transition-all duration-300 ${
                    isActive
                      ? "fill-[#c2410c] stroke-white stroke-2 filter drop-shadow-[0_0_8px_#c2410c] scale-110"
                      : "fill-[#132339] stroke-white/40 stroke-2 group-hover/node:fill-[#1a4066] group-hover/node:stroke-white/80"
                  }`}
                  // eslint-disable-next-line react/forbid-dom-props
                  style={{ transformOrigin: `${step.x}px ${step.y}px` }}
                />

                {/* Step Number Centered inside Circle Node (16px) */}
                <text
                  x={step.x}
                  y={step.y + 6}
                  textAnchor="middle"
                  className="text-[16px] font-black fill-white select-none pointer-events-none"
                >
                  {step.num}
                </text>

                {/* Step Title label with rich backdrop capsule background for perfect legibility (16px font-base) */}
                <foreignObject
                  x={step.x - 100}
                  y={idx === 1 || idx === 5 ? step.y + 26 : step.y - 66}
                  width="200"
                  height="36"
                  className="pointer-events-none"
                >
                  <div className="flex items-center justify-center h-full w-full">
                    <div
                      className={`px-3 py-1 rounded-md border text-base font-extrabold tracking-wide transition-all duration-300 select-none ${
                        isActive
                          ? "bg-[#c2410c] border-[#c2410c] text-white shadow-lg shadow-[#c2410c]/20 scale-105"
                          : "bg-[#050b14]/90 backdrop-blur-sm border-white/15 text-white/90 group-hover/node:border-white/40 group-hover/node:text-white"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile Step Selector Grid (3 columns x 2 rows - Mobile Only) */}
      <div className="block md:hidden w-full mt-2 mb-4">
        <div className="grid grid-cols-3 gap-3">
          {steps.map((step, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] cursor-pointer ${
                  isActive
                    ? "bg-[#c2410c] border-[#c2410c] text-white shadow-lg shadow-[#c2410c]/25 scale-[1.03]"
                    : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20 active:scale-[0.97]"
                }`}
              >
                <span className="text-base font-black">{step.num}</span>
                <span className="text-[10px] font-bold mt-1 text-center line-clamp-1 leading-none">
                  {step.title.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Help tip inside the container as a clean unified footer */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 border-t border-white/5 pt-4 w-full mt-2 shrink-0">
        <svg className="h-4 w-4 text-[#c2410c] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="hidden md:inline">Haz clic o pasa el cursor sobre los hitos del mapa para detallar cada paso.</span>
        <span className="inline md:hidden">Toca una fase para ver su detalle en la tarjeta inferior.</span>
      </div>
    </div>
  );
}
