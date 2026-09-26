import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#121212] border-t border-gray-800 px-8 py-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-xs">
      <div className="flex items-center gap-2 text-white font-bold">
        <Dumbbell className="text-[#ccff00] h-5 w-5" />
        <span>FITLOG</span>
      </div>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}