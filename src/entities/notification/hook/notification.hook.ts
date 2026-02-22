import { notificationApi } from "@/entities/notification/api/notification.api"
import { createQuery } from "@/shared/api"
import type { NotificationsRes } from "@/entities/notification/api/notification.api.type"

/** 알림 목록 조회 쿼리 */
export const useNotificationsQuery = createQuery<void, NotificationsRes>(
    "notification.list",
    () => notificationApi.getNotifications()
)
