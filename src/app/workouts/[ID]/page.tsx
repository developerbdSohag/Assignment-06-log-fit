"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Workout } from "@/types/fitlog";
import { useFitLog } from "@/context/FitLogContext";
import { Plus, Bookmark } from "lucide-react";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, toggleSave, isSaved, isPlanned } = useFitLog();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">Loading workout details...</div>;
  if (!workout) return <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">Workout not found.</div>;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-8 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
          <img src={workout.image} alt={workout.name} className="w-full h-auto object-cover" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-3">{workout.name}</h1>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">{workout.description}</p>
          <div className="flex gap-2 mb-6">
            {workout.category?.map((cat, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase">{cat}</span>
            ))}
          </div>
          <div className="bg-[#161616] border border-gray-800 rounded-xl overflow-hidden mb-8 text-xs">
            {[
              { label: "EQUIPMENT", value: workout.equipment },
              { label: "DIFFICULTY", value: workout.difficulty || "Intermediate" },
              { label: "SETS", value: workout.sets || 4 },
              { label: "REPS", value: workout.reps || "6-8" },
              { label: "DURATION", value: `${workout.duration} min` },
              { label: "CALORIES", value: `${workout.calories} kcal` },
              { label: "RATING", value: workout.rating },
            ].map((spec, idx) => (
              <div key={idx} className="flex justify-between px-5 py-3 border-b border-gray-800 last:border-none">
                <span className="text-gray-400 font-semibold">{spec.label}</span>
                <span className="text-white font-bold">{spec.value}</span>
              </div>
            ))}
          </div>
          {workout.instructions && (
            <div className="mb-8">
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-[#ccff00]">Instructions</h3>
              <ol className="space-y-3 text-xs text-gray-300 list-decimal list-inside">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => { addToPlan(workout); alert("Added to today's plan"); }} className="flex-1 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#b3e600] transition text-sm">
              <Plus className="h-4 w-4" />
              <span>{isPlanned(workout.id) ? "Added to Plan" : "Add to today's plan"}</span>
            </button>
            <button onClick={() => { toggleSave(workout); alert("Saved status updated"); }} className="flex-1 border border-gray-700 bg-transparent text-white font-bold px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:border-[#ccff00] transition text-sm">
              <Bookmark className="h-4 w-4" />
              <span>{isSaved(workout.id) ? "Saved" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}