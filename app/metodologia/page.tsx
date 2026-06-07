import { Methodology } from "@/components/Methodology";
import { Navbar } from "@/components/Navbar";

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#132339]">
      <Navbar />

      {/* Main Content */}
      <main id="metodologia-content" className="flex-1">
        <Methodology />
      </main>

    </div>
  );
}
