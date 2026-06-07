"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex justify-center px-4 py-10">
      <nav
        aria-label="Enlaces legales"
        className="bg-white/80 border border-slate-200 backdrop-blur-xl shadow-lg shadow-black/5 rounded-full p-2 px-5 sm:px-6 flex items-center gap-3 sm:gap-5 transition-all hover:shadow-md"
      >
        <Link href="#" className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#667b99] hover:text-[#132339] transition-colors">
          Aviso legal
        </Link>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <Link href="#" className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#667b99] hover:text-[#132339] transition-colors">
          Privacidad
        </Link>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <Link href="#" className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#667b99] hover:text-[#132339] transition-colors">
          Política de Cookies
        </Link>
      </nav>
    </footer>
  );
}
