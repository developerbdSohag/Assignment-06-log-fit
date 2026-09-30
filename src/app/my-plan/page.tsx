"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import { Clock, Flame, X, Calendar, Bookmark, ChevronDown } from "lucide-react";

export const dynamic = "force-dynamic";

function MyPlanContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<string>("Duration");

  const { plannedWorkouts = [], savedWorkouts = [], removeFromPlan = () => {}, removeSaved = () => {} } = useFitLog() as any;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (tabParam === "saved" || tabParam === "plan") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const rawList = activeTab === "plan" ? plannedWorkouts : savedWorkouts;

  // Sort list dynamically based on dropdown selection
  const currentList = [...rawList].sort((a: any, b: any) => {
    if (sortBy === "Duration") {
      return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    } else if (sortBy === "Calories") {
      return (Number(b.calories) || 0) - (Number(a.calories) || 0);
    } else if (sortBy === "Rating") {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    } else if (sortBy === "Name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc: number, curr: any) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = currentList.reduce((acc: number, curr: any) => acc + (Number(curr.calories) || 0), 0);

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
          My Plan
        </h1>
        <p className="text-gray-400 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Exercises</p>
          <p className="text-4xl font-black text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Minutes</p>
          <p className="text-4xl font-black text-white">{totalMinutes}</p>
        </div>
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Calories</p>
          <p className="text-4xl font-black text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs Toggle and Sort By Dropdown */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex bg-[#121215] border border-gray-800 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Calendar className="h-4 w-4" />
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
            <Bookmark className="h-4 w-4" />
            <span>Saved ({savedWorkouts.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3 bg-[#121215] border border-gray-800 px-4 py-2 rounded-2xl">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#18181b] border border-gray-700 text-white text-xs font-bold rounded-xl px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
              <option value="Name">Name</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* List Content with Smooth Foam/Hover Effect */}
      {currentList.length === 0 ? (
        <div className="bg-[#121215] border border-gray-800/80 border-dashed rounded-3xl p-16 text-center shadow-xl">
          <h3 className="text-xl font-black uppercase tracking-wider mb-2">Nothing here yet</h3>
          <p className="text-gray-400 text-xs mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3e600] transition-all shadow-lg"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((workout: any) => (
            <div
              key={workout.id}
              className="bg-[#121215] border border-gray-800/80 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl hover:bg-[#18181b]/90 hover:border-gray-700 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 ease-out"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Link href={`/workouts/${workout.id}`} className="shrink-0">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-800"
                  />
                </Link>
                <div>
                  <Link href={`/workouts/${workout.id}`}>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white hover:text-[#ccff00] transition-colors mb-1">
                      {workout.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-400 mb-2">{workout.equipment || workout.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#ccff00]" /> {workout.duration} min</span>
                    <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-orange-400" /> {workout.calories} kcal</span>
                    <span>⭐ {workout.rating || "4.8"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="bg-[#18181b] border border-gray-800 text-white font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-gray-800 text-center transition-colors"
                >
                  Details
                </Link>
                <button
                  onClick={() => {
                    if (activeTab === "plan") removeFromPlan(workout.id);
                    else removeSaved(workout.id);
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
  );
}

export default function MyPlanPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black px-6 md:px-12 py-12 flex flex-col justify-between">
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <MyPlanContent />
      </Suspense>
    </div>
  );
}