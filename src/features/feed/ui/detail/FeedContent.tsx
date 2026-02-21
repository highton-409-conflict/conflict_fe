import { MarkdownPreview } from "."

interface Props {
    title: string
    content: string
    tags: string[]
}

export const FeedContent = ({ title, content, tags }: Props) => {
    return (
        <div className="mb-16">
            <MarkdownPreview title={title} content={content} tags={tags} />
        </div>
    )
}
