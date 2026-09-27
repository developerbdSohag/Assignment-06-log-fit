"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MOCK_WORKOUTS } from "@/data/workouts";
import { useFitLog } from "@/context/FitLogContext";
import { Search, Flame, Clock, Star, Plus, Check, Bookmark, Dumbbell } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addToPlan, toggleSave, isPlanned, isSaved } = useFitLog();

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

  const categories = ["All", "Strength", "Cardio", "HIIT", "Core"];

  const filteredWorkouts = MOCK_WORKOUTS.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workout.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || workout.category?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#121215] to-[#18181b] border border-gray-800/80 p-8 md:p-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] text-xs font-extrabold uppercase tracking-widest mb-4">
              <Dumbbell className="h-3.5 w-3.5" />
              <span>Elite Training Library</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              Train with <span className="text-[#ccff00]">Intent</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              Discover professional-grade gym routines, track your daily schedule, and build your ultimate workout program.
            </p>
            <Link
              href="/my-plan"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3e600] transition-all shadow-lg shadow-[#ccff00]/20"
            >
              View My Plan & Saved Workouts
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121215] border border-gray-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
                    : "bg-[#121215] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => {
            const planned = isPlanned(workout.id);
            const saved = isSaved(workout.id);

            return (
              <div
                key={workout.id}
                className="bg-[#121215] border border-gray-800/80 rounded-3xl overflow-hidden shadow-xl flex flex-col group hover:border-gray-700 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden bg-gray-900">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {workout.category?.slice(0, 1).map((cat, idx) => (
                      <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-[#ccff00] transition-colors">
                    {workout.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-6 leading-relaxed">
                    {workout.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-800/80 mb-6 text-center text-xs">
                    <div>
                      <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">Time</p>
                      <p className="font-extrabold text-white flex items-center justify-center gap-1"><Clock className="h-3 w-3 text-[#ccff00]" /> {workout.duration}m</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">Burn</p>
                      <p className="font-extrabold text-white flex items-center justify-center gap-1"><Flame className="h-3 w-3 text-orange-400" /> {workout.calories}k</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">Level</p>
                      <p className="font-extrabold text-[#ccff00]">{workout.difficulty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="flex-1 bg-[#18181b] border border-gray-800 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-gray-800 text-center transition-colors"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => addToPlan(workout)}
                      disabled={planned}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        planned
                          ? "bg-[#18181b] border-gray-800 text-[#ccff00] cursor-not-allowed"
                          : "bg-[#ccff00] border-[#ccff00] text-black hover:bg-[#b3e600]"
                      }`}
                      title="Add to Plan"
                    >
                      {planned ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>

                    <button
                      onClick={() => toggleSave(workout)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        saved
                          ? "bg-[#ccff00] border-[#ccff00] text-black"
                          : "bg-[#18181b] border-gray-800 text-white hover:border-gray-700"
                      }`}
                      title="Save Workout"
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? "fill-black" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}