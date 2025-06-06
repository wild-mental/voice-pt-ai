/**
 * @fileOverview AI 개인 트레이너 서버 액션
 * 
 * 클라이언트에서 AI 개인 트레이너 기능을 호출할 수 있도록 하는 서버 액션을 정의합니다.
 * Next.js의 'use server' 지시문을 사용하여 서버 사이드에서 실행되는 함수들을 포함합니다.
 */

'use server';

import { aiPersonalTrainerVoiceGuide, type AiPersonalTrainerVoiceGuideInput, type AiPersonalTrainerVoiceGuideOutput } from '@/ai/flows/ai-personal-trainer-voice-guide';

/**
 * AI 개인 트레이너로부터 운동 가이드를 받아오는 서버 액션
 * 
 * 사용자의 운동 정보와 동기 부여 정보를 바탕으로 AI가 생성한
 * 음성 가이드와 자막을 반환합니다. 입력 검증과 에러 처리를 포함합니다.
 * 
 * @param input - AI 트레이너에게 전달할 운동 설명과 사용자 동기 정보
 * @param input.workoutDescription - 운동에 대한 상세 설명 (운동 종목, 세트, 반복 등)
 * @param input.userMotivation - 사용자의 피트니스 목표 및 동기 부여 정보
 * @returns AI가 생성한 음성 가이드와 자막 텍스트
 * @throws {Error} AI 호출 실패 시 일반적인 에러 메시지를 반환
 * 
 * @example
 * ```typescript
 * // 클라이언트에서 호출 예시
 * const result = await getAiTrainerGuidance({
 *   workoutDescription: "Today's workout: Squats 3 sets of 8-12 reps; Push-ups 3 sets of AMRAP",
 *   userMotivation: "User wants to build muscle strength and improve overall fitness"
 * });
 * 
 * console.log(result.voiceGuidance); // AI 음성 가이드 스크립트
 * console.log(result.closedCaptions); // 자막 텍스트
 * ```
 */
export async function getAiTrainerGuidance(input: AiPersonalTrainerVoiceGuideInput): Promise<AiPersonalTrainerVoiceGuideOutput> {
  try {
    // 입력 데이터 검증 및 기본값 설정
    // undefined나 null 값을 방지하여 AI 플로우의 안정적인 실행을 보장합니다
    const validatedInput: AiPersonalTrainerVoiceGuideInput = {
      workoutDescription: input.workoutDescription || "No workout description provided.",
      userMotivation: input.userMotivation || "General fitness motivation.",
    };
    
    // AI 개인 트레이너 플로우 실행
    const result = await aiPersonalTrainerVoiceGuide(validatedInput);
    return result;
  } catch (error) {
    // 에러 로깅 (서버 로그에 상세 정보 기록)
    console.error("Error getting AI trainer guidance:", error);
    
    // 클라이언트에게는 일반적인 에러 메시지만 전달
    // 보안상 내부 에러 세부사항은 노출하지 않습니다
    throw new Error("Failed to get AI trainer guidance. Please try again.");
  }
}
