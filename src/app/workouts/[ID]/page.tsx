"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_WORKOUTS } from "@/data/workouts";
import { useFitLog } from "@/context/FitLogContext";
import { ArrowLeft, Check, Bookmark, Calendar, Dumbbell } from "lucide-react";

export const dynamic = "force-dynamic";

export default function WorkoutDetailPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const id = params?.id;

  const { addToPlan, toggleSave, isPlanned, isSaved } = useFitLog() as any;

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

  const workoutsList = MOCK_WORKOUTS as any[];
  
  // Precisely match the clicked workout ID
  const workout = workoutsList.find(
    (w) => String(w.id).trim() === String(id).trim()
  );

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-[#121215] border border-gray-800 rounded-2xl flex items-center justify-center text-[#ccff00] mb-4">
          <Dumbbell className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Workout Not Found</h1>
        <p className="text-gray-400 text-xs mb-6">Could not find workout with ID: {String(id)}</p>
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

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black px-6 md:px-12 py-12 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to workouts</span>
        </Link>

        {/* Main Details Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Unique Workout Image */}
          <div className="lg:col-span-5 bg-[#121215] border border-gray-800/80 rounded-3xl overflow-hidden shadow-2xl p-4">
            <div className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden bg-gray-900">
              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Title, Specs Table, Instructions */}
          <div className="lg:col-span-7 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 text-white">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {workout.description || `A targeted workout utilizing ${workout.equipment || "professional gear"} for maximum strength and conditioning.`}
            </p>

            {/* Category Tags */}
            <div className="flex gap-2 mb-6">
              {workout.category?.map((cat: string, idx: number) => (
                <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>

            {/* Specifications Table */}
            <div className="bg-[#121215] border border-gray-800/80 rounded-2xl overflow-hidden mb-8 shadow-xl">
              <div className="grid grid-cols-2 px-6 py-4 border-b border-gray-800 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Equipment</span>
                <span className="text-white font-bold text-right">{workout.equipment || "Standard Equipment"}</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 border-b border-gray-800 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Difficulty</span>
                <span className="text-white font-bold text-right">{workout.difficulty || "Intermediate"}</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 border-b border-gray-800 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Sets</span>
                <span className="text-white font-bold text-right">{workout.sets || "4"}</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 border-b border-gray-800 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Reps</span>
                <span className="text-white font-bold text-right">{workout.reps || "8-12"}</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 border-b border-gray-800 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Duration</span>
                <span className="text-white font-bold text-right">{workout.duration} min</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 border-b border-gray-800 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Calories</span>
                <span className="text-white font-bold text-right">{workout.calories} kcal</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Rating</span>
                <span className="text-white font-bold text-right">⭐ {workout.rating || "4.8"}</span>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="mb-8">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">
                Instructions
              </h3>
              <ol className="space-y-2 text-xs text-gray-300 leading-relaxed list-decimal list-inside">
                {workout.instructions && workout.instructions.length > 0 ? (
                  workout.instructions.map((step: string, index: number) => (
                    <li key={index} className="pl-1">{step}</li>
                  ))
                ) : (
                  <>
                    <li>Maintain proper form and posture throughout the exercise.</li>
                    <li>Perform smooth, controlled repetitions.</li>
                    <li>Breathe steadily and focus on targeted muscle engagement.</li>
                  </>
                )}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => addToPlan(workout)}
                className={`flex-1 py-4 px-6 rounded-xl border text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                  planned
                    ? "bg-[#ccff00]/10 border-[#ccff00]/30 text-[#ccff00]"
                    : "bg-[#ccff00] border-[#ccff00] text-black hover:bg-[#b3e600] shadow-[#ccff00]/20"
                }`}
              >
                {planned ? <Check className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                {planned ? "Added to Plan" : "Add to today's plan"}
              </button>

              <button
                onClick={() => toggleSave(workout)}
                className={`py-4 px-6 rounded-xl border text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  saved
                    ? "bg-[#ccff00] border-[#ccff00] text-black"
                    : "bg-[#18181b] border-gray-800 text-white hover:border-gray-700"
                }`}
                title="Save for later"
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-black" : ""}`} />
                <span>Save for later</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full border-t border-gray-800 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FitLog Logo" className="w-5 h-5 object-contain" />
          <span className="font-black text-white tracking-widest">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </footer>
    </div>
  );
}