"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/mapa-operativo", label: "Mapa Operativo" },
  { href: "/#value-proposition", label: "Valor Añadido" },
  { href: "/#methodology", label: "Metodología" },
  { href: "/roi", label: "ROI" },
  { href: "/#contact", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [activeWidth, setActiveWidth] = useState("max-w-7xl");



  // Dynamic width tracking based on active page/section
  useEffect(() => {
    // Subpage detection
    if (pathname !== "/") {
      if (pathname === "/mapa-operativo") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveWidth("max-w-7xl");
      } else {
        setActiveWidth("max-w-6xl");
      }
      return;
    }

    // Scroll listener fallback for top of the page
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveWidth("max-w-7xl");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Initial scroll position check
    if (window.scrollY < 80) {
      setActiveWidth("max-w-7xl");
    }

    // Intersection observer for section tracking
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "hero") {
            setActiveWidth("max-w-7xl");
            setActiveHash("");
          } else {
            setActiveWidth("max-w-6xl");
            setActiveHash("#" + id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ["hero", "value-proposition", "methodology", "roi", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  // Track hash for active anchor link highlighting
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    // Initial check
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  const isActive = (item: typeof navigationItems[0]) => {
    // If we're on ROI page
    if (pathname === "/roi") {
      return item.href === "/roi";
    }
    // If we're on Mapa Operativo page
    if (pathname === "/mapa-operativo") {
      return item.href === "/mapa-operativo";
    }
    // Homepage anchor links
    if (pathname === "/") {
      if (item.href === "/") return activeHash === "" || activeHash === "#" || activeHash === "#hero";
      if (item.href === "/mapa-operativo") {
        return activeHash === "" || activeHash === "#" || activeHash === "#hero";
      }
      if (item.href.startsWith("/#")) {
        const hash = item.href.substring(1);
        return activeHash === hash;
      }
      if (item.href === "/roi") {
        return activeHash === "#roi";
      }
    }
    return false;
  };

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only rounded-lg bg-white border border-[#dee6ed] px-5 py-3 font-semibold text-[#132339] shadow-lg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:outline-none focus:ring-2 focus:ring-[#c2410c]"
      >
        Saltar al contenido principal
      </a>

      {/* DESKTOP HEADER LAYOUT (min-width: 1024px) */}
      <div className="hidden lg:block fixed top-8 left-0 right-0 z-50 px-5 sm:px-6 lg:px-8 pointer-events-none">
        <header className={`mx-auto w-full flex items-center justify-between transition-all duration-500 ease-in-out ${activeWidth}`}>
          
          {/* LOGO PILL (always highlighted) */}
          <div className="pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] bg-white/80 border border-white/20 backdrop-blur-xl shadow-lg shadow-black/5 p-2.5 px-6"
            >
              <Image
                src="/flavicon.svg"
                alt=""
                aria-hidden="true"
                width={32}
                height={22}
                className="h-6 w-auto"
                priority
              />
              <Image
                src="/name.svg"
                alt="Inmersiona"
                width={110}
                height={21}
                className="h-auto w-28"
                priority
              />
            </Link>
          </div>

          {/* FLOATING MENU PILL */}
          <nav
            aria-label="Navegación principal"
            className="pointer-events-auto bg-white/80 border border-white/25 backdrop-blur-xl shadow-lg shadow-black/5 rounded-full p-1.5 px-3 flex items-center gap-1"
          >
            <ul className="flex items-center gap-0.5">
              {navigationItems.map((item) => {
                const active = isActive(item);
                const isCTA = item.label === "Contacto";

                if (isCTA) return null; // Render Contacto separately at the end

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`inline-flex items-center justify-center rounded-full text-[11px] font-bold uppercase tracking-widest px-4 py-2 transition-all duration-300 ${
                        active
                          ? "bg-[#132339]/5 text-[#132339]"
                          : "text-[#667b99] hover:text-[#132339] hover:bg-slate-100/40"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* HIGHLIGHTED CONTACT CTA BUTTON */}
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#132339] text-white hover:bg-[#c2410c] hover:scale-105 active:scale-95 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-black/5 ml-1"
            >
              Contacto
            </Link>
          </nav>
        </header>
      </div>

      {/* MOBILE HEADER LAYOUT (max-width: 1023px) */}
      <header className="lg:hidden fixed top-4 left-4 right-4 z-50 transition-all duration-300">
        <div className="bg-white/85 border border-white/20 backdrop-blur-lg shadow-lg shadow-black/5 rounded-2xl h-14 flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] p-1"
          >
            <Image
              src="/flavicon.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={19}
              className="h-5 w-auto"
              priority
            />
            <Image
              src="/name.svg"
              alt="Inmersiona"
              width={90}
              height={17}
              className="h-auto w-24"
              priority
            />
          </Link>

          {/* Menu Hamburguer Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-10 w-10 flex flex-col justify-center items-center rounded-xl bg-[#132339] border border-[#132339]/10 cursor-pointer shadow-sm relative group overflow-hidden transition-colors duration-300"
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menú"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center relative z-10">
              <span
                className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-[7.2px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-[7.2px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN POPUP OVERLAY */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-[#132339] flex flex-col justify-between p-6 pt-24 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        {/* Navigation list */}
        <nav aria-label="Menú móvil" className="flex-1 flex flex-col justify-center items-center">
          <ul className="flex flex-col gap-6 items-center text-center">
            {navigationItems.map((item, index) => {
              const active = isActive(item);

              return (
                <li
                  key={item.label}
                  className={`transition-all duration-700 transform ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  // eslint-disable-next-line react/forbid-dom-props
                  style={{ transitionDelay: `${index * 100 + 150}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`inline-block text-3xl font-extrabold tracking-tight uppercase transition-all duration-300 ${
                      active
                        ? "text-[#c2410c] scale-105"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Fullscreen popup footer */}
        <div
          className={`flex flex-col items-center gap-3 pt-6 border-t border-white/10 transition-all duration-700 delay-500 transform ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            ¿Hablamos de tus operaciones?
          </span>
          <a
            href="mailto:hola@inmersiona.com"
            className="text-lg font-bold text-white hover:text-[#c2410c] transition duration-200"
          >
            hola@inmersiona.com
          </a>
        </div>
      </div>
    </>
  );
}
