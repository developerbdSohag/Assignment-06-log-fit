import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#121212] border-t border-gray-800 px-6 md:px-12 py-6 mt-auto text-gray-400 text-xs font-medium flex items-center justify-between text-white">
      <div className="flex items-center gap-2.5 font-extrabold text-sm tracking-wider">
        <div className="w-6 h-6 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
          <Dumbbell className="h-3.5 w-3.5" />
        </div>
        <span>FITLOG</span>
      </div>
      <p className="text-gray-500 text-right font-normal">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
}