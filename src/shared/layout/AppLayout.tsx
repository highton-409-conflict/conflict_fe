import { Outlet, useLocation } from "react-router"
import { Header } from "@/shared/ui"

export const AppLayout = () => {
    const { pathname } = useLocation()

    return (
        <div className="flex min-h-screen flex-col">
            {!pathname.startsWith("/write") && <Header />}
            <main className="flex-1 justify-center">
                <Outlet />
            </main>
        </div>
    )
}
