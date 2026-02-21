/** 회원가입 요청 타입 */
export interface ISignupRequest {
    account_id: string
    password: string
    name: string
  }

/** 로그인 요청 타입 */
export interface ILoginRequest {
    account_id: string
    password: string
}

/** 로그인 응답 타입 */
export interface ILoginResponse {
    access_token: string
    refresh_token: string
}

/** 토큰 재발급 응답 타입 */
export interface IRefreshResponse {
    access_token: string,
    refresh_token: string
}
