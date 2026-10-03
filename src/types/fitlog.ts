export interface Workout {
  id: number | string;
  name: string;
  category?: string[];
  muscleGroups?: string[];
  equipment: string;
  duration: number; // in minutes
  calories?: number;
  caloriesBurned?: number;
  rating: number;
  difficulty?: string;
  sets?: number;
  reps?: string;
  description?: string;
  instructions?: string[];
  image: string;
}