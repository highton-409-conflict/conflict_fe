import type { NotificationsRes } from "@/entities/notification/api/notification.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 알림 API */
export const notificationApi = {
    /**
     * @description 알림 목록 조회 API
     */
    getNotifications: ApiFactory.get<NotificationsRes>(API_PATH.NOTIFICATION.NOTIFICATIONS),

    /**
     * @description 알림 읽음 처리 API
     * @param {string} notificationId - 알림 ID
     */
    markAsRead: (notificationId: string) => {
        const apiFn = ApiFactory.post<object, void>(API_PATH.NOTIFICATION.READ(notificationId))
        return () => apiFn({})
    },
}
