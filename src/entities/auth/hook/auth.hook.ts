import { authApi } from "@/entities/auth/api/auth.api"
import { createMutation } from "@/shared/api"

/** 회원가입 뮤테이션 */
export const useSignupMutation = createMutation(authApi.signup, {
    successMessage: "회원가입 성공",
    errorMessage: "회원가입에 실패했습니다",
})

/** 로그인 뮤테이션 */
export const useLoginMutation = createMutation(authApi.login, {
    successMessage: "로그인 성공",
    errorMessage: "로그인에 실패했습니다",
})

/** 로그아웃 뮤테이션 */
export const useLogoutMutation = createMutation(authApi.logout, {
    successMessage: "로그아웃 되었습니다",
    errorMessage: "로그아웃에 실패했습니다",
})
