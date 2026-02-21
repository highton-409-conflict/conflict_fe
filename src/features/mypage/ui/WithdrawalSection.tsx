import { Button } from "@/shared/ui"

/**
 * @description 회원탈퇴 섹션 컴포넌트
 */
export const WithdrawalSection = () => {
    return (
        <section className="flex items-center gap-4">
            <span className="text-neutral-600">회원 탈퇴</span>
            <Button variant="error" fullWidth={false}>
                탈퇴하기
            </Button>
        </section>
    )
}
