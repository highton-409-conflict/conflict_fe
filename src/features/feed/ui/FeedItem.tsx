import Avatar from "@/shared/ui/Avatar"
import { Heart } from "lucide-react"
import { useProfileQuery } from "@entities/user"
import { useNavigate } from "react-router"

interface IProps {
    id: string;
    title: string
    content: string
    date: string
    user: string
    likes: number
    isLiked: boolean
    index: number
}

const FIRST_IMAGE_REGEX: RegExp = /!\[.*?\]\((.*?)\)/;

/**
 * 마크다운 텍스트에서 첫 번째 이미지 URL만 추출
 * @param markdown 대상 문자열
 * @returns 추출된 URL 또는 null
 */
const extractFirstImageSrc = (markdown: string): string | null => {
  const match = markdown.match(FIRST_IMAGE_REGEX);
  return match ? match[1] : null;
};

/**
 * @description 피드 아이템 컴포넌트
 */
export const FeedItem = ({ title, content, date, user, likes, id, isLiked, index }: IProps) => {
    const { data } = useProfileQuery(user);
    const navigate = useNavigate();
    const pad = (n: number) => {
        const v = n.toString();
        return v.length === 1 ? `0${v}` : v;
    }

    return (
        <div
            onClick={() => navigate(`/detail/${id}`)}
            className="
                w-70 h-96.5
                bg-white
                rounded-3xl
                shadow-sm
                overflow-hidden
                cursor-pointer
                transition hover:shadow-md
                flex flex-col justify-start items-center
                box-border p-2
            "
        >
            <div className="w-65 h-45 rounded-2xl aspect-square bg-neutral-300">
                <img src={extractFirstImageSrc(content) ?? `https://picsum.photos/2${pad(index)}`} alt={title} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h4 title={title} className="text-label-large text-black line-clamp-1">
                    {title}
                </h4>

                <p title={content} className="text-neutral-500 text-body-small line-clamp-2">
                    {content}
                </p>

                <p className="text-neutral-400 text-sm">{date}</p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <Avatar src={data?.profile_url} className="w-10 h-10" />
                        <p className="text-label-medium text-black">{data?.name ?? "Loading"}</p>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-500">
                        <span>{likes}</span>
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-500'}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}
