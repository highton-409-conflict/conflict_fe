import { topicApi } from "@/entities/topic/api/topic.api"
import { createMutation, createQuery } from "@/shared/api"
import type { TopicQueryAllRes } from "@/entities/topic/api/topic.api.type"

/** 토픽 생성 뮤테이션 */
export const useCreateTopicMutation = createMutation(topicApi.create, {
    successMessage: "토픽 생성 성공",
    errorMessage: "토픽 생성에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        500: "서버 오류가 발생했습니다",
    },
})

export const useAllTopicQuery = createQuery<string, TopicQueryAllRes>("topic.all", () => topicApi.queryAll())

const subscribeTopicMutationFn = (topicId: string): Promise<void> =>
    topicApi.subscribe(topicId)()

/** 토픽 구독 뮤테이션 */
export const useSubscribeTopicMutation = createMutation<string, void>(subscribeTopicMutationFn, {
    successMessage: "구독 성공",
    errorMessage: "구독에 실패했습니다",
    errorMessages: {
        401: "인증이 필요합니다",
        404: "존재하지 않는 토픽입니다",
        500: "서버 오류가 발생했습니다",
    },
})
