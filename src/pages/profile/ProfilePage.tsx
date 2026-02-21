import { FeedList } from "@/features/feed/ui"
import { ProfileHeader } from "@/features/profile/ui/ProfileHeader"
import { UserCollectionGrid } from "@/features/profile/ui/UserCollectionGrid"
import { UserCollectionSection } from "@/features/profile/ui/UserCollectionSection"
import { Button, Timeline, type TimelineItem } from "@/shared/ui"

const dummyFeeds = Array.from({ length: 7 }, (_, i) => ({
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

const DUMMY_TIMELINE_ITEMS: TimelineItem[] = [
    { id: "1", label: "에렌 예거", startDate: "2021-02-01", endDate: "2023-03-01" },
    { id: "2", label: "고죠 사토루", startDate: "2022-05-01", endDate: "2024-01-10" },
    { id: "3", label: "루피", startDate: "2021-09-01", endDate: "2022-12-01" },
    { id: "4", label: "카카시", startDate: "2023-01-01", endDate: "2024-06-01" },
    { id: "5", label: "렌고쿠", startDate: "2022-11-01", endDate: "2023-06-01" },
    { id: "6", label: "히나타", startDate: "2024-02-01", endDate: "2025-01-01" },
    { id: "7", label: "키르아", startDate: "2021-05-01", endDate: "2021-12-01" },
    { id: "8", label: "나루토", startDate: "2023-03-01", endDate: "2024-12-01" },
    { id: "9", label: "이타치", startDate: "2022-01-01", endDate: "2022-10-01" },
    { id: "10", label: "미카사", startDate: "2021-07-01", endDate: "2023-01-01" },
    { id: "11", label: "탄지로", startDate: "2023-04-01", endDate: "2024-03-01" },
    { id: "12", label: "젠이츠", startDate: "2022-08-01", endDate: "2023-02-01" },
    { id: "13", label: "이누야샤", startDate: "2021-03-01", endDate: "2022-06-01" },
    { id: "14", label: "리바이", startDate: "2024-01-01", endDate: "2025-02-01" },
    { id: "15", label: "사스케", startDate: "2022-04-01", endDate: "2023-11-01" },
]

/**
 * @description 프로필 페이지
 */
export function ProfilePage() {
    return (
        <div className="mx-auto max-w-240 py-10 flex flex-col gap-12">
            <ProfileHeader username="유저이름" handle="User0000" followerCount={144} followingCount={144} />

            <p className="text-body-medium text-neutral-400">
                안녕하세요 안녕하세요 안녕하다고 안녕하다고 안녕하세요 안녕하세요 안녕하다고 안녕하다고 안녕하세요
                안녕하세요 안녕하다고 안녕하다고 안녕하세요 안녕하세요 안녕하다고 안녕하다고 안녕하세요 안녕하세요
                안녕하다고 안녕하다고 안녕하세요 안녕하세요 안녕하다고 안녕하다고{" "}
            </p>

            {/* 내 프로필일때는 팔로우 버튼 X */}
            <Button size="medium">팔로우</Button>

            <div className="flex flex-col gap-4 mt-8">
                <h4 className="text-title-small">유저이름의 덕질연대기</h4>
                <Timeline items={DUMMY_TIMELINE_ITEMS} />
            </div>

            <UserCollectionSection />

            <UserCollectionGrid
                items={Array.from({ length: 5 }, (_, i) => ({
                    id: String(i),
                }))}
            />

            <section className="w-full flex flex-col gap-6">
                <h2 className="text-xl font-bold text-black">유저이름의 게시물</h2>

                <FeedList feeds={dummyFeeds} cols={3} />
            </section>
        </div>
    )
}
