import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitLog — Train with Intent",
  description: "Your high-performance dark gym companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-[#09090b] text-white font-sans min-h-screen flex flex-col selection:bg-[#ccff00] selection:text-black">
        <FitLogProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}