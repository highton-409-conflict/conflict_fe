import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"

interface Props {
    title: string
    content: string
    tags: string[]
}

/**
 * @description 마크다운 미리보기 컴포넌트
 */
export const MarkdownPreview = ({ title, content, tags }: Props) => {
    return (
        <div
            className="
        prose max-w-none
        prose-blockquote:border-l-4
        prose-blockquote:border-cyan-500
        prose-blockquote:pl-4
        prose-blockquote:text-neutral-600

        prose-a:no-underline
        prose-a:text-cyan-500
        hover:prose-a:text-cyan-600
      "
        >
            <h1>{title}</h1>

            <div className="flex gap-2 mb-4 not-prose">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500 text-white rounded-full text-sm">
                        {tag}
                    </span>
                ))}
            </div>

            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
        </div>
    )
}
