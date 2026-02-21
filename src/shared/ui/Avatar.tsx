import { type ComponentPropsWithoutRef } from "react"
import { twMerge } from "tailwind-merge"

interface IAvatarProps extends ComponentPropsWithoutRef<"div"> {
    src?: string
    alt?: string
    children?: React.ReactNode
    imgClassName?: string
}

/**
 * @description 아바타 컴포넌트
 */
export const Avatar = ({ src, alt = "", children, className, imgClassName, ...rest }: IAvatarProps) => {
    const hasImage = Boolean(src)
    const hasFallback = Boolean(children)

    return (
        <div
            className={twMerge(
                "shrink-0 rounded-full flex items-center justify-center overflow-hidden w-8 h-8 cursor-pointer",
                !hasImage && "bg-neutral-300",
                className
            )}
            {...rest}
        >
            {hasImage ? (
                <img src={src} alt={alt} className={twMerge("w-full h-full object-cover", imgClassName)} />
            ) : hasFallback ? (
                children
            ) : null}
        </div>
    )
}

export default Avatar
