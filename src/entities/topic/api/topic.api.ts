import type { CreateTopicReq, TopicQueryAllRes, TopicRes } from "@/entities/topic/api/topic.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 토픽 API */
export const topicApi = {
    /**
     * @description 토픽 생성 API
     * @param {CreateTopicReq} body - 토픽 생성 요청 바디
     */
    create: ApiFactory.post<CreateTopicReq, TopicRes>(API_PATH.TOPIC.TOPICS),

    queryAll: ApiFactory.get<TopicQueryAllRes>(API_PATH.TOPIC.TOPICS),

    /**
     * @description 토픽 구독 API
     * @param {string} topicId - 토픽 ID
     */
    subscribe: (topicId: string) => {
        const apiFn = ApiFactory.post<object, void>(API_PATH.TOPIC.SUBSCRIBE(topicId))
        return () => apiFn({})
    },
}
