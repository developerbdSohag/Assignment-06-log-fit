"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Workout } from "@/types/fitlog";
import { MOCK_WORKOUTS } from "@/data/workouts";
import { Clock, Flame, Star, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWorkouts(MOCK_WORKOUTS);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 bg-[#18181b] border border-gray-800 px-3 py-1 rounded-full text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            Elite Workout Library
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[1.05] mb-6">
            Train with intent. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-emerald-400">Log every set.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed font-normal">
            FitLog is your high-performance dark gym companion: pick a lift, lock it into today&apos;s plan, and watch your weekly strength and volume compound.
          </p>
          <div className="flex items-center">
            <a
              href="#library"
              className="inline-flex items-center gap-3 bg-[#ccff00] text-black font-extrabold px-8 py-4 rounded-xl hover:bg-[#b3e600] hover:scale-[1.02] active:scale-[0.98] transition duration-200 text-sm shadow-lg shadow-[#ccff00]/20"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center z-10">
          <div className="relative w-full max-w-md h-72 md:h-96 flex items-center justify-center p-6 bg-gradient-to-b from-[#121216] to-[#0d0d0f] border border-gray-800/80 rounded-3xl shadow-2xl backdrop-blur-xl">
            <img 
              src="/banner.png" 
              alt="Banner" 
              className="max-h-full max-w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition duration-500" 
            />
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-gray-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">The Library</h2>
            <p className="text-gray-400 text-sm mt-1">Twelve specialized lifts engineered to target every major muscle group.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24 text-[#ccff00] font-semibold animate-pulse tracking-widest text-sm uppercase">
            Loading workouts…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="bg-[#121215] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-[#ccff00]/60 hover:shadow-[0_10px_30px_rgba(204,255,0,0.1)] transition-all duration-300 group flex flex-col"
              >
                <div className="h-52 bg-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent z-10 opacity-60" />
                  <img 
                    src={workout.image} 
                    alt={workout.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {workout.category?.map((cat, idx) => (
                        <span key={idx} className="bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-extrabold text-lg uppercase tracking-wide mb-1 group-hover:text-[#ccff00] transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mb-4">{workout.equipment}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300 pt-4 border-t border-gray-800/80 font-medium">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.duration} min</span>
                    <span className="flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-orange-400" /> {workout.calories} kcal</span>
                    <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400/20" /> {workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}