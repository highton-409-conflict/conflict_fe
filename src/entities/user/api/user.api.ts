import type { QueryAllUserRes, QueryProfileRes, UpdateProfileReq } from "@/entities/user/api/user.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 사용자 API */
export const userApi = {
    /**
     * @description 프로필 조회 API
     */
    queryProfile: ApiFactory.get<QueryProfileRes>(API_PATH.USER.MY),

    /**
     * @description 프로필 수정 API
     * @param {UpdateProfileReq} body - 프로필 수정 요청 바디
     */
    updateProfile: ApiFactory.patch<UpdateProfileReq, void>(API_PATH.USER.PROFILE),

    /**
     * @description 사용자 팔로우 API
     * @param {string} userId - 사용자 ID
     */
    follow: (userId: string) => {
        const apiFn = ApiFactory.post<object, void>(API_PATH.USER.FOLLOW(userId))
        return () => apiFn({})
    },

    queryAll: ApiFactory.get<QueryAllUserRes>(API_PATH.USER.ALL)
}
