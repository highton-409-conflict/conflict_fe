import type { QueryAllUserRes, QueryProfileRes, UpdateProfileReq, FollowListRes } from "@/entities/user/api/user.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 사용자 API */
export const userApi = {
    /**
     * @description 프로필 조회 API
     */
    queryMyProfile: ApiFactory.get<QueryProfileRes>(API_PATH.USER.MY),

    /**
     * @description 프로필 조회 API
     */
    queryProfile: ApiFactory.get<QueryProfileRes>(API_PATH.USER.USERS),

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
        const apiFn = ApiFactory.post<void, void>(API_PATH.USER.FOLLOW(userId))
        return () => apiFn()
    },

    queryAll: ApiFactory.get<QueryAllUserRes>(API_PATH.USER.ALL),

    /**
     * @description 팔로워 목록 조회 API
     * @param {string} accountId - 계정 ID
     */
    getFollowers: (accountId: string) => ApiFactory.get<FollowListRes>(`${API_PATH.USER.FOLLOWERS}?accountId=${accountId}`),

    /**
     * @description 팔로잉 목록 조회 API
     * @param {string} accountId - 계정 ID
     */
    getFollowings: (accountId: string) => ApiFactory.get<FollowListRes>(`${API_PATH.USER.FOLLOWINGS}?accountId=${accountId}`),
}
