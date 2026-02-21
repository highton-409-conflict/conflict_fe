import { Input, Timeline, type TimelineItem } from "@/shared/ui"
import { DuckyPeriodForm } from "./ducky/DuckyPeriodForm"
import { CollectionSection } from "./collection/CollectionSection"

const DUMMY_TIMELINE_ITEMS: TimelineItem[] = [
    { id: "1", label: "에렌 예거", startDate: "2021-02-01", endDate: "2023-03-01" },
    { id: "2", label: "고죠 사토루", startDate: "2022-05-01", endDate: "2024-01-10" },
    { id: "3", label: "루피", startDate: "2021-09-01", endDate: "2022-12-01" },
    { id: "4", label: "카카시", startDate: "2023-01-01", endDate: "2024-06-01" },
    { id: "5", label: "렌고쿠", startDate: "2022-11-01", endDate: "2023-06-01" },
    { id: "6", label: "히나타", startDate: "2024-02-01", endDate: "2025-01-01" },
    { id: "7", label: "키르아", startDate: "2021-05-01", endDate: "2021-12-01" },
    { id: "8", label: "나루토", startDate: "2023-03-01", endDate: "2024-12-01" },
    { id: "9", label: "이타치", startDate: "2022-01-01", endDate: "2022-10-01" },
    { id: "10", label: "미카사", startDate: "2021-07-01", endDate: "2023-01-01" },
    { id: "11", label: "탄지로", startDate: "2023-04-01", endDate: "2024-03-01" },
    { id: "12", label: "젠이츠", startDate: "2022-08-01", endDate: "2023-02-01" },
    { id: "13", label: "이누야샤", startDate: "2021-03-01", endDate: "2022-06-01" },
    { id: "14", label: "리바이", startDate: "2024-01-01", endDate: "2025-02-01" },
    { id: "15", label: "사스케", startDate: "2022-04-01", endDate: "2023-11-01" },
]

/**
 * @description 자기소개 섹션 컴포넌트
 */
export const IntroductionSection = () => {
    return (
        <section className="flex flex-col gap-10">
            <Input label="소개글" placeholder="소개글을 입력해주세요" />

            <CollectionSection />

            <Timeline items={DUMMY_TIMELINE_ITEMS} editMode={true} />

            <DuckyPeriodForm />
        </section>
    )
}
