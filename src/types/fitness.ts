/**
 * @fileOverview 피트니스 및 건강 관련 TypeScript 타입 정의
 * 
 * 이 파일은 AI 개인 트레이너 애플리케이션에서 사용되는
 * 건강 정보, 운동 프로그램, 운동 종목 등의 타입을 정의합니다.
 */

/**
 * 사용자의 건강 정보 및 체력 측정 데이터를 담는 인터페이스
 * 
 * 기본적인 신체 정보부터 선택적인 체력 측정 결과까지 포함하여
 * 개인 맞춤형 운동 프로그램 생성의 기초 데이터로 활용됩니다.
 */
export interface HealthInfo {
  // 기본 신체 정보 (필수)
  height: number; // 신장 (cm)
  weight: number; // 체중 (kg)
  bodyFatPercentage?: number; // 체지방률 (%) - 선택적
  waistCircumference: number; // 허리둘레 (cm)
  bmi: number; // 체질량지수 (자동 계산됨)
  
  // 혈압 정보 (필수) - 운동 강도 결정에 중요
  diastolicBloodPressure: number; // 이완기 혈압 (mmHg)
  systolicBloodPressure: number; // 수축기 혈압 (mmHg)
  
  // 추가 신체 측정 (선택적)
  leftThighCircumference?: number; // 좌측 허벅지 둘레 (cm)
  rightThighCircumference?: number; // 우측 허벅지 둘레 (cm)
  waistToHeightRatio: number; // 허리-신장 비율 (자동 계산됨)
  
  // 사용자 목표 설정
  fitnessGoals: string; // 운동 목표 (체중감량, 근력증가 등)

  // 선택적 체력 측정 결과들
  // 이 데이터들은 더 정확한 운동 프로그램 설계를 위해 사용됩니다
  shuttleRunCount?: number; // 왕복오래달리기 횟수 (회)
  tenMeterShuttleRunTime?: number; // 10M 4회 왕복달리기 시간 (초)
  standingLongJumpCm?: number; // 제자리 멀리뛰기 거리 (cm)
  sitToStandCount?: number; // 의자에 앉았다 일어서기 횟수 (회)
  sixMinuteWalkDistanceM?: number; // 6분 걷기 거리 (m)
  twoMinuteStepCount?: number; // 2분 제자리 걷기 횟수 (회)
  sitAndReachTargetTime?: number; // 의자에 앉아 3M 표적 돌아오기 시간 (초)
  fiveMeterShuttleRunTime?: number; // 5m 4회 왕복달리기 시간 (초)
  repeatedSideStepCount?: number; // 반복옆뛰기 횟수 (회)
  eyeHandWallPassTime?: number; // 눈-손 벽패스 협응력 시간 (초)
}

/**
 * 개별 운동 종목을 정의하는 인터페이스
 * 
 * 각 운동의 이름, 세트 수, 반복 횟수를 포함하며
 * 일일 운동 프로그램의 구성 요소로 사용됩니다.
 */
export interface Exercise {
  name: string; // 운동 이름 (예: "스쿼트", "벤치프레스")
  sets: number; // 세트 수
  reps: string; // 반복 횟수 (예: "8-12" 또는 "AMRAP" - As Many Reps As Possible)
}

/**
 * 하루치 운동 프로그램을 정의하는 인터페이스
 * 
 * 특정 요일에 수행할 운동들의 집합을 나타내며
 * 운동 프로그램의 기본 단위입니다.
 */
export interface DailyWorkout {
  day: string; // 요일 또는 날짜 (예: "Monday", "Day 1")
  workoutName: string; // 운동 프로그램 이름 (예: "Full Body Strength")
  exercises: Exercise[]; // 해당 날짜에 수행할 운동 목록
}

/**
 * 전체 운동 프로그램을 나타내는 타입
 * 
 * 일반적으로 7일간의 주간 운동 계획을 포함하며
 * 각 요일별 운동 프로그램의 배열로 구성됩니다.
 */
export type WorkoutProgram = DailyWorkout[];
