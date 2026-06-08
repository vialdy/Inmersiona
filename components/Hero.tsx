"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { InteractiveNetworkMap } from "./InteractiveNetworkMap";

const SESSION_KEY = "inmersiona_hero_seen";

export function Hero() {
  const [showVideo, setShowVideo] = useState<boolean | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const hasTriggered = useRef(false);
  const [wasVideoPlayed, setWasVideoPlayed] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVideoFinished(true);
      setShowVideo(false);
    } else {
      setShowVideo(true);
      setWasVideoPlayed(true);
    }
  }, []);

  const handleReveal = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVideoFinished(true);
      setShowVideo(false);
      setIsTransitioning(false);
    }, 800);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setTimeout(handleReveal, 300);
  }, [handleReveal]);

  useEffect(() => {
    if (showVideo && !videoFinished) {
      const fallback = setTimeout(handleReveal, 20000);
      return () => clearTimeout(fallback);
    }
  }, [showVideo, videoFinished, handleReveal]);

  // Server-side rendering (SSR) and client hydration state
  if (showVideo === null) {
    return (
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-gradient-to-br from-[#132339] via-[#0f1d30] to-[#0a1421] px-5 py-20 text-white sm:px-6 sm:py-28 lg:px-8 min-h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(194,65,12,0.08),transparent_45%)]" />
      </section>
    );
  }

  const isVideoPhaseActive = showVideo && !videoFinished;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-[#132339] via-[#0f1d30] to-[#0a1421] px-5 py-20 text-white sm:px-6 sm:py-28 lg:px-8 min-h-screen flex items-center justify-center"
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(194,65,12,0.08),transparent_45%)]" />

      {/* Unified grid layout (text + map) */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {/* LEFT — text content */}
        <article
          className={`max-w-3xl transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVideoPhaseActive
              ? "-translate-x-[120px] opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100 pointer-events-auto"
          } ${!showVideo && !wasVideoPlayed ? "animate-fade-in-up" : ""}`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c2410c]/30 bg-[#c2410c]/10 text-xs font-semibold tracking-wider text-[#f8fafc] uppercase mb-6">
            <span className="h-2 w-2 rounded-full bg-[#c2410c] animate-pulse" />
            Consultoría IT y procesos para PYMEs
          </div>

          <h1
            id="hero-title"
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1] sm:leading-[1.05]"
          >
            Mejoramos procesos, datos, sistemas e integraciones{" "}
            <span className="text-[#c2410c] block sm:inline">
              trabajando codo con codo
            </span>{" "}
            con quienes los usan cada día.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl font-medium">
            Soluciones reales, medibles y sin humo tecnológico.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#c2410c] border border-[#c2410c] px-6 text-sm font-bold text-white transition-all duration-150 hover:bg-[#a1350a] hover:border-[#a1350a] shadow-lg shadow-[#c2410c]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#132339]"
            >
              Solicitar diagnóstico gratuito
            </a>
            <a
              href="/mapa-operativo"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#132339]"
            >
              Ver mapa operativo
            </a>
          </div>
        </article>

        {/* RIGHT — map */}
        <div
          className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVideoPhaseActive
              ? "translate-x-[120px] opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100 pointer-events-auto"
          } ${!showVideo && !wasVideoPlayed ? "animate-fade-in-up-delay-2" : ""}`}
        >
          <InteractiveNetworkMap />
        </div>
      </div>

      {/* CENTERED VIDEO CARD OVERLAY */}
      {isVideoPhaseActive && (
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8 md:p-10 lg:p-12 transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isTransitioning
              ? "clip-path-close opacity-0 pointer-events-none"
              : "clip-path-open opacity-100 pointer-events-auto"
          }`}
        >
          <div className="w-full max-w-7xl aspect-[9/16] md:aspect-video rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-2xl shadow-black/35 overflow-hidden relative flex flex-col">
            {/* Video */}
            <div className="relative flex-1 min-h-0 w-full h-full">
              <video
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source
                  src="/Table_lights_up_title_graphs_202606061729.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Floating skip button overlayed on the video */}
              <button
                type="button"
                onClick={handleReveal}
                className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-30 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-black/60 hover:text-white hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] shadow-lg shadow-black/20"
                aria-label="Saltar intro"
              >
                Saltar intro
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bottom transition gradient to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
    </section>
  );
}
