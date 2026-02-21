import { MarkdownPreview, MarkdownToolbar } from "@/features/write/ui"
import { Button } from "@/shared/ui"
import { useRef, useState } from "react"
import { useNavigate } from "react-router"

export const WritePage = () => {
    const navigate = useNavigate()

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [title, setTitle] = useState("")
    const [topicInput, setTopicInput] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [content, setContent] = useState("")

    const handleTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") {
            e.preventDefault()
            if (!topicInput.trim()) return
            setTags((prev) => [...prev, topicInput.trim()])
            setTopicInput("")
        }
    }

    const handleRemoveTag = (index: number) => {
        setTags((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-1/2 bg-white">
                <div className="flex flex-col flex-1 overflow-hidden p-8">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력 하세요"
                        className="w-full text-4xl font-bold outline-none mb-6"
                    />

                    <input
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        onKeyDown={handleTopicKeyDown}
                        placeholder="토픽을 입력 하세요 (스페이스로 추가)"
                        className="w-full mb-4 outline-none text-neutral-500"
                    />

                    <div className="flex gap-2 flex-wrap mb-6">
                        <div className="flex gap-2 flex-wrap mb-6">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    onClick={() => handleRemoveTag(i)}
                                    className="
                px-3 py-1
                bg-cyan-500 text-white
                rounded-full text-sm
                cursor-pointer
                hover:bg-cyan-600
                transition
            "
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <MarkdownToolbar textareaRef={textareaRef} setContent={setContent} />

                    <div className="flex-1 mt-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            ref={textareaRef}
                            placeholder="당신의 덕을 적어 주세요"
                            className="w-full h-full resize-none outline-none mt-4"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center px-8 py-4 border-t border-neutral-300">
                    <button onClick={() => navigate(-1)} className="text-label-medium">
                        ← 나가기
                    </button>

                    <Button fullWidth={false}>게시하기</Button>
                </div>
            </div>

            <div className="w-1/2 p-8 overflow-y-auto bg-neutral-100">
                <MarkdownPreview title={title} content={content} tags={tags} />
            </div>
        </div>
    )
}
