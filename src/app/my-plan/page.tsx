"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import { ArrowLeft, Clock, Flame, X, Calendar, Bookmark } from "lucide-react";

export const dynamic = "force-dynamic";

export default function MyPlanPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  // Cast context as any to completely eliminate property mismatch errors
  const { 
    plannedWorkouts = [], 
    savedWorkouts = [], 
    removeFromPlan = () => {}, 
    removeSaved = () => {} 
  } = useFitLog() as any;

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

  const currentList = activeTab === "plan" ? plannedWorkouts : savedWorkouts;

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black px-6 md:px-12 py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#ccff00] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Workouts</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
              My Training Dashboard
            </h1>
            <p className="text-gray-400 text-sm">
              Manage your scheduled daily plan and saved favorite routines.
            </p>
          </div>

          <div className="flex bg-[#121215] border border-gray-800 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "plan"
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Today&apos;s Plan ({plannedWorkouts.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Saved ({savedWorkouts.length})</span>
            </button>
          </div>
        </div>

        {currentList.length === 0 ? (
          <div className="bg-[#121215] border border-gray-800/80 rounded-3xl p-12 text-center shadow-xl">
            <p className="text-gray-400 text-sm mb-4">
              {activeTab === "plan" ? "No workouts added to today's plan yet." : "No saved workouts found."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3e600] transition-all shadow-lg"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {(currentList as any[]).map((workout: any) => (
              <div
                key={workout.id}
                className="bg-[#121215] border border-gray-800/80 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl hover:border-gray-700 transition-all"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-800"
                  />
                  <div>
                    <div className="flex gap-2 mb-1">
                      {workout.category?.slice(0, 1).map((cat: string, idx: number) => (
                        <span key={idx} className="bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider border border-[#ccff00]/20">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">
                      {workout.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.duration}m</span>
                      <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-orange-400" /> {workout.calories}k cal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="px-5 py-3 bg-[#18181b] border border-gray-800 hover:border-gray-700 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => {
                      if (activeTab === "plan") removeFromPlan(Number(workout.id));
                      else removeSaved(Number(workout.id));
                    }}
                    className="bg-[#18181b] hover:bg-red-600/20 hover:border-red-500/50 border border-gray-800 p-3 rounded-xl transition-colors text-gray-400 hover:text-red-400 cursor-pointer"
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