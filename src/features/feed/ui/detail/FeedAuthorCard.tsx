import { Button } from "@/shared/ui"

export const FeedAuthorCard = () => {
    return (
        <div className="rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-neutral-400" />

                    <div>
                        <div className="text-label-large">유저1</div>
                        <div className="text-label-medium text-neutral-500">@User0001</div>
                    </div>
                </div>

                <div className="text-sm text-neutral-500">팔로워 144&nbsp;&nbsp;팔로잉 144</div>
            </div>

            <p className="text-sm text-neutral-600 mb-4">안녕하세요. 안녕하세요. 안녕하세요.</p>

            <Button size="medium">팔로우</Button>
        </div>
    )
}
