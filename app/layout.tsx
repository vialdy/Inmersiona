import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { FloatingContactWidget } from "@/components/FloatingContactWidget";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import { MatrixCursorBackground } from "@/components/MatrixCursorBackground";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Inmersiona | Consultoría de Procesos IT y Eficiencia Operativa",
  description:
    "Optimización de procesos y sistemas de IT (CRM, Call Center, ETLs, Telefonía e IA) trabajando codo con codo con tus equipos para implementar soluciones reales con tus recursos in-house.",
  icons: {
    icon: "/flavicon.svg",
    shortcut: "/flavicon.svg",
    apple: "/flavicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[#f8fafc] text-[#132339] font-sans overflow-x-hidden" suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Footer />
        <FloatingContactWidget />
        <MatrixCursorBackground />
      </body>
    </html>
  );
}
