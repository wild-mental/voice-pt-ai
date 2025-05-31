export interface HealthInfo {
  height: number; // cm
  weight: number; // kg
  bodyFatPercentage?: number; // %
  waistCircumference: number; // cm
  bmi: number; // calculated
  diastolicBloodPressure: number; // mmHg
  systolicBloodPressure: number; // mmHg
  leftThighCircumference?: number; // cm
  rightThighCircumference?: number; // cm
  waistToHeightRatio: number; // calculated
  fitnessGoals: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string; // e.g., "8-12" or "AMRAP"
}

export interface DailyWorkout {
  day: string; // e.g., "Monday", "Day 1"
  workoutName: string; // e.g., "Full Body Strength"
  exercises: Exercise[];
}

export type WorkoutProgram = DailyWorkout[];
