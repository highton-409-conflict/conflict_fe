import { AuthForm } from "@/features/auth"

/**
 * @description 회원가입 페이지 컴포넌트
 */
export const SignupPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <AuthForm type="signup" />
        </div>
    )
}
