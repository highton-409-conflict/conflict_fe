import { useState } from "react"
import { Input } from "@/shared/ui"
import { Button } from "@/shared/ui"
import { useLoginMutation, useSignupMutation } from "@/entities/auth"
import { useNavigate } from "react-router"

interface IAuthProp {
    type: "login" | "signup"
}

interface IFormState {
    account_id: string
    password: string
    name?: string
}

const INITIAL_FORM_STATE: IFormState = {
    account_id: "",
    password: "",
    name: "",
}

/**
 * @description 로그인/회원가입 폼 컴포넌트
 */
export const AuthForm = ({ type }: IAuthProp) => {
    const navigate = useNavigate()
    const [form, setForm] = useState<IFormState>(INITIAL_FORM_STATE)
    const loginMutation = useLoginMutation()
    const signupMutation = useSignupMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.account_id || !form.password) {
            return
        }

        if (type === "signup" && !form.name) {
            return
        }

        if (type === "login") {
            await loginMutation.mutateAsync({
                account_id: form.account_id,
                password: form.password,
            })
            navigate("/")
        } else {
            await signupMutation.mutateAsync({
                account_id: form.account_id,
                password: form.password,
                name: form.name!,
            })
            navigate("/login")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const isSubmitting = loginMutation.isPending || signupMutation.isPending
    const isValid = form.account_id && form.password && (type === "signup" ? form.name : true)

    return (
        <form className="w-full min-w-160 h-full flex flex-col gap-12 max-w-90 md:max-w-120 xl:max-w-150 max-h-150" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-cyan-500 text-title-medium md:text-title-large">
                    {type == "login" ? "로그인" : "회원가입"}
                </h1>
                <h5 className="text-neutral-400 text-body-medium md:text-body-large">저희 서비스에 오신걸 환영해요!</h5>
            </div>

            <div className="flex flex-col gap-7">
                <Input
                    label="아이디"
                    name="account_id"
                    placeholder="아이디를 입력해주세요."
                    value={form.account_id}
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
                <Input
                    label="비밀번호"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                />

                {type === "signup" && (
                    <Input
                        label="닉네임"
                        name="name"
                        placeholder="닉네임을 입력해주세요."
                        value={form.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                )}
                <div className="flex flex-col gap-2">
                    <Button type="submit" className="mt-4" disabled={isSubmitting || !isValid}>
                        {isSubmitting ? "처리 중..." : type == "login" ? "로그인" : "회원가입"}
                    </Button>
                    <div className="w-full flex justify-center items-center gap-2">
                        <p className="text-neutral-400">
                            {type == "login" ? "아직 회원이 아니신가요?" : "이미 회원이신가요?"}
                        </p>
                        <span
                            onClick={() => navigate(type === "login" ? "/signup" : "/login")}
                            className="cursor-pointer select-none text-cyan-500 text-label-medium"
                        >
                            {type == "login" ? "회원가입" : "로그인"}
                        </span>
                    </div>
                </div>
            </div>
        </form>
    )
}
