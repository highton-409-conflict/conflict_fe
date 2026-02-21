import Avatar from "@/shared/ui/Avatar"
import { Heart } from "lucide-react"

type User = {
    src?: string
    username: string
}

interface IProps {
    image: string
    title: string
    content: string
    date: string
    user: User
    likes: number
}

/**
 * @description 피드 아이템 컴포넌트
 */
export const FeedItem = ({ image, title, content, date, user, likes }: IProps) => {
    return (
        <div
            className="
                w-70 h-96.5
                bg-white
                rounded-3xl
                shadow-sm
                overflow-hidden
                cursor-pointer
                transition hover:shadow-md
                flex flex-col justify-start items-center
                box-border p-2
            "
        >
            <div className="w-65 h-45 rounded-2xl aspect-square bg-gray-300">
                <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h4 title={title} className="text-label-large text-black line-clamp-1">
                    {title}
                </h4>

                <p title={content} className="text-gray-500 text-body-small line-clamp-2">
                    {content}
                </p>

                <p className="text-gray-400 text-sm">{date}</p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <Avatar src={user.src} className="w-10 h-10" />
                        <p className="text-label-medium text-black">{user.username}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <span>{likes}</span>
                        <Heart size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}
