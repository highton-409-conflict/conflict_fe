export const API_PATH = {
    AUTH: {
        LOGIN: "/auth/login",
        REFRESH: "/auth/refresh",
        SIGNUP: "/auth/signup",
        WITHDRAW: "/auth/withdraw",
    },
    USER: {
        MY: "/user",
        PROFILE: "/user/profile",
        FOLLOW: (userId: string) => `/user/${userId}/follow`,
        ALL: "/user/all",
    },
    TOPIC: {
        TOPICS: "/topics",
        SUBSCRIBE: (topicId: string) => `/topics/${topicId}/subscribe`,
    },
    TIMELINE: {
        ITEMS: "/timelines/items",
        ITEM: (itemId: string) => `/timelines/items/${itemId}`,
    },
    FILE: {
        IMAGE: "/file/image",
    },
    COLLECTION: {
        COLLECTIONS: "/collections",
        MYCOLLECTION: "/collections/my",
        SELECT: "/collections/select",
    },
    POST: {
        POSTS: "/posts",
        POST: (postId: string) => `/posts/${postId}`,
        LIKE: (postId: string) => `/posts/${postId}/like`
    },
    NOTIFICATION: {
        NOTIFICATIONS: "/notifications",
        READ: (notificationId: string) => `/notifications/${notificationId}/read`,
    },
}
