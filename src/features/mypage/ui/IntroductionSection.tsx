import { Input } from "@/shared/ui"
import { DuckyPeriodForm } from "./ducky/DuckyPeriodForm"
import { CollectionSection } from "./collection/CollectionSection"

/**
 * @description 자기소개 섹션 컴포넌트
 */
export const IntroductionSection = () => {
    return (
        <section className="flex flex-col gap-10">
            <Input label="소개글" placeholder="소개글을 입력해주세요" />

            <CollectionSection />

            <DuckyPeriodForm />
        </section>
    )
}
