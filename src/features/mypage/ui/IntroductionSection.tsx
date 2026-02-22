import { Input, Timeline, type TimelineItem } from "@/shared/ui"
import { DuckyPeriodForm } from "./ducky/DuckyPeriodForm"
import { CollectionSection } from "./collection/CollectionSection"
import { useUserQuery, useUpdateProfileMutation } from "@/entities/user"
import { useDeleteTimelineItemMutation } from "@/entities/timeline"
import { useState } from "react"

/**
 * @description 자기소개 섹션 컴포넌트
 */
export const IntroductionSection = () => {
    const { data: user, refetch } = useUserQuery()
    const updateProfileMutation = useUpdateProfileMutation()
    const deleteTimelineItemMutation = useDeleteTimelineItemMutation()
    const [introduce, setIntroduce] = useState(user?.introduce ?? "");

    const handleIntroduceChange = (introduce: string) => {
        updateProfileMutation.mutate({ introduce })
    }

    const timelineItems: TimelineItem[] = user?.timeline?.map((item, index) => ({
        id: String(index),
        label: item.topic_name,
        startDate: item.start_date,
        endDate: item.end_date,
    })) ?? []

    const handleDeleteTimelineItem = async (id: string) => {
        await deleteTimelineItemMutation.mutateAsync(id)
        refetch()
    }

    return (
        <section className="flex flex-col gap-10">
            <Input
                label="소개글"
                placeholder="소개글을 입력해주세요"
                value={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
                onBlur={(e) => handleIntroduceChange(e.target.value)}
                disabled={updateProfileMutation.isPending}
            />

            <CollectionSection />

            <Timeline items={timelineItems} editMode={true} onDelete={handleDeleteTimelineItem} />

            <DuckyPeriodForm />
        </section>
    )
}
