"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MOCK_WORKOUTS } from "@/data/workouts";
import { useFitLog } from "@/context/FitLogContext";
import { Search, Clock, Flame, Check, Plus, Bookmark } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter workouts by name or tags
  const filteredWorkouts = (MOCK_WORKOUTS as any[]).filter((workout) => {
    const query = searchQuery.toLowerCase();
    const matchesName = workout.name.toLowerCase().includes(query);
    const matchesTag = workout.category?.some((cat: string) => cat.toLowerCase().includes(query));
    return matchesName || matchesTag;
  });

  const scrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const libraryElement = document.getElementById("library-section");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#ccff00] selection:text-black px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#121215] border border-gray-800/80 p-8 md:p-12 mb-12 shadow-2xl flex flex-col md:flex-row items-center justify-between">
          <div className="relative z-10 max-w-xl">
            <p className="text-[#ccff00] text-xs font-extrabold uppercase tracking-widest mb-3">
              Workout Library
            </p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 leading-none">
              Train with intent. Log every set.
            </h1>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library-section"
              onClick={scrollToLibrary}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3e600] transition-all shadow-lg shadow-[#ccff00]/25 cursor-pointer"
            >
              Browse Workouts
            </a>
          </div>

          <div className="mt-8 md:mt-0 relative w-full md:w-96 h-72 flex items-center justify-center">
            <img
              src="/banner.png"
              alt="Gym Training"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Section Header & Search Bar */}
        <div id="library-section" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pt-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-white mb-1">
              The Library
            </h2>
            <p className="text-gray-400 text-xs">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121215] border border-gray-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout: any) => {
            const planned = isPlanned(workout.id);
            const saved = isSaved(workout.id);

            return (
              <div
                key={workout.id}
                className="bg-[#121215] border border-gray-800/80 rounded-3xl overflow-hidden shadow-xl flex flex-col group hover:border-gray-700 transition-all duration-300"
              >
                <Link href={`/workouts/${workout.id}`} className="relative h-52 overflow-hidden bg-gray-900 block">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-3">
                    {workout.category?.map((cat: string, idx: number) => (
                      <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        {cat}
                      </span>
                    ))}
                  </div>

                  <Link href={`/workouts/${workout.id}`}>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-1 group-hover:text-[#ccff00] transition-colors">
                      {workout.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-xs mb-6">
                    {workout.equipment || workout.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-800/80 mt-auto mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-orange-400" /> {workout.calories} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      ⭐ {workout.rating || "4.8"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex-1 bg-[#18181b] border border-gray-800 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-gray-800 text-center transition-colors"
                  >
                    Details
                  </Link>

                    <button
                      onClick={() => addToPlan(workout)}
                      className={`px-5 py-3 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        planned
                          ? "bg-[#ccff00]/10 border-[#ccff00]/30 text-[#ccff00]"
                          : "bg-[#ccff00] border-[#ccff00] text-black hover:bg-[#b3e600]"
                      }`}
                    >
                      {planned ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {planned ? "ADDED" : "+ ADD"}
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