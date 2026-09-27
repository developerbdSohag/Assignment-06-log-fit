export interface Workout {
  id: number | string;
  name: string;
  category: string[];
  equipment: string;
  duration: number; // in minutes
  calories: number;
  rating: number;
  difficulty?: string;
  sets?: number;
  reps?: string;
  description?: string;
  instructions?: string[];
  image: string;
}