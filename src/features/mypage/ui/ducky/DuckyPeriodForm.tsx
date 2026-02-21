import { Input, Button } from "@/shared/ui"
import { DateInput } from "./DateInput"
import { useState } from "react"

export const DuckyPeriodForm = () => {
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()

    const [tagInput, setTagInput] = useState("")
    const [tags, setTags] = useState<string[]>([])

    const handleRemoveTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag))
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Input
                    label="나의 덕질은"
                    placeholder="덕질을 입력해주세요"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                />

                {tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 rounded-full bg-cyan-500 px-3 py-1 text-sm text-white"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-white/80 hover:text-white"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DateInput label="시작일" value={startDate} onChange={setStartDate} />
                <DateInput label="종료일" value={endDate} onChange={setEndDate} />
            </div>

            <Button size="medium">추가하기</Button>
        </div>
    )
}
