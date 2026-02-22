import { Button, Input } from "@/shared/ui"
import { Pencil } from "lucide-react"
import { useRef, useState } from "react"

interface ProfileSectionProps {
    name?: string
    userId?: string
    onUpdateProfile: (data: { name?: string; introduce?: string; image?: string }) => void
}

export const ProfileSection = ({ name: initialName, userId: initialUserId, onUpdateProfile }: ProfileSectionProps) => {
    const [name, setName] = useState(initialName || "")
    const [userId, setUserId] = useState(initialUserId || "")

    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingId, setIsEditingId] = useState(false)

    const nameInputRef = useRef<HTMLInputElement>(null)
    const idInputRef = useRef<HTMLInputElement>(null)

    const handleSaveName = () => {
        setIsEditingName(false)
        onUpdateProfile({ name })
    }

    const handleSaveId = () => {
        setIsEditingId(false)
    }

    return (
        <section className="w-full flex justify-center gap-16">
            <div className="flex flex-col gap-6 items-center">
                <div className="w-40 h-40 rounded-full bg-neutral-300" />

                <div className="flex flex-col gap-2">
                    <Button size="medium" fullWidth={false}>
                        이미지 선택하기
                    </Button>
                    <button className="text-sm text-neutral-400">이미지 제거</button>
                </div>
            </div>

            <div className="flex w-full flex-col gap-6 mt-5">
                <div className="flex flex-col gap-1">
                    {isEditingName ? (
                        <Input
                            ref={nameInputRef}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveName()
                            }}
                            onBlur={handleSaveName}
                            autoFocus
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-title-medium">{name || "이름 없음"}</span>
                            <button onClick={() => setIsEditingName(true)}>
                                <Pencil size={18} className="text-cyan-500" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    {isEditingId ? (
                        <Input
                            ref={idInputRef}
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveId()
                            }}
                            onBlur={handleSaveId}
                            autoFocus
                        />
                    ) : (
                        <div className="flex items-center gap-2 text-neutral-400">
                            <span className="text-title-small text-neutral-400">{userId || "ID 없음"}</span>
                            <button onClick={() => setIsEditingId(true)}>
                                <Pencil size={18} className="text-cyan-500" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
