import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mundo de Aves | Identificador de pajaros",
  description:
    "Busca cualquier ave y descubre su nombre cientifico, taxonomia y estado de conservacion.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-4xl mx-auto px-6 pb-24">
          {children}
        </main>
        <footer className="border-t border-[var(--color-borde)] py-6 text-center text-sm text-[var(--color-texto-tenue)]">
          Datos de especies via{" "}
          <a>
            href="https://www.inaturalist.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[var(--color-acento)] underline-offset-4 hover:text-[var(--color-texto)]"
          
            iNaturalist
          </a>
          .
        </footer>
      </body>
    </html>
  );
}