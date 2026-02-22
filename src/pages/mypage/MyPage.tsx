import { ProfileSection, IntroductionSection, PasswordSection, WithdrawalSection } from "@/features/mypage/ui"
import { useUserQuery, useUpdateProfileMutation } from "@/entities/user"

/**
 * @description 마이페이지
 */
export function MyPage() {
    const { data: user, isLoading, refetch } = useUserQuery()
    const updateProfileMutation = useUpdateProfileMutation()

    const handleUpdateProfile = (data: { name?: string; introduce?: string; image?: string }) => {
        updateProfileMutation.mutate(data, {
            onSuccess: () => {
                refetch()
            },
        })
    }

    if (isLoading) {
        return <div>로딩중...</div>
    }

    return (
        <div className="mx-auto max-w-180 py-10 flex flex-col gap-14">
            <ProfileSection
                name={user?.name}
                userId={user?.account_id}
                onUpdateProfile={handleUpdateProfile}
            />
            <IntroductionSection />

            <hr />

            <PasswordSection />
            <WithdrawalSection />
        </div>
    )
}
