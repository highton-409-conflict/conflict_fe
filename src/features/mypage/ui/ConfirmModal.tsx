import { useEffect } from "react"
import { Button } from "@/shared/ui"

interface Props {
    isOpen: boolean
    title: string
    description: string
    onCancel: () => void
    onConfirm: () => void
}

export const ConfirmModal = ({ isOpen, title, description, onCancel, onConfirm }: Props) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel()
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEsc)

            const originalOverflow = document.body.style.overflow
            document.body.style.overflow = "hidden"

            return () => {
                document.removeEventListener("keydown", handleEsc)
                document.body.style.overflow = originalOverflow
            }
        }

        return
    }, [isOpen, onCancel])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

            <div className="relative bg-white rounded-2xl w-96 p-8 shadow-xl animate-fadeIn">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-neutral-600 mb-8">{description}</p>

                <div className="flex justify-end gap-3">
                    <Button size="medium" variant="white" fullWidth={false} onClick={onCancel}>
                        취소
                    </Button>

                    <Button size="medium" variant="error" fullWidth={false} onClick={onConfirm}>
                        탈퇴하기
                    </Button>
                </div>
            </div>
        </div>
    )
}
