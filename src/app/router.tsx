import { LoginPage, SignupPage, FeedPage, SearchPage, WritePage } from "@/pages"
// import { AuthGuard } from "@/shared/lib"
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
            { path: "/", element: <FeedPage /> },
            { path: "/search", element: <SearchPage /> },
            {
                // element: <AuthGuard />,
                children: [{ path: "/write", element: <WritePage /> }],
            },
        ],
    },
])
