/**
 * @fileOverview Next.js 설정 파일
 * 
 * Voice PT AI 애플리케이션을 위한 Next.js 프레임워크 설정을 정의합니다.
 * 빌드 최적화, 이미지 처리, TypeScript/ESLint 설정 등을 포함합니다.
 */

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* 추가 설정 옵션들은 여기에 작성 */
  
  // TypeScript 설정
  typescript: {
    // 빌드 시 TypeScript 에러를 무시
    // 개발 단계에서 빠른 빌드를 위해 활성화
    // 프로덕션에서는 비활성화 권장
    ignoreBuildErrors: true,
  },
  
  // ESLint 설정
  eslint: {
    // 빌드 중 ESLint 검사를 건너뜀
    // 개발 단계에서 빠른 빌드를 위해 활성화
    // 프로덕션에서는 비활성화 권장
    ignoreDuringBuilds: true,
  },
  
  // Next.js Image 컴포넌트 설정
  images: {
    // 외부 이미지 도메인 허용 설정
    remotePatterns: [
      {
        protocol: 'https', // HTTPS 프로토콜만 허용
        hostname: 'placehold.co', // placehold.co 도메인 허용 (플레이스홀더 이미지용)
        port: '', // 포트 제한 없음
        pathname: '/**', // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
