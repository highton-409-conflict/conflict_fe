/** 컬렉션 생성 요청 타입 */
export interface CreateCollectionReq {
    image?: string
}

/** 컬렉션 응답 타입 */
export interface CollectionRes {
    id: string
    duck: number
    image?: string
}

export type MyCollectionRes = CollectionRes[];

/** 컬렉션 선택 요청 타입 */
export interface SelectCollectionReq {
    collection_id: string
}
