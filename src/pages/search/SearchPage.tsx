import { useMemo, useState } from "react"
import { SearchPanel } from "@/features/search/ui"
import { Search } from "lucide-react"

export const SearchPage = () => {
    const [keyword, setKeyword] = useState("")

    const feeds = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        image: `https://picsum.photos/800/${600 + i}`,
        title: `덕질 기록 ${i + 1}`,
        content: `덕질 후기 내용입니다... (${i + 1})`,
        date: `2026.02.${(i % 28) + 1}`,
        likes: Math.floor(Math.random() * 1000),
        user: {
            username: `유저${i + 1}`,
            src: `https://picsum.photos/100?random=${i}`,
        },
        tags: ["아이돌", "애니", "게임"].slice(0, (i % 3) + 1),
    }))

    const users = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        profileImg: `https://picsum.photos/200?random=${i}`,
        username: `유저${i + 1}`,
        userId: `user_${i + 1}`,
        tags: ["아이돌", "코스메틱", "프론트엔드"].slice(0, (i % 3) + 1),
        follower: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 500),
    }))

    const filteredFeeds = useMemo(() => {
        if (!keyword.trim()) return feeds
        return feeds.filter((feed) => feed.title.toLowerCase().includes(keyword.toLowerCase()))
    }, [keyword, feeds])

    const filteredUsers = useMemo(() => {
        if (!keyword.trim()) return users
        return users.filter(
            (user) =>
                user.username.toLowerCase().includes(keyword.toLowerCase()) ||
                user.userId.toLowerCase().includes(keyword.toLowerCase())
        )
    }, [keyword, users])

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
