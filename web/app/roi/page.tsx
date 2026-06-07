import { ROI } from "@/components/ROI";
import { Navbar } from "@/components/Navbar";

export default function ROIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#132339]">
      <Navbar />

      {/* Main Content */}
      <main id="roi-content" className="flex-1">
        <ROI />
      </main>

    </div>
  );
}
