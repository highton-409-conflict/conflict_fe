import type { CreatePostReq, PostRes, UpdatePostReq, UpdatePostRes, TogglePostLikeRes } from "@/entities/post/api/post.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 포스트 API */
export const postApi = {
    /**
     * @description 포스트 전체 조회 API
     */
    getAll: ApiFactory.get<PostRes[]>(API_PATH.POST.POSTS),

    /**
     * @description 포스트 생성 API
     * @param {CreatePostReq} body - 포스트 생성 요청 바디
     */
    create: ApiFactory.post<CreatePostReq, UpdatePostRes>(API_PATH.POST.POSTS),

    /**
     * @description 포스트 수정 API
     * @param {string} postId - 포스트 ID
     * @param {UpdatePostReq} body - 포스트 수정 요청 바디
     */
    update: (postId: string) => ApiFactory.patch<UpdatePostReq, UpdatePostRes>(API_PATH.POST.POST(postId)),

    /**
     * @description 포스트 삭제 API
     * @param {string} postId - 포스트 ID
     */
    delete: (postId: string) => {
        const apiFn = ApiFactory.delete(API_PATH.POST.POST(postId))
        return () => apiFn()
    },

    /**
     * @description 포스트 좋아요 토글 API
     * @param {string} postId - 포스트 ID
     */
    toggleLike: (postId: string) => {
        const apiFn = ApiFactory.post<object, TogglePostLikeRes>(API_PATH.POST.LIKE(postId))
        return () => apiFn({})
    },
}
