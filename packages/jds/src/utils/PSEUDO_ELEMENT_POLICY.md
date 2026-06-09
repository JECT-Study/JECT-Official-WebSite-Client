# pseudo-element 자원 할당 정책

## 왜 정책이 필요한가

CSS에서 한 element는 `::before`와 `::after` 단 두 개의 pseudo-element만 가질 수 있다. **희소 자원**이다. 그런데 디자인 시스템에서 pseudo-element가 필요한 용도는 자주 등장한다.

- focus ring — 포커스 시 box-shadow 표현
- overlay — hover / pressed 시 색상 레이어
- divider — list item 사이 구분선
- decorative dot / badge — 알림 점, 상태 표시
- arrow / pointer — Tooltip, Popover의 화살표
- gradient mask — 텍스트 fade-out, 스크롤 그라데이션
- icon mask — checkbox 체크, radio dot
- loading shimmer — 스켈레톤 애니메이션

이 중 두 개만 한 element에 적용할 수 있다. 정책 없이 자유롭게 쓰면 새 컴포넌트를 만들 때마다 "::before가 이미 점유되어 있네?"를 발견하고, 각자 다른 우회(wrapper div, box-shadow 우회, focus ring 포기)로 푼다. 그렇게 일관성이 조용히 무너진다.

## 정책 적용 범위

이 정책은 **인터랙션을 직접 받는 element**(focus 가능 + hover 반응이 일어나는 element)에만 적용된다.

```
인터랙티브 element     ← 정책 대상
└─ 자식 element들      ← 정책 밖 (자유)
```

React 컴포넌트는 보통 여러 element의 합성이지만, 정책이 적용되는 건 *인터랙션 핸들러가 붙는 한 element*뿐이다. 그 element의 자식들은 정책 밖이며 자유롭게 pseudo-element를 사용할 수 있다.

| 컴포넌트 | 정책 적용 element | 자식 element 처리 |
|---|---|---|
| `<IconButton>` | `<button>` 자체 | (자식: Icon — pseudo 사용 안 함) |
| `<Button>` (leading icon 포함) | `<button>` 자체 | leading icon element는 별도 — 자기 `::before` 자유 사용 가능 |
| `<Card>` (전체 클릭 가능) | `<article>` 자체 | 메타데이터 `<div>`, `<footer>` 등은 자유 — `::after`로 divider 가능 |
| `<Chip>` + 내부 close 버튼 | Chip wrapper + close 버튼이 각각 인터랙티브 | 각 element가 자기 정책 컨텍스트를 가짐 |

**"한 element에 두 pseudo"라는 희소성은 element 단위로 발생하지 컴포넌트 단위로 발생하지 않는다.** 컴포넌트가 트리라면 정책은 *인터랙션을 받는 노드*에만 적용된다.

## 정책

### 축 1: 자원 할당 — 고정 매핑

```
::before  →  focus ring   (focusRing 유틸이 점유)
::after   →  overlay      (overlay 유틸이 점유)
```

모든 **인터랙티브 컴포넌트**(Button, IconButton, Chip, MenuItem, ListItem, Tab, ToggleButton 등)가 같은 패턴을 따른다. 한 컴포넌트의 인터랙션 동작을 이해하면 모든 컴포넌트의 인터랙션 동작을 이해한다.

**그 외 시각 요소는 (인터랙티브 element 위에서) pseudo-element를 쓰지 않는다.**

| 용도 | 표현 방법 |
|---|---|
| divider | `<hr />` 또는 `border` |
| arrow / pointer | 별도 SVG element |
| shimmer | element 자체에 `background-image` + `@keyframes` |
| close icon | 별도 child element |
| checkbox check | 별도 SVG icon 컴포넌트 |
| dot / badge | 별도 child element 또는 별도 컴포넌트 |

### 축 2: 예외 — 비인터랙티브 컴포넌트

정말로 pseudo-element가 가장 깔끔한 비인터랙티브 케이스가 있다.

- **Tooltip 화살표** — SVG로 빼면 스타일링이 복잡
- **Skeleton shimmer** — pseudo-element가 가장 깔끔
- **Badge dot** — 외부 element로 빼면 layout이 어려움

이들의 공통점은 **인터랙티브하지 않다**(focus 가능 X, hover 반응 X). focus ring도 overlay도 필요 없다.

> **인터랙티브 컴포넌트(focus 가능 + hover 반응)** 는 `::before = focusRing`, `::after = overlay`를 따른다.
>
> **비인터랙티브 컴포넌트**는 자유롭게 쓰되, 한 컴포넌트가 두 pseudo를 모두 점유하지 않는다.

비인터랙티브 컴포넌트가 한 pseudo만 점유하면, 인터랙티브 컴포넌트와 합성될 때 충돌하지 않는다. Tooltip(::after에 arrow) 안의 Button(::before에 focusRing)은 서로 다른 element이므로 문제없다.

#### 선택적 확장 — 비인터랙티브의 우선 자원

위 규칙은 *서로 다른 element끼리* 합성될 때는 충돌이 없지만, *같은 element에 두 비인터랙티브 효과가 적용되어야 하는 경우*(예: hover 시 Tooltip이 뜨는 Skeleton)에는 어느 pseudo를 비울지 명시적이지 않다.

문제가 실제로 발생하면 다음 규칙으로 보완한다:

> 비인터랙티브 컴포넌트도 가능하면 `::after`를 우선 점유한다.
> `::before`는 인터랙티브화될 가능성을 위한 예약 자원으로 둔다.

가장 흔한 인터랙션 추가 요구사항(focus ring)이 `::before`를 쓰므로 미리 비워두면 충돌이 거의 사라진다. 다만 이 규칙은 정책 복잡도를 올리는 방향이라 *문제가 실제로 발생할 때*에만 추가한다 — 현재는 "한 pseudo만 점유한다"로 충분하다.

### 축 3: 강제 수단 — 유틸이 스스로 강제한다

문서만으로는 부족하다. 30개 컴포넌트 + 여러 메이커 환경에서는 누군가 잊는다.

`focusRing`이 `::before`를, `overlay`가 `::after`를 직접 점유하는 것 자체가 정책이다.

```ts
// utils/focusRing.css.ts
export const focusRing = recipe({
  base: {
    outline: "none",
    selectors: {
      "&::before": { content: '""', position: "absolute", pointerEvents: "none" },
      "&[data-focus-visible]::before": { boxShadow: "...", zIndex: 1 },
    },
  },
});

// utils/overlay.css.ts
export const overlay = recipe({
  base: {
    selectors: {
      "&::after": { content: '""', position: "absolute", pointerEvents: "none", ... },
      // disabled 상태는 utility가 직접 차단 — 호출자가 잊어도 새지 않음
      "&[data-hovered]:not([data-disabled])::after, &:hover:not(:disabled):not([data-disabled])::after": { ... },
      "&[data-pressed]:not([data-disabled])::after, &:active:not(:disabled):not([data-disabled])::after": { ... },
    },
  },
});
```

컴포넌트 작성자가 같은 element의 ::before에 다른 용도를 추가하려 하면 시각적 버그가 즉시 드러난다. 컴파일 타임 검출은 아니지만, 런타임에 빠르게 보인다.

**disabled 상태도 utility 책임이다.** `usePressable`이 `data-disabled`를 자동 부여하지만, hook 없이 `overlay`만 합성하는 경로에서도 disabled element에 overlay가 새지 않도록 utility 자체가 `:not([data-disabled])`로 차단한다. 호출자가 `data-disabled`만 element에 부여하면 끝 — overlay 차단 로직은 사용처마다 반복할 필요 없다.

#### `overlay`는 disabled에서 차단, `focusRing`은 그대로 — 의도된 비대칭

| utility | disabled 시 | 이유 |
|---|---|---|
| `overlay` | ✅ 차단 (`:not([data-disabled])`) | hover/press는 *상호작용 가능*을 암시하는 신호. disabled element에서 보이면 "누를 수 있다"는 거짓 피드백 |
| `focusRing` | ❌ 표시 유지 | focus 위치는 *사실 신호*. 키보드 사용자가 자기 위치를 알아야 하므로 가리면 a11y 후퇴 |

JDS의 disabled 정책은 **host element 종류에 따라 다르다** (`usePressable`이 `useButton`에 위임):
- **단독 native `<button>`**: native `disabled` 부여 → 브라우저가 focus 자체를 차단. 이 경우 focus ring은 *애초에 등장 못 함*이라 utility의 차단 로직은 무관.
- **비-button host (`<a>`, `<div role="button">`, 컬렉션 항목 등)**: `aria-disabled` + focusable 유지 → focused 상태가 발생할 수 있음. 이때 [APG](https://www.w3.org/WAI/ARIA/apg/patterns/button/) 권장에 따라 ring이 *보여야* 키보드 사용자가 위치를 인지.

`focusRing` utility는 두 케이스를 *동시에* 만족시키기 위해 disabled 게이팅을 *하지 않는다*. 차단해야 하는 경우(native button)는 host attribute가 이미 차단했고, 차단하면 안 되는 경우(non-button)는 utility가 막으면 a11y 후퇴.

`overlay`는 반대 — hover/press가 *상호작용 가능을 암시*하는 신호이므로 어떤 host에서든 disabled에서 보이면 거짓 피드백. 따라서 일률 차단.

## 호출자가 책임지는 것

유틸은 *상태 전환 룰*만 책임진다. **shape(inset, borderRadius)와 layout(positioned ancestor)** 은 호출자가 결정한다.

```ts
// 케이스 1: 시각 영역 = 탭 영역 (일반 컴포넌트)
selectors: {
  "&::before, &::after": { inset: 0, borderRadius: "inherit" },
}

// 케이스 2: 시각 영역 < 탭 영역 (IconButton condensed 등)
selectors: {
  "&::before, &::after": { inset: pxToRem(-4), borderRadius: "4px" },
}
```

**`::before`와 `::after`에 같은 shape를 부여하면** focus ring과 overlay가 자동으로 같은 영역(=탭 영역)에 그려진다. 키보드 사용자에게 *누를 수 있는 영역*이 정확히 표시되는 a11y 정합성이 자연스럽게 따라온다.

또한 호출자는 element에 `position: relative`(또는 다른 positioned 값)를 부여해야 한다. `::before` / `::after`가 `position: absolute`이므로 positioned ancestor가 없으면 viewport 기준으로 잡힌다.

### 호출자가 `::before` / `::after`에 직접 선언하는 것은 정책 위반인가?

**아니다.** 호출자가 `inset`, `borderRadius` 등 shape를 지정하는 것은 유틸이 **명시적으로 호출자에게 위임한 책임**이다.

다음은 정책 위반이다:

- `::before` / `::after`에 `content`, `backgroundColor`, `transition`, `opacity`, `transform` 같은 *유틸이 이미 책임지는 속성*을 덮어쓰기
- focus ring / overlay와 무관한 *새로운 시각 요소*(divider, dot, arrow 등)를 `::before` / `::after`에 그리기

| `::before` / `::after`에 호출자가 쓸 수 있는 것 | 쓰면 안 되는 것 |
|---|---|
| `inset` (위치) | `content` (utility가 설정) |
| `borderRadius` (모양) | `backgroundColor`, `opacity`, `transition` (utility 책임) |
| 시각 영역 정합을 위한 layout 속성 | 새로운 시각 요소 (divider, arrow 등) |

condensed 모드처럼 inset과 borderRadius를 컴포넌트별로 다르게 주는 패턴은 정책 안에서 정상이다 — utility가 그 결정을 호출자에게 명시적으로 넘겼기 때문.

## 새 인터랙티브 컴포넌트 작성 체크리스트

- [ ] recipe `base`에 `[overlay(), focusRing(), baseStyles]` 합성
- [ ] baseStyles에 `position: relative`
- [ ] outline 처리는 focusRing 유틸이 자체 책임 — baseStyles에 넣지 않는다
- [ ] `::before`와 `::after`에 inset과 borderRadius를 명시 (동일한 shape 권장 — `&::before, &::after` 쉼표 selector로 한 줄에)
- [ ] `::before` / `::after`에 *shape 외의 속성*을 추가하지 않는다 (content, backgroundColor 등은 utility 책임)
- [ ] 추가 시각 요소가 필요하면 *별도 child element* 또는 element 자체 속성(border, background-image 등)으로 표현
- [ ] 자식 element들은 정책 밖이므로 자유롭게 pseudo-element 사용 가능

## 함수형 mixin으로 가지 않는 이유

`focusRing({ pseudo: '::before' })` 같은 함수형 mixin은 자원이 풍부한 토큰(색상/spacing 등)에 적합하다. pseudo-element는 한 element당 2개뿐인 희소 자원이라 *고정 매핑이 곧 정책 강제*가 된다. 이 정책이 유효한 한, 함수형 mixin으로의 전환은 **정책의 강제력을 약화시키는 방향**이라 채택하지 않는다.
