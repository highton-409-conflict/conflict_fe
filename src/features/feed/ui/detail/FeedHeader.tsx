import { Avatar } from "@/shared/ui"

export const FeedHeader = () => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Avatar />

            <div>
                <div className="text-sm font-medium">작성자</div>
                <div className="text-xs text-neutral-400">2000.00.00</div>
            </div>
        </div>
    )
}
