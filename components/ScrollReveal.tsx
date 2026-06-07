"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "slide-from-left-full" | "slide-from-right-full";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 750,
  className = "",
  threshold = 0.08,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic check for SSR safety
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Play once (play-once behaviour)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -60px 0px", // triggers slightly before entering viewport fully
      }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Variant styles mapping
  const baseStyles = "transition-all ease-[cubic-bezier(0.16,1,0.3,1)]";
  
  const initialStyles = {
    fade: "opacity-0",
    "slide-up": "opacity-0 translate-y-12",
    "slide-down": "opacity-0 -translate-y-12",
    "slide-left": "opacity-0 translate-x-12",
    "slide-right": "opacity-0 -translate-x-12",
    "slide-from-left-full": "opacity-0 -translate-x-[50vw]",
    "slide-from-right-full": "opacity-0 translate-x-[50vw]",
    zoom: "opacity-0 scale-[0.97]",
  };

  const finalStyles = {
    fade: "opacity-100",
    "slide-up": "opacity-100 translate-y-0",
    "slide-down": "opacity-100 translate-y-0",
    "slide-left": "opacity-100 translate-x-0",
    "slide-right": "opacity-100 translate-x-0",
    "slide-from-left-full": "opacity-100 translate-x-0",
    "slide-from-right-full": "opacity-100 translate-x-0",
    zoom: "opacity-100 scale-100",
  };

  const delayStr = delay > 0 ? `${delay}ms` : "0ms";
  const durationStr = `${duration}ms`;

  // Remove will-change after animation completes to free GPU memory
  const animDoneRef = useRef(false);
  const [willChange, setWillChange] = useState<string>("transform, opacity");

  useEffect(() => {
    if (isVisible && !animDoneRef.current) {
      animDoneRef.current = true;
      const cleanupTimer = setTimeout(() => {
        setWillChange("auto");
      }, delay + duration + 100); // clear after transition finishes
      return () => clearTimeout(cleanupTimer);
    }
  }, [isVisible, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      <div
        className={`w-full h-full ${baseStyles} ${
          isVisible ? finalStyles[variant] : initialStyles[variant]
        }`}
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          transitionDelay: delayStr,
          transitionDuration: durationStr,
          willChange,
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
