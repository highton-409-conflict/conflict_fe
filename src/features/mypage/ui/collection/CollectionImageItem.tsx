type Props = {
    imageUrl: string
    onClick: () => void
}

export const CollectionImageItem = ({ imageUrl, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="aspect-square rounded-xl bg-neutral-200 overflow-hidden hover:ring-2 hover:ring-cyan-500"
        >
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </button>
    )
}
