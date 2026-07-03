---
"@jects/jds": minor
---

**File**

기존 `FileItem` 컴포넌트가 vanilla-extract 기반의 `File` 컴포넌트로 변경되었습니다. 파일 영역의 메인 액션은 기존처럼 `onClick`, `type`, `aria-*` 같은 native button props로 전달합니다. 삭제 버튼을 표시하려면 `removable`과 `onRemove`를 함께 전달해야 합니다.

**소비자 영향 (코드 수정 필요)**

| AS-IS                                                        | TO-BE                                 |
| ------------------------------------------------------------ | ------------------------------------- |
| `FileItem`                                                   | `File`                                |
| `FileItemProps`                                              | `FileProps`                           |
| `onClick` 등 native button props                             | 유지                                  |
| `removeable`                                                 | `removable`                           |
| `hasError`, `errorMessage`                                   | 제거                                  |
| `fileName: ReactNode`                                        | `fileName: string`                    |
| `fileSize?: ReactNode`                                       | `fileSize: string`                    |
| `removeable`과 `onRemove`를 각각 선택적으로 전달             | `removable: true`이면 `onRemove` 필수 |
| `readonly`와 함께 `removeable` 전달 가능, 삭제 버튼은 미노출 | `readonly + removable` 조합 불가      |

`disabled + removable` 조합은 허용됩니다. 파일 열기 또는 다운로드는 비활성화하되, 삭제 액션은 제공해야 하는 사용처를 위한 동작입니다.

**마이그레이션 예시**

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
