---
"@jects/jds": minor
---

**Pagination**

`nav > ul > li` 구조로 페이지 번호, 말줄임, 이전과 다음 이동 요소를 표시하는 `Pagination` 컴포넌트를 추가합니다. 버튼의 제어, 비제어 방식과 `href` 기반 링크 방식을 지원합니다. `PaginationProps`, `PaginationButtonProps`, `PaginationLinkProps`, `PaginationVisiblePageCount` 타입을 함께 공개합니다.

| prop                            | 기본값  | 용도                                                                                     |
| ------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `totalPages`                    | 필수    | 전체 페이지 수, `0`이면 렌더링하지 않음                                                  |
| `page`                          | 없음    | 제어 버튼 방식 또는 링크 방식의 현재 페이지                                              |
| `defaultPage`                   | `1`     | 비제어 버튼 방식의 초기 페이지                                                           |
| `onPageChange`                  | 없음    | 버튼 방식의 페이지 이동 콜백, 제어 방식에서는 필수                                       |
| `getPageHref`                   | 없음    | 링크 방식에서 페이지별 URL 생성                                                          |
| `linkAs`                        | `a`     | 링크 방식에서 사용할 `href`를 받는 라우팅 컴포넌트                                       |
| `visiblePageCount`              | `7`     | 이전과 다음을 제외한 최대 항목 수, 숫자와 말줄임 포함, `7`, `8`, `9`, `10`, `11` 중 선택 |
| `disabled`                      | `false` | 모든 페이지 이동 요소 비활성화                                                           |
| `aria-label`, `aria-labelledby` | 없음    | 탐색 영역의 접근 가능한 이름 지정, 둘 중 하나 사용                                       |

전체 페이지 수가 표시 개수보다 크면 연속된 페이지 번호와 말줄임을 표시합니다. 양쪽에 말줄임이 있는 구간을 처음 표시할 때 홀수 표시 개수는 현재 페이지를 중앙에 배치하고, 짝수 표시 개수는 오른쪽에 페이지 번호를 하나 더 배치합니다. 말줄임은 두 페이지 이상이 생략될 때만 표시합니다.

표시된 구간의 안쪽 페이지를 선택하면 구간을 유지하고, 양끝 페이지를 선택하면 표시 구간을 이동합니다. `page`나 `totalPages` 변경으로 현재 페이지가 표시 가능한 범위로 보정되어도 `onPageChange`를 호출하지 않습니다. `totalPages` 또는 `visiblePageCount`가 바뀌면 현재 페이지에 맞춰 표시 구간을 다시 배치합니다. 링크 방식에서 URL을 현재 페이지의 기준으로 쓰려면 소비처가 URL에서 페이지 값을 읽어 `page`로 전달합니다.

```tsx
import { useState } from "react";
import { Pagination } from "@jects/jds";

function ButtonPagination() {
  const [page, setPage] = useState(1);

  return <Pagination aria-label='페이지 이동' page={page} totalPages={10} onPageChange={setPage} />;
}

function UncontrolledPagination() {
  return <Pagination aria-label='페이지 이동' defaultPage={1} totalPages={10} />;
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
