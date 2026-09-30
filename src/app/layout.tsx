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

        </FitLogProvider>
      </body>
    </html>
  );
}