/**
 * @fileOverview AI 개인 트레이너 음성 가이드 플로우
 * 
 * 사용자의 운동 정보를 바탕으로 AI가 개인 맞춤형 음성 가이드와 
 * 동기 부여 메시지를 생성하는 Genkit 플로우를 정의합니다.
 * 
 * 주요 기능:
 * - 운동별 음성 가이드 스크립트 생성
 * - 자막 텍스트 생성 (접근성 향상)
 * - 개인 맞춤형 동기 부여 메시지
 * - 올바른 운동 폼 안내
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * AI 개인 트레이너 입력 데이터 스키마
 * 
 * 운동 정보와 사용자 동기 부여 정보를 포함하여
 * AI가 적절한 가이드를 생성할 수 있도록 구조화된 입력을 정의합니다.
 */
const AiPersonalTrainerVoiceGuideInputSchema = z.object({
  workoutDescription: z.string().describe('The description of the workout, including exercises, sets, and reps.'),
  userMotivation: z.string().describe('Information about the user and their fitness goals and motivation.'),
});

/**
 * AI 개인 트레이너 입력 타입
 * Zod 스키마로부터 자동 생성되는 TypeScript 타입
 */
export type AiPersonalTrainerVoiceGuideInput = z.infer<typeof AiPersonalTrainerVoiceGuideInputSchema>;

/**
 * AI 개인 트레이너 출력 데이터 스키마
 * 
 * AI가 생성하는 음성 가이드와 자막의 구조를 정의합니다.
 * 두 가지 형태의 출력을 통해 다양한 사용자 요구에 대응합니다.
 */
const AiPersonalTrainerVoiceGuideOutputSchema = z.object({
  voiceGuidance: z.string().describe('The voice guidance script for the workout.'),
  closedCaptions: z.string().describe('The closed captions for the voice guidance, including motivational prompts.'),
});

/**
 * AI 개인 트레이너 출력 타입
 * Zod 스키마로부터 자동 생성되는 TypeScript 타입
 */
export type AiPersonalTrainerVoiceGuideOutput = z.infer<typeof AiPersonalTrainerVoiceGuideOutputSchema>;

/**
 * AI 개인 트레이너 음성 가이드 생성 함수 (외부 인터페이스)
 * 
 * 서버 액션이나 다른 모듈에서 호출할 수 있는 공개 함수입니다.
 * 내부적으로 Genkit 플로우를 실행합니다.
 * 
 * @param input - 운동 설명과 사용자 동기 부여 정보
 * @returns AI가 생성한 음성 가이드와 자막
 */
export async function aiPersonalTrainerVoiceGuide(input: AiPersonalTrainerVoiceGuideInput): Promise<AiPersonalTrainerVoiceGuideOutput> {
  return aiPersonalTrainerVoiceGuideFlow(input);
}

/**
 * AI 개인 트레이너 프롬프트 정의
 * 
 * AI가 일관되고 효과적인 운동 가이드를 생성할 수 있도록
 * 명확한 지시사항과 맥락을 제공하는 프롬프트를 정의합니다.
 */
const prompt = ai.definePrompt({
  name: 'aiPersonalTrainerVoiceGuidePrompt',
  input: {schema: AiPersonalTrainerVoiceGuideInputSchema},
  output: {schema: AiPersonalTrainerVoiceGuideOutputSchema},
  prompt: `You are an AI personal trainer providing voice guidance and motivational prompts for a user's workout.

  Workout Description: {{{workoutDescription}}}
  User Motivation: {{{userMotivation}}}

  Generate a voice guidance script and closed captions that will help the user maintain proper form and stay motivated during their workout. Be encouraging and positive.
  Do not refer to yourself as an AI, just act as an encouraging trainer.`,
});

/**
 * AI 개인 트레이너 음성 가이드 Genkit 플로우
 * 
 * 실제 AI 모델을 호출하여 음성 가이드를 생성하는 플로우입니다.
 * 입력 검증, AI 호출, 출력 반환의 전체 파이프라인을 관리합니다.
 * 
 * @param input - 검증된 입력 데이터
 * @returns AI가 생성한 음성 가이드와 자막
 */
const aiPersonalTrainerVoiceGuideFlow = ai.defineFlow(
  {
    name: 'aiPersonalTrainerVoiceGuideFlow',
    inputSchema: AiPersonalTrainerVoiceGuideInputSchema,
    outputSchema: AiPersonalTrainerVoiceGuideOutputSchema,
  },
  async input => {
    // 정의된 프롬프트를 사용하여 AI 모델 호출
    const {output} = await prompt(input);
    
    // AI 출력 결과 반환 (null 체크 포함)
    return output!;
  }
);
