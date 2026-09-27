export const MOCK_WORKOUTS = [
  {
    id: 1,
    name: "BARBELL BENCH PRESS",
    category: ["CHEST", "ARMS"],
    equipment: "Barbell, Bench",
    duration: 25,
    calories: 180,
    rating: 4.8,
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    description: "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    instructions: [
      "Lie on the bench with eyes under the bar and feet planted.",
      "Unrack with locked elbows and lower the bar to mid-chest.",
      "Press up in a slight arc until elbows lock without bouncing.",
      "Keep shoulder blades pinched and a natural arch in the back."
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "PULL-UP",
    category: ["BACK", "ARMS"],
    equipment: "Pull-up Bar",
    duration: 15,
    calories: 120,
    rating: 4.7,
    difficulty: "Intermediate",
    sets: 3,
    reps: "8-10",
    description: "A classic upper body pulling exercise targeting the latissimus dorsi and biceps.",
    instructions: [
      "Grip the bar slightly wider than shoulder-width.",
      "Hang with fully extended arms and engaged core.",
      "Pull yourself up until your chin clears the bar.",
      "Lower yourself back down with control."
    ],
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "BACK SQUAT",
    category: ["LEGS", "CORE"],
    equipment: "Barbell, Rack",
    duration: 30,
    calories: 240,
    rating: 4.9,
    difficulty: "Advanced",
    sets: 5,
    reps: "5",
    description: "The king of lower body exercises, building absolute strength in quads, glutes, and core.",
    instructions: [
      "Position the bar across your upper back/traps.",
      "Unrack the step back and set your stance shoulder-width apart.",
      "Break at the hips and knees, descending until thighs are parallel to the floor.",
      "Drive through your mid-foot to return to the starting position."
    ],
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "OVERHEAD PRESS",
    category: ["SHOULDERS", "ARMS"],
    equipment: "Barbell",
    duration: 20,
    calories: 150,
    rating: 4.6,
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    description: "A strict vertical press that builds shoulder mass, stability, and total body tension.",
    instructions: [
      "Hold the bar at shoulder height with a full grip.",
      "Brace your core, glutes, and quads tightly.",
      "Press the bar straight up overhead, moving your head back slightly to clear it.",
      "Lock out overhead and return smoothly to your chest."
    ],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "DUMBBELL BICEP CURL",
    category: ["ARMS"],
    equipment: "Dumbbells",
    duration: 12,
    calories: 80,
    rating: 4.3,
    difficulty: "Beginner",
    sets: 3,
    reps: "10-12",
    description: "An isolation movement designed to build bicep peak and arm size.",
    instructions: [
      "Hold dumbbells by your sides with palms facing forward.",
      "Keep your elbows pinned to your torso.",
      "Curl the weights up toward your shoulders, squeezing at the top.",
      "Lower slowly back to full extension."
    ],
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "HOLLOW-BODY PLANK",
    category: ["CORE"],
    equipment: "Bodyweight",
    duration: 10,
    calories: 60,
    rating: 4.4,
    difficulty: "Beginner",
    sets: 3,
    reps: "60 sec",
    description: "An intense isometric core hold that strengthens deep abdominal walls.",
    instructions: [
      "Get into a standard forearm plank position.",
      "Tuck your pelvis under and squeeze your glutes hard.",
      "Draw your belly button in toward your spine.",
      "Hold rigid without letting your hips sag."
    ],
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "CONVENTIONAL DEADLIFT",
    category: ["BACK", "LEGS"],
    equipment: "Barbell",
    duration: 28,
    calories: 280,
    rating: 4.9,
    difficulty: "Advanced",
    sets: 3,
    reps: "5",
    description: "A foundational pull movement engaging the entire posterior chain.",
    instructions: [
      "Stand with feet hip-width apart, barbell over mid-foot.",
      "Hinge at the hips and grip the bar just outside your legs.",
      "Flatten your back, engage your lats, and pull the slack out of the bar.",
      "Drive the floor away and lock your hips out at the top."
    ],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "PUSH-UP",
    category: ["CHEST", "ARMS", "CORE"],
    equipment: "Bodyweight",
    duration: 10,
    calories: 90,
    rating: 4.5,
    difficulty: "Beginner",
    sets: 3,
    reps: "15-20",
    description: "A bodyweight staple for chest, shoulders, and triceps development.",
    instructions: [
      "Place hands slightly wider than shoulder-width apart.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest until it's just above the floor.",
      "Press back up explosively."
    ],
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=800"
  },
{
    id: 9,
    name: "WALKING LUNGE",
    category: ["LEGS"],
    equipment: "Dumbbells (optional)",
    duration: 15,
    calories: 170,
    rating: 4.4,
    difficulty: "Intermediate",
    sets: 3,
    reps: "12 per leg",
    description: "A dynamic lower body movement enhancing unilateral leg strength and balance.",
    instructions: [
      "Step forward with one leg and lower your hips until both knees bend at 90 degrees.",
      "Push off your front foot to step forward into the next lunge.",
      "Maintain an upright torso throughout."
    ],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    name: "RUSSIAN TWIST",
    category: ["CORE"],
    equipment: "Medicine Ball",
    duration: 8,
    calories: 70,
    rating: 4.1,
    difficulty: "Beginner",
    sets: 3,
    reps: "20",
    description: "A rotational core exercise targeting the obliques.",
    instructions: [
      "Sit on the floor with knees bent and lean back slightly.",
      "Lift your feet off the ground for an added challenge.",
      "Rotate your torso from side to side, touching the weight to the floor."
    ],
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    name: "KETTLEBELL SWING",
    category: ["CORE", "LEGS"],
    equipment: "Kettlebell",
    duration: 15,
    calories: 190,
    rating: 4.7,
    difficulty: "Intermediate",
    sets: 4,
    reps: "15-20",
    description: "An explosive ballistic exercise that builds power, conditioning, and posterior chain strength.",
    instructions: [
      "Stand with feet wider than shoulder-width, kettlebell on the floor in front of you.",
      "Hinge at your hips and grab the kettlebell with both hands.",
      "Hike the bell back between your legs, then snap your hips forward to propel it to chest height.",
      "Let the bell swing back down naturally between your legs and immediately repeat."
    ],
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    name: "TRICEP DIPS",
    category: ["ARMS", "CHEST"],
    equipment: "Parallel Bars",
    duration: 12,
    calories: 110,
    rating: 4.6,
    difficulty: "Intermediate",
    sets: 3,
    reps: "10-12",
    description: "A powerful bodyweight exercise targeting the triceps, lower chest, and anterior deltoids.",
    instructions: [
      "Grab the parallel bars and lift yourself up with locked arms.",
      "Lean your torso forward slightly and bend your elbows to lower your body.",
      "Descend until your shoulders are below your elbows.",
      "Press back up forcefully to the starting position."
    ],
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800"
  }
];