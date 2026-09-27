"use client";

import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const { plannedWorkouts = [], savedWorkouts = [] } = useFitLog() as any;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090b] border-b border-gray-800/80 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#ccff00] flex items-center justify-center text-black">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span className="font-black text-lg tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full bg-[#18181b] border border-gray-800 text-xs font-bold text-[#ccff00] transition-colors"
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
          >
            My Plan
          </Link>
        </div>

        {/* Right Badges */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link href="/my-plan" className="text-gray-400 hover:text-white transition-colors">
            Plan <span className="text-[#ccff00] ml-0.5">({plannedWorkouts.length})</span>
          </Link>
          <Link href="/my-plan" className="text-gray-400 hover:text-white transition-colors">
            Saved <span className="text-gray-400 ml-0.5">({savedWorkouts.length})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}