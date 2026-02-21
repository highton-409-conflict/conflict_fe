import { Heart } from "lucide-react"

export const FeedLikeButton = () => {
    return (
        <div className="hidden md:flex fixed left-10 top-1/3 flex-col items-center gap-2">
            <button className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-neutral-100">
                <Heart className="w-5 h-5 text-neutral-500" />
            </button>
            <span className="text-sm text-neutral-500">999</span>
        </div>
    )
}
