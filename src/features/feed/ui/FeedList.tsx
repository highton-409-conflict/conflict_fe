import type { PostRes } from "@/entities/post"
import { FeedItem } from "./FeedItem"

interface IProps {
    feeds: PostRes[]
    cols?: number
}

/**
 * @description 피드 리스트 컴포넌트
 */
export const FeedList = ({ feeds, cols = 4 }: IProps) => {
    return (
        <div className="w-full flex justify-center">
            <div className={`w-300 px-4 grid grid-cols-${cols} gap-8`}>
                {feeds.map((feed, i) => (
                    <FeedItem
                        key={feed.id}
                        index={i}
                        id={feed.id}
                        title={feed.title}
                        content={feed.content}
                        date={feed.created_at}
                        user={feed.author_id}
                        likes={feed.likes}
                        isLiked={feed.is_liked}
                    />
                ))}
            </div>
        </div>
    )
}
