import { userApi } from "@/entities/user/api/user.api"
import { createMutation, createQuery } from "@/shared/api"
import type { QueryProfileRes, FollowListRes, QueryAllUserRes } from "@/entities/user/api/user.api.type"
import { queryClient } from "@/shared/query"

/** 현재 사용자 정보 조회 쿼리 */
export const useUserQuery = createQuery<void, QueryProfileRes>(
    "user.me",
    () => userApi.queryMyProfile()
)

/** 프로필 조회 쿼리 */
export const useProfileQuery = createQuery<string, QueryProfileRes>(
    "user.profile",
    (accountId: string) => userApi.queryProfile({ params: { accountId } })
)

/** 팔로워 목록 조회 쿼리 */
export const useFollowersQuery = createQuery<string, FollowListRes>(
    "user.followers",
    (accountId: string) => userApi.getFollowers(accountId)()
)

/** 팔로잉 목록 조회 쿼리 */
export const useFollowingsQuery = createQuery<string, FollowListRes>(
    "user.followings",
    (accountId: string) => userApi.getFollowings(accountId)()
)

/** 전체 사용자 조회 쿼리 */
export const useAllUsersQuery = createQuery<void, QueryAllUserRes>(
    "user.all",
    () => userApi.queryAll()
)

/** 프로필 수정 뮤테이션 */
export const useUpdateProfileMutation = createMutation(userApi.updateProfile, {
    successMessage: "프로필 수정 성공",
    errorMessage: "프로필 수정에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        500: "서버 오류가 발생했습니다",
    },
    onSuccessCallback: () => {
        queryClient.removeQueries({ queryKey: ["user.profile"] })
        queryClient.removeQueries({ queryKey: ["user.me"] })
    }
})

const followMutationFn = (userId: string): Promise<void> => userApi.follow(userId)()

/** 사용자 팔로우 뮤테이션 */
export const useFollowMutation = createMutation<string, void>(followMutationFn, {
    successMessage: "팔로우 성공",
    errorMessage: "팔로우에 실패했습니다",
    errorMessages: {
        401: "인증이 필요합니다",
        404: "존재하지 않는 사용자입니다",
        500: "서버 오류가 발생했습니다",
    },
    onSuccessCallback: () => {
        queryClient.invalidateQueries({ queryKey: ["user.profile"] })
        queryClient.invalidateQueries({ queryKey: ["user.all"] })
        queryClient.invalidateQueries({ queryKey: ["user.followers"] })
        queryClient.invalidateQueries({ queryKey: ["user.followings"] })
    }
})
