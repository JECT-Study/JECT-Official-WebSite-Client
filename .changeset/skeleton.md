---
"@jects/jds": minor
---

**Skeleton**

데이터를 불러오는 동안 콘텐츠 자리를 표시하는 `Skeleton`을 추가합니다. 로딩 상태와 표시 영역의 구성은 소비처에서 관리합니다. 기존 코드 수정은 필요하지 않습니다.

| prop        | 기본값 | 용도                                  |
| ----------- | ------ | ------------------------------------- |
| `className` | 없음   | 크기와 반응형 CSS 연결                |
| `style`     | 없음   | 개별 스타일 지정, 크기 prop보다 우선  |
| `width`     | 없음   | 선택적 너비, 숫자(px) 또는 CSS 문자열 |
| `height`    | 없음   | 선택적 높이, 숫자(px) 또는 CSS 문자열 |
| `radius`    | `"8"`  | JDS radius 토큰 키                    |

1500ms shimmer를 제공합니다. 모션 감소 설정에서는 배경만 표시합니다. 장식 요소이므로 로딩 안내는 소비처에서 제공합니다.

```tsx
<Skeleton className={styles.postTitleSkeleton} />
```
