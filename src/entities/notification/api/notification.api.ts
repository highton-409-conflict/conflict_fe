import type { NotificationsRes } from "@/entities/notification/api/notification.api.type"
import { ApiFactory, API_PATH } from "@/shared/api"

/** 알림 API */
export const notificationApi = {
    /**
     * @description 알림 목록 조회 API
     */
    getNotifications: ApiFactory.get<NotificationsRes>(API_PATH.NOTIFICATION.NOTIFICATIONS),
}
