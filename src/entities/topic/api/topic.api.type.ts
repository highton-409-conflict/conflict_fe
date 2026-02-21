/** 토픽 생성 요청 타입 */
export interface CreateTopicReq {
    name: string
    parent_id?: string
    image?: string
}

/** 토픽 응답 타입 */
export interface TopicRes {
    id: string
    name: string
    parent_id?: string
    image?: string
}

export type TopicQueryAllRes = TopicRes[] 

/** 토픽 구독 요청 타입 */
export interface SubscribeTopicReq {
    topic_id: string
}
