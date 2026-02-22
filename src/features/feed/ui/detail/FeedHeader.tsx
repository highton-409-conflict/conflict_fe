import { Avatar } from "@/shared/ui"

export const FeedHeader = ({ tags }: { tags: string[] }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Avatar />

            <div>
                <div className="text-sm font-medium">태그</div>
                <div className="text-xs text-neutral-400">{tags.join(", ")}</div>
            </div>
        </div>
    )
}
