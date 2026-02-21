import { AuthGuard } from "@/shared/lib"
import {
    LoginPage,
    SignupPage,
    FeedPage,
    SearchPage,
    WritePage,
    MyPage,
    ProfilePage,
    FeedDetailPage,
    FollowPage,
} from "@/pages"
import { createBrowserRouter } from "react-router"
import { AppLayout } from "@/shared/layout/AppLayout"
import { AuthLayout } from "@/shared/layout/AuthLayout"

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
        ],
    },
    {
        element: <AppLayout />,
        children: [
            {
                element: <AuthGuard />,
                children: [
                    { path: "/", element: <FeedPage /> },
                    { path: "/detail", element: <FeedDetailPage /> },
                    { path: "/search", element: <SearchPage /> },
                    { path: "/write", element: <WritePage /> },
                    { path: "/mypage", element: <MyPage /> },
                    { path: "/profile", element: <ProfilePage /> },
                    { path: "/follow", element: <FollowPage /> },
                ],
            },
        ],
    },
])
