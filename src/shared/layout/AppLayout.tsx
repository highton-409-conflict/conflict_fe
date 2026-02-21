import { Outlet } from "react-router"
import { Header } from "@/shared/ui"

export const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 items-center justify-center">
                <Outlet />
            </main>
        </div>
    )
}
