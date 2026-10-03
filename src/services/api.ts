import { Workout } from "@/types/fitlog";
import { MOCK_WORKOUTS } from "@/data/workouts";

const PRIMARY_API_URL = "https://api.abcz.workers.dev/api/fitlog";
const ALT_API_URL = "https://api.api-store.workers.dev/api/fitlog";

export function normalizeWorkout(raw: any): Workout {
  const category = raw.muscleGroups || raw.category || [];
  const calories = Number(raw.caloriesBurned ?? raw.calories) || 0;
  return {
    ...raw,
    category,
    muscleGroups: category,
    calories,
    caloriesBurned: calories,
    duration: Number(raw.duration) || 0,
    rating: Number(raw.rating) || 4.5,
  };
}

export async function fetchWorkouts(): Promise<Workout[]> {
  // 1. Try Primary API
  try {
    const res = await fetch(PRIMARY_API_URL, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeWorkout);
      }
    }
  } catch (err) {
    console.warn("Primary API failed, attempting alternative API...", err);
  }

  // 2. Try Alternative API
  try {
    const res = await fetch(ALT_API_URL, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeWorkout);
      }
    }
  } catch (err) {
    console.warn("Alternative API failed, using fallback data...", err);
  }

  // 3. Fallback to Local Mock Data
  return (MOCK_WORKOUTS as any[]).map(normalizeWorkout);
}

export async function fetchWorkoutById(id: string | number): Promise<Workout | null> {
  const cleanId = String(id).trim();

  // 1. Try Primary Single API
  try {
    const res = await fetch(`${PRIMARY_API_URL}/${cleanId}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.id || data.name)) {
        return normalizeWorkout(data);
      }
    }
  } catch (err) {
    console.warn(`Primary single API failed for ID ${cleanId}, attempting alternative...`, err);
  }

  // 2. Try Alternative Single API
  try {
    const res = await fetch(`${ALT_API_URL}/${cleanId}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.id || data.name)) {
        return normalizeWorkout(data);
      }
    }
  } catch (err) {
    console.warn(`Alternative single API failed for ID ${cleanId}, falling back...`, err);
  }

  // 3. Try to find in full workouts list or mock data
  const fallbackList = (MOCK_WORKOUTS as any[]).map(normalizeWorkout);
  const found = fallbackList.find((w) => String(w.id).trim() === cleanId);
  return found || null;
}
