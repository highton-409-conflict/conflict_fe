/** 포스트 생성 요청 타입 */
export interface CreatePostReq {
    title: string
    content: string
}

export interface Tag {
    tag_id: string
    tag_name: string
}

/** 포스트 응답 타입 */
export interface PostRes {
    id: string
    title: string
    content: string
    author_id: string
    created_at: string
    likes: number
    is_liked: boolean
    tags: Tag[]
}

/** 포스트 수정 요청 타입 */
export interface UpdatePostReq {
    title: string
    content: string
}

/** 포스트 수정 응답 타입 */
export interface UpdatePostRes {
    id: string
    title: string
    content: string
    author_id: string
    created_at: string
}

/** 포스트 좋아요 토글 응답 타입 */
export interface TogglePostLikeRes {
    is_liked: boolean
    like_count: number
}
