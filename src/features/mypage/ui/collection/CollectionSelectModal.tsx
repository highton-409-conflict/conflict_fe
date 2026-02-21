import { useEffect } from "react"
import { collectionMock } from "../../model/collection.mock"
import { Button } from "@/shared/ui"
import { CollectionImageItem } from "./CollectionImageItem"
import { CollectionUploadItem } from "./CollectionUploadItem"

type Props = {
    onClose: () => void
    onSelect: (imageUrl: string) => void
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className="w-160 rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex justify-between">
                    <h3 className="text-lg font-bold">콜렉션 에서 이미지를 선택 하세요.</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {collectionMock.map((image) => (
                        <CollectionImageItem
                            key={image.id}
                            imageUrl={image.imageUrl}
                            onClick={() => onSelect(image.imageUrl)}
                        />
                    ))}

                    <CollectionUploadItem
                        onUpload={(file) => {
                            console.log("업로드 파일", file)
                        }}
                    />
                </div>

                <Button className="mt-6">추가하기</Button>
            </div>
        </div>
    )
}
