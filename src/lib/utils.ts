/**
 * @fileOverview 유틸리티 함수 모음
 * 
 * 애플리케이션 전반에서 사용되는 공통 유틸리티 함수들을 정의합니다.
 * 현재는 CSS 클래스 조합을 위한 cn 함수를 포함하고 있습니다.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * CSS 클래스를 조건부로 조합하고 Tailwind CSS 충돌을 해결하는 유틸리티 함수
 * 
 * clsx를 사용하여 조건부 클래스를 처리하고,
 * twMerge를 사용하여 Tailwind CSS 클래스 간의 충돌을 자동으로 해결합니다.
 * 
 * @param inputs - 조합할 CSS 클래스들 (문자열, 객체, 배열 등)
 * @returns 정리된 CSS 클래스 문자열
 * 
 * @example
 * ```typescript
 * // 기본 사용법
 * cn("px-4", "py-2", "bg-blue-500")
 * // 결과: "px-4 py-2 bg-blue-500"
 * 
 * // 조건부 클래스
 * cn("px-4", isActive && "bg-blue-500", !isActive && "bg-gray-500")
 * 
 * // Tailwind 충돌 해결
 * cn("px-2 px-4") // 결과: "px-4" (마지막 값이 우선)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
