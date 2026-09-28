"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plannedWorkouts = [], savedWorkouts = [] } = useFitLog() as any;

  const isMyPlan = pathname?.includes("/my-plan");

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090b] border-b border-gray-800/80 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Image */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="font-black text-lg tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Navigation Toggle */}
        <div className="hidden md:flex items-center gap-2 bg-[#121215] border border-gray-800 p-1 rounded-full">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              !isMyPlan
                ? "bg-[#ccff00] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan?tab=plan"
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              isMyPlan
                ? "bg-[#ccff00] text-black shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Corner Buttons */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link 
            href="/my-plan?tab=plan" 
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Plan <span className="text-[#ccff00] ml-0.5">({plannedWorkouts.length})</span>
          </Link>
          <Link 
            href="/my-plan?tab=saved" 
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Saved <span className="text-[#ccff00] ml-0.5">({savedWorkouts.length})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}