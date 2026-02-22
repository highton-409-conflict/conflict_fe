import { Heart } from "lucide-react"

interface Props {
    likeCount: number
    isLiked: boolean
    onLike?: () => void
}

export const FeedLikeButton = ({ likeCount, isLiked, onLike }: Props) => {
    return (
        <div className="hidden md:flex fixed left-10 top-1/3 flex-col items-center gap-2">
            <button 
                onClick={onLike}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-neutral-100"
            >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-500'}`} />
            </button>
            <span className="text-sm text-neutral-500">{likeCount}</span>
        </div>
    )
}
