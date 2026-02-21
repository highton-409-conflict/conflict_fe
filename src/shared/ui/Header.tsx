import Logo from "@/assets/images/Logo.svg"
import { useNavigate } from "react-router"
import { Bell, Search, ChevronDown } from "lucide-react"
import { Avatar, Button } from "."
import { useEffect, useRef, useState } from "react"

interface IProps {
    isLogined?: boolean
}

type OpenMenu = "profile" | "notification" | null

export const Header = ({ isLogined = false }: IProps) => {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState<OpenMenu>(null)

    const profileRef = useRef<HTMLDivElement>(null)
    const notificationRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node

            if (
                profileRef.current &&
                !profileRef.current.contains(target) &&
                notificationRef.current &&
                !notificationRef.current.contains(target)
            ) {
                setOpenMenu(null)
            }
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenMenu(null)
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEsc)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEsc)
        }
    }, [])

    const notifications = Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        title: "콜렉션",
        content: "콜렉션이 리셋될 수 있습니다.",
        date: "2026.02.22 AM4:40",
    }))

    return (
        <header className="w-full h-15 flex justify-center border-b border-neutral-300">
            <div className="w-300 h-full flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <img src={Logo} width={80} alt="덕을 쌓다 로고" />
                </div>

                <div className="flex items-center gap-4 relative">
                    {!isLogined ? (
                        <>
                            <Search width={60} className="cursor-pointer" onClick={() => navigate("/search")} />
                            <Button size="medium" variant="white" onClick={() => navigate("/login")}>
                                로그인
                            </Button>
                        </>
                    ) : (
                        <>
                            <Search width={60} className="cursor-pointer" onClick={() => navigate("/search")} />

                            <div ref={notificationRef} className="relative">
                                <Bell
                                    width={60}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setOpenMenu((prev) => (prev === "notification" ? null : "notification"))
                                    }
                                />

                                {openMenu === "notification" && (
                                    <div
                                        className="
                                            absolute right-0 top-12
                                            w-96
                                            bg-white
                                            rounded-2xl
                                            shadow-xl
                                            py-4
                                            z-50
                                        "
                                    >
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="px-6 py-4 border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                                                >
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-sm text-neutral-400">{item.title}</span>
                                                        <span className="text-sm text-neutral-400">{item.date}</span>
                                                    </div>

                                                    <p className="text-lg font-medium text-neutral-800">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button size="medium" onClick={() => navigate("/write")}>
                                새 글 작성
                            </Button>

                            <div
                                ref={profileRef}
                                className="flex items-center gap-1 cursor-pointer relative"
                                onClick={() => setOpenMenu((prev) => (prev === "profile" ? null : "profile"))}
                            >
                                <Avatar />

                                <ChevronDown
                                    size={18}
                                    className={`transition-transform duration-200 ${
                                        openMenu === "profile" ? "rotate-180" : ""
                                    }`}
                                />

                                {openMenu === "profile" && (
                                    <div
                                        className="
                                            absolute right-0 top-14
                                            w-48
                                            bg-white
                                            rounded-2xl
                                            shadow-xl
                                            py-2
                                            z-50
                                        "
                                    >
                                        <button
                                            className="w-full text-left px-4 py-3 border-b border-cyan-500 text-cyan-500 font-semibold hover:bg-neutral-100"
                                            onClick={() => navigate("/profile")}
                                        >
                                            프로필
                                        </button>

                                        <button
                                            className="w-full text-left px-4 py-3 hover:bg-neutral-100"
                                            onClick={() => navigate("/mypage")}
                                        >
                                            설정
                                        </button>

                                        <button
                                            className="w-full text-left px-4 py-3 text-red-500 hover:bg-neutral-100"
                                            onClick={() => console.log("로그아웃")}
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
