import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { API_PATH } from "./api.path"
import { authStorage } from "@/entities/auth/api/auth.storage"

const apiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

/**
 * @description 현재 리프레시 요청의 Promise 를 저장하는 변수
 */
let refreshPromise: Promise<string> | null = null

/**
 * @description 토큰 재발급 요청을 처리하는 함수
 * @returns {Promise<string>} 새로운 access token
 */
const handleRefreshToken = async (): Promise<string> => {
    const refreshToken = authStorage.getRefreshToken()

    if (!refreshToken) {
        throw new Error("No refresh token available")
    }

    const response = await axios.post<{ access_token: string; refresh_token: string }>(
        `${import.meta.env.VITE_API_BASE_URL}${API_PATH.AUTH.REFRESH}`,
        {},
        {
            headers: {
                "X-Refresh-Token": refreshToken,
            },
        }
    )

    const { access_token, refresh_token } = response.data

    authStorage.setTokens(access_token, refresh_token)

    return access_token
}

/**
 * @description Request 인터셉터
 * @param config - Axios 요청 설정 옵션
 * @returns {Promise<InternalAxiosRequestConfig>} 인터셉터 처리 후 요청 설정 옵션
 */
apiInstance.interceptors.request.use((config) => {
    const accessToken = authStorage.getAccessToken()

    if (accessToken &&
        !config.url?.includes(API_PATH.AUTH.REFRESH) &&
        !config.url?.includes(API_PATH.AUTH.LOGIN) &&
        !config.url?.includes(API_PATH.AUTH.SIGNUP)) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

/**
 * @description Response 인터셉터 - 401 에러 시 토큰 자동 갱신
 * @param response - Axios 응답
 * @returns {Promise<AxiosResponse>} 인터셉터 처리 후 응답
 */
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
        const url = originalRequest.url || ""

        // 로그인, 회원가입, 리프레시 요청에서는 자동 리프레시하지 않음
        const isAuthUrl =
            url.includes(API_PATH.AUTH.LOGIN) ||
            url.includes(API_PATH.AUTH.SIGNUP) ||
            url.includes(API_PATH.AUTH.REFRESH)

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthUrl) {
            if (originalRequest._retry) {
                return Promise.reject(error)
            }

            originalRequest._retry = true

            try {
                if (!refreshPromise) {
                    refreshPromise = handleRefreshToken()
                }

                const newAccessToken = await refreshPromise

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return apiInstance(originalRequest)
            } catch (refreshError) {
                authStorage.clearTokens()
                window.location.href = "/login"
                return Promise.reject(refreshError)
            } finally {
                refreshPromise = null
            }
        }

        return Promise.reject(error)
    }
)

/**
 * @description API 요청 헬퍼 클래스
 */
export const ApiHelper = {
    /**
     * GET 요청
     * @template T - 응답 데이터의 타입
     * @param {string} url - 요청할 URL 경로
     * @param {import('axios').AxiosRequestConfig} [config] - Axios 요청 설정 옵션
     * @returns {Promise<T>} 응답 데이터를 반환하는 Promise
     * @throws {Error} 네트워크 오류 또는 HTTP 오류 발생 시 예외 처리
     */
    get: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.get(url, config)
        return response.data
    },

    /**
     * POST 요청
     * @template T - 응답 데이터의 타입
     * @param {string} url - 요청할 URL 경로
     * @param {unknown} [data] - 요청 본문에 포함할 데이터
     * @param {import('axios').AxiosRequestConfig} [config] - Axios 요청 설정 옵션
     * @returns {Promise<T>} 응답 데이터를 반환하는 Promise
     * @throws {Error} 네트워크 오류 또는 HTTP 오류 발생 시 예외 처리
     */
    post: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.post(url, data, config)
        return response.data
    },

    /**
     * DELETE 요청
     * @template T - 응답 데이터의 타입
     * @param {string} url - 요청할 URL 경로
     * @param {import('axios').AxiosRequestConfig} [config] - Axios 요청 설정 옵션
     * @returns {Promise<T>} 응답 데이터를 반환하는 Promise
     * @throws {Error} 네트워크 오류 또는 HTTP 오류 발생 시 예외 처리
     */
    delete: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.delete(url, config)
        return response.data
    },

    /**
     * PATCH 요청
     * @template T - 응답 데이터의 타입
     * @param {string} url - 요청할 URL 경로
     * @param {unknown} [data] - 요청 본문에 포함할 데이터
     * @param {import('axios').AxiosRequestConfig} [config] - Axios 요청 설정 옵션
     * @returns {Promise<T>} 응답 데이터를 반환하는 Promise
     * @throws {Error} 네트워크 오류 또는 HTTP 오류 발생 시 예외 처리
     */
    patch: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.patch(url, data, config)
        return response.data
    },

    /**
     * PUT 요청
     * @template T - 응답 데이터의 타입
     * @param {string} url - 요청할 URL 경로
     * @param {unknown} [data] - 요청 본문에 포함할 데이터
     * @param {import('axios').AxiosRequestConfig} [config] - Axios 요청 설정 옵션
     * @returns {Promise<T>} 응답 데이터를 반환하는 Promise
     * @throws {Error} 네트워크 오류 또는 HTTP 오류 발생 시 예외 처리
     */
    put: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiInstance.put(url, data, config)
        return response.data
    },
}
