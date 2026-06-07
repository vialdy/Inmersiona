"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  contact: string;
  message: string;
  privacy: boolean;
}

export function FloatingContactWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");
  const [values, setValues] = useState<FormValues>({
    name: "",
    contact: "",
    message: "",
    privacy: false,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasPendingData =
    values.name.trim() !== "" ||
    values.contact.trim() !== "" ||
    values.message.trim() !== "";

  // Mount animation
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Observe #contact section — hide bubble when in view
  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBubbleVisible(!entry.isIntersecting);
        // If user scrolls to contact section, close the panel silently
        if (entry.isIntersecting) {
          setIsOpen(false);
          setIsMinimized(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  // Auto-close after success
  useEffect(() => {
    if (submissionState === "success") {
      successTimerRef.current = setTimeout(() => {
        setIsOpen(false);
        setIsMinimized(false);
        setSubmissionState("idle");
        setFeedback("");
        setValues({ name: "", contact: "", message: "", privacy: false });
      }, 3000);
    }
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [submissionState]);

  // Close panel when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsMinimized(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleBubbleClick = () => {
    if (isOpen && !isMinimized) {
      setIsMinimized(true);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmissionState("submitting");
    setFeedback("");

    const formData = new FormData();
    formData.append("name", values.name);
    // Map "contact" to either phone or email — use "phone" field name the API expects
    formData.append("phone", values.contact);
    formData.append("bottleneck", values.message);
    formData.append("privacy", "accepted");
    // Required fields by API — fill in defaults for missing simplified fields
    formData.append("company", "—");
    formData.append("revenueRange", "—");

    try {
      const response = await fetch("/api/enviar-contacto", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "No se pudo procesar la solicitud");
      }

      setSubmissionState("success");
      setFeedback("Gracias, te contactamos en menos de 48h");
    } catch (error) {
      setSubmissionState("error");
      setFeedback(
        error instanceof Error ? error.message : "No se pudo procesar la solicitud"
      );
    }
  }

  const isPanelVisible = isOpen && !isMinimized;

  return (
    <>
      {/* Floating Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Formulario de contacto rápido"
          className={`fixed z-50 bg-white shadow-2xl shadow-black/20 flex flex-col
            /* Mobile: full screen */
            inset-0
            /* Desktop: compact panel above FAB */
            sm:inset-auto sm:bottom-[84px] sm:right-5 sm:w-[380px] sm:rounded-2xl
            /* Top rounding for mobile */
            rounded-t-2xl
            transition-all duration-350
            ${isPanelVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          // eslint-disable-next-line react/forbid-dom-props
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#132339] rounded-t-2xl shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c2410c]/20">
                <svg className="h-4 w-4 text-[#c2410c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-extrabold text-white leading-none">Diagnóstico Rápido</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Respuesta en menos de 48h</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Minimize button */}
              <button
                onClick={handleMinimize}
                aria-label="Minimizar formulario"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                </svg>
              </button>
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Cerrar formulario"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 overscroll-contain">
            {submissionState === "success" ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center gap-4 py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-200">
                  <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-extrabold text-[#132339]">¡Solicitud enviada!</p>
                  <p className="text-sm text-[#667b99] mt-1">{feedback}</p>
                </div>
                <p className="text-xs text-slate-400">Este panel se cerrará automáticamente...</p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} aria-label="Formulario de contacto rápido" className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="float-name" className="text-[11px] font-bold text-[#132339] uppercase tracking-wider">
                    Nombre completo
                  </label>
                  <input
                    id="float-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={handleFieldChange}
                    placeholder="Tu nombre"
                    className="mt-1.5 min-h-11 w-full rounded-xl border border-[#dee6ed] bg-[#f8fafc] px-4 text-sm text-[#132339] placeholder-slate-400 transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10 focus:bg-white"
                  />
                </div>

                {/* Phone or Email */}
                <div>
                  <label htmlFor="float-contact" className="text-[11px] font-bold text-[#132339] uppercase tracking-wider">
                    Teléfono o email
                  </label>
                  <input
                    id="float-contact"
                    name="contact"
                    type="text"
                    autoComplete="off"
                    required
                    value={values.contact}
                    onChange={handleFieldChange}
                    placeholder="699 000 000 o tu@empresa.com"
                    className="mt-1.5 min-h-11 w-full rounded-xl border border-[#dee6ed] bg-[#f8fafc] px-4 text-sm text-[#132339] placeholder-slate-400 transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10 focus:bg-white"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="float-message" className="text-[11px] font-bold text-[#132339] uppercase tracking-wider">
                    ¿Cuál es tu principal cuello de botella?
                  </label>
                  <textarea
                    id="float-message"
                    name="message"
                    required
                    rows={3}
                    value={values.message}
                    onChange={handleFieldChange}
                    placeholder="Ej: Leads sin integrar en CRM, duplicados en datos, Call Center sin trazabilidad..."
                    className="mt-1.5 w-full rounded-xl border border-[#dee6ed] bg-[#f8fafc] px-4 py-3 text-sm text-[#132339] placeholder-slate-400 transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10 focus:bg-white resize-none"
                  />
                </div>

                {/* Privacy checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    name="privacy"
                    type="checkbox"
                    required
                    checked={values.privacy}
                    onChange={handleFieldChange}
                    className="mt-0.5 h-4 w-4 rounded border-[#dee6ed] text-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/20 shrink-0"
                  />
                  <span className="text-[11px] leading-4 text-[#667b99]">
                    Acepto la política de privacidad y autorizo a Inmersiona a tratar mis datos conforme al RGPD.
                  </span>
                </label>

                {/* Error feedback */}
                {submissionState === "error" && feedback && (
                  <p role="alert" className="text-xs font-bold text-rose-600">
                    {feedback}
                  </p>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={submissionState === "submitting"}
                  className="mt-1 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#c2410c] border border-[#c2410c] px-5 text-sm font-bold text-white transition-all duration-150 hover:bg-[#a1350a] hover:border-[#a1350a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:border-slate-300"
                >
                  {submissionState === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Solicitar diagnóstico gratuito"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Backdrop on mobile when open */}
      {isPanelVisible && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:hidden"
          onClick={handleMinimize}
          aria-hidden="true"
        />
      )}

      {/* FAB (Floating Action Button — la burbuja) */}
      <div
        className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${
          isBubbleVisible && mounted
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <button
          onClick={handleBubbleClick}
          aria-label={isOpen && !isMinimized ? "Minimizar formulario de contacto" : "Abrir formulario de contacto rápido"}
          aria-expanded={isOpen && !isMinimized}
          aria-haspopup="dialog"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#c2410c] text-white shadow-lg shadow-[#c2410c]/30 transition-all duration-200 hover:bg-[#a1350a] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          {/* Toggle icon: X when open, envelope when closed */}
          {isOpen && !isMinimized ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}

          {/* Badge: red dot when pending data and panel is not open */}
          {hasPendingData && (!isOpen || isMinimized) && (
            <span
              aria-label="Tienes datos pendientes de enviar"
              className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 border-2 border-white"
            />
          )}
        </button>
      </div>
    </>
  );
}
