import { useNavigate } from "react-router"

export interface IUserProps {
    profileImg: string
    username: string
    userId: string
    tags?: string[]
    follower: number
    following: number
}

/**
 * @description 유저 아이템 컴포넌트
 */
export const UserItem = ({ profileImg, username, userId, tags = [], follower, following }: IUserProps) => {
    const navigate = useNavigate()

    return (
        <div className="w-full max-w-195 flex gap-8 py-8 border-b border-neutral-200">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                <img src={profileImg} alt={username} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-center flex-1 gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-2xl font-semibold text-neutral-900">{username}</h4>
                        <p className="text-neutral-400 text-lg">@{userId}</p>
                    </div>

                    <p onClick={() => navigate("/follow")} className="text-neutral-400 text-lg whitespace-nowrap">
                        팔로워 {follower} &nbsp;&nbsp; 팔로잉 {following}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="
                                px-4 py-2
                                bg-cyan-500
                                text-white
                                rounded-full
                                text-sm
                                font-medium
                            "
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
