import { useState } from "react"
import { CollectionSelectModal } from "./CollectionSelectModal"
import { useUserQuery } from "@/entities/user"
import { useSelectCollectionMutation } from "@/entities/collection"

export const CollectionSection = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: user, refetch } = useUserQuery()
    const selectCollectionMutation = useSelectCollectionMutation()

    const handleSelectCollection = (collectionId: string) => {
        selectCollectionMutation.mutate({
            collection_id: collectionId
        }, {
            onSuccess: () => {
                refetch()
            }
        })
        setIsOpen(false)
    }

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">콜렉션 수정</h2>
            <p className="text-sm text-neutral-400">콜렉션으로 수집할 사진을 추가 하거나 콜렉션을 관리 합니다</p>

            <div
                onClick={() => setIsOpen(true)}
                className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-xl bg-neutral-300"
            >
                {user?.collection_url ? (
                    <img src={user.collection_url} alt="collection" className="h-full w-full rounded-xl object-cover" />
                ) : (
                    <span className="text-4xl text-white">+</span>
                )}
            </div>

            {isOpen && (
                <CollectionSelectModal
                    onClose={() => setIsOpen(false)}
                    onSelect={handleSelectCollection}
                />
            )}
        </section>
    )
}
