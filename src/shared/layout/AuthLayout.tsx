import { Outlet } from "react-router"
import { Header } from "@/shared/ui"

export const AuthLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 justify-center">
                <Outlet />
            </main>
        </div>
    )
}
