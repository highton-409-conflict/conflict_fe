import { FeedList } from "@/features/feed/ui"
import { usePostsQuery } from "@/entities/post";

/**
 * @description 피드 (메인) 페이지 컴포넌트
 */
export const FeedPage = () => {
    const { data } = usePostsQuery();

    return (
        <div className="w-full my-12">
            {
                data && <FeedList feeds={data} />
            }
        </div>
    )
}
