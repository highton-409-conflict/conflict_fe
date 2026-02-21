import { FeedList } from "@/features/feed/ui"

const dummyFeeds = Array.from({ length: 22 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/400/400?random=${i + 1}`,
    title: "크아아악 오늘도 병건 신님의 후광에 시력이 떨어지고 맙니다",
    content:
        "오늘도 양병건님의 은혜를 입어 그만 정신을 잃고 말았습니다. 이 은혜로운 신님께 무엇을 해야 제가 하 .ㅠㅠㅠ 진짜진짜 너무너무 짱입니다",
    date: "2026.02.21",
    user: {
        username: `유저${i + 1}`,
    },
    likes: Math.floor(Math.random() * 1000),
}))

/**
 * @description 피드(메인) 페이지 컴포넌트
 */
export const FeedPage = () => {
    return (
        <div className="w-full my-12">
            <FeedList feeds={dummyFeeds} />
        </div>
    )
}
