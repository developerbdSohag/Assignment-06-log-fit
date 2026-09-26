"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Workout } from "@/types/fitlog";
import { Clock, Flame, Star, ChevronDown, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.workouts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.calories - b.calories;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <section className="px-8 py-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <p className="text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-3">Workout Library</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase leading-none mb-6">Train with intent. Log every set.</h1>
          <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <a href="#library" className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-semibold px-6 py-3 rounded-md hover:bg-[#b3e600] transition text-sm">
            <span>BROWSE WORKOUTS</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-gray-800 border border-gray-700 rounded-xl h-64 w-full max-w-md flex items-center justify-center text-gray-500">[Hero Image]</div>
        </div>
      </section>

      <section id="library" className="px-8 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide">The Library</h2>
            <p className="text-gray-400 text-sm">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="relative inline-flex items-center bg-[#1a1a1a] border border-gray-700 rounded-md px-3 py-2 text-xs">
            <span className="text-gray-400 mr-2">Sort By:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-transparent text-white outline-none cursor-pointer appearance-none pr-6 font-semibold">
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="h-3 w-3 text-gray-400 absolute right-3 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24 text-[#ccff00] font-medium animate-pulse">Loading workouts…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <Link key={workout.id} href={`/workouts/${workout.id}`} className="bg-[#161616] border border-gray-800 rounded-xl overflow-hidden hover:border-[#ccff00] transition group flex flex-col">
                <div className="h-48 bg-gray-900 relative">
                  <img src={workout.image} alt={workout.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex gap-2 mb-2">
                      {workout.category?.map((cat, idx) => (
                        <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{cat}</span>
                      ))}
                    </div>
                    <h3 className="font-bold text-base uppercase mb-1">{workout.name}</h3>
                    <p className="text-gray-400 text-xs mb-4">{workout.equipment}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-300 pt-3 border-t border-gray-800">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-[#ccff00]" /> {workout.duration} min</span>
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-400" /> {workout.calories} kcal</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" /> {workout.rating}</span>
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