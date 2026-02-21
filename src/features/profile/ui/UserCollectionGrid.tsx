interface UserCollectionGridProps {
    title?: string
    items?: { id: string }[]
}

export function UserCollectionGrid({ title = "유저이름의 콜렉션", items = [] }: UserCollectionGridProps) {
    return (
        <section className="w-full flex flex-col gap-6">
            <h2 className="text-xl font-bold text-black">{title}</h2>

            <div className="grid grid-cols-5 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="aspect-square rounded-2xl bg-neutral-300" />
                ))}
            </div>
        </section>
    )
}
