import { LoginPage, SignupPage } from "@/pages"
import { AuthGuard } from "@/shared/lib"
import { createBrowserRouter } from "react-router"
import { AppLayout } from "@/shared/layout/AppLayout"
import { FeedPage } from "@/pages/feed"
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
                children: [{ path: "/", element: <FeedPage /> }],
            },
        ],
    },
])
