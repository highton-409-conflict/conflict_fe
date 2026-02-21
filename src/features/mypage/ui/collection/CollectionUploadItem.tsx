type Props = {
    onUpload: (file: File) => void
}

export const CollectionUploadItem = ({ onUpload }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) onUpload(file)
    }

    return (
        <label className="flex aspect-square cursor-pointer items-center justify-center rounded-xl bg-neutral-200 hover:ring-2 hover:ring-cyan-500">
            <span className="text-4xl text-white">+</span>
            <input type="file" accept="image/*" hidden onChange={handleChange} />
        </label>
    )
}
