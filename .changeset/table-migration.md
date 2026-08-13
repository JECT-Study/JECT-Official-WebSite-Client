---
"@jects/jds": minor
---

**Table**

Table을 vanilla-extract 기반으로 재작성하고 `Table.ColorChip`을 공개합니다. 컴파운드 이름과 props는 유지되지만 헤더가 렌더하는 DOM 구조가 바뀝니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                        | TO-BE                                            |
| ---------------------------- | ------------------------------------------------ |
| `<thead>` 직속에 `<th>` 렌더 | `<thead>` 안에 `<tr>`을 두고 그 안에 `<th>` 렌더 |

`<thead>` 직속에 `<th>`를 두던 유효하지 않은 마크업을 고친 것이며, `Table.Header`에 넘기는 자식은 그대로 `Table.HeaderItem`이라 호출부 JSX는 바뀌지 않습니다. `thead > th`처럼 DOM을 조회하거나 스타일링하던 코드는 셀렉터 수정이 필요합니다.

```diff
  <thead>
-   <th>레이블</th>
-   <th>레이블</th>
+   <tr>
+     <th>레이블</th>
+     <th>레이블</th>
+   </tr>
  </thead>
```

**추가**

- `Table.ColorChip` — label variant 안에서만 쓰던 컬러 칩을 단독으로 사용 가능
- `Table.HeaderItem`의 `hasDivider` — 우측 구분선 표시 여부, 기본값 `true`
- `Table.Header`의 `rowProps` — 내부 `<tr>`에 전달할 속성
- `Table.Header`, `Table.HeaderItem`, `Table.Body`가 native 속성(`className`, `style`, `data-*` 등) 상속 — 기존에는 무시
- `Table.Header`, `Table.HeaderItem`, `Table.Body`, `Table.Row`, `Table.RowItem`이 `ref` 지원 — 기존에는 `Table.Root`만 지원

**동작 변경 (코드 수정 불필요)**

- `Table.HeaderItem`의 `width`가 `<th>`에 적용 — 기존에는 값을 받고도 무시
- `<th>`에 `scope="col"` 추가
- 헤더 텍스트의 굵기가 bold에서 normal로, 색상이 `object.bold`에서 `object.bolder`로 변경
- label variant 제목 텍스트의 bold 제거
- badge variant의 배지가 `hierarchy="accent"`에서 `hierarchy="primary"`, `size="sm"`으로 변경
- 헤더 배경이 `fill.subtlest`에서 `surface.deeper`로 변경
- 루트 radius가 `6px`에서 `10px`으로 변경, `overflow: hidden` 추가
- 셀 내용의 세로 정렬이 `middle`에서 `top`으로, 내용 사이 간격이 `6`에서 `4`로 변경
- `Table.ColorChip`에 `aria-hidden="true"` 적용 — 보조기술이 읽지 않음
- `displayName`이 `TableRoot`에서 `Table.Root` 형태로 변경 — 컴포넌트 이름에 의존하던 스냅샷 확인 필요
