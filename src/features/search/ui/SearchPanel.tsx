import { useState } from "react"
import { FeedItem, type IFeedProps, UserItem, type IUserProps } from "@/features/search/ui"

type TabType = "feed" | "user"

interface IProps {
    feeds: IFeedProps[]
    users: IUserProps[]
}

export const SearchPanel = ({ feeds, users }: IProps) => {
    const [activeTab, setActiveTab] = useState<TabType>("feed")

    return (
        <div className="mt-10">
            <div className="flex border-b border-neutral-300">
                <button
                    onClick={() => setActiveTab("feed")}
                    className={`
                        flex-1 py-4 text-xl font-semibold transition
                        ${activeTab === "feed" ? "text-cyan-500 border-b-4 border-cyan-500" : "text-neutral-400"}
                    `}
                >
                    게시물
                </button>

                <button
                    onClick={() => setActiveTab("user")}
                    className={`
                        flex-1 py-4 text-xl font-semibold transition
                        ${activeTab === "user" ? "text-cyan-500 border-b-4 border-cyan-500" : "text-neutral-400"}
                    `}
                >
                    유저
                </button>
            </div>

            <div className="mt-8 flex flex-col gap-10">
                {activeTab === "feed" && feeds.map((feed, idx) => <FeedItem key={idx} {...feed} />)}

                {activeTab === "user" && users.map((user, idx) => <UserItem key={idx} {...user} />)}
            </div>
        </div>
    )
}
