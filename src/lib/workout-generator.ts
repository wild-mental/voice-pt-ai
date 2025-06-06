/**
 * @fileOverview 운동 프로그램 생성 및 AI 포맷팅 유틸리티
 * 
 * 사용자의 건강 정보를 바탕으로 7일간의 운동 프로그램을 생성하고,
 * AI 개인 트레이너가 이해할 수 있는 형태로 운동 데이터를 포맷팅하는 함수들을 제공합니다.
 */

import type { HealthInfo, WorkoutProgram, Exercise, DailyWorkout } from '@/types/fitness';

/**
 * 사용자의 건강 정보를 바탕으로 7일간의 운동 프로그램을 생성합니다
 * 
 * 현재는 정적인 템플릿 기반으로 운동 프로그램을 생성하지만,
 * 향후 사용자의 건강 정보와 체력 수준을 반영한 맞춤형 프로그램으로 발전시킬 수 있습니다.
 * 
 * @param healthInfo - 사용자의 건강 정보 및 체력 데이터
 * @returns 7일간의 운동 프로그램 (월요일부터 일요일까지)
 * 
 * @example
 * ```typescript
 * const healthData = {
 *   height: 170,
 *   weight: 70,
 *   fitnessGoals: "근력 증가",
 *   // ... 기타 건강 정보
 * };
 * 
 * const program = generateWorkoutProgram(healthData);
 * console.log(program[0]); // 월요일 운동 프로그램
 * ```
 */
export function generateWorkoutProgram(healthInfo: HealthInfo): WorkoutProgram {
  // 현재는 간소화된 플레이스홀더 구현입니다.
  // 실제 애플리케이션에서는 healthInfo를 활용하여 맞춤형 프로그램을 생성해야 합니다.
  
  // 요일 정의
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // 미리 정의된 운동 템플릿들
  // 각 템플릿은 특정 목표에 맞는 운동들로 구성되어 있습니다
  const workoutTemplates: { name: string, exercises: Exercise[] }[] = [
    { 
      name: "Full Body Strength A", // 전신 근력 운동 A
      exercises: [
        { name: "Squats", sets: 3, reps: "8-12" }, // 스쿼트 - 하체 근력
        { name: "Bench Press", sets: 3, reps: "8-12" }, // 벤치 프레스 - 상체 근력
        { name: "Bent Over Rows", sets: 3, reps: "8-12" }, // 벤트오버 로우 - 등 근력
        { name: "Overhead Press", sets: 3, reps: "10-15" }, // 오버헤드 프레스 - 어깨 근력
        { name: "Plank", sets: 3, reps: "30-60s" }, // 플랭크 - 코어 강화
      ]
    },
    { 
      name: "Cardio & Core", // 유산소 및 코어 운동
      exercises: [
        { name: "Running/Jogging", sets: 1, reps: "20-30 min" }, // 런닝/조깅 - 유산소
        { name: "Crunches", sets: 3, reps: "15-20" }, // 크런치 - 복근
        { name: "Leg Raises", sets: 3, reps: "15-20" }, // 레그 레이즈 - 하복부
        { name: "Russian Twists", sets: 3, reps: "15-20 per side" }, // 러시안 트위스트 - 복사근
        { name: "Bicycle Crunches", sets: 3, reps: "20-30" }, // 바이시클 크런치 - 복근
      ]
    },
    { 
      name: "Full Body Strength B", // 전신 근력 운동 B
      exercises: [
        { name: "Deadlifts", sets: 1, reps: "5" }, // 데드리프트 - 강도 높은 근력 운동
        { name: "Pull-ups/Lat Pulldowns", sets: 3, reps: "As many as possible / 8-12" }, // 풀업/랫풀다운
        { name: "Dumbbell Lunges", sets: 3, reps: "10-12 per leg" }, // 덤벨 런지 - 하체
        { name: "Push-ups", sets: 3, reps: "As many as possible" }, // 푸시업 - 상체
        { name: "Face Pulls", sets: 3, reps: "15-20" }, // 페이스 풀 - 후면 삼각근
      ]
    },
  ];

  // 주간 스케줄 패턴: A운동, 유산소, B운동, 휴식, A운동, 유산소, B운동
  // -1은 휴식일을 의미합니다
  const scheduleIndices = [0, 1, 2, -1, 0, 1, 2];

  // 각 요일별로 운동 프로그램을 생성합니다
  return daysOfWeek.map((dayName, index) => {
    const templateIndex = scheduleIndices[index];
    
    // 휴식일 처리
    if (templateIndex === -1) {
      return {
        day: dayName,
        workoutName: "Rest Day", // 휴식일
        exercises: [{ name: "Active Recovery / Light Walk", sets: 1, reps: "20-30 min" }]
      };
    }
    
    // 일반 운동일 처리
    const template = workoutTemplates[templateIndex];
    return {
      day: dayName,
      workoutName: template.name,
      exercises: template.exercises,
    };
  });
}

/**
 * 운동 데이터를 AI 개인 트레이너가 이해할 수 있는 형태로 포맷팅합니다
 * 
 * 일일 운동 프로그램과 사용자 정보를 조합하여 AI가 효과적인 
 * 음성 가이드와 동기 부여 메시지를 생성할 수 있도록 구조화된 텍스트를 만듭니다.
 * 
 * @param dailyWorkout - 특정 날짜의 운동 프로그램
 * @param healthInfo - 사용자의 건강 정보 및 목표
 * @param selectedExercise - 특정 운동에 집중할 경우 해당 운동 정보 (선택적)
 * @returns AI 트레이너용 운동 설명과 사용자 동기 부여 정보
 * 
 * @example
 * ```typescript
 * const dailyWorkout = {
 *   day: "Monday",
 *   workoutName: "Full Body Strength A",
 *   exercises: [...]
 * };
 * 
 * const formatted = formatWorkoutForAI(dailyWorkout, healthInfo);
 * console.log(formatted.workoutDescription); // AI용 운동 설명
 * console.log(formatted.userMotivation); // 사용자 동기 부여 정보
 * ```
 */
export function formatWorkoutForAI(
  dailyWorkout: DailyWorkout, 
  healthInfo: HealthInfo,
  selectedExercise?: Exercise | null // 특정 운동에 집중하는 경우의 선택적 매개변수
): { workoutDescription: string, userMotivation: string } {
  let workoutDescription: string;

  if (selectedExercise) {
    // 특정 운동에 집중하는 경우
    // AI가 해당 운동의 폼, 호흡법, 동기 부여에 집중할 수 있도록 안내
    workoutDescription = `The user is focusing on the exercise: ${selectedExercise.name} (${selectedExercise.sets} sets of ${selectedExercise.reps} reps). Provide detailed guidance on form, breathing, and motivation for this specific exercise.`;
  } else {
    // 전체 일일 운동 프로그램 설명
    // 모든 운동을 세미콜론으로 구분하여 나열
    const exerciseDescriptions = dailyWorkout.exercises
      .map(ex => `${ex.name}: ${ex.sets} sets of ${ex.reps} reps`)
      .join('; ');
    workoutDescription = `Today's workout (${dailyWorkout.day} - ${dailyWorkout.workoutName}): ${exerciseDescriptions}.`;
  }

  // 사용자의 운동 목표를 동기 부여 정보로 활용
  // 목표가 없는 경우 기본 메시지를 사용
  const userMotivation = healthInfo.fitnessGoals || "User wants to get fit and healthy.";
  
  return { workoutDescription, userMotivation };
}
