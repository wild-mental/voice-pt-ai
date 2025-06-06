# Voice PT AI

Next.js 기반의 AI 개인 트레이너 애플리케이션입니다. Google AI (Genkit)를 활용한 맞춤형 운동 가이드와 음성 안내 기능을 제공합니다.

## 🚀 프로젝트 실행 방법

### 1. 사전 요구사항
- Node.js (18.0.0 이상)
- npm 또는 yarn 패키지 매니저
- Google AI API 키

### 2. 프로젝트 클론 및 설치
```bash
# 저장소 클론
git clone <repository-url>
cd voice-pt-ai

# 의존성 설치
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Google AI API 키 (AI 개인 트레이너 기능용)
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

**참고**: 이 프로젝트는 Google AI (Genkit)만 사용하며, Firebase 설정은 필요하지 않습니다.

### 4. 개발 서버 실행
```bash
# 개발 서버 시작 (포트 9002)
npm run dev

# AI Genkit 개발 서버 (별도 터미널)
npm run genkit:dev
```

개발 서버가 시작되면 [http://localhost:9002](http://localhost:9002)에서 애플리케이션을 확인할 수 있습니다.

### 5. AI 기능 테스트 (선택사항)
AI 개인 트레이너 기능을 개발하거나 테스트할 때 사용:
```bash
# Genkit 파일 변경 감지 모드
npm run genkit:watch
```

Genkit 개발 서버가 실행되면 AI 플로우를 웹 인터페이스에서 직접 테스트할 수 있습니다.

## 📝 사용 가능한 스크립트

- `npm run dev` - 개발 서버 시작 (Turbopack 사용, 포트 9002)
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 코드 검사
- `npm run typecheck` - TypeScript 타입 검사
- `npm run genkit:dev` - AI Genkit 개발 서버
- `npm run genkit:watch` - AI Genkit 파일 변경 감지 모드

## 🏗️ 프로젝트 구조

```
src/
├── app/          # Next.js App Router 페이지
├── components/   # 재사용 가능한 컴포넌트
├── lib/          # 유틸리티 함수 및 설정
├── hooks/        # React 커스텀 훅
├── types/        # TypeScript 타입 정의
├── actions/      # 서버 액션
└── ai/           # AI/Genkit 관련 코드
```

## 🛠️ 주요 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **AI Engine**: Google AI (Genkit) - Gemini 2.0 Flash
- **UI Components**: Radix UI, Lucide React
- **Package Manager**: npm

## 🔧 문제 해결

### 포트 충돌 오류
기본 포트 9002가 사용 중인 경우:
```bash
npm run dev -- -p 3000  # 다른 포트 사용
```

### Google AI API 키 오류
`.env.local` 파일에 `GOOGLE_AI_API_KEY`가 올바르게 설정되었는지 확인하세요. [Google AI Studio](https://aistudio.google.com/app/apikey)에서 API 키를 발급받을 수 있습니다.

## 📖 더 알아보기

프로젝트를 시작하려면 `src/app/page.tsx` 파일을 확인해보세요.
