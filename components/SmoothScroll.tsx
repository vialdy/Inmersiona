"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Expose lenis instance globally for debugging or specific integrations (like scroll locking)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).lenis;
    };
  }, []);

  // Reset scroll or go to hash on route change
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (!lenis) return;

    // Small timeout to allow Next.js to render the new page's DOM
    const timer = setTimeout(() => {
      if (window.location.hash) {
        try {
          const target = document.querySelector(window.location.hash);
          if (target) {
            lenis.scrollTo(target, { immediate: true });
            return;
          }
        } catch (e) {
          // Ignore invalid selector errors
        }
      }
      // If no hash or element not found, scroll to top
      lenis.scrollTo(0, { immediate: true });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
