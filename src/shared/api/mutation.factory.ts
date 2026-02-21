import type { UseMutationOptions } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { AxiosError } from "axios"

/**
 * @description 표준 뮤테이션 옵션 타입
 */
export interface MutationOptions<T = unknown> {
    /** 성공 시 토스트 메시지 */
    successMessage?: string
    /** 실패 시 토스트 메시지 (기본값) */
    errorMessage?: string
    /** HTTP 상태 코드별 실패 메시지 */
    errorMessages?: Record<number, string>
    /** 성공 시 추가 콜백 */
    onSuccessCallback?: (data: T) => void
    /** 실패 시 추가 콜백 */
    onErrorCallback?: (error: unknown) => void
}

/**
 * @description 에러에 따른 토스트 메시지를 반환하는 함수
 * @param error - 에러 객체
 * @param errorMessages - HTTP 상태 코드별 에러 메시지
 * @param defaultErrorMessage - 기본 에러 메시지
 * @returns {string} 토스트 메시지
 */
const getErrorMessage = (
    error: unknown,
    errorMessages?: Record<number, string>,
    defaultErrorMessage?: string
): string => {
    const status = (error as AxiosError).response?.status

    if (status) {
        if (status === 500) {
            return "서버 오류가 발생했습니다"
        }
        return errorMessages?.[status] ?? defaultErrorMessage ?? `오류가 발생했습니다 (${status})`
    }

    return defaultErrorMessage ?? "오류가 발생했습니다"
}

/**
 * @description 뮤테이션 함수 또는 뮤테이션 함수 팩토리 타입
 */
export type MutationFn<T = unknown, R = unknown> =
    | ((params: T) => Promise<R>)
    | ((param: T) => (body?: unknown) => Promise<R>)

/**
 * @description 뮤테이션 함수를 정규화하는 함수
 * @param mutationFn - 뮤테이션 함수 또는 팩토리
 * @returns 정규화된 뮤테이션 함수
 */
const normalizeMutationFn = <T = unknown, R = unknown>(
    mutationFn: MutationFn<T, R>
): ((params: T) => Promise<R>) => {
    return (params: T) => {
        const result = (mutationFn as (param: T) => unknown)(params)
        if (typeof result === "function") {
            return (result as () => Promise<R>)()
        }
        return result as Promise<R>
    }
}

/**
 * @description 표준 뮤테이션 훅 생성 팩토리
 * @template T - 뮤테이션 함수 파라미터 타입
 * @template R - 뮤테이션 결과 타입
 * @param {(params: T) => Promise<R> | ((params: T) => (body?: unknown) => Promise<R>)} mutationFn - 뮤테이션 함수 또는 팩토리
 * @param {MutationOptions<R>} options - 뮤테이션 옵션
 * @returns 표준 뮤테이션 훅 생성 함수
 */
export const createMutation = <T = unknown, R = unknown>(
    mutationFn: MutationFn<T, R>,
    options: MutationOptions<R> = {}
) => {
    return () => {
        const { successMessage, errorMessage, errorMessages, onSuccessCallback, onErrorCallback } = options

        return useMutation<R, Error, T>({
            mutationFn: normalizeMutationFn(mutationFn),
            onSuccess: (data) => {
                if (successMessage) {
                    toast.success(successMessage)
                }
                onSuccessCallback?.(data)
                return data
            },
            onError: (error) => {
                const message = getErrorMessage(error, errorMessages, errorMessage)
                toast.error(message)
                onErrorCallback?.(error)
            },
        })
    }
}

/**
 * @description 뮤테이션 훅 생성 팩토리 (옵션 커스텀용)
 * @template T - 뮤테이션 함수 파라미터 타입
 * @template R - 뮤테이션 결과 타입
 * @param {(params: T) => Promise<R> | ((params: T) => (body?: unknown) => Promise<R>)} mutationFn - 뮤테이션 함수 또는 팩토리
 * @param {MutationOptions<R>} options - 뮤테이션 옵션
 * @returns UseMutationOptions 를 반환하는 함수
 */
export const createMutationOptions = <T = unknown, R = unknown>(
    mutationFn: MutationFn<T, R>,
    options: MutationOptions<R> = {}
): UseMutationOptions<R, Error, T> => {
    const { successMessage, errorMessage, errorMessages, onSuccessCallback, onErrorCallback } = options

    return {
        mutationFn: normalizeMutationFn(mutationFn),
        onSuccess: (data) => {
            if (successMessage) {
                toast.success(successMessage)
            }
            onSuccessCallback?.(data)
            return data
        },
        onError: (error) => {
            const message = getErrorMessage(error, errorMessages, errorMessage)
            toast.error(message)
            onErrorCallback?.(error)
        },
    }
}
