import type { CreateCollectionReq, CollectionRes, SelectCollectionReq, MyCollectionRes } from "@/entities/collection/api/collection.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 컬렉션 API */
export const collectionApi = {
    /**
     * @description 컬렉션 생성 API
     * @param {CreateCollectionReq} body - 컬렉션 생성 요청 바디
     */
    create: ApiFactory.post<CreateCollectionReq, CollectionRes>(API_PATH.COLLECTION.COLLECTIONS),

    my: ApiFactory.get<MyCollectionRes>(API_PATH.COLLECTION.MYCOLLECTION),

    /**
     * @description 컬렉션 선택 API
     * @param {SelectCollectionReq} body - 컬렉션 선택 요청 바디
     */
    select: ApiFactory.put<SelectCollectionReq, void>(API_PATH.COLLECTION.SELECT),
}
