"use client";

import { FormEvent, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const revenueRanges = [
  "Menos de 500.000 EUR",
  "500.000 EUR - 1 M EUR",
  "1 M EUR - 3 M EUR",
  "3 M EUR - 10 M EUR",
  "Más de 10 M EUR",
];

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/enviar-contacto", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "No se pudo procesar la solicitud");
      }

      form.reset();
      setSubmissionState("success");
      setFeedback(payload.message ?? "Solicitud procesada con éxito");
    } catch (error) {
      setSubmissionState("error");
      setFeedback(
        error instanceof Error ? error.message : "No se pudo procesar la solicitud",
      );
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-white px-5 py-20 text-[#132339] sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="relative z-20 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <ScrollReveal variant="slide-right">
          <article className="h-full">
            <p className="text-sm font-bold tracking-wider text-[#c2410c] uppercase">
              Contacto
            </p>
            <h2 id="contact-title" className="mt-4 text-3xl font-extrabold sm:text-4xl tracking-tight leading-tight">
              Cuéntanos dónde se atasca tu flujo de IT.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#667b99]">
              Revisaremos tu infraestructura y procesos de forma confidencial para proponerte una hipótesis de inmersión en menos de 48 horas: cuellos de botella detectados y cómo solucionarlos con tus recursos existentes.
            </p>
            
            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Hipótesis preliminar sin coste",
                  desc: "Te planteamos una hoja de ruta técnica inicial sin ningún compromiso de permanencia."
                },
                {
                  title: "Confidencialidad total (RGPD)",
                  desc: "Tus bases de datos, flujos de ETL, integraciones y telefonía están 100% seguros."
                },
                {
                  title: "Foco en tu equipo in-house",
                  desc: "Diseñamos soluciones realistas priorizando la ejecución de tus propios desarrolladores internos."
                }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c2410c]/10 text-xs font-bold text-[#c2410c] mt-0.5">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#132339]">{item.title}</h4>
                    <p className="text-xs text-[#667b99] mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </ScrollReveal>
        
        <ScrollReveal variant="slide-left" delay={150}>
          <form
            onSubmit={handleSubmit}
            aria-label="Formulario de contacto de Inmersiona"
            className="rounded-2xl border border-[#dee6ed] bg-[#f8fafc] p-6 sm:p-10 shadow-sm transition duration-300 hover:border-[#667b99]/30 h-full"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-xs font-bold text-[#132339] uppercase tracking-wider">
                  Nombre completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-[#dee6ed] bg-white px-4 text-sm text-[#132339] transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-xs font-bold text-[#132339] uppercase tracking-wider">
                  Empresa
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-[#dee6ed] bg-white px-4 text-sm text-[#132339] transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-xs font-bold text-[#132339] uppercase tracking-wider">
                  Teléfono de contacto
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-[#dee6ed] bg-white px-4 text-sm text-[#132339] transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10"
                />
              </div>
              <div>
                <label
                  htmlFor="revenueRange"
                  className="text-xs font-bold text-[#132339] uppercase tracking-wider"
                >
                  Rango de facturación anual
                </label>
                <select
                  id="revenueRange"
                  name="revenueRange"
                  required
                  defaultValue=""
                  className="mt-2 min-h-12 w-full rounded-xl border border-[#dee6ed] bg-white px-4 text-sm text-[#132339] transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10"
                >
                  <option value="" disabled>
                    Selecciona un rango
                  </option>
                  {revenueRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="bottleneck"
                  className="text-xs font-bold text-[#132339] uppercase tracking-wider"
                >
                  ¿Dónde se atasca tu operación o flujo de datos?
                </label>
                <textarea
                  id="bottleneck"
                  name="bottleneck"
                  required
                  rows={4}
                  placeholder="Ej: Cargas lentas de leads en el CRM, falta de integración de telefonía con Call Center, ETLs de datos inestables, automatizaciones de marketing o proyectos de scoring e IA..."
                  className="mt-2 w-full rounded-xl border border-[#dee6ed] bg-white px-4 py-3 text-sm text-[#132339] placeholder-slate-400 transition duration-150 outline-none focus:border-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/10 resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-xs leading-5 text-[#667b99] cursor-pointer">
                  <input
                    name="privacy"
                    type="checkbox"
                    value="accepted"
                    required
                    className="mt-0.5 h-4.5 w-4.5 rounded border-[#dee6ed] text-[#c2410c] focus:ring-2 focus:ring-[#c2410c]/20"
                  />
                  <span>
                    Acepto la política de privacidad y autorizo a Inmersiona a tratar mis datos para responder a esta solicitud de diagnóstico conforme al RGPD.
                  </span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={submissionState === "submitting"}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#132339] border border-[#132339] px-6 text-sm font-bold text-white transition duration-150 hover:bg-[#0f1d30] hover:border-[#0f1d30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
            >
              {submissionState === "submitting"
                ? "Enviando solicitud..."
                : "Solicitar diagnóstico gratuito"}
            </button>
            
            {feedback && (
              <p
                role="status"
                aria-live="polite"
                className={`mt-4 text-xs font-bold ${
                  submissionState === "error" ? "text-rose-600" : "text-emerald-600"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
