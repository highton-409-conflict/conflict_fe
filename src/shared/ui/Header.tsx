import Logo from "@/assets/images/Logo.svg"
import { useNavigate } from "react-router"
import { Bell, Search } from "lucide-react"
import { Avatar, Button } from "."

interface IProps {
    isLogined?: boolean
}

/**
 * @description 헤더 컴포넌트
 */
export const Header = ({ isLogined = false }: IProps) => {
    const navigate = useNavigate()

    return (
        <header className="w-full h-15 flex justify-center border-b border-neutral-300">
            <div className="w-300 h-full flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <img src={Logo} width={80} alt="덕을 쌓다 로고" />
                </div>

                <div className="flex justify-center items-center gap-4 text-neutral-500">
                    {!isLogined ? (
                        <>
                            <Search width={60} className="cursor-pointer" onClick={() => navigate("/search")} />
                            <Bell width={60} />
                            <Button size="medium">새 글 작성</Button>
                            <Avatar />
                        </>
                    ) : (
                        <>
                            <Search width={60} className="cursor-pointer" onClick={() => navigate("/search")} />
                            <Button size="medium" fullWidth={false} variant="white" onClick={() => navigate("/login")}>
                                로그인
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
