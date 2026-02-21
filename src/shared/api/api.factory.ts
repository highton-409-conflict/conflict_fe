import type { AxiosRequestConfig } from "axios"
import { ApiHelper } from "./api.base"

/**
 * @description API 메서드 생성을 위한 팩토리 함수
 */
export const ApiFactory = {
    /**
     * @description POST API 메서드 생성
     * @template T - 요청 바디 타입
     * @template R - 응답 데이터 타입
     * @param {string} url - 요청할 URL 경로
     * @returns POST 메서드
     */
    post: <T = unknown, R = unknown>(url: string) => {
        return async (body: T, config?: AxiosRequestConfig) => {
            return ApiHelper.post<R>(url, body, config)
        }
    },

    /**
     * @description GET API 메서드 생성
     * @template R - 응답 데이터 타입
     * @param {string} url - 요청할 URL 경로
     * @returns GET 메서드
     */
    get: <R = unknown>(url: string) => {
        return async (config?: AxiosRequestConfig) => {
            return ApiHelper.get<R>(url, config)
        }
    },

    /**
     * @description DELETE API 메서드 생성
     * @template R - 응답 데이터 타입
     * @param {string} url - 요청할 URL 경로
     * @returns DELETE 메서드
     */
    delete: <R = unknown>(url: string) => {
        return async (config?: AxiosRequestConfig) => {
            return ApiHelper.delete<R>(url, config)
        }
    },

    /**
     * @description PATCH API 메서드 생성
     * @template T - 요청 바디 타입
     * @template R - 응답 데이터 타입
     * @param {string} url - 요청할 URL 경로
     * @returns PATCH 메서드
     */
    patch: <T = unknown, R = unknown>(url: string) => {
        return async (body: T, config?: AxiosRequestConfig) => {
            return ApiHelper.patch<R>(url, body, config)
        }
    },

    /**
     * @description PUT API 메서드 생성
     * @template T - 요청 바디 타입
     * @template R - 응답 데이터 타입
     * @param {string} url - 요청할 URL 경로
     * @returns PUT 메서드
     */
    put: <T = unknown, R = unknown>(url: string) => {
        return async (body: T, config?: AxiosRequestConfig) => {
            return ApiHelper.put<R>(url, body, config)
        }
    },
}
