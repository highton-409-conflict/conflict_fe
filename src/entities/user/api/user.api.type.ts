/** 사용자 프로필 조회 응답 타입 */
export interface QueryProfileRes {
    name: string
    account_id: string
    introduce: string
    profile_url?: string
    collection_url?: string,
    followers: number,
    following: number,
    timeline: TimelineTopic[]
}

export interface AllUserItem {
    id: string;
    account_id: string;
    name: string;
    profile?: string;
}

export interface QueryAllUserRes {
    users: AllUserItem[]
}

/** 타임라인 토픽 타입 */
export interface TimelineTopic {
    topic_name: string
    start_date: string
    end_date: string
    topic_image_url?: string
}

/** 사용자 아이템 타입 */
export interface UserItem {
    id: string
    account_id: string
    name: string
    profile?: string
}

/** 프로필 수정 요청 타입 */
export interface UpdateProfileReq {
    introduce?: string
    name?: string
    image?: string
}
