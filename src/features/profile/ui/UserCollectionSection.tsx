interface UserCollectionSectionProps {
    title?: string
    children?: React.ReactNode
}

export function UserCollectionSection({ title = "유저의 콜렉팅", children }: UserCollectionSectionProps) {
    return (
        <section className="w-full flex flex-col gap-6">
            <h2 className="text-title-small">{title}</h2>

            <div className="w-7/8 rounded-2xl border-neutral-200 bg-neutral-300 min-h-120 p-6">{children}</div>
        </section>
    )
}
