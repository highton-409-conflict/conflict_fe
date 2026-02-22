import { useMemo, useState } from "react"
import { SearchPanel } from "@/features/search/ui"
import { Search } from "lucide-react"
import { usePostsQuery } from "@/entities/post"
import { useAllUsersQuery } from "@/entities/user"

const FIRST_IMAGE_REGEX: RegExp = /!\[.*?\]\((.*?)\)/;

/**
 * 마크다운 텍스트에서 첫 번째 이미지 URL만 추출
 * @param markdown 대상 문자열
 * @returns 추출된 URL 또는 null
 */
const extractFirstImageSrc = (markdown: string): string | null => {
  const match = markdown.match(FIRST_IMAGE_REGEX);
  return match ? match[1] : null;
};

export const SearchPage = () => {
    const [keyword, setKeyword] = useState("")
    const { data: posts } = usePostsQuery()
    const { data: allUsers } = useAllUsersQuery()

    const filteredFeeds = useMemo(() => {
        if (!posts) return []
        if (!keyword.trim()) return posts.map((post, i) => ({
            id: post.id,
            image: extractFirstImageSrc(post.content) ?? `https://picsum.photos/20${i % 10}`,
            title: post.title,
            content: post.content,
            date: post.created_at,
            user: { username: post.author_id, src: extractFirstImageSrc(post.content) ?? `https://picsum.photos/20${i % 10}` },
            likes: 0,
            tags: [],
        }))
        return posts
            .filter((post) => 
                post.title.toLowerCase().includes(keyword.toLowerCase()) ||
                post.content.toLowerCase().includes(keyword.toLowerCase())
            )
            .map((post, i) => ({
                id: post.id,
                image: extractFirstImageSrc(post.content) ?? `https://picsum.photos/20${i % 10}`,
                title: post.title,
                content: post.content,
                date: post.created_at,
                user: { username: post.author_id, src: extractFirstImageSrc(post.content) ?? `https://picsum.photos/20${i % 10}` },
                likes: 0,
                tags: [],
            }))
    }, [keyword, posts])

    const filteredUsers = useMemo(() => {
        if (!allUsers) return []
        if (!keyword.trim()) return allUsers.users.map((user, i) => ({
            profileImg: user.profile || `https://picsum.photos/20${i % 10}`,
            username: user.name,
            userId: user.account_id,
            tags: user.tags.map((tag) => tag.name),
            follower: user.follower_count,
            following: user.following_count,
        }))
        return allUsers.users
            .filter(
                (user) =>
                    user.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    user.account_id.toLowerCase().includes(keyword.toLowerCase())
            )
            .map((user, i) => ({
                profileImg: user.profile || `https://picsum.photos/20${i % 10}`,
                username: user.name,
                userId: user.account_id,
                tags: user.tags.map((tag) => tag.name),
                follower: user.follower_count,
                following: user.following_count,
            }))
    }, [keyword, allUsers])

    return (
        <div className="w-full max-w-195 mx-auto py-12 px-4">
            <div className="relative">
                <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어를 입력 하세요"
                    className="w-full h-15 pl-12 rounded-2xl border border-neutral-400 focus:border-cyan-500 outline-none"
                />
            </div>

            <p className="mt-6 text-neutral-500 text-lg">
                총 <span className="font-bold text-black">{filteredFeeds.length}</span>
                개의 포스트와
                <span className="font-bold text-black ml-2">{filteredUsers.length}</span>
                명을 찾았습니다
            </p>

            <SearchPanel feeds={filteredFeeds} users={filteredUsers} />
        </div>
    )
}
