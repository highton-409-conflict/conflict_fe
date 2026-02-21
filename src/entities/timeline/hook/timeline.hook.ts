import { timelineApi } from "@/entities/timeline/api/timeline.api"
import { createMutation } from "@/shared/api"
import type { UpdateTimelineItemReq, TimelineItemRes } from "@/entities/timeline/api/timeline.api.type"

/** 타임라인 아이템 생성 뮤테이션 */
export const useCreateTimelineItemMutation = createMutation(timelineApi.createItem, {
    successMessage: "타임라인 아이템 생성 성공",
    errorMessage: "타임라인 아이템 생성에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        500: "서버 오류가 발생했습니다",
    },
})

const updateTimelineItemMutationFn = (params: {
    itemId: string
    body: UpdateTimelineItemReq
}): Promise<TimelineItemRes> => timelineApi.updateItem(params.itemId)(params.body)

/** 타임라인 아이템 수정 뮤테이션 */
export const useUpdateTimelineItemMutation = createMutation<
    { itemId: string; body: UpdateTimelineItemReq },
    TimelineItemRes
>(updateTimelineItemMutationFn, {
    successMessage: "타임라인 아이템 수정 성공",
    errorMessage: "타임라인 아이템 수정에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        404: "존재하지 않는 아이템입니다",
        500: "서버 오류가 발생했습니다",
    },
})

const deleteTimelineItemMutationFn = (itemId: string): Promise<void> =>
    timelineApi.deleteItem(itemId)()

/** 타임라인 아이템 삭제 뮤테이션 */
export const useDeleteTimelineItemMutation = createMutation<string, void>(deleteTimelineItemMutationFn, {
    successMessage: "타임라인 아이템 삭제 성공",
    errorMessage: "타임라인 아이템 삭제에 실패했습니다",
    errorMessages: {
        401: "인증이 필요합니다",
        404: "존재하지 않는 아이템입니다",
        500: "서버 오류가 발생했습니다",
    },
})
