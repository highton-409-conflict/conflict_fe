import type { UseQueryOptions, UseSuspenseQueryOptions } from "@tanstack/react-query"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { AxiosError } from "axios"
import { useEffect } from "react"

/**
 * @description 표준 쿼리 옵션 타입
 */
export interface QueryOptions {
    /** 로딩 중 토스트 메시지 */
    loadingMessage?: string
    /** 실패 시 토스트 메시지 (기본값) */
    errorMessage?: string
    /** HTTP 상태 코드별 실패 메시지 */
    errorMessages?: Record<number, string>
    /** 성공 시 추가 콜백 */
    onSuccessCallback?: (data: unknown) => void
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
 * @description 표준 쿼리 훅 생성 팩토리
 * @template T - 쿼리 함수 파라미터 타입
 * @template R - 쿼리 결과 타입
 * @param {string} queryKey - React Query 용 쿼리 키
 * @param {(params: T) => Promise<R>} queryFn - 쿼리 함수
 * @param {QueryOptions} options - 쿼리 옵션
 * @returns 표준 쿼리 훅 생성 함수
 */
export const createQuery = <T = unknown, R = unknown>(
    queryKey: string,
    queryFn: (params: T) => Promise<R>,
    options: QueryOptions = {}
) => {
    return (params?: T, queryOptions?: Omit<UseQueryOptions<R, Error>, "queryKey" | "queryFn" | "onError" | "onSuccess">) => {
        const { errorMessage, errorMessages, onSuccessCallback, onErrorCallback } = options

        const result = useQuery<R, Error>({
            queryKey: [queryKey, params],
            queryFn: () => queryFn(params as T),
            ...queryOptions,
        })

        const { error, data } = result

        useEffect(() => {
            if (error) {
                const message = getErrorMessage(error, errorMessages, errorMessage)
                if (message) {
                    toast.error(message)
                }
                onErrorCallback?.(error)
            }
        }, [error])

        useEffect(() => {
            if (data && onSuccessCallback) {
                onSuccessCallback(data)
            }
        }, [data])

        return result
    }
}

/**
 * @description 표준 서스펜스 쿼리 훅 생성 팩토리
 * @template T - 쿼리 함수 파라미터 타입
 * @template R - 쿼리 결과 타입
 * @param {string} queryKey - React Query 용 쿼리 키
 * @param {(params: T) => Promise<R>} queryFn - 쿼리 함수
 * @param {QueryOptions} options - 쿼리 옵션
 * @returns 표준 서스펜스 쿼리 훅 생성 함수
 */
export const createSuspenseQuery = <T = unknown, R = unknown>(
    queryKey: string,
    queryFn: (params: T) => Promise<R>,
    options: QueryOptions = {}
) => {
    return (params?: T, queryOptions?: Omit<UseSuspenseQueryOptions<R, Error>, "queryKey" | "queryFn" | "onError">) => {
        const { errorMessage, errorMessages, onErrorCallback } = options

        const result = useSuspenseQuery<R, Error>({
            queryKey: [queryKey, params],
            queryFn: () => queryFn(params as T),
            ...queryOptions,
        })

        const { error } = result

        useEffect(() => {
            if (error) {
                const message = getErrorMessage(error, errorMessages, errorMessage)
                if (message) {
                    toast.error(message)
                }
                onErrorCallback?.(error)
            }
        }, [error])

        return result
    }
}

/**
 * @description 쿼리 옵션 생성 팩토리
 * @template T - 쿼리 함수 파라미터 타입
 * @template R - 쿼리 결과 타입
 * @param {string} queryKey - React Query 용 쿼리 키
 * @param {(params: T) => Promise<R>} queryFn - 쿼리 함수
 * @param {QueryOptions} options - 쿼리 옵션
 * @returns UseQueryOptions 를 반환하는 함수
 */
export const createQueryOptions = <T = unknown, R = unknown>(
    queryKey: string,
    queryFn: (params: T) => Promise<R>,
    _options: QueryOptions = {}
): UseQueryOptions<R, Error> => {
    return {
        queryKey: [queryKey],
        queryFn: () => queryFn(undefined as T),
    }
}
