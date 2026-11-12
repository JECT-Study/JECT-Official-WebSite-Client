# Skeleton

데이터를 기다리는 콘텐츠의 자리를 표시합니다. 실제 콘텐츠를 감싸거나 로딩 상태를 판단하지 않는 독립형 장식 요소입니다.

```tsx
import { Skeleton } from "@jects/jds";
import * as styles from "./postSkeleton.css";

<Skeleton className={styles.postTitleSkeleton} />;
```

소비처의 `postSkeleton.css.ts`에서 크기와 반응형을 관리합니다. 텍스트 막대의 높이에는 실제 요소와 연결된 타이포그래피 토큰을 사용합니다.

```ts
import { style } from "@vanilla-extract/css";
import { textStyles } from "@jects/jds/tokens";

export const postTitleSkeleton = style({
  width: "70%",
  height: textStyles.title["1"].fontSize,
});

export const bodyLineSkeleton = style({
  width: "100%",
  height: textStyles.body.sm.normal.fontSize,
});

export const bodyLastLineSkeleton = style([bodyLineSkeleton, { width: "65%" }]);
```

- `className`: 크기·반응형·공유 레이아웃을 지정하는 기본 경로입니다. CSS에서 관리하는 속성의 크기 prop은 생략합니다.
- `width`, `height`: 간단한 고정 크기나 실행 중 결정되는 값을 전달할 때 사용할 수 있는 선택적 편의 prop입니다. 기본값은 없으며 숫자는 px, 문자열은 CSS 크기입니다. 기존 사용법은 유지합니다.
- `radius`: JDS radius 토큰 키, 기본값 `"8"`입니다. 실제 콘텐츠와 같은 토큰을 선택합니다.
- `style`: 같은 속성의 크기 prop과 radius 스타일보다 우선합니다. 부모에 반경이 있으면 `style={{ borderRadius: "inherit" }}`으로 명시적으로 상속할 수 있습니다.
- `ref`: 루트 `HTMLDivElement`에 연결됩니다.

크기 prop은 inline style로 적용되므로, 일반적인 클래스의 같은 속성보다 우선합니다. 예를 들어 미디어쿼리에서 너비를 바꾸려면 `width` prop을 생략합니다. `style.width`나 `style.height`도 같은 주의가 필요합니다.

```tsx
<Skeleton width={48} height={48} radius='max' />
```

크기는 소비처의 알려진 레이아웃을 기준으로 지정합니다. 아직 없는 콘텐츠의 길이나 DOM에서 크기와 반경을 추론하지 않습니다. 실제 콘텐츠와 Skeleton이 공통 프레임이나 CSS를 공유하면 값의 중복을 줄일 수 있지만, 임의 길이의 데이터까지 완전히 같은 외형을 보장하지는 않습니다.

## Suspense와 TanStack Query

`useSuspenseQuery`를 사용하는 소비처의 예시입니다. JDS는 TanStack Query에 의존하지 않습니다.

```tsx
function PostSkeleton() {
  return (
    <div className={postLayout}>
      <Skeleton className={styles.postTitleSkeleton} />
      <Skeleton className={styles.bodyLineSkeleton} />
      <Skeleton className={styles.bodyLastLineSkeleton} />
    </div>
  );
}

function PostContent() {
  const { data } = useSuspenseQuery({ queryKey: ["post", postId], queryFn: fetchPost });
  return <PostBody post={data} />;
}

function Post() {
  return (
    <PostFrame>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent />
      </Suspense>
    </PostFrame>
  );
}
```

오류 경계와 재시도는 소비처에서 별도로 구성합니다. 일반 `useQuery`는 최초 데이터가 없는 `isPending` 상태에서 fallback을 선택하고, 데이터가 이미 있는 백그라운드 `isFetching`만으로 화면 전체를 Skeleton으로 바꾸지는 않습니다. 표시 지연, 빈 결과, 추가 페이지 로딩도 소비처 정책입니다.

## 접근성과 모션

Skeleton은 `aria-hidden="true"`인 빈 `div`이며 Tab 순서에 들어가지 않습니다. 로딩 영역의 `aria-busy`와 안내가 필요하면 영역당 하나의 `role="status"`를 소비처에서 제공합니다. 상태 안내는 `aria-hidden`이나 로딩 중인 `aria-busy` 영역 밖에 둡니다. 실제 스크린 리더 낭독 검증은 별도입니다.

기본 애니메이션은 1500ms 동안 왼쪽에서 오른쪽으로 이동하는 shimmer입니다. `prefers-reduced-motion: reduce`에서는 이동광과 애니메이션을 모두 제거하고 바탕색만 표시합니다. 텍스트 막대의 높이는 글자 크기에 맞추고, 줄 간격은 소비처의 레이아웃으로 유지합니다.

[SEED Skeleton](https://seed-design.io/components/skeleton)처럼 소비처에서 형태를 지정하는 사용법을 참고하되, 반경은 JDS 토큰 키를 사용합니다. [WAI-ARIA aria-hidden](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden), [WCAG 상태 메시지](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)를 접근성 안내의 기준으로 사용합니다.

## Storybook 구성

- `Default`: 기본 요소와 크기/반경 Controls
- `ProjectCards`: 프로젝트 카드 그리드. 카드 틀을 유지하고 이미지·제목·본문·캡션 자리만 대체합니다.
- `BlogPosts`: 게시글 목록. 제목과 분류 필터는 유지하고 글 내용·메타 정보·썸네일만 대체합니다. 필터는 로컬 선택 예시이며 실제 API 요청은 없습니다.
- `Members`: 운영진 목록. 실제 원형 프로필과 같은 반경을 선택하고 이름·역할 자리만 대체합니다.

리소스 예시 세 개의 크기는 모두 `skeleton.stories.css.ts`에서 지정합니다. `Default`는 편의 props의 Controls를 유지합니다.

[Figma Skeleton 리소스](https://www.figma.com/design/VGdi9AdcpTxkzK1Kqxcd3D/?node-id=30418-4986)의 권장 사례 1·3·5를 사용합니다. 리소스 2·4·6은 개요에서 각각 실제 배치와 다른 윤곽, 고정 제목·필터까지 대체, 프로필 반경 불일치의 비권장 사례로 설명하므로 사용 예시에 포함하지 않습니다. 720×576 프레임을 기준으로 하며, 카드 목록이 프레임 아래로 이어지는 모습도 리소스와 같습니다. 작은 화면에서는 그리드를 재배치합니다.

스토리는 [Storybook 작성 규약](../../../../../docs/storybook-guide.md)에 따라 사용 예시 중심으로 작성하며, 검증용 `play`나 테스트 fixture를 포함하지 않습니다.

## SEED와 비교한 차이

[SEED React Skeleton 문서](https://seed-design.io/react/components/skeleton)와 [공개 구현](https://github.com/daangn/seed-design/blob/dev/packages/react/src/components/Skeleton/Skeleton.tsx)을 기준으로 props와 기능을 비교합니다. 문서·스토리 개수가 아니라 실제 지원 범위의 차이이며, 2026-10-23 확인 기준입니다.

| prop / 기능           | SEED                                                                     | 현재 JDS                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `width`, `height`     | CSS 문자열, `x12`·`full` 같은 토큰 축약, `{ base, md }` 같은 반응형 객체 | 숫자(px), CSS 문자열·변수. 토큰 축약과 반응형 객체는 지원하지 않으며, 반응형은 `className`으로 지정                                              |
| 텍스트 높이           | `height="lineHeight.t4"` 같은 line-height 토큰 축약                      | 전용 축약 API 없음. `textStyles`의 실제 토큰 값을 전달                                                                                           |
| `radius`              | `"0"`, `"8"`, `"16"`, `"full"`                                           | `"0"`, `"2"`, `"4"`, `"6"`, `"8"`, `"10"`, `"12"`, `"16"`, `"24"`, `"max"`. 원형 값의 이름이 다르며, 두 구현 모두 기본값은 `"8"`                 |
| `tone`                | `"neutral"`, `"magic"`                                                   | prop 없음. 일반 로딩 표현 한 종류                                                                                                                |
| `asChild`             | 자식 요소에 합성 가능                                                    | prop 없음. 빈 장식용 `div`만 제공                                                                                                                |
| `loading` / 요청 상태 | prop 없음. 소비처에서 표시 여부 결정                                     | 동일. 소비처에서 표시 여부 결정                                                                                                                  |
| `ref`, DOM 속성       | 루트 요소 ref와 HTML 속성 지원                                           | 루트 `HTMLDivElement` ref와 HTML 속성 지원. 빈 장식 요소 계약에 따라 `children`, HTML 삽입, 편집, Tab 순서, `aria-hidden` 재정의는 공개하지 않음 |

SEED 대비 빠진 API는 크기 토큰·반응형 객체·line-height 축약, `tone`, `asChild`입니다. 다만 모두 필수 기능이 빠진 결함은 아닙니다. 크기 축약은 공통 스타일 API와 함께 설계할 편의 기능이고, `tone="magic"`은 별도 AI 로딩 디자인이 필요합니다. `asChild`는 다른 루트 요소가 필요한 사용처가 있을 때 검토합니다. JDS의 텍스트 지침은 막대 높이를 font-size, 슬롯 높이를 line-height에 맞추므로 SEED의 높이 축약을 그대로 복제하지 않습니다. 이번 변경에서는 이 API들을 추가하지 않았습니다.
