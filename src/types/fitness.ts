
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

  // Optional Fitness Test Metrics
  shuttleRunCount?: number; // 왕복오래달리기 (회)
  tenMeterShuttleRunTime?: number; // 10M 4회 왕복달리기 (초)
  standingLongJumpCm?: number; // 제자리 멀리뛰기 (cm)
  sitToStandCount?: number; // 의자에 앉았다 일어서기 (회)
  sixMinuteWalkDistanceM?: number; // 6분 걷기 (m)
  twoMinuteStepCount?: number; // 2분 제자리 걷기 (회)
  sitAndReachTargetTime?: number; // 의자에 앉아 3M 표적 돌아오기 (초)
  fiveMeterShuttleRunTime?: number; // 5m 4회 왕복달리기 (초)
  repeatedSideStepCount?: number; // 반복옆뛰기 (회)
  eyeHandWallPassTime?: number; // 눈-손 벽패스 협응력 (초)
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
