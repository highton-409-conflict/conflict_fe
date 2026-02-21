const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"

/**
 * @description 토큰 관리 유틸리티
 */
export const authStorage = {
    /**
     * @description 액세스 토큰을 가져옵니다
     * @returns {string | null} 액세스 토큰
     */
    getAccessToken: (): string | null => {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    },

    /**
     * @description 리프레시 토큰을 가져옵니다
     * @returns {string | null} 리프레시 토큰
     */
    getRefreshToken: (): string | null => {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    /**
     * @description 액세스 토큰과 리프레시 토큰을 모두 저장합니다
     * @param {string} accessToken - 액세스 토큰
     * @param {string} refreshToken - 리프레시 토큰
     */
    setTokens: (accessToken: string, refreshToken: string): void => {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    /**
     * @description 모든 토큰을 삭제합니다
     */
    clearTokens: (): void => {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    },
}
