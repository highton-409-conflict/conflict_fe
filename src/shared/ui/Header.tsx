import Logo from "@/assets/images/Logo.svg"
import { useNavigate } from "react-router"
import { Search } from "lucide-react"
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

                <div className="flex justify-center items-center gap-6 text-neutral-500">
                    <Search width={60} />

                    {isLogined ? (
                        <Avatar />
                    ) : (
                        <Button size="medium" fullWidth={false} variant="white" onClick={() => navigate("/login")}>
                            로그인
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
