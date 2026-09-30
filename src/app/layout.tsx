import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { FitLogProvider } from "@/context/FitLogContext";
import { Dumbbell } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitLog — Train with Intent",
  description: "High-performance dark gym workout library and companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#09090b] text-white antialiased selection:bg-[#ccff00] selection:text-black min-h-screen flex flex-col`}>
        <FitLogProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Global Footer */}
          <footer className="border-t border-gray-800/80 py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 bg-[#09090b]">
            <div className="flex items-center gap-2.5 mb-4 md:mb-0">
              <img src="/logo.png" alt="FitLog Logo" className="w-5 h-5 object-contain" />
              <span className="font-black text-white tracking-widest text-sm">FITLOG</span>
            </div>
            <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
          </footer>
        </FitLogProvider>
      </body>
    </html>
  );
}