import type { HealthInfo, WorkoutProgram, Exercise, DailyWorkout } from '@/types/fitness';

// Placeholder function to generate a static 7-day workout program
export function generateWorkoutProgram(healthInfo: HealthInfo): WorkoutProgram {
  // This is a simplified placeholder.
  // In a real app, this would use healthInfo to tailor the program.
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const workoutTemplates: { name: string, exercises: Exercise[] }[] = [
    { 
      name: "Full Body Strength A", 
      exercises: [
        { name: "Squats", sets: 3, reps: "8-12" },
        { name: "Bench Press", sets: 3, reps: "8-12" },
        { name: "Bent Over Rows", sets: 3, reps: "8-12" },
        { name: "Overhead Press", sets: 3, reps: "10-15" },
        { name: "Plank", sets: 3, reps: "30-60s" },
      ]
    },
    { 
      name: "Cardio & Core", 
      exercises: [
        { name: "Running/Jogging", sets: 1, reps: "20-30 min" },
        { name: "Crunches", sets: 3, reps: "15-20" },
        { name: "Leg Raises", sets: 3, reps: "15-20" },
        { name: "Russian Twists", sets: 3, reps: "15-20 per side" },
        { name: "Bicycle Crunches", sets: 3, reps: "20-30" },
      ]
    },
    { 
      name: "Full Body Strength B", 
      exercises: [
        { name: "Deadlifts", sets: 1, reps: "5" }, // Could be 3x5 for strength
        { name: "Pull-ups/Lat Pulldowns", sets: 3, reps: "As many as possible / 8-12" },
        { name: "Dumbbell Lunges", sets: 3, reps: "10-12 per leg" },
        { name: "Push-ups", sets: 3, reps: "As many as possible" },
        { name: "Face Pulls", sets: 3, reps: "15-20" },
      ]
    },
  ];

  // Simple rotation: A, Cardio, B, Rest, A, Cardio, B
  const scheduleIndices = [0, 1, 2, -1, 0, 1, 2]; // -1 for rest day

  return daysOfWeek.map((dayName, index) => {
    const templateIndex = scheduleIndices[index];
    if (templateIndex === -1) {
      return {
        day: dayName,
        workoutName: "Rest Day",
        exercises: [{ name: "Active Recovery / Light Walk", sets: 1, reps: "20-30 min" }]
      };
    }
    const template = workoutTemplates[templateIndex];
    return {
      day: dayName,
      workoutName: template.name,
      exercises: template.exercises,
    };
  });
}

export function formatWorkoutForAI(dailyWorkout: DailyWorkout, healthInfo: HealthInfo): { workoutDescription: string, userMotivation: string } {
  const exerciseDescriptions = dailyWorkout.exercises
    .map(ex => `${ex.name}: ${ex.sets} sets of ${ex.reps} reps`)
    .join('; ');
  const workoutDescription = `Today's workout (${dailyWorkout.day} - ${dailyWorkout.workoutName}): ${exerciseDescriptions}.`;
  const userMotivation = healthInfo.fitnessGoals || "User wants to get fit and healthy.";
  return { workoutDescription, userMotivation };
}
