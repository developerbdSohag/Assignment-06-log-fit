"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_WORKOUTS } from "@/data/workouts";
import { useFitLog } from "@/context/FitLogContext";
import { Clock, Flame, ArrowLeft, Plus, Check, Bookmark, Dumbbell, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return (MOCK_WORKOUTS || []).map((workout: any) => ({
    id: workout.id.toString(),
  }));
}

export default function WorkoutDetail() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const id = params?.id;

  const { plannedWorkouts = [], addToPlan, toggleSave, isPlanned, isSaved } = useFitLog() as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const workout = (MOCK_WORKOUTS as any[]).find((w) => w.id.toString() === id?.toString());

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-[#121215] border border-gray-800 rounded-2xl flex items-center justify-center text-[#ccff00] mb-4">
          <Dumbbell className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Workout Not Found</h1>
        <p className="text-gray-400 text-xs mb-6">The workout you are looking for doesn't exist.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3e600] transition-all"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const planned = isPlanned(workout.id);
  const saved = isSaved(workout.id);
  const isCapReached = plannedWorkouts.length >= 5;

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black px-6 md:px-12 py-12 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to workouts</span>
        </Link>

        {/* Workout Detail Card */}
        <div className="bg-[#121215] border border-gray-800/80 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-gray-800">
              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex gap-2 mb-4">
                  {workout.category?.map((cat: string, idx: number) => (
                    <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      {cat}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 text-white">
                  {workout.name}
                </h1>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {workout.description || `Targeted muscle training utilizing ${workout.equipment || "professional gym equipment"} for maximum efficiency and strength building.`}
                </p>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-800/80 mb-8 text-xs">
                  <div>
                    <p className="text-gray-500 uppercase font-bold mb-1">Duration</p>
                    <p className="text-base font-black text-white flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[#ccff00]" /> {workout.duration} min
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase font-bold mb-1">Calories</p>
                    <p className="text-base font-black text-white flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-400" /> {workout.calories} kcal
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase font-bold mb-1">Rating</p>
                    <p className="text-base font-black text-white">⭐ {workout.rating || "4.8"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => addToPlan(workout)}
                  className={`flex-1 py-3.5 px-6 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    planned
                      ? "bg-[#ccff00]/10 border-[#ccff00]/30 text-[#ccff00]"
                      : "bg-[#ccff00] border-[#ccff00] text-black hover:bg-[#b3e600]"
                  }`}
                >
                  {planned ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {planned ? "Added to Plan" : "Add to Today's Plan"}
                </button>

                <button
                  onClick={() => toggleSave(workout)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    saved
                      ? "bg-[#ccff00] border-[#ccff00] text-black"
                      : "bg-[#18181b] border-gray-800 text-white hover:border-gray-700"
                  }`}
                  title="Save Workout"
                >
                  <Bookmark className={`h-5 w-5 ${saved ? "fill-black" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full border-t border-gray-800 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FitLog Logo" className="w-5 h-5 object-contain" />
          <span className="font-black text-white tracking-widest">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </footer>
    </div>
  );
}