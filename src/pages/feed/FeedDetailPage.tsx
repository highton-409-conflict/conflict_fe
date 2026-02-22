import { FeedAuthorCard, FeedContent, FeedLikeButton } from "@/features/feed/ui"
import { useNavigate, useParams } from "react-router"
import { usePostsQuery, useTogglePostLikeMutation } from "@/entities/post"
import { queryClient } from "@/shared/query"

/**
 * @description 피드 상세 페이지 컴포넌트
 */
export const FeedDetailPage = () => {
    const { postId } = useParams<{ postId: string }>()
    const { data: posts } = usePostsQuery()
    const toggleLikeMutation = useTogglePostLikeMutation()
    const navigate = useNavigate();

    const post = posts?.find((p) => p.id === postId)

    const handleLike = async () => {
        if (!postId) return
        await toggleLikeMutation.mutateAsync(postId)
        queryClient.refetchQueries({ queryKey: ["post.list"] })
    }

    if (!post) {
        navigate("/")
        return
    }

    return (
        <div className="relative max-w-3xl mx-auto px-4 py-10">
            <FeedLikeButton 
                likeCount={post.likes}
                isLiked={post.is_liked}
                onLike={handleLike}
            />

            <FeedContent 
                title={post.title} 
                content={post.content} 
                tags={post.tags.map(tag => tag.tag_name)} 
            />

            <FeedAuthorCard 
                author={post.author_id}
            />
        </div>
    )
}
