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
          <footer className="w-full bg-[#121212] border-t border-gray-800 px-6 md:px-12 py-6 text-gray-400 text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-sm tracking-wider text-white">
              <div className="w-6 h-6 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                <Dumbbell className="h-3.5 w-3.5" />
              </div>
              <span>FITLOG</span>
            </div>
            <p className="text-gray-500 text-right font-normal">
              © 2026 FitLog — Workout Library. Train hard, log honest.
            </p>
          </footer>
        </FitLogProvider>
      </body>
    </html>
  );
}