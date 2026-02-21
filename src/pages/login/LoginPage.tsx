import { AuthForm } from "@/features/auth"

/**
 * @description 로그인 페이지 컴포넌트
 */
export const LoginPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <AuthForm type="login" />
        </div>
    )
}
