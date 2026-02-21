type ProfileHeaderProps = {
    username: string
    handle: string
    followerCount: number
    followingCount: number
    profileImageUrl?: string
}

export const ProfileHeader = ({
    username,
    handle,
    followerCount,
    followingCount,
    profileImageUrl,
}: ProfileHeaderProps) => {
    return (
        <section className="flex items-center justify-between">
            <div className="flex items-center gap-6">
                <div className="h-32 w-32 overflow-hidden rounded-full bg-neutral-300">
                    {profileImageUrl && (
                        <img src={profileImageUrl} alt="profile" className="h-full w-full object-cover" />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold text-neutral-900">{username}</span>
                    <span className="text-lg text-neutral-500">@{handle}</span>
                </div>
            </div>

            <div className="flex gap-10 text-neutral-600">
                <div className="flex flex-col items-center">
                    <span className="text-sm">팔로워</span>
                    <span className="text-title-small">{followerCount}</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm">팔로잉</span>
                    <span className="text-title-small">{followingCount}</span>
                </div>
            </div>
        </section>
    )
}
