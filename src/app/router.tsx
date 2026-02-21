import { LoginPage, SignupPage } from "@/pages"
import { AuthGuard } from "@/shared/lib"
import { createBrowserRouter } from "react-router"
import { AppLayout } from "@/shared/layout/AppLayout"

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
            {
                element: <AuthGuard />,
                children: [
                    {
                        path: "/",
                        // element: <HomePage />,
                    },
                ],
            },
        ],
    },
])
