"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import { Clock, Flame, Star, X, ArrowRight } from "lucide-react";

export default function MyPlanPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const { plan, saved, removeFromPlan, removeSaved } = useFitLog();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("plan");
    }
  }, [tabParam]);

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.calories - a.calories;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + curr.calories, 0);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black relative overflow-hidden px-6 md:px-12 py-12">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#18181b] border border-gray-800 px-3 py-1 rounded-full text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            Performance Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">My Plan</h1>
          <p className="text-gray-400 text-sm md:text-base">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-gray-700 transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ccff00]/5 rounded-full blur-xl group-hover:bg-[#ccff00]/10 transition" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Active Exercises</p>
            <p className="text-4xl font-black text-[#ccff00]">{totalExercises}</p>
          </div>
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-gray-700 transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Duration</p>
            <p className="text-4xl font-black text-white">{totalMinutes} <span className="text-sm font-normal text-gray-400">min</span></p>
          </div>
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-gray-700 transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Energy Burn</p>
            <p className="text-4xl font-black text-white">{totalCalories} <span className="text-sm font-normal text-gray-400">kcal</span></p>
          </div>
        </div>

        {/* Tab Switcher & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-gray-800/80 pb-6">
          <div className="flex gap-2 bg-[#121215] p-1.5 rounded-xl border border-gray-800/80 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "plan" 
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({plan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "saved" 
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          <div className="flex items-center gap-3 bg-[#121215] border border-gray-800/80 rounded-xl px-4 py-2.5 text-xs">
            <span className="text-gray-400 font-semibold uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white outline-none font-bold cursor-pointer pr-2"
            >
              <option value="duration" className="bg-[#121215] text-white">Duration (Shortest)</option>
              <option value="calories" className="bg-[#121215] text-white">Calories (Highest)</option>
              <option value="rating" className="bg-[#121215] text-white">Rating (Top Rated)</option>
            </select>
          </div>
        </div>

        {/* List Items or Empty State */}
        {sortedList.length === 0 ? (
          <div className="bg-[#121215] border border-dashed border-gray-800 rounded-3xl py-24 px-8 text-center flex flex-col items-center justify-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#18181b] border border-gray-800 flex items-center justify-center mb-4 text-[#ccff00]">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider mb-2 text-white">
              Nothing here yet
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-8 max-w-sm">
              Browse the library and add lifts to power up your daily performance routine.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black text-xs font-extrabold px-8 py-4 rounded-xl hover:bg-[#b3e600] hover:scale-105 transition-all shadow-lg shadow-[#ccff00]/20 cursor-pointer"
            >
              <span>Go to workouts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((workout) => (
              <div 
                key={workout.id} 
                className="bg-[#121215] border border-gray-800/80 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#ccff00]/40 hover:shadow-[0_10px_30px_rgba(204,255,0,0.08)] transition-all duration-300 group"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-gray-900 border border-gray-800 flex-shrink-0">
                    <img src={workout.image} alt={workout.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base uppercase tracking-wide mb-1 group-hover:text-[#ccff00] transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mb-3">{workout.equipment}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-300 font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.duration} min</span>
                      <span className="flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-orange-400" /> {workout.calories} kcal</span>
                      <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400/20" /> {workout.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link 
                    href={`/workouts/${workout.id}`} 
                    className="border border-gray-700/80 hover:border-[#ccff00] text-gray-300 hover:text-[#ccff00] text-xs font-extrabold px-5 py-3 rounded-xl transition-all"
                  >
                    View Details
                  </Link>
                  <button
                      onClick={() => {
                        if (activeTab === "plan") removeFromPlan(Number(workout.id));
                        else removeSaved(Number(workout.id));
                      }}
                      className="bg-[#18181b] hover:bg-red-600/20 hover:border-red-500/50 border border-gray-800 p-2.5 rounded-xl transition-colors text-gray-400 hover:text-red-400 cursor-pointer"
                      title="Remove item"
                    >
                      <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}