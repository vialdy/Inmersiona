"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function SplashIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggered = useRef(false);

  const handleDismiss = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setPhase("fading");
    // The CSS transition lasts 900ms, then we unmount
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 900);
  }, [onComplete]);

  const handleVideoEnd = useCallback(() => {
    // Small pause on the last frame before fading — feels intentional
    setTimeout(() => {
      handleDismiss();
    }, 400);
  }, [handleDismiss]);

  // Fallback: auto-dismiss if video never ends (stall/error)
  useEffect(() => {
    const fallback = setTimeout(handleDismiss, 15000);
    return () => clearTimeout(fallback);
  }, [handleDismiss]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-all ${
        phase === "fading"
          ? "opacity-0 scale-[1.02] duration-[900ms] ease-in"
          : "opacity-100 scale-100 duration-300 ease-out"
      }`}
      aria-label="Animación de carga de Inmersiona"
      role="status"
    >
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Fullscreen cinematic video */}
      <video
        ref={videoRef}
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

      {/* Subtle vignette for cinematic depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      {/* Skip button — bottom-right, glass cinema style */}
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute bottom-6 right-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white/60 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-black/50 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:bottom-8 sm:right-8"
        aria-label="Saltar animación de introducción"
      >
        Saltar
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3 w-3"
          aria-hidden="true"
        >
          <path d="M15.235 4.243a.75.75 0 01.022 1.06L9.332 11.7a1.5 1.5 0 01-2.164 0L3.243 7.803a.75.75 0 011.06-1.06L8.25 10.94l5.925-6.675a.75.75 0 011.06-.022z" />
          <path d="M15.462 10.243a.75.75 0 01.022 1.06l-5.925 6.397a1.5 1.5 0 01-2.164 0l-3.925-3.897a.75.75 0 111.06-1.06l3.952 3.924 5.92-6.402a.75.75 0 011.06-.022z" />
        </svg>
      </button>
    </div>
  );
}
