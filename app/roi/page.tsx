import { ROI } from "@/components/ROI";
import { Navbar } from "@/components/Navbar";

export default function ROIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#132339]">
      <Navbar />

      {/* Main Content */}
      <main id="roi-content" className="flex-1 bg-gradient-to-br from-[#132339]/90 via-[#0f1d30]/90 to-[#0a1421]/90 backdrop-blur-sm text-white pt-32 pb-0 lg:pt-40">
        <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-12">
          {/* Header Title Section */}
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c2410c]/30 bg-[#c2410c]/10 text-xs font-semibold tracking-wider text-[#f8fafc] uppercase mb-4">
              <span className="h-2 w-2 rounded-full bg-[#c2410c] animate-pulse" />
              ROI (Retorno de Inversión)
            </span>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight text-white">
              Inmersiona <span className="text-[#c2410c]">Retorno de Inversión</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              El retorno de la consultoría medido en ahorros tangibles y tiempo recuperado. Utiliza nuestra calculadora interactiva para simular el impacto en tu organización.
            </p>
          </div>
        </div>

        {/* Section starts directly below with white background to transition beautifully */}
        <ROI hideHeader showCalculatorDirectly />
      </main>
    </div>
  );
}
