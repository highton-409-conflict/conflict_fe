import { Button } from "@/shared/ui"
import { useNavigate } from "react-router"
import { useFollowMutation, useProfileQuery, useUserQuery, useFollowingsQuery } from "@entities/user"
import { useMemo } from "react"

interface Props {
    author: string
}

export const FeedAuthorCard = ({
    author
}: Props) => {
    const navigate = useNavigate()
    const { data: userData } = useUserQuery()
    const { data } = useProfileQuery(author)
    const { data: followingsData } = useFollowingsQuery(userData?.account_id ?? "")
    const { mutate } = useFollowMutation()

    const isFollowing = useMemo(() => {
        if (!followingsData || !data) return false
        return followingsData.users.some(u => u.account_id === data.account_id)
    }, [followingsData, data])

    const handleFollow = (e: React.MouseEvent) => {
        e.stopPropagation()
        mutate(author)
    }

    return (
        <div onClick={() => navigate(`/profile/${author}`)} className="rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-neutral-400">
                        {data?.profile_url && (
                            <img src={data.profile_url} alt="profile" className="w-full h-full rounded-full object-cover" />
                        )}
                    </div>

                    <div>
                        <div className="text-label-large">{data?.name}</div>
                        <div className="text-label-medium text-neutral-500">@{data?.account_id}</div>
                    </div>
                </div>

                <div onClick={() => navigate(`/follow/${data?.account_id}`)} className="text-sm text-neutral-500">
                    팔로워 {data?.followers}&nbsp;&nbsp;팔로잉 {data?.following}
                </div>
            </div>

            <p className="text-sm text-neutral-600 mb-4">{data?.introduce}</p>

            {
                userData?.account_id !== data?.account_id && (
                    <Button 
                        size="medium" 
                        onClick={handleFollow}
                        variant={isFollowing ? "white" : undefined}
                    >
                        {isFollowing ? "팔로잉" : "팔로우"}
                    </Button>
                )
            }
        </div>
    )
}
