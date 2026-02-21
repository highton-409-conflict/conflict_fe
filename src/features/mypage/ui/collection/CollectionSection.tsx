import { useState } from "react"
import { CollectionSelectModal } from "./CollectionSelectModal"

export const CollectionSection = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">콜렉션 수정</h2>
            <p className="text-sm text-neutral-400">콜렉션으로 수집할 사진을 추가 하거나 콜렉션을 관리 합니다</p>

            <div
                onClick={() => setIsOpen(true)}
                className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-xl bg-neutral-300"
            >
                {selectedImage ? (
                    <img src={selectedImage} alt="collection" className="h-full w-full rounded-xl object-cover" />
                ) : (
                    <span className="text-4xl text-white">+</span>
                )}
            </div>

            {isOpen && (
                <CollectionSelectModal
                    onClose={() => setIsOpen(false)}
                    onSelect={(image) => {
                        setSelectedImage(image)
                        setIsOpen(false)
                    }}
                />
            )}
        </section>
    )
}
