import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { Methodology } from "@/components/Methodology";
import { ROI } from "@/components/ROI";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#132339]">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <div className="h-32 sm:h-40 md:h-56 transition-dark-to-light-hero" />
        <ValuePropositionSection />
        <Methodology />
        <div className="h-32 sm:h-40 md:h-56 transition-light-to-dark-roi" />
        <ROI hideCasesTable />
        <div className="h-32 sm:h-40 md:h-56 transition-dark-to-light-roi" />
        <ContactForm />
      </main>
    </div>
  );
}
