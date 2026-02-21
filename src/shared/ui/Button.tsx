import { memo, type ComponentProps } from "react"
import clsx from "clsx"

type Props = ComponentProps<"button"> & {
    fullWidth?: boolean
    variant?: "primary" | "error" | "white"
    size?: "large" | "medium"
}

/**
 * @description 버튼 컴포넌트
 */
export const Button = memo(function Button({
    fullWidth = true,
    type = "button",
    children,
    disabled,
    className,
    variant = "primary",
    size = "large",
    ...props
}: Props) {
    return (
        <button
            type={type}
            disabled={disabled}
            aria-disabled={disabled}
            className={clsx(
                "inline-flex items-center justify-center rounded-lg",
                "transition-colors duration-200",
                "focus-visible:outline focus-visible:outline-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",

                size === "large" && "h-14 px-4 text-label-large",
                size === "medium" && "h-8 px-3 text-label-medium",

                variant === "primary" && "bg-cyan-500 text-white hover:bg-cyan-600 focus-visible:outline-cyan-600",

                variant === "error" && "bg-red-200 text-red-500 hover:bg-red-300 focus-visible:outline-red-400",

                variant === "white" &&
                    "bg-white text-cyan-500 border border-cyan-500 hover:bg-cyan-50 focus-visible:outline-cyan-500",

                fullWidth ? "w-full" : "w-fit",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
})
