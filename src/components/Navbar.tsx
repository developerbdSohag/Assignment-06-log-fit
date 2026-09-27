"use client";

import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import { Dumbbell, Calendar, Bookmark, Home } from "lucide-react";

export default function Navbar() {
  const { plannedWorkouts = [], savedWorkouts = [] } = useFitLog() as any;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090b]/80 backdrop-blur-md border-b border-gray-800/80 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black transition-all">
            <Dumbbell className="h-5 w-5" />
          </div>
          <span className="font-black text-lg uppercase tracking-wider text-white">
            Fit<span className="text-[#ccff00]">Log</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121215] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 text-xs font-extrabold uppercase tracking-wider transition-all"
          >
            <Home className="h-4 w-4 text-[#ccff00]" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121215] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 text-xs font-extrabold uppercase tracking-wider transition-all relative"
          >
            <Calendar className="h-4 w-4 text-[#ccff00]" />
            <span className="hidden sm:inline">Dashboard</span>
            {plannedWorkouts.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ccff00] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                {plannedWorkouts.length}
              </span>
            )}
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121215] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 text-xs font-extrabold uppercase tracking-wider transition-all relative"
          >
            <Bookmark className="h-4 w-4 text-[#ccff00]" />
            <span className="hidden sm:inline">Saved</span>
            {savedWorkouts.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ccff00] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                {savedWorkouts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}