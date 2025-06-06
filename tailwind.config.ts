/**
 * @fileOverview Tailwind CSS 설정 파일
 * 
 * Voice PT AI 애플리케이션을 위한 Tailwind CSS 커스텀 설정을 정의합니다.
 * 다크 모드, 커스텀 컬러 시스템, 폰트, 애니메이션 등을 포함합니다.
 */

import type {Config} from 'tailwindcss';

export default {
  // 클래스 기반 다크 모드 활성화
  // 'dark' 클래스가 적용된 요소에서 다크 모드 스타일 적용
  darkMode: ['class'],
  
  // Tailwind가 스캔할 파일 경로 지정
  // 이 경로들에서 사용된 클래스만 최종 CSS에 포함됩니다
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Pages 디렉토리
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // 컴포넌트 디렉토리
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // App Router 디렉토리
  ],
  
  theme: {
    extend: {
      // 커스텀 폰트 패밀리 정의
      fontFamily: {
        body: ['Inter', 'sans-serif'], // 본문용 폰트
        headline: ['Inter', 'sans-serif'], // 제목용 폰트
        code: ['monospace'], // 코드용 폰트
      },
      
      // 커스텀 컬러 시스템 (CSS 변수 기반)
      // CSS 변수를 사용하여 라이트/다크 모드 자동 전환 지원
      colors: {
        // 기본 배경 및 텍스트 색상
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // 카드 컴포넌트용 색상
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        
        // 팝오버 컴포넌트용 색상
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        
        // 주요 브랜드 색상
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        
        // 보조 색상
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        
        // 음소거된(흐린) 색상
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        
        // 강조 색상
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        
        // 위험/삭제 액션용 색상
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        
        // UI 요소 색상들
        border: 'hsl(var(--border))', // 테두리 색상
        input: 'hsl(var(--input))', // 입력 필드 색상
        ring: 'hsl(var(--ring))', // 포커스 링 색상
        
        // 차트 컴포넌트용 색상 팔레트
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        
        // 사이드바 컴포넌트용 색상
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      
      // 커스텀 보더 라디우스 (CSS 변수 기반)
      // 일관된 둥근 모서리를 위한 설정
      borderRadius: {
        lg: 'var(--radius)', // 큰 라디우스
        md: 'calc(var(--radius) - 2px)', // 중간 라디우스
        sm: 'calc(var(--radius) - 4px)', // 작은 라디우스
      },
      
      // 커스텀 애니메이션 키프레임
      keyframes: {
        // 아코디언 열기 애니메이션
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        // 아코디언 닫기 애니메이션
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      
      // 애니메이션 클래스 정의
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out', // 아코디언 열기
        'accordion-up': 'accordion-up 0.2s ease-out', // 아코디언 닫기
      },
    },
  },
  
  // Tailwind CSS 플러그인
  // tailwindcss-animate: 추가 애니메이션 유틸리티 제공
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
