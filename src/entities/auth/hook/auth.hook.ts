import { authApi } from "@/entities/auth/api/auth.api"
import { authStorage } from "@/entities/auth/api/auth.storage"
import { createMutation } from "@/shared/api"

/** 회원가입 뮤테이션 */
export const useSignupMutation = createMutation(authApi.signup, {
    successMessage: "회원가입 성공",
    errorMessage: "회원가입에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        409: "이미 존재하는 아이디입니다",
    },
})

/** 로그인 뮤테이션 */
export const useLoginMutation = createMutation(authApi.login, {
    successMessage: "로그인 성공",
    errorMessage: "로그인에 실패했습니다",
    errorMessages: {
        401: "비밀번호가 일치하지 않습니다",
        404: "존재하지 않는 계정입니다",
    },
    onSuccessCallback: (data) => {
        authStorage.setTokens(data.access_token, data.refresh_token)
    },
})

/** 회원 탈퇴 뮤테이션 */
export const useDeleteMutation = createMutation(authApi.delete, {
    successMessage: "계정 삭제 성공",
    errorMessage: "계정 삭제에 실패했습니다"
})