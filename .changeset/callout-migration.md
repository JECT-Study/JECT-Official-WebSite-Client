---
"@jects/jds": minor
---

**Callout**

Emotion에서 vanilla-extract로 Callout 컴포넌트의 스타일링을 마이그레이션합니다. 함께 `hierarchy`, `labelButtonProps` prop이 제거되어 breaking change입니다.

**소비자 영향 (코드 수정 필요)**

| 항목               | AS-IS                                        | TO-BE                                               |
| ------------------ | -------------------------------------------- | --------------------------------------------------- |
| `hierarchy`        | `"primary" \| "secondary"`                   | 제거 (스타일은 `feedback`으로만 결정)               |
| `labelButtonProps` | 내부에 `LabelButton`을 렌더링                | 제거. 버튼이 필요하면 Callout 외부에서 직접 렌더링  |
| `feedback`         | `"positive" \| "destructive" \| "notifying"` | `"none"`(기본) 추가, `hierarchy`와의 배타 관계 해제 |

**마이그레이션 예시**

```diff
- <Callout hierarchy="secondary" labelButtonProps={{ children: "확인", onClick: handleClick }}>
-   본문 내용
- </Callout>
+ <Callout>본문 내용</Callout>
+ <LabelButton.Basic hierarchy="secondary" onClick={handleClick}>확인</LabelButton.Basic>
```

**추가 사항 (non-breaking)**

- `icon?: IconName` prop 추가 (`title`이 있을 때만 사용 가능)
- 네이티브 `div` 속성 전달 및 `ref` 포워딩 지원
- Figma 디자인 정렬: title 타이포를 size별 bold로, `notifying` 색상을 `static.inverse`로, title↔body gap을 size별로(sm/xs는 8) 조정
