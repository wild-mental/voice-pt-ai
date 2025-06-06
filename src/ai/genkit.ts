/**
 * @fileOverview Google AI Genkit 설정 및 초기화
 * 
 * AI 개인 트레이너 기능을 위한 Google AI (Genkit) 인스턴스를 설정하고 초기화합니다.
 * Gemini 2.0 Flash 모델을 사용하여 운동 가이드 및 동기 부여 메시지를 생성합니다.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

/**
 * AI 개인 트레이너를 위한 Genkit 인스턴스
 * 
 * Google AI의 Gemini 2.0 Flash 모델을 사용하도록 구성되어 있으며,
 * 애플리케이션 전반에서 AI 기능을 호출할 때 사용됩니다.
 * 
 * 환경 변수 GOOGLE_AI_API_KEY가 필요합니다.
 * 
 * @example
 * ```typescript
 * // AI 플로우나 프롬프트에서 사용
 * const result = await ai.generate({
 *   prompt: "운동 가이드를 생성해주세요",
 *   // 기타 옵션들...
 * });
 * ```
 */
export const ai = genkit({
  plugins: [googleAI()], // Google AI 플러그인 활성화
  model: 'googleai/gemini-2.0-flash', // 사용할 AI 모델 지정
});
