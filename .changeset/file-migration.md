---
"@jects/jds": minor
---

**File**

`FileItem`을 vanilla-extract 기반의 `File`로 교체합니다. 파일 영역의 메인 액션은 기존처럼 `onClick`, `type`, `aria-*` 같은 native button props로 전달하며, 삭제 버튼을 표시하려면 `removable`과 `onRemove`를 함께 전달해야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                                                   | TO-BE                                 |
| ------------------------------------------------------- | ------------------------------------- |
| `FileItem`                                              | `File`                                |
| `FileItemProps`                                         | `FileProps`                           |
| `removeable`                                            | `removable`                           |
| `hasError`, `errorMessage`                              | 제거 — 대체재 없음                    |
| `fileName: ReactNode`                                   | `fileName: string`                    |
| `fileSize?: ReactNode`                                  | `fileSize: number` (바이트)           |
| `removeable`과 `onRemove`를 각각 선택적으로 전달        | `removable: true`이면 `onRemove` 필수 |
| `readonly`와 `removeable` 조합 가능, 삭제 버튼은 미노출 | `readonly`와 `removable` 조합 불가    |

`disabled`와 `removable` 조합은 허용합니다. 파일 열기 또는 다운로드는 비활성화하되 삭제 액션은 제공할 수 있습니다.

`fileName`은 `ReactNode`에서 `string`으로 좁혀지고, `fileSize`는 바이트를 받는 필수 prop이 됩니다. 네이티브 `File`의 `size`를 그대로 전달할 수 있으며, 표시 문자열은 `formatFileSize`를 기본값으로 사용합니다.

```diff
- <FileItem
+ <File
    fileName={file.name}
    fileSize={file.size}
    onClick={handleClick}
-   removeable
+   removable
    onRemove={handleRemove}
  />
```

```diff
- <FileItem fileName={file.name} fileSize={file.size} hasError errorMessage="파일을 다시 확인해주세요." />
+ <File fileName={file.name} fileSize={file.size} />
```

**추가**

- `sizeFormatter` — 기본값 `formatFileSize`, 바이트를 표시 문자열로 변환
