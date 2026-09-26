"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <nav className="w-full bg-[#121212] border-b border-gray-800 px-6 py-4 flex items-center justify-between text-white sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wider">
        <Dumbbell className="text-[#ccff00] h-6 w-6" />
        <span>FITLOG</span>
      </Link>
      <div className="flex items-center gap-8 text-sm font-medium">
        <Link href="/" className={`hover:text-[#ccff00] transition ${pathname === "/" ? "text-[#ccff00]" : "text-gray-300"}`}>Workout</Link>
        <Link href="/my-plan" className={`hover:text-[#ccff00] transition ${pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-300"}`}>My Plan</Link>
      </div>
      <div className="flex items-center gap-4 text-xs font-semibold">
        <Link href="/my-plan" className="flex items-center gap-2 bg-[#ccff00] text-black px-3 py-1.5 rounded-full">
          <span>Plan</span>
          <span className="bg-black text-white px-1.5 py-0.2 rounded-full text-[10px]">{plan.length}</span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 border border-gray-600 text-white px-3 py-1.5 rounded-full hover:border-[#ccff00] transition">
          <span>Saved</span>
          <span className="bg-gray-800 text-white px-1.5 py-0.2 rounded-full text-[10px]">{saved.length}</span>
        </Link>
      </div>
    </nav>
  );
}