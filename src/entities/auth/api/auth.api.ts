import type {
    ILoginRequest,
    ILoginResponse,
    IRefreshRequest,
    IRefreshResponse,
    ISignupRequest,
} from "@/entities/auth/api/auth.api.type"
import { ApiFactory } from "@/shared/api"
import { API_PATH } from "@/shared/api"

/** 인증 API */
export const authApi = {
    /**
     * @description 회원가입 API
     * @param {ISignupRequest} body - 회원가입 요청 바디
     */
    signup: ApiFactory.post<ISignupRequest, void>(API_PATH.AUTH.SIGNUP),

    /**
     * @description 로그인 API
     * @param {ILoginRequest} body - 로그인 요청 바디
     */
    login: ApiFactory.post<ILoginRequest, ILoginResponse>(API_PATH.AUTH.LOGIN),

    /**
     * @description 로그아웃 API
     */
    logout: ApiFactory.post<void, void>(API_PATH.AUTH.LOGOUT),

    /**
     * @description 토큰 재발급 API
     * @param {IRefreshRequest} body - 토큰 재발급 요청 바디
     */
    refresh: ApiFactory.post<IRefreshRequest, IRefreshResponse>(API_PATH.AUTH.REFRESH),
}
