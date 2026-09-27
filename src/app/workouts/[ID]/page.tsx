"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_WORKOUTS } from "@/data/workouts";
import { useFitLog } from "@/context/FitLogContext";
import { ArrowLeft, Clock, Flame, Star, Bookmark, Plus, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const workoutId = parseInt(resolvedParams.id, 10);
  const workout = MOCK_WORKOUTS.find((w) => w.id === workoutId);

  const { addToPlan, toggleSave, isPlanned, isSaved } = useFitLog();

  if (!workout) {
    return notFound();
  }

  const planned = isPlanned(workout.id);
  const savedItem = isSaved(workout.id);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black relative overflow-hidden px-6 md:px-12 py-12">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#ccff00] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Workouts</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#121215] border border-gray-800/80 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-40 z-10" />
              <img 
                src={workout.image} 
                alt={workout.name} 
                className="w-full h-[400px] md:h-[480px] object-cover group-hover:scale-105 transition duration-700 ease-out" 
              />
              <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2">
                {workout.category?.map((cat, idx) => (
                  <span key={idx} className="bg-[#ccff00] text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-normal">
              {workout.description}
            </p>

            <div className="bg-[#121215] border border-gray-800/80 rounded-2xl overflow-hidden mb-8 shadow-xl">
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-800/80 text-xs">
                <div className="p-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider mb-1">Equipment</p>
                  <p className="font-extrabold text-white">{workout.equipment}</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider mb-1">Difficulty</p>
                  <p className="font-extrabold text-[#ccff00]">{workout.difficulty}</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider mb-1">Prescription</p>
                  <p className="font-extrabold text-white">{workout.sets} Sets x {workout.reps}</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 font-bold uppercase tracking-wider mb-1">Performance</p>
                  <div className="flex items-center gap-3 text-white font-extrabold">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.duration}m</span>
                    <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-orange-400" /> {workout.calories}k</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400/20" /> {workout.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#ccff00] mb-3">
                Execution Instructions
              </h3>
              <ol className="space-y-2.5 text-gray-300 text-sm">
                {workout.instructions?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-[#121215]/60 border border-gray-800/50 p-3.5 rounded-xl">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#18181b] border border-gray-700 flex items-center justify-center text-[10px] font-extrabold text-[#ccff00]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={() => addToPlan(workout)}
                disabled={planned}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  planned 
                    ? "bg-[#18181b] border border-gray-800 text-gray-500 cursor-not-allowed" 
                    : "bg-[#ccff00] text-black hover:bg-[#b3e600] hover:scale-[1.02] shadow-lg shadow-[#ccff00]/20"
                }`}
              >
                {planned ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Today&apos;s Plan</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleSave(workout)}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  savedItem 
                    ? "bg-[#ccff00] text-black border border-[#ccff00]" 
                    : "bg-[#121215] border border-gray-800 hover:border-gray-600 text-white"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${savedItem ? "fill-black" : ""}`} />
                <span>{savedItem ? "Saved" : "Save for later"}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}