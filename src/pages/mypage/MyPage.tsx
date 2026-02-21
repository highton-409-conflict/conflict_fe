import { ProfileSection, IntroductionSection, PasswordSection, WithdrawalSection } from "@/features/mypage/ui"

/**
 * @description 마이페이지
 */
export function MyPage() {
    return (
        <div className="mx-auto max-w-180 py-10 flex flex-col gap-14">
            <ProfileSection />
            <IntroductionSection />

            <hr />

            <PasswordSection />
            <WithdrawalSection />
        </div>
    )
}
