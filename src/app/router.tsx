import { LoginPage, SignupPage } from "@/pages"
import { AuthGuard, RootRedirect } from "@/shared/lib"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootRedirect />,
        },
        {
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
                            path: "/home",
                            // element: <HomePage />,
                        },
                    ],
                },
            ],
        },
    ],
    {
        basename: "/",
    }
)
