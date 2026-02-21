import { FeedItem } from "./FeedItem"

type User = {
    src?: string
    username: string
}

interface Feed {
    id: number
    image: string
    title: string
    content: string
    date: string
    user: User
    likes: number
}

interface IProps {
    feeds: Feed[]
}

/**
 * @description 피드 리스트 컴포넌트
 */
export const FeedList = ({ feeds }: IProps) => {
    return (
        <div className="w-full flex justify-center">
            <div className="w-300 px-4 grid grid-cols-4 gap-8">
                {feeds.map((feed) => (
                    <FeedItem
                        key={feed.id}
                        image={feed.image}
                        title={feed.title}
                        content={feed.content}
                        date={feed.date}
                        user={feed.user}
                        likes={feed.likes}
                    />
                ))}
            </div>
        </div>
    )
}
