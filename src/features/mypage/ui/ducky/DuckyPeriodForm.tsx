import { Input, Button } from "@/shared/ui"
import { DateInput } from "./DateInput"
import { useState, useMemo } from "react"
import { useCreateTimelineItemMutation } from "@/entities/timeline"
import { useAllTopicQuery } from "@/entities/topic"

export const DuckyPeriodForm = () => {
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate, setEndDate] = useState<Date | undefined>()

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTopicId, setSelectedTopicId] = useState<string>("")
    const createTimelineItemMutation = useCreateTimelineItemMutation()
    const { data: topicsData } = useAllTopicQuery()

    const filteredTopics = useMemo(() => {
        if (!topicsData || !searchQuery.trim()) return []
        return topicsData.filter((topic) =>
            topic.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [topicsData, searchQuery])

    const handleSubmit = async () => {
        if (!selectedTopicId || !startDate || !endDate) return

        await createTimelineItemMutation.mutateAsync({
            topic_id: selectedTopicId,
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0],
        })
        setSearchQuery("")
        setSelectedTopicId("")
        setStartDate(undefined)
        setEndDate(undefined)
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Input
                    label="나의 덕질은"
                    placeholder="토픽을 검색해주세요"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setSelectedTopicId("")
                    }}
                />

                {searchQuery && (
                    <div className="mt-2 max-h-40 overflow-y-auto border border-neutral-200 rounded-lg">
                        {filteredTopics.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-neutral-400">검색 결과가 없습니다</div>
                        ) : (
                            filteredTopics.map((topic) => (
                                <button
                                    key={topic.id}
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery(topic.name)
                                        setSelectedTopicId(topic.id)
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0"
                                >
                                    {topic.name}
                                </button>
                            ))
                        )}
                    </div>
                )}

                {selectedTopicId && (
                    <div className="mt-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500 px-3 py-1 text-sm text-white">
                            {searchQuery}
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("")
                                    setSelectedTopicId("")
                                }}
                                className="ml-1 text-white/80 hover:text-white"
                            >
                                ×
                            </button>
                        </span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DateInput label="시작일" value={startDate} onChange={setStartDate} />
                <DateInput label="종료일" value={endDate} onChange={setEndDate} />
            </div>

            <Button
                size="medium"
                onClick={handleSubmit}
                disabled={createTimelineItemMutation.isPending || !selectedTopicId || !startDate || !endDate}
            >
                {createTimelineItemMutation.isPending ? "추가 중..." : "추가하기"}
            </Button>
        </div>
    )
}
