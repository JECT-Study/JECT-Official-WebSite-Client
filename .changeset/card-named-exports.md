---
"@jects/jds": patch
---

**Card**

`CardRoot` 등 기존 파트의 개별 export를 추가합니다. 서버 컴포넌트에서 직렬화 가능한 props로 개별 파트를 조합할 수 있습니다. 기존 점 표기 API를 사용하는 코드는 수정할 필요가 없습니다.

**추가**

| 추가 API               | 대상                              |
| ---------------------- | --------------------------------- |
| `CardRoot`             | `Card.Root`의 별칭                |
| `CardThumbnail`        | `Card.Thumbnail`의 별칭           |
| `CardContent`          | `Card.Content`의 별칭             |
| `CardContentGroup`     | `Card.ContentGroup`의 별칭        |
| `CardCaption`          | `Card.Caption`의 별칭             |
| `CardTitle`            | `Card.Title`의 별칭               |
| `CardBody`             | `Card.Body`의 별칭                |
| `CardMeta`             | `Card.Meta`의 별칭                |
| `CardMetaItem`         | `Card.MetaItem`의 별칭            |
| `CardOverlay`          | `Card.Overlay`의 별칭             |
| `CardPlateLink`        | `Card.Preset.Plate.Link`의 별칭   |
| `CardPlateButton`      | `Card.Preset.Plate.Button`의 별칭 |
| `CardPostLink`         | `Card.Preset.Post.Link`의 별칭    |
| `CardPostButton`       | `Card.Preset.Post.Button`의 별칭  |
| `CardPlateLinkProps`   | `CardPlateLink`의 props 타입      |
| `CardPlateButtonProps` | `CardPlateButton`의 props 타입    |
| `CardPostLinkProps`    | `CardPostLink`의 props 타입       |
| `CardPostButtonProps`  | `CardPostButton`의 props 타입     |

`CardPlateButton`과 `CardPostButton`의 일반 `onClick` 콜백은 클라이언트 컴포넌트에서 전달합니다.
