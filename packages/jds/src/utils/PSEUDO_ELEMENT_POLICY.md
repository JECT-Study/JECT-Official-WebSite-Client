# pseudo-element 자원 할당 정책

## 배경

한 요소는 `::before`와 `::after` 두 개의 pseudo-element만 가진다. pseudo-element로 구현하는 시각 효과는 여러 가지인데 각 효과가 하나씩 차지하므로, 한 요소에 적용할 수 있는 효과는 최대 두 개다.

규칙이 없으면 컴포넌트마다 `::before`가 이미 사용 중인지 개별적으로 확인하고 서로 다른 방식으로 우회하게 된다. 그 결과 컴포넌트마다 pseudo-element 사용 방식이 갈라진다. 이 문서는 어느 pseudo에 무엇을 그릴지 고정한다.

## 적용 범위

이 규칙은 focus를 받고 hover에 반응하는 요소, 즉 상호작용을 직접 받는 요소에만 적용된다. 그 요소의 자식은 규칙의 대상이 아니며 pseudo-element를 자유롭게 사용할 수 있다.

| 컴포넌트                     | 적용 요소              | 자식                                                 |
| ---------------------------- | ---------------------- | ---------------------------------------------------- |
| `IconButton`                 | `button`               | Icon은 pseudo-element를 쓰지 않는다                  |
| leading icon이 있는 `Button` | `button`               | leading icon은 자기 `::before`를 쓸 수 있다          |
| 전체가 클릭되는 `Card`       | `article`              | `div`, `footer`는 `::after`로 divider를 그릴 수 있다 |
| `Chip`과 내부 close 버튼     | Chip과 close 버튼 각각 | 각자 별도                                            |

React 컴포넌트는 여러 요소로 이루어지지만 규칙이 적용되는 것은 이벤트가 붙는 요소 하나다. pseudo가 두 개뿐이라는 제약은 요소 단위로 발생하므로, 컴포넌트가 여러 요소로 나뉘어 있으면 각 요소가 각자 두 개를 가진다.

상호작용을 받는 요소와 pseudo를 그리는 요소가 다른 경우는 [상태 위임](#상태-위임)에서 다룬다.

## 할당

`::before`에는 focus ring을, `::after`에는 hover/pressed overlay를 그린다. 각각 focusRing과 overlay 유틸이 담당한다.

focus ring과 overlay 외의 시각 효과는 상호작용을 받는 요소 위에서 pseudo를 쓰지 않고 다른 방법으로 구현한다.

| 효과           | 구현 방법                                |
| -------------- | ---------------------------------------- |
| divider        | `hr` 또는 `border`                       |
| arrow          | 별도 SVG 요소                            |
| shimmer        | 요소에 `background-image`와 `@keyframes` |
| close icon     | 별도 자식 요소                           |
| checkbox check | 별도 SVG 아이콘                          |
| dot, badge     | 별도 자식 요소 또는 별도 컴포넌트        |

## 비상호작용 컴포넌트

pseudo-element로 구현하는 편이 가장 깔끔한 비상호작용 케이스가 있다. 툴팁 arrow, 스켈레톤 shimmer, badge dot 등이다. 이들은 focus도 받지 않고 hover에도 반응하지 않으므로 focus ring이나 overlay가 필요 없다.

- 상호작용 컴포넌트는 `::before`에 focusRing, `::after`에 overlay를 사용한다.
- 비상호작용 컴포넌트는 pseudo를 자유롭게 쓰되, 한 컴포넌트가 `::before`와 `::after`를 모두 차지하지는 않는다.

하나만 차지하면 상호작용 컴포넌트와 합성되어도 충돌하지 않는다. 예를 들어 `::after`에 arrow를 그린 툴팁 안에 `::before`에 focus ring을 그린 버튼이 있어도, 둘은 서로 다른 요소이므로 문제가 없다.

한 요소에 비상호작용 효과가 두 개 필요한 경우, 예를 들어 hover 시 툴팁이 열리는 스켈레톤에서 어느 pseudo를 비울지는 아직 정하지 않았다. 이런 경우가 실제로 생기면 비상호작용 효과가 `::after`를 먼저 쓰고, 나중에 상호작용이 추가될 것을 대비해 `::before`를 비워 두는 방식으로 정한다.

## 규칙을 강제하는 방법

문서만으로는 규칙이 지켜지지 않는다. focusRing이 `::before`를, overlay가 `::after`를 직접 차지하도록 구현되어 있어서, 같은 요소의 pseudo에 다른 용도를 넣으려 하면 화면에서 곧바로 문제가 드러난다.

상태는 JS 훅이 아니라 CSS 의사클래스 `:hover`, `:active`, `:focus-visible`로 처리한다.

### disabled 처리

disabled 상태를 막는 것도 유틸이 담당한다. native `<button>`에는 `:disabled`가 걸리고, `<label>`이 input을 감싸는 경우처럼 컴포넌트나 Radix가 `data-disabled`를 부여하기도 한다. 어느 경우든 disabled 요소에 overlay가 나타나지 않도록, 유틸이 selector에서 `:disabled`와 `[data-disabled]`를 걸러낸다.

overlay는 disabled에서 막지만 focusRing은 막지 않는다. 둘이 나타내는 신호의 성격이 다르기 때문이다.

| 유틸        | disabled  | 이유                                                                                                     |
| ----------- | --------- | -------------------------------------------------------------------------------------------------------- |
| `overlay`   | 막는다    | hover와 press는 조작할 수 있다는 신호다. disabled 요소에 나타나면 잘못된 신호가 된다                     |
| `focusRing` | 막지 않음 | focus 위치는 사용자에게 알려야 하는 정보라 가리지 않는다. 실제 표시는 사용처의 포커스 허용 여부에 달렸다 |

focus는 요소에 따라 상황이 다르다. native `<button disabled>`는 브라우저가 focus 자체를 막으므로 focus ring이 나타나지 않는다. `<a>`나 `<div role="button">`처럼 `aria-disabled`로 처리하는 경우는 focus가 갈 수 있으므로, 키보드 사용자가 위치를 알 수 있도록 [APG](https://www.w3.org/WAI/ARIA/apg/patterns/button/) 권고에 따라 focus ring이 보이게 할 수 있다.

## 상태 위임

앞의 규칙은 상호작용을 받는 요소가 곧 pseudo를 그리는 요소라고 가정한다. 그런데 root가 시각 효과를 그리지만 실제 대상은 내부 버튼인 컴포넌트에서는 이 둘이 나뉜다. File과 Chip이 그렇다. root `<div>`가 overlay와 focus ring을 그리지만 focus와 click은 내부 버튼이 받고, 삭제 버튼 같은 보조 액션이 같은 표면을 공유한다.

이때 상태를 어느 요소에서 읽을지는 규칙으로 정한다.

- hover는 root 자신의 `:hover`로 판단한다. 커서가 컴포넌트 위에 있으면 보조 액션 위에 있을 때도 root overlay가 켜지고, 보조 액션은 그 위에 자기 overlay를 겹쳐 그린다.
- press와 focus는 내부에 `data-interaction-target`을 부여한 버튼의 상태만 읽는다. 보조 액션을 누르거나 포커스해도 root는 반응하지 않는다.

hover는 커서의 위치를 나타내고 press와 focus는 어떤 컨트롤을 조작하는지를 나타낸다. 그래서 hover는 표면 기준으로, press와 focus는 컨트롤 기준으로 잡는다. 이것은 File에만 적용하는 예외가 아니라 이런 구조 전체에 적용하는 규칙이다.

`interaction: "delegated"`가 이 규칙을 구현한다. overlay는 hover를 자기 요소로 두고 press만 내부 버튼으로 넘기며, focusRing은 focus를 내부 버튼으로 넘긴다.

```tsx
style([
  overlay({ hierarchy: "secondary", interaction: "delegated" }),
  focusRing({ interaction: "delegated" }),
]);

// 내부 버튼
<button data-interaction-target />;
```

- `data-interaction-target`은 root 아래 한 요소에만 부여한다. 그 요소는 자기 overlay와 focusRing을 갖지 않는다. root가 이미 그리므로 레이어가 두 번 겹치기 때문이다.
- 내부 버튼에 native `disabled`와 `pointer-events: none`이 걸리면 `:has()`가 매치되지 않아 press와 focus가 자동으로 꺼진다. root의 `data-disabled`는 이 경우를 대비한 방어 장치다.

`::before`는 focusRing, `::after`는 overlay라는 매핑은 그대로 유지된다. pseudo가 자기 상태 대신 다른 요소의 상태를 반영할 뿐이다.

### focusRing이 focus를 읽는 범위

`focusRing`의 `interaction`은 어느 요소의 focus에 반응할지 정한다. ring을 그리는 요소와 실제 focus를 받는 요소가 같은지 다른지에 따라 값을 고른다.

| 값          | 반응하는 focus                            | 쓰는 곳                                                            |
| ----------- | ----------------------------------------- | ------------------------------------------------------------------ |
| `self`      | 요소 자신의 `:focus-visible`              | 자신이 곧 focus 대상인 요소 (버튼, 링크 등)                        |
| `within`    | 자신 또는 자손의 `:focus-visible`         | 내부 컨트롤을 감싸 focus 대상이 자손인 요소 (Checkbox 등)          |
| `delegated` | `[data-interaction-target]:focus-visible` | root가 그리고 focus는 지정한 내부 버튼이 받는 요소 (File, Chip 등) |

`self`는 요소 자신만, `within`은 `:has(:focus-visible)`로 자손까지, `delegated`는 자손 중 `[data-interaction-target]` 하나만 본다. 뒤로 갈수록 focus를 읽는 범위가 좁아진다.

`within`은 자손 아무 곳의 focus에나 반응하므로, 임의의 콘텐츠를 감싸는 컨테이너(예: 탭 패널)에 쓰면 패널 안 어떤 컨트롤에 focus가 가도 패널 전체에 ring이 그려진다. 이런 컨테이너는 자신만 focus 대상인 `self`를 쓴다. 자손이 여럿이고 그중 하나(main action)만 골라야 하면 `delegated`를 쓴다.

## 호출부가 담당하는 것

유틸은 상태에 따라 효과를 켜고 끄는 것만 담당한다. inset과 borderRadius 같은 모양, 그리고 `position: relative` 같은 배치는 호출부가 정한다.

```ts
// 시각 영역 = 탭 영역
style({
  selectors: { "&::before, &::after": { inset: 0, borderRadius: "inherit" } },
});

// 시각 영역 < 탭 영역, IconButton condensed 등
style({
  selectors: { "&::before, &::after": { inset: pxToRem(-4), borderRadius: "4px" } },
});
```

`::before`와 `::after`에 같은 모양을 주면 focus ring과 overlay가 같은 영역에 그려진다. 요소에 `position: relative`가 없으면 `position: absolute`인 pseudo가 viewport를 기준으로 잡히므로, 호출부가 이를 지정해야 한다.

호출부가 `::before`와 `::after`에 inset이나 borderRadius를 직접 지정하는 것은 위반이 아니다. 유틸이 호출부에 넘긴 책임이다. 반면 다음은 위반이다.

- `content`, `backgroundColor`, `opacity`, `transition`처럼 유틸이 이미 설정한 속성을 덮어쓰는 것
- focus ring이나 overlay와 무관한 divider, dot, arrow 같은 시각 요소를 pseudo에 그리는 것

| 허용                           | 위반                                                           |
| ------------------------------ | -------------------------------------------------------------- |
| inset, borderRadius            | `content`, `backgroundColor`, `opacity`, `transition` 덮어쓰기 |
| 영역을 맞추기 위한 layout 속성 | divider, dot, arrow 같은 시각 요소                             |

## 새 컴포넌트 체크리스트

- [ ] recipe `base`에 `[overlay(), focusRing(), baseStyles]`를 합성한다.
- [ ] `baseStyles`에 `position: relative`를 지정한다.
- [ ] outline은 focusRing이 담당하므로 `baseStyles`에 넣지 않는다.
- [ ] `::before`와 `::after`에 inset과 borderRadius를 지정한다. 같은 모양을 권장한다.
- [ ] root가 그리고 실제 대상은 내부 버튼인 컴포넌트는 root에 `overlay`와 `focusRing`을 `interaction: "delegated"`로 주고, 내부 버튼에 `data-interaction-target`을 부여한다. 내부 버튼은 자기 레이어를 갖지 않는다.
- [ ] `::before`와 `::after`에 모양 외의 속성을 추가하지 않는다.
- [ ] 추가 효과가 필요하면 자식 요소나 요소 자체 속성으로 구현한다.
- [ ] 자식 요소는 규칙의 대상이 아니므로 pseudo를 자유롭게 쓴다.

## pseudo를 파라미터로 받지 않는 이유

`focusRing({ pseudo: '::before' })`처럼 어느 pseudo에 그릴지 파라미터로 받도록 만들 수도 있다. 색이나 spacing처럼 값이 많은 토큰에는 이 방식이 맞지만, pseudo는 요소당 두 개뿐이라 어느 pseudo에 그릴지 고정하는 것 자체가 규칙을 강제하는 수단이다. 파라미터로 열면 그 강제력이 사라진다.

focusRing과 overlay가 함수인 것은 border, feedback, hierarchy, density 같은 시각 variant를 고르기 위해서다. 어느 pseudo에 그릴지는 파라미터가 아니므로 이 규칙과 충돌하지 않는다.
