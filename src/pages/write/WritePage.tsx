import { MarkdownPreview } from "@/features/write/ui"
import { Button } from "@/shared/ui"
import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useCreatePostMutation } from "@/entities/post"

export const WritePage = () => {
    const navigate = useNavigate()
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const createPostMutation = useCreatePostMutation()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return

        await createPostMutation.mutateAsync({
            title,
            content,
        })
        navigate("/")
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

                    <Button 
                        fullWidth={false}
                        onClick={handleSubmit}
                        disabled={createPostMutation.isPending || !title.trim() || !content.trim()}
                    >
                        {createPostMutation.isPending ? "게시 중..." : "게시하기"}
                    </Button>
                </div>
            </div>

            <div className="w-1/2 p-8 overflow-y-auto bg-neutral-100">
                <MarkdownPreview title={title} content={content} tags={[]} />
            </div>
        </div>
    )
}
