import { FeedAuthorCard, FeedContent, FeedLikeButton } from "@/features/feed/ui"

const dummy = {
    title: "나의 첫 번째 컬렉션 기록 ✨",
    tags: ["애니메이션", "최애캐", "회상", "2024"],
    content: `
## 오늘의 기록

드디어 정리했다.  
생각보다 오래 걸렸지만 만족스럽다.

---

### 🔥 좋아하는 이유

- 세계관이 탄탄하다
- 캐릭터 서사가 깊다
- OST가 진짜 좋다

> 이 장면은 아직도 잊히지 않는다.  
> 처음 봤을 때의 그 감정 그대로다.

---

### 링크 테스트

[공식 사이트 바로가기](https://example.com)

---

### 코드 블록

\`\`\`ts
const favorite = "에렌 예거"

function shout(name: string) {
  return name + " 최고"
}
\`\`\`

마지막 한 줄 정리.  
다음에도 또 기록해야지.
`,
}

/**
 * @description 피드 상세 페이지 컴포넌트
 */
export const FeedDetailPage = () => {
    return (
        <div className="relative max-w-3xl mx-auto px-4 py-10">
            <FeedLikeButton />

            <FeedContent title={dummy.title} content={dummy.content} tags={dummy.tags} />

            <FeedAuthorCard />
        </div>
    )
}
