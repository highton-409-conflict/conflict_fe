import Avatar from "@/shared/ui/Avatar"
import { Heart } from "lucide-react"
import { useNavigate } from "react-router"

type User = {
    src?: string
    username: string
}

export interface IFeedProps {
    id: string
    image: string
    title: string
    content: string
    date: string
    user: User
    likes: number
    tags: string[]
}

/**
 * @description 피드 검색 아이템 컴포넌트
 */
export const FeedItem = ({ image, title, content, date, user, likes, tags, id }: IFeedProps) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/detail/${id}`)} className="w-195 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3 px-6 py-4">
                <Avatar src={user.src} className="w-10 h-10" />
                <p className="font-medium text-neutral-900">{user.username}</p>
            </div>

            <div className="w-full aspect-4/3 bg-neutral-200">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-neutral-900">{title}</h4>

                    <div className="flex items-center gap-2 text-neutral-500">
                        <span>{likes}</span>
                        <Heart size={20} />
                    </div>
                </div>

                <p className="text-neutral-600 leading-relaxed">{content}</p>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-cyan-500 text-white rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-neutral-400">{new Date(date).toLocaleString()}</p>
            </div>
        </div>
    )
}
