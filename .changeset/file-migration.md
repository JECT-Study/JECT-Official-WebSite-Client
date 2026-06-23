---
"@jects/jds": minor
---

**File**

기존 `FileItem` 컴포넌트가 vanilla-extract 기반의 `File` 컴포넌트로 변경되었습니다. 파일 영역 액션은 `onClick` 대신 React Aria의 `onPress`로 전달하며, 마우스와 키보드 액션이 동일하게 동작하도록 개선되었습니다.

**소비자 영향 (코드 수정 필요)**

| AS-IS | TO-BE |
| --- | --- |
| `FileItem` | `File` |
| `FileItemProps` | `FileProps` |
| `onClick` | `onPress` |
| `removeable` | `removable` |
| `hasError`, `errorMessage` | 제거 |
| `fileName: ReactNode` | `fileName: string` |
| `fileSize?: ReactNode` | `fileSize: string` |
| `removeable`과 `onRemove`를 각각 선택적으로 전달 | `removable: true`이면 `onRemove` 필수 |
| `readonly`와 함께 `removeable` 전달 가능, 삭제 버튼은 미노출 | `readonly + removable` 조합 불가 |

`disabled + removable` 조합은 허용됩니다. 파일 열기 또는 다운로드는 비활성화하되, 삭제 액션은 제공해야 하는 사용처를 위한 동작입니다.

**마이그레이션 예시**

```diff
- <FileItem
-   fileName={file.name}
-   fileSize={file.size}
-   onClick={handleClick}
-   removeable
-   onRemove={handleRemove}
- />
+ <File
+   fileName={file.name}
+   fileSize={file.size}
+   onPress={handlePress}
+   removable
+   onRemove={handleRemove}
+ />
```

```diff
- <FileItem fileName={file.name} fileSize={file.size} hasError errorMessage="파일을 다시 확인해주세요." />
+ <File fileName={file.name} fileSize={file.size} />
```
