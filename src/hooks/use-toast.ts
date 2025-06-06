/**
 * @fileOverview React 토스트 알림 시스템
 * 
 * react-hot-toast 라이브러리에서 영감을 받아 구현된 커스텀 토스트 알림 시스템입니다.
 * 상태 관리, 액션 디스패치, 자동 제거 기능을 포함한 완전한 토스트 UI 솔루션을 제공합니다.
 * 
 * 주요 기능:
 * - 토스트 메시지 표시/숨기기
 * - 자동 제거 타이머
 * - 최대 표시 개수 제한
 * - 업데이트 및 수동 제거 지원
 */

"use client"

// react-hot-toast 라이브러리에서 영감을 받음
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// 토스트 시스템 설정값들
const TOAST_LIMIT = 1 // 동시에 표시할 수 있는 토스트 최대 개수
const TOAST_REMOVE_DELAY = 1000000 // 토스트 제거 지연 시간 (밀리초)

/**
 * 확장된 토스트 타입
 * 
 * 기본 ToastProps에 고유 ID와 추가 속성들을 포함합니다.
 * 각 토스트는 고유한 ID를 가지며, 제목, 설명, 액션 버튼을 가질 수 있습니다.
 */
type ToasterToast = ToastProps & {
  id: string // 토스트 고유 식별자
  title?: React.ReactNode // 토스트 제목 (선택적)
  description?: React.ReactNode // 토스트 설명 (선택적)
  action?: ToastActionElement // 토스트 액션 버튼 (선택적)
}

/**
 * 토스트 액션 타입 정의
 * 
 * 상태 관리에 사용되는 모든 액션 타입들을 정의합니다.
 * 각 액션은 특정한 토스트 상태 변경을 담당합니다.
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST", // 새 토스트 추가
  UPDATE_TOAST: "UPDATE_TOAST", // 기존 토스트 업데이트
  DISMISS_TOAST: "DISMISS_TOAST", // 토스트 닫기 (애니메이션 시작)
  REMOVE_TOAST: "REMOVE_TOAST", // 토스트 완전 제거 (DOM에서 제거)
} as const

// 토스트 ID 생성을 위한 카운터
let count = 0

/**
 * 고유한 토스트 ID를 생성하는 함수
 * 
 * 카운터를 증가시켜 고유한 문자열 ID를 반환합니다.
 * Number.MAX_SAFE_INTEGER에 도달하면 0부터 다시 시작합니다.
 * 
 * @returns 고유한 토스트 ID 문자열
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

/**
 * 토스트 상태 관리를 위한 액션 타입들
 * 
 * 각 액션은 특정한 토스트 상태 변경을 나타내며,
 * reducer 함수에서 해당 액션에 따른 상태 변경을 처리합니다.
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

/**
 * 토스트 시스템의 전체 상태
 * 
 * 현재 표시되고 있는 모든 토스트들의 배열을 포함합니다.
 */
interface State {
  toasts: ToasterToast[]
}

// 자동 제거를 위한 타이머들을 저장하는 Map
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * 토스트를 자동 제거 큐에 추가하는 함수
 * 
 * 지정된 지연 시간 후에 토스트를 자동으로 제거합니다.
 * 중복 타이머 설정을 방지합니다.
 * 
 * @param toastId - 제거할 토스트의 ID
 */
const addToRemoveQueue = (toastId: string) => {
  // 이미 타이머가 설정되어 있으면 중복 설정하지 않음
  if (toastTimeouts.has(toastId)) {
    return
  }

  // 지연 시간 후 토스트 제거
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * 토스트 상태 관리 리듀서 함수
 * 
 * 액션에 따라 토스트 상태를 변경하는 순수 함수입니다.
 * 모든 상태 변경은 이 함수를 통해 이루어집니다.
 * 
 * @param state - 현재 토스트 상태
 * @param action - 실행할 액션
 * @returns 새로운 토스트 상태
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // 새 토스트를 배열 맨 앞에 추가하고, 최대 개수로 제한
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      // 해당 ID의 토스트를 찾아서 업데이트
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // 부작용! - 이 부분은 dismissToast() 액션으로 분리할 수 있지만,
      // 단순함을 위해 여기에서 처리합니다
      if (toastId) {
        addToRemoveQueue(toastId) // 특정 토스트를 제거 큐에 추가
      } else {
        // 모든 토스트를 제거 큐에 추가
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // 토스트 닫기 애니메이션 시작
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      // 토스트를 완전히 제거 (DOM에서 제거)
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [], // 모든 토스트 제거
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId), // 특정 토스트 제거
      }
  }
}

// 상태 변경을 구독하는 리스너들
const listeners: Array<(state: State) => void> = []

// 메모리에 저장되는 전역 상태
let memoryState: State = { toasts: [] }

/**
 * 액션을 디스패치하고 모든 리스너에게 알리는 함수
 * 
 * 상태 변경을 중앙에서 관리하며, 모든 구독자들에게
 * 새로운 상태를 전달합니다.
 * 
 * @param action - 실행할 액션
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * 토스트 생성을 위한 타입 (ID 제외)
 */
type Toast = Omit<ToasterToast, "id">

/**
 * 새로운 토스트를 생성하고 표시하는 함수
 * 
 * 토스트의 속성을 받아서 고유 ID를 생성하고,
 * 상태에 추가합니다. 업데이트와 제거 함수도 함께 반환합니다.
 * 
 * @param props - 토스트 속성 (ID 제외)
 * @returns 토스트 제어 객체 (ID, dismiss, update 함수)
 * 
 * @example
 * ```typescript
 * // 기본 토스트
 * const t = toast({ title: "성공!", description: "작업이 완료되었습니다." });
 * 
 * // 수동 제거
 * t.dismiss();
 * 
 * // 토스트 업데이트
 * t.update({ title: "업데이트됨!" });
 * ```
 */
function toast({ ...props }: Toast) {
  const id = genId()

  // 토스트 업데이트 함수
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  
  // 토스트 제거 함수
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // 새 토스트를 상태에 추가
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss() // 닫기 이벤트 시 자동 제거
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * 토스트 상태와 제어 함수들을 제공하는 React 훅
 * 
 * 컴포넌트에서 토스트 시스템을 사용할 수 있도록
 * 현재 상태와 토스트 생성/제거 함수들을 제공합니다.
 * 
 * @returns 토스트 상태 및 제어 함수들
 * 
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { toast, toasts, dismiss } = useToast();
 * 
 *   const showToast = () => {
 *     toast({
 *       title: "알림",
 *       description: "메시지가 전송되었습니다.",
 *     });
 *   };
 * 
 *   return (
 *     <div>
 *       <button onClick={showToast}>토스트 표시</button>
 *       {toasts.map(toast => (
 *         <div key={toast.id}>{toast.title}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // 상태 변경 리스너 등록
    listeners.push(setState)
    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast, // 토스트 생성 함수
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // 토스트 제거 함수
  }
}

export { useToast, toast }
