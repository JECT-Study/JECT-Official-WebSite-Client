---
"@jects/jds": minor
---

**Icon**

포지션 컬러 아이콘의 이름을 `position-*`로 바꿉니다. 기존 이름을 넘기던 코드는 타입 에러가 발생합니다. 새 아이콘은 40×40 3D 비트맵 대신 둥근 사각형 배경의 24×24 벡터로 그려지고, 아이콘 하나의 크기가 약 300KB에서 3KB 이하로 줄어듭니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS             | TO-BE                |
| ----------------- | -------------------- |
| `name='frontend'` | `name='position-fe'` |
| `name='backend'`  | `name='position-be'` |
| `name='product'`  | `name='position-pm'` |
| `name='design'`   | `name='position-pd'` |

```diff
- <Icon name='frontend' />
+ <Icon name='position-fe' />
```

**추가**

- `position-app` — 앱 포지션 아이콘
