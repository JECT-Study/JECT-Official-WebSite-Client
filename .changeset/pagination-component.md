---
"@jects/jds": minor
---

**Pagination**

페이지 번호와 이전, 다음 이동 요소를 표시하는 `Pagination` 컴포넌트를 추가합니다. `PaginationProps`, `PaginationButtonProps`, `PaginationLinkProps`, `PaginationVisiblePageCount` 타입을 함께 공개합니다. 기존 API 사용에는 영향이 없습니다.

| prop                            | 기본값  | 용도                                                   |
| ------------------------------- | ------- | ------------------------------------------------------ |
| `totalPages`                    | 필수    | 전체 페이지 수, `0`이면 렌더링하지 않음                |
| `page`                          | 없음    | 제어 버튼 방식 또는 링크 방식의 현재 페이지            |
| `defaultPage`                   | `1`     | 비제어 버튼 방식의 초기 페이지                         |
| `onPageChange`                  | 없음    | 버튼 방식의 페이지 이동 콜백, 제어 방식에서는 필수     |
| `getPageHref`                   | 없음    | 링크 방식에서 페이지별 URL 생성                        |
| `linkAs`                        | `a`     | 링크 방식에서 사용할 앵커 호환 라우팅 컴포넌트         |
| `visiblePageCount`              | `7`     | 말줄임을 포함한 페이지 항목 수, `7`, `9`, `11` 중 선택 |
| `disabled`                      | `false` | 모든 페이지 이동 요소 비활성화                         |
| `aria-label`, `aria-labelledby` | 없음    | 탐색 영역의 접근 가능한 이름 지정, 둘 중 하나 사용     |

```tsx
import { useState } from "react";
import { Pagination } from "@jects/jds";

function ButtonPagination() {
  const [page, setPage] = useState(1);

  return <Pagination aria-label='페이지 이동' page={page} totalPages={10} onPageChange={setPage} />;
}

function LinkPagination({ page }: { page: number }) {
  return (
    <Pagination
      aria-label='페이지 이동'
      page={page}
      totalPages={10}
      getPageHref={targetPage => `?page=${targetPage}`}
    />
  );
}
```
