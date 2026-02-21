import { postApi } from "@/entities/post/api/post.api"
import { createMutation, createQuery } from "@/shared/api"
import type { PostRes, UpdatePostReq, UpdatePostRes, TogglePostLikeRes } from "@/entities/post/api/post.api.type"

/** 포스트 목록 조회 쿼리 */
export const usePostsQuery = createQuery<void, PostRes[]>(
    "post.list",
    () => postApi.getAll()
)

/** 포스트 상세 조회 쿼리 */
export const usePostQuery = createQuery<string, PostRes>(
    "post.detail",
    (postId) => postApi.getAll().then(res => res.find(post => post.id === postId)!)
)

/** 포스트 생성 뮤테이션 */
export const useCreatePostMutation = createMutation(postApi.create, {
    successMessage: "포스트 생성 성공",
    errorMessage: "포스트 생성에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        500: "서버 오류가 발생했습니다",
    },
})

const updatePostMutationFn = (params: { postId: string; body: UpdatePostReq }): Promise<UpdatePostRes> =>
    postApi.update(params.postId)(params.body)

/** 포스트 수정 뮤테이션 */
export const useUpdatePostMutation = createMutation<
    { postId: string; body: UpdatePostReq },
    UpdatePostRes
>(updatePostMutationFn, {
    successMessage: "포스트 수정 성공",
    errorMessage: "포스트 수정에 실패했습니다",
    errorMessages: {
        400: "잘못된 입력값입니다",
        401: "인증이 필요합니다",
        404: "존재하지 않는 포스트입니다",
        500: "서버 오류가 발생했습니다",
    },
})

const deletePostMutationFn = (postId: string): Promise<void> => postApi.delete(postId)() as Promise<void>

/** 포스트 삭제 뮤테이션 */
export const useDeletePostMutation = createMutation<string, void>(deletePostMutationFn, {
    successMessage: "포스트 삭제 성공",
    errorMessage: "포스트 삭제에 실패했습니다",
    errorMessages: {
        401: "인증이 필요합니다",
        404: "존재하지 않는 포스트입니다",
        500: "서버 오류가 발생했습니다",
    },
})

const togglePostLikeMutationFn = (postId: string): Promise<TogglePostLikeRes> =>
    postApi.toggleLike(postId)()

/** 포스트 좋아요 토글 뮤테이션 */
export const useTogglePostLikeMutation = createMutation<string, TogglePostLikeRes>(
    togglePostLikeMutationFn,
    {
        successMessage: "",
        errorMessage: "좋아요 처리에 실패했습니다",
        errorMessages: {
            401: "인증이 필요합니다",
            404: "존재하지 않는 포스트입니다",
            500: "서버 오류가 발생했습니다",
        },
    }
)
