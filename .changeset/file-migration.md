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
| `fileSize?: ReactNode`                                  | `fileSize: string`                    |
| `removeable`과 `onRemove`를 각각 선택적으로 전달        | `removable: true`이면 `onRemove` 필수 |
| `readonly`와 `removeable` 조합 가능, 삭제 버튼은 미노출 | `readonly`와 `removable` 조합 불가    |

`disabled`와 `removable` 조합은 허용합니다. 파일 열기 또는 다운로드는 비활성화하되 삭제 액션은 제공할 수 있습니다.

`fileName`과 `fileSize`가 `ReactNode`에서 `string`으로 좁혀지고 `fileSize`는 필수가 됩니다. 네이티브 `File`의 `size`는 `number`이므로 그대로 넘길 수 없고, 표시할 문자열로 변환해 전달해야 합니다.

```diff
- <FileItem
+ <File
    fileName={file.name}
-   fileSize={file.size}
+   fileSize={formatFileSize(file.size)}
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
