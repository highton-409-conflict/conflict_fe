import { Input, Button } from "@/shared/ui"

/**
 * @description 비밀번호 수정 섹션 컴포넌트
 */
export const PasswordSection = () => {
    return (
        <section className="flex flex-col w-145 gap-6">
            <Input label="현재 비밀번호" type="password" />
            <Input label="새 비밀번호" type="password" />
            <Input label="새 비밀번호 확인" type="password" />

            <Button size="medium">변경하기</Button>
        </section>
    )
}
