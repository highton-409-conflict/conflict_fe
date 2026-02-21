import { useState } from "react"

interface IProps {
    tags: string[]
    setTags: (tags: string[]) => void
}

/**
 * @description 토픽 인풋 컴포넌트
 */
export const TopicInput = ({ tags, setTags }: IProps) => {
    const [value, setValue] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") {
            e.preventDefault()
            if (value.trim() && !tags.includes(value.trim())) {
                setTags([...tags, value.trim()])
            }
            setValue("")
        }
    }

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag))
    }

    return (
        <div className="flex flex-wrap gap-2 border-b pb-4">
            {tags.map((tag) => (
                <span
                    key={tag}
                    onClick={() => removeTag(tag)}
                    className="px-3 py-1 bg-cyan-500 text-white rounded-full text-sm cursor-pointer"
                >
                    #{tag}
                </span>
            ))}

            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="토픽을 입력 하세요 (스페이스로 추가)"
                className="outline-none flex-1 min-w-30"
            />
        </div>
    )
}
