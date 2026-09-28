import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
      <footer className="max-w-6xl mx-auto w-full border-t border-gray-800 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FitLog Logo" className="w-5 h-5 object-contain" />
          <span className="font-black text-white tracking-widest">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </footer>
  );
}