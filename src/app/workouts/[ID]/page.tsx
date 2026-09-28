import Link from "next/link";
import { MOCK_WORKOUTS } from "@/data/workouts";
import WorkoutDetailClient from "./WorkoutDetailClient";
import { Dumbbell } from "lucide-react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (MOCK_WORKOUTS || []).map((workout: any) => ({
    id: String(workout.id),
  }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params?.id;

  const workout = (MOCK_WORKOUTS as any[]).find((w) => String(w.id) === String(id));

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

  return <WorkoutDetailClient workout={workout} />;
}