import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { Navbar } from "@/components/Navbar";

export default function ValorAnadidoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#132339]">
      <Navbar />

      {/* Main Content */}
      <main id="valor-anadido-content" className="flex-1">
        <ValuePropositionSection />
      </main>

    </div>
  );
}
