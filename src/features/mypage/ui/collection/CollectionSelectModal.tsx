import { useEffect } from "react"
import { useCollectionsQuery, useCreateCollectionMutation } from "@/entities/collection"
import { useUploadImageMutation } from "@/entities/file"
import { Button } from "@/shared/ui"
import { CollectionImageItem } from "./CollectionImageItem"
import { CollectionUploadItem } from "./CollectionUploadItem"

type Props = {
    onClose: () => void
    onSelect: (collectionId: string) => void
}

export const CollectionSelectModal = ({ onClose, onSelect }: Props) => {
    useEffect(() => {
        document.body.style.overflow = "hidden"

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [onClose])

    const { data: collections, refetch } = useCollectionsQuery()
    const uploadImageMutation = useUploadImageMutation()
    const createCollectionMutation = useCreateCollectionMutation()

    const handleUpload = async (file: File) => {
        const uploadResult = await uploadImageMutation.mutateAsync(file)
        await createCollectionMutation.mutateAsync({ image: uploadResult.url })
        await refetch()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className="w-160 rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex justify-between">
                    <h3 className="text-lg font-bold">콜렉션 에서 이미지를 선택 하세요.</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {collections?.map((collection) => (
                        <CollectionImageItem
                            key={collection.id}
                            imageUrl={collection.image || ""}
                            onClick={() => onSelect(collection.id)}
                        />
                    ))}

                    <CollectionUploadItem
                        onUpload={handleUpload}
                    />
                </div>

                <Button className="mt-6">추가하기</Button>
            </div>
        </div>
    )
}
