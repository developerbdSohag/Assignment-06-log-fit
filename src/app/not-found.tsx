import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#121215] border border-gray-800/80 rounded-3xl p-8 text-center relative z-10 shadow-2xl">
        <div className="w-16 h-16 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#ccff00]">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Looks like you hit a wrong rep. The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl hover:bg-[#b3e600] transition-all shadow-lg shadow-[#ccff00]/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Workouts</span>
        </Link>
      </div>
    </div>
  );
}