"use client";

import { useEffect, useRef } from "react";

interface GridCell {
  x: number;
  y: number;
  char: string;
  alpha: number;
  targetAlpha: number;
  isWhite: boolean;
}

interface AvoidRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function MatrixCursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    
    const fontSize = 16;
    let cols = 0;
    let rows = 0;
    let grid: GridCell[][] = [];

    // Binary matrix characters
    const chars = "01".split("");

    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / fontSize);
      rows = Math.ceil(height / fontSize);
      grid = [];

      for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
          grid[i][j] = {
            x: i * fontSize,
            y: j * fontSize,
            char: chars[Math.floor(Math.random() * chars.length)],
            alpha: 0,
            targetAlpha: 0,
            isWhite: Math.random() < 0.2,
          };
        }
      }
    };

    initGrid();

    const mouse = { x: -1000, y: -1000 };
    let mouseActive = false;
    let overText = false;
    let animationFrameId: number;

    // ──────────────────────────────────────────────────────────────
    // CACHED BOUNDING RECTS — eliminates per-cell DOM queries
    // Instead of calling elementFromPoint() for every cell in the
    // halo on every frame, we pre-collect the bounding rects of all
    // elements that should block the effect and do pure geometric
    // hit-testing in the animation loop.
    // ──────────────────────────────────────────────────────────────
    let avoidRects: AvoidRect[] = [];
    let avoidRectsStale = true;

    const AVOID_TAGS = new Set([
      "H1", "H2", "H3", "H4", "H5", "H6",
      "P", "SPAN", "A", "BUTTON", "LABEL", "LI",
      "STRONG", "EM", "B", "I", "CODE", "SMALL",
      "SUB", "SUP", "TEXTAREA", "INPUT", "OPTION",
      "TD", "TH",
      "ARTICLE", "FORM", "NAV", "HEADER", "FOOTER", "SELECT", "ASIDE",
    ]);

    const CONTAINER_TAGS = new Set(["SECTION", "BODY", "HTML", "MAIN", "DIV"]);

    const shouldCollectElement = (el: Element): boolean => {
      const tag = el.tagName;

      // Always collect the operational map
      if (el.id === "operational-map" || el.closest("#operational-map")) {
        return true;
      }

      if (AVOID_TAGS.has(tag)) return true;

      // Skip generic container tags — they are backgrounds, not content
      if (CONTAINER_TAGS.has(tag)) return false;

      // Check for non-transparent backgrounds or borders (cards, panels)
      try {
        const cs = getComputedStyle(el);
        if (cs.cursor === "text") return true;

        const bg = cs.backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          return true;
        }

        if (cs.borderStyle !== "none" && parseInt(cs.borderWidth) > 0) {
          return true;
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        // Ignored
      }

      // Check for direct text content
      for (let i = 0; i < el.childNodes.length; i++) {
        const node = el.childNodes[i];
        if (node.nodeType === 3) {
          const text = node.textContent?.trim();
          if (text && text.length > 0) return true;
        }
      }

      return false;
    };

    const buildAvoidRects = () => {
      const rects: AvoidRect[] = [];
      const seen = new Set<Element>();

      // Walk all visible elements and collect rects for those we should avoid
      const allElements = document.querySelectorAll("*");
      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i];
        // Skip the canvas itself and anything invisible
        if (el === canvas) continue;
        if (seen.has(el)) continue;

        if (shouldCollectElement(el)) {
          seen.add(el);
          const rect = el.getBoundingClientRect();
          // Only collect elements that are actually visible
          if (rect.width > 0 && rect.height > 0) {
            rects.push({
              left: rect.left,
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
            });
          }
        }
      }

      avoidRects = rects;
      avoidRectsStale = false;
    };

    // Check if a point (in viewport coords) hits any avoid rect
    const isPointInAvoidZone = (px: number, py: number): boolean => {
      for (let i = 0; i < avoidRects.length; i++) {
        const r = avoidRects[i];
        if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
          return true;
        }
      }
      return false;
    };

    // Fallback: use elementFromPoint for the cursor center only
    const shouldAvoidElement = (el: Element | null): boolean => {
      if (!el) return false;

      if (el.id === "operational-map" || el.closest("#operational-map")) {
        return true;
      }

      const tag = el.tagName.toUpperCase();
      if (AVOID_TAGS.has(tag)) return true;

      try {
        const cs = getComputedStyle(el);
        if (cs.cursor === "text") return true;

        if (!CONTAINER_TAGS.has(tag)) {
          const bg = cs.backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return true;
          if (cs.borderStyle !== "none" && parseInt(cs.borderWidth) > 0) return true;
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        // Ignored
      }

      for (let i = 0; i < el.childNodes.length; i++) {
        const node = el.childNodes[i];
        if (node.nodeType === 3) {
          const text = node.textContent?.trim();
          if (text && text.length > 0) return true;
        }
      }

      let parent = el.parentElement;
      let depth = 0;
      while (parent && depth < 3) {
        const parentTag = parent.tagName.toUpperCase();
        if (AVOID_TAGS.has(parentTag)) return true;

        for (let i = 0; i < parent.childNodes.length; i++) {
          const node = parent.childNodes[i];
          if (node.nodeType === 3) {
            const text = node.textContent?.trim();
            if (text && text.length > 0) return true;
          }
        }
        parent = parent.parentElement;
        depth++;
      }

      return false;
    };

    // Build initial rect cache
    buildAvoidRects();

    // Throttled character scramble counter
    let frameCount = 0;

    const animate = () => {
      frameCount++;

      // Rebuild avoid rect cache every ~500ms (≈30 frames at 60fps, ≈60 at 120fps)
      // This is FAR cheaper than elementFromPoint per-cell per-frame
      if (avoidRectsStale || frameCount % 60 === 0) {
        buildAvoidRects();
      }

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${fontSize * 0.75}px var(--font-manrope), monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Periodically randomize some characters globally to feel alive
      // Throttle to ~once every 20 frames instead of per-frame probability
      if (frameCount % 20 === 0) {
        const randCol = Math.floor(Math.random() * cols);
        const randRow = Math.floor(Math.random() * rows);
        if (grid[randCol] && grid[randCol][randRow]) {
          grid[randCol][randRow].char = chars[Math.floor(Math.random() * chars.length)];
        }
      }

      if (mouseActive && !overText) {
        const radius = 60;
        const radiusSq = radius * radius;
        const halfFont = fontSize / 2;

        // Calculate the grid bounds affected by the halo
        const minCol = Math.max(0, Math.floor((mouse.x - radius) / fontSize));
        const maxCol = Math.min(cols - 1, Math.ceil((mouse.x + radius) / fontSize));
        const minRow = Math.max(0, Math.floor((mouse.y - radius) / fontSize));
        const maxRow = Math.min(rows - 1, Math.ceil((mouse.y + radius) / fontSize));

        // Reset cells outside the halo region efficiently:
        // Only iterate cells that WERE in the halo last frame — but since
        // we set alpha = targetAlpha (instant), cells outside halo just stay 0.
        // We only need to draw cells with alpha > 0.

        // Process cells within the halo bounding box
        for (let i = minCol; i <= maxCol; i++) {
          for (let j = minRow; j <= maxRow; j++) {
            const cell = grid[i][j];
            const cx = cell.x + halfFont;
            const cy = cell.y + halfFont;
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq) {
              // Check against cached avoid rects (pure math, no DOM)
              if (isPointInAvoidZone(cx, cy)) {
                cell.alpha = 0;
              } else {
                const dist = Math.sqrt(distSq);
                cell.alpha = Math.max(0, 1 - (dist / radius));

                // Throttled character scramble
                if (frameCount % 30 === 0 && Math.random() < 0.15) {
                  cell.char = chars[Math.floor(Math.random() * chars.length)];
                }
              }
            } else {
              cell.alpha = 0;
            }

            // Draw only visible cells
            if (cell.alpha > 0.01) {
              const r = cell.isWhite ? 255 : 102;
              const g = cell.isWhite ? 255 : 123;
              const b = cell.isWhite ? 255 : 153;

              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${cell.alpha * 0.7})`;
              ctx.fillText(cell.char, cell.x + halfFont, cell.y + halfFont);
            }
          }
        }
      }
      // When mouse is not active or over text, canvas is already cleared — nothing to draw.

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mark avoid rects as stale on scroll/resize so they get rebuilt next frame
    const markStale = () => {
      avoidRectsStale = true;
    };

    const handleResize = () => {
      initGrid();
      avoidRectsStale = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouseActive = true;

      const element = document.elementFromPoint(e.clientX, e.clientY);
      overText = shouldAvoidElement(element);
    };

    const handleMouseLeave = () => {
      mouseActive = false;
      overText = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", markStale, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", markStale);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      // eslint-disable-next-line react/forbid-dom-props
      style={{ willChange: "contents" }}
      aria-hidden="true"
    />
  );
}
