---
"@jects/jds": patch
---

**MultiSelect**

목록 컨테이너의 최대 높이를 지정하는 `maxHeight` prop을 추가합니다. 항목이 적으면 내용 높이에 맞춰 줄어들고, 넘치면 상한에서 내부 스크롤이 생깁니다. Radix Popover 안에서는 `maxHeight="var(--radix-popover-content-available-height)"`로 뷰포트 상한을 공유할 수 있습니다. `"full"`을 넘기면 부모 높이를 상한으로 둡니다.

- `maxHeight?: "full" | string` — `"full"` 또는 CSS 길이 값
