import { collectionApi } from "@/entities/collection/api/collection.api"
import { createMutation, createQuery } from "@/shared/api"
import type { CollectionRes } from "@/entities/collection/api/collection.api.type"

/** 컬렉션 목록 조회 쿼리 */
export const useCollectionsQuery = createQuery<void, CollectionRes[]>(
    "collection.list",
    () => collectionApi.my()
)

/** 컬렉션 생성 뮤테이션 */
export const useCreateCollectionMutation = createMutation(collectionApi.create, {
    successMessage: "컬렉션 생성 성공",
    errorMessage: "컬렉션 생성에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        500: "서버 오류가 발생했습니다",
    },
})

/** 컬렉션 선택 뮤테이션 */
export const useSelectCollectionMutation = createMutation(collectionApi.select, {
    successMessage: "컬렉션 선택 성공",
    errorMessage: "컬렉션 선택에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        500: "서버 오류가 발생했습니다",
    },
})
