/** 알림 아이템 타입 */
export interface NotificationItem {
    id: string
    title: string
    body: string
    type: "COLLECTION" | "TOPIC" | "FOLLOWER"
    link: string
    is_read: boolean
    created_at: string
}

/** 알림 목록 응답 타입 */
export interface NotificationsRes {
    notifications: NotificationItem[]
}
