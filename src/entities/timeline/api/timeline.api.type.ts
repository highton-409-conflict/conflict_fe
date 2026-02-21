/** 타임라인 아이템 생성 요청 타입 */
export interface CreateTimelineItemReq {
    topic_id: string
    start: string
    end: string
}

/** 타임라인 아이템 응답 타입 */
export interface TimelineItemRes {
    id: string
    topic_id: string
    topic_name: string
    start: string
    end: string
}

/** 타임라인 아이템 수정 요청 타입 */
export interface UpdateTimelineItemReq {
    topic_id?: string
    start?: string
    end?: string
}
