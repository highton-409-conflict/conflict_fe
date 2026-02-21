import { useState } from "react"
import { Button } from "@/shared/ui"
import { ConfirmModal } from "./ConfirmModal"

export const WithdrawalSection = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleConfirm = () => {
        console.log("회원 탈퇴 진행")
        setIsOpen(false)
        // 탈퇴 API 호출
    }

    return (
        <>
            <section className="flex items-center gap-4">
                <span className="text-neutral-600">회원 탈퇴</span>
                <Button variant="error" fullWidth={false} onClick={() => setIsOpen(true)}>
                    탈퇴하기
                </Button>
            </section>

            <ConfirmModal
                isOpen={isOpen}
                title="정말 탈퇴하시겠습니까?"
                description="탈퇴 시 계정 정보가 모두 삭제되며 복구할 수 없습니다."
                onCancel={() => setIsOpen(false)}
                onConfirm={handleConfirm}
            />
        </>
    )
}
