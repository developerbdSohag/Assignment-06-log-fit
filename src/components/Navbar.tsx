"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const { plan, saved } = useFitLog();

  const isPlanActive = pathname === "/my-plan" && tab !== "saved";
  const isSavedActive = pathname === "/my-plan" && tab === "saved";

  return (
    <nav className="w-full bg-[#121212] border-b border-gray-800 px-6 py-4 flex items-center justify-between text-white sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wider">
        <img src="/logo.png" alt="FitLog Logo" className="h-6 w-6 object-contain" />
        <span>FITLOG</span>
      </Link>
      <div className="flex items-center gap-8 text-sm font-medium">
        <Link href="/" className={`hover:text-[#ccff00] transition ${pathname === "/" ? "text-[#ccff00]" : "text-gray-300"}`}>Workout</Link>
        <Link href="/my-plan" className={`hover:text-[#ccff00] transition ${pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-300"}`}>My Plan</Link>
      </div>
      <div className="flex items-center gap-4 text-xs font-semibold">
        <Link 
          href="/my-plan" 
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition cursor-pointer ${
            isPlanActive 
              ? "bg-[#ccff00] text-black font-extrabold" 
              : "border border-gray-700 text-white hover:border-[#ccff00]"
          }`}
        >
          <span>Plan</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isPlanActive ? "bg-black text-white" : "bg-gray-800 text-white"}`}>
            {plan.length}
          </span>
        </Link>
        <Link 
          href="/my-plan?tab=saved" 
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition cursor-pointer ${
            isSavedActive 
              ? "bg-[#ccff00] text-black font-extrabold" 
              : "border border-gray-700 text-white hover:border-[#ccff00]"
          }`}
        >
          <span>Saved</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSavedActive ? "bg-black text-white" : "bg-gray-800 text-white"}`}>
            {saved.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}