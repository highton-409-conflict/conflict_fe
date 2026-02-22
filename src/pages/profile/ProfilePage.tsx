import { FeedList } from "@/features/feed/ui"
import { ProfileHeader } from "@/features/profile/ui/ProfileHeader"
import { UserCollectionGrid } from "@/features/profile/ui/UserCollectionGrid"
import { UserCollectionSection } from "@/features/profile/ui/UserCollectionSection"
import { Button, Timeline, type TimelineItem } from "@/shared/ui"
import { useFollowMutation, useProfileQuery, useUserQuery, useFollowingsQuery } from "@/entities/user"
import { useParams } from "react-router"
import { useMemo } from "react"

/**
 * @description 프로필 페이지
 */
export function ProfilePage() {
    const { userId } = useParams();
    const { data: user, isLoading } = useProfileQuery(userId)
    const { data: myData } = useUserQuery()
    const { data: followingsData } = useFollowingsQuery(myData?.account_id ?? "")
    const follow = useFollowMutation()

    const isFollowing = useMemo(() => {
        if (!followingsData || !user) return false
        return followingsData.users.some(u => u.account_id === user.account_id)
    }, [followingsData, user])

    const timelineItems: TimelineItem[] = user?.timeline?.map((item, index) => ({
        id: String(index),
        label: item.topic_name,
        startDate: item.start_date,
        endDate: item.end_date,
    })) ?? []

    if (isLoading) {
        return <div>로딩중...</div>
    }

    const isMyProfile = user?.account_id === myData?.account_id

    return (
        <div className="mx-auto max-w-240 py-10 flex flex-col gap-12">
            <ProfileHeader
                id={user?.account_id ?? ""}
                username={user?.name ?? ""}
                handle={user?.account_id ?? ""}
                profileImageUrl={user?.profile_url}
                followerCount={user?.followers ?? 0}
                followingCount={user?.following ?? 0}
            />

            <p className="text-body-medium text-neutral-400">
                {user?.introduce || "소개글이 없습니다."}
            </p>

            {/* 내 프로필일때는 팔로우 버튼 X */}
            {
                !isMyProfile && (
                    <Button 
                        onClick={() => follow.mutate(user?.account_id ?? "")} 
                        size="medium"
                        variant={isFollowing ? "white" : undefined}
                    >
                        {isFollowing ? "팔로잉" : "팔로우"}
                    </Button>
                )
            }

            <div className="flex flex-col gap-4 mt-8">
                <h4 className="text-title-small">{user?.name}의 덕질연대기</h4>
                <Timeline items={timelineItems} />
            </div>

            <UserCollectionSection />

            {/* TODO: 컬렉션 그리드 API 구현 시 연동 */}
            <UserCollectionGrid
                items={Array.from({ length: 5 }, (_, i) => ({
                    id: String(i),
                }))}
            />

            <section className="w-full flex flex-col gap-6">
                <h2 className="text-xl font-bold text-black">{user?.name}의 게시물</h2>

                {/* TODO: 사용자 게시물 목록 API 구현 시 연동 */}
                <FeedList feeds={[]} cols={3} />
            </section>
        </div>
    )
}
