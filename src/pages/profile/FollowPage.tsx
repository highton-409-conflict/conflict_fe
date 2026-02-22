import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { UserItem } from "@/features/profile/ui/UserItem"
import { useFollowersQuery, useFollowingsQuery } from "@/entities/user"

type Tab = "follower" | "following"

export const FollowPage = () => {
    const navigate = useNavigate()
    const { userId } = useParams()

    const [activeTab, setActiveTab] = useState<Tab>("following")

    const { data: followersData } = useFollowersQuery(userId!)
    const { data: followingsData } = useFollowingsQuery(userId!)

    const users = activeTab === "follower" 
        ? followersData?.users ?? [] 
        : followingsData?.users ?? []

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex items-center gap-4 mb-10">
                <button onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold">@{userId}의 {activeTab === "follower" ? "팔로워" : "팔로잉"} 목록</h2>
            </div>

            <div className="flex border-b border-neutral-300 mb-6">
                <button
                    onClick={() => setActiveTab("follower")}
                    className={`
                        flex-1 py-4 text-lg font-medium transition
                        ${activeTab === "follower" ? "text-cyan-500 border-b-2 border-cyan-500" : "text-neutral-400"}
                    `}
                >
                    팔로워
                </button>

                <button
                    onClick={() => setActiveTab("following")}
                    className={`
                        flex-1 py-4 text-lg font-medium transition
                        ${activeTab === "following" ? "text-cyan-500 border-b-2 border-cyan-500" : "text-neutral-400"}
                    `}
                >
                    팔로잉
                </button>
            </div>

            <div>
                {users.map((user) => (
                    <UserItem
                        key={user.id}
                        profileImg={user.profile || ""}
                        username={user.name}
                        userId={user.account_id}
                        tags={user.tags.map((tag) => tag.name)}
                        follower={user.follower_count}
                        following={user.following_count}
                    />
                ))}
            </div>
        </div>
    )
}
