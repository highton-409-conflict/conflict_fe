import { Navigate, Outlet } from "react-router"
import { authStorage } from "@/entities/auth/api/auth.storage"

/**
 * @description 토큰에 따른 라우트 가드
 */
export const AuthGuard = () => {
    const token = authStorage.getAccessToken()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
