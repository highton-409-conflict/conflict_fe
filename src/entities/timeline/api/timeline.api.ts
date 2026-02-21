import type { CreateTimelineItemReq, TimelineItemRes, UpdateTimelineItemReq } from "@/entities/timeline/api/timeline.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 타임라인 API */
export const timelineApi = {
    /**
     * @description 타임라인 아이템 생성 API
     * @param {CreateTimelineItemReq} body - 타임라인 아이템 생성 요청 바디
     */
    createItem: ApiFactory.post<CreateTimelineItemReq, TimelineItemRes>(API_PATH.TIMELINE.ITEMS),

    /**
     * @description 타임라인 아이템 수정 API
     * @param {string} itemId - 아이템 ID
     * @param {UpdateTimelineItemReq} body - 타임라인 아이템 수정 요청 바디
     */
    updateItem: (itemId: string) => ApiFactory.patch<UpdateTimelineItemReq, TimelineItemRes>(API_PATH.TIMELINE.ITEM(itemId)),

    /**
     * @description 타임라인 아이템 삭제 API
     * @param {string} itemId - 아이템 ID
     */
    deleteItem: (itemId: string) => {
        const apiFn = ApiFactory.delete<object, void>(API_PATH.TIMELINE.ITEM(itemId))
        return () => apiFn({})
    },
}
