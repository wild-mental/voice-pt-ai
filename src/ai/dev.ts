/**
 * @fileOverview AI 개발 환경 설정 및 초기화
 * 
 * Genkit AI 개발 서버를 위한 환경 변수 로딩과 AI 플로우 파일 임포트를 담당합니다.
 * npm run genkit:dev 또는 npm run genkit:watch 명령어로 실행됩니다.
 */

// 환경 변수 로딩
// .env.local 파일의 GOOGLE_AI_API_KEY 등을 로드합니다
import { config } from 'dotenv';
config();

// AI 개인 트레이너 플로우 임포트
// 이 파일을 임포트함으로써 Genkit 개발 서버에서 해당 플로우를 사용할 수 있게 됩니다
import '@/ai/flows/ai-personal-trainer-voice-guide.ts';