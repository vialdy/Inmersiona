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
        <ValuePropositionSection />
        <Methodology />
        <ROI />
        <ContactForm />
      </main>
    </div>
  );
}
