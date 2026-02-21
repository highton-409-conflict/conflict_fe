import { userApi } from "@/entities/user/api/user.api"
import { createMutation, createQuery } from "@/shared/api"
import type { QueryProfileRes } from "@/entities/user/api/user.api.type"

/** 프로필 조회 쿼리 */
export const useProfileQuery = createQuery<string, QueryProfileRes>(
    "user.profile",
    () => userApi.queryProfile()
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
})
