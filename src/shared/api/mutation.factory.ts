import type { UseMutationOptions } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

/**
 * @description 뮤테이션 옵션 타입
 */
export interface MutationOptions {
    /** 성공 시 토스트 메시지 */
    successMessage?: string
    /** 실패 시 토스트 메시지 */
    errorMessage?: string
    /** 성공 시 추가 콜백 */
    onSuccessCallback?: () => void
    /** 실패 시 추가 콜백 */
    onErrorCallback?: (error: unknown) => void
}

/**
 * @description 표준 뮤테이션 훅 생성 팩토리
 * @template T - 뮤테이션 함수 파라미터 타입
 * @template R - 뮤테이션 결과 타입
 * @param {(params: T) => Promise<R>} mutationFn - 뮤테이션 함수
 * @param {MutationOptions} options - 뮤테이션 옵션
 * @returns 표준 뮤테이션 훅 생성 함수
 */
export const createMutation = <T = unknown, R = unknown>(
    mutationFn: (params: T) => Promise<R>,
    options: MutationOptions = {}
) => {
    return () => {
        const { successMessage, errorMessage, onSuccessCallback, onErrorCallback } = options

        return useMutation({
            mutationFn,
            onSuccess: (data) => {
                if (successMessage) {
                    toast.success(successMessage)
                }
                onSuccessCallback?.()
                return data
            },
            onError: (error) => {
                if (errorMessage) {
                    toast.error(errorMessage)
                }
                onErrorCallback?.(error)
            },
        })
    }
}

/**
 * @description 뮤테이션 훅 생성 팩토리 (옵션 커스텀용)
 * @template T - 뮤테이션 함수 파라미터 타입
 * @template R - 뮤테이션 결과 타입
 * @param {(params: T) => Promise<R>} mutationFn - 뮤테이션 함수
 * @param {MutationOptions} options - 뮤테이션 옵션
 * @returns UseMutationOptions 를 반환하는 함수
 */
export const createMutationOptions = <T = unknown, R = unknown>(
    mutationFn: (params: T) => Promise<R>,
    options: MutationOptions = {}
): UseMutationOptions<R, Error, T> => {
    const { successMessage, errorMessage, onSuccessCallback, onErrorCallback } = options

    return {
        mutationFn,
        onSuccess: (data) => {
            if (successMessage) {
                toast.success(successMessage)
            }
            onSuccessCallback?.()
            return data
        },
        onError: (error) => {
            if (errorMessage) {
                toast.error(errorMessage)
            }
            onErrorCallback?.(error)
        },
    }
}
