import { notificationApi } from "@/entities/notification/api/notification.api"
import { createMutation, createQuery } from "@/shared/api"
import type { NotificationsRes } from "@/entities/notification/api/notification.api.type"

/** 알림 목록 조회 쿼리 */
export const useNotificationsQuery = createQuery<void, NotificationsRes>(
    "notification.list",
    () => notificationApi.getNotifications()
)

const markAsReadMutationFn = (notificationId: string): Promise<void> =>
    notificationApi.markAsRead(notificationId)()

/** 알림 읽음 처리 뮤테이션 */
export const useMarkAsReadMutation = createMutation<string, void>(markAsReadMutationFn, {
    successMessage: "",
    errorMessage: "알림 읽음 처리에 실패했습니다",
    errorMessages: {
        401: "인증이 필요합니다",
        404: "존재하지 않는 알림입니다",
        500: "서버 오류가 발생했습니다",
    },
})
