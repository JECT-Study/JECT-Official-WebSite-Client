---
"@jects/jds": patch
---

**Tooltip**

`TooltipRoot` 등 기존 파트의 개별 export를 추가합니다. 서버 컴포넌트에서 직렬화 가능한 props로 개별 파트를 조합할 수 있습니다. 기존 점 표기 API를 사용하는 코드는 수정할 필요가 없습니다.

**추가**

| 추가 API               | 대상                           |
| ---------------------- | ------------------------------ |
| `TooltipRoot`          | `Tooltip.Root`의 별칭          |
| `TooltipTrigger`       | `Tooltip.Trigger`의 별칭       |
| `TooltipContent`       | `Tooltip.Content`의 별칭       |
| `TooltipProvider`      | `Tooltip.Provider`의 별칭      |
| `TooltipProviderProps` | `TooltipProvider`의 props 타입 |
