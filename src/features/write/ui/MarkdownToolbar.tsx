import { Heading1, Heading2, Heading3, Bold, Italic, Quote, Link, Image as ImageIcon } from "lucide-react"

interface Props {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>
    setContent: React.Dispatch<React.SetStateAction<string>>
}

/**
 * @description 마크다운 툴바 컴포넌트
 */
export const MarkdownToolbar = ({ textareaRef, setContent }: Props) => {
    const applyFormat = (prefix: string, suffix = "", block = false) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const value = textarea.value
        const selected = value.slice(start, end)

        let newText = ""

        if (block) {
            const before = value.slice(0, start)
            const lineStart = before.lastIndexOf("\n") + 1
            const lineEnd = value.indexOf("\n", start)
            const realLineEnd = lineEnd === -1 ? value.length : lineEnd

            let currentLine = value.slice(lineStart, realLineEnd)

            const removedLine = currentLine.replace(/^(#{1,3}\s|>\s)/, "")

            const updatedLine = prefix + removedLine

            newText = value.slice(0, lineStart) + updatedLine + value.slice(realLineEnd)

            setContent(newText)

            const diff = updatedLine.length - currentLine.length

            setTimeout(() => {
                textarea.focus()
                textarea.setSelectionRange(start + diff, end + diff)
            }, 0)

            return
        }

        if (selected) {
            newText = value.slice(0, start) + prefix + selected + suffix + value.slice(end)
        } else {
            newText = value.slice(0, start) + prefix + suffix + value.slice(end)
        }

        setContent(newText)

        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + prefix.length, end + prefix.length)
        }, 0)
    }

    return (
        <div className="flex items-center gap-4 text-neutral-500">
            <button onClick={() => applyFormat("# ", "", true)}>
                <Heading1 size={20} />
            </button>

            <button onClick={() => applyFormat("## ", "", true)}>
                <Heading2 size={20} />
            </button>

            <button onClick={() => applyFormat("### ", "", true)}>
                <Heading3 size={20} />
            </button>

            <div className="w-px h-5 bg-neutral-300" />

            <button onClick={() => applyFormat("**", "**")}>
                <Bold size={20} />
            </button>

            <button onClick={() => applyFormat("_", "_")}>
                <Italic size={20} />
            </button>

            <div className="w-px h-5 bg-neutral-300" />

            <button onClick={() => applyFormat("> ", "", true)}>
                <Quote size={20} />
            </button>

            <button onClick={() => applyFormat("[", "](url)")}>
                <Link size={20} />
            </button>

            <button onClick={() => applyFormat("![alt](", "image-url)")}>
                <ImageIcon size={20} />
            </button>
        </div>
    )
}
