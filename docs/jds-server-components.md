# 서버 컴포넌트에서 JDS 사용하기

JDS의 기본 진입점과 `/hooks`는 `"use client"` 경계를 제공해요. 서버 페이지에서는 컴포넌트를 JSX로 조합하고, 상태와 이벤트 처리는 소비처의 클라이언트 컴포넌트에서 작성해요.

## 파트를 개별 import하기

서버 페이지에서는 `TextField.Input` 같은 객체 속성 대신 `TextFieldInput`처럼 직접 export한 파트를 가져와요. 클라이언트 컴포넌트에서는 기존 점 표기 API를 계속 사용할 수 있어요. 두 방식은 같은 구현을 사용해요.

```tsx
// app/page.tsx: 서버 컴포넌트
import { TextField, TextFieldLabel, TextFieldInput, TextFieldHelper } from "@jects/jds";

export default function Page() {
  return (
    <TextField required>
      <TextFieldLabel>이름</TextFieldLabel>
      <TextFieldInput name='name' defaultValue='' />
      <TextFieldHelper>다른 사람에게 표시할 이름을 입력해 주세요.</TextFieldHelper>
    </TextField>
  );
}
```

폼 계열의 루트는 기존처럼 `<TextField>`, `<Textarea>`, `<SelectField>` 등의 이름을 사용해요. 파트는 루트가 제공하는 Context를 사용하므로 루트 안에 배치해야 해요. 개별 export가 파트의 독립 사용을 보장하는 것은 아니에요.

## 상태와 이벤트를 사용하는 경우

`onChange`, `onClick`, 렌더 콜백 등 일반 함수를 서버 페이지에서 클라이언트 파트로 넘길 수는 없어요. 이런 함수와 상태가 필요한 조합은 소비처의 `"use client"` 파일에서 구성해요. 예를 들어 `CardPlateButton`과 `CardPostButton`의 필수 `onClick`은 클라이언트 컴포넌트에서 전달해야 해요. 링크 preset은 `CardPlateLink`, `CardPostLink`로 직접 가져올 수 있어요.

```tsx
"use client";

import { useState } from "react";
import { TextField } from "@jects/jds";

export function NameField() {
  const [name, setName] = useState("");

  return (
    <TextField>
      <TextField.Label>이름</TextField.Label>
      <TextField.Input value={name} onChange={event => setName(event.target.value)} />
    </TextField>
  );
}
```

## Card preset 사용 예시

`CardPlateLink`와 `CardPostLink`는 기본 파트를 직접 조합하지 않고 링크 카드를 구성할 때 사용해요. 서버 페이지에서도 직렬화 가능한 props로 사용할 수 있어요.

```tsx
import { CardPlateLink, CardPostLink } from "@jects/jds";

<CardPlateLink title='모집 안내' body='지원 방법을 확인해 주세요.' href='/recruit' />;
<CardPostLink
  title='활동 기록'
  body='프로젝트 진행 과정을 소개해요.'
  author='젝트'
  date='2026-10-23'
  href='/posts/1'
/>;
```

`CardPlateButton`, `CardPostButton`은 링크 이동 대신 클릭 동작을 연결하는 preset이에요. 아래 예시는 소비처의 클라이언트 파일에 작성해요.

```tsx
"use client";

import { CardPlateButton, CardPostButton } from "@jects/jds";

export function ActionCards() {
  const handleClick = () => window.alert("카드를 선택했어요.");

  return (
    <>
      <CardPlateButton title='모집 안내' body='안내를 열어 주세요.' onClick={handleClick} />
      <CardPostButton
        title='활동 기록'
        body='기록을 열어 주세요.'
        author='젝트'
        date='2026-10-23'
        onClick={handleClick}
      />
    </>
  );
}
```

## 공개 파트 목록

서버 페이지에서 직접 가져올 이름을 정리했어요. props와 필수 Provider는 기존 파트와 같아요. `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`는 기존 개별 export를 사용해요.

| 기존 점 표기               | 개별 export               |
| -------------------------- | ------------------------- |
| `Accordion.Root`           | `AccordionRoot`           |
| `Accordion.Item`           | `AccordionItem`           |
| `Accordion.Trigger`        | `AccordionTrigger`        |
| `Accordion.Content`        | `AccordionContent`        |
| `Steps.Root`               | `StepsRoot`               |
| `Steps.Item`               | `StepsItem`               |
| `SegmentedControls.Root`   | `SegmentedControlsRoot`   |
| `SegmentedControls.Item`   | `SegmentedControlsItem`   |
| `Card.Root`                | `CardRoot`                |
| `Card.Thumbnail`           | `CardThumbnail`           |
| `Card.Content`             | `CardContent`             |
| `Card.ContentGroup`        | `CardContentGroup`        |
| `Card.Caption`             | `CardCaption`             |
| `Card.Title`               | `CardTitle`               |
| `Card.Body`                | `CardBody`                |
| `Card.Meta`                | `CardMeta`                |
| `Card.MetaItem`            | `CardMetaItem`            |
| `Card.Overlay`             | `CardOverlay`             |
| `Card.Preset.Plate.Link`   | `CardPlateLink`           |
| `Card.Preset.Plate.Button` | `CardPlateButton`         |
| `Card.Preset.Post.Link`    | `CardPostLink`            |
| `Card.Preset.Post.Button`  | `CardPostButton`          |
| `Table.Root`               | `TableRoot`               |
| `Table.Header`             | `TableHeader`             |
| `Table.HeaderItem`         | `TableHeaderItem`         |
| `Table.Body`               | `TableBody`               |
| `Table.Row`                | `TableRow`                |
| `Table.RowItem`            | `TableRowItem`            |
| `Table.ColorChip`          | `TableColorChip`          |
| `Menu.Root`                | `MenuRoot`                |
| `Menu.Content`             | `MenuContent`             |
| `Menu.Button`              | `MenuButton`              |
| `Menu.Anchor`              | `MenuAnchor`              |
| `Menu.Category`            | `MenuCategory`            |
| `Menu.Group`               | `MenuGroup`               |
| `DropdownMenu.Root`        | `DropdownMenuRoot`        |
| `DropdownMenu.Content`     | `DropdownMenuContent`     |
| `DropdownMenu.Button`      | `DropdownMenuButton`      |
| `DropdownMenu.Anchor`      | `DropdownMenuAnchor`      |
| `DropdownMenu.Tree`        | `DropdownMenuTree`        |
| `DropdownMenu.Category`    | `DropdownMenuCategory`    |
| `DropdownMenu.Group`       | `DropdownMenuGroup`       |
| `DropdownMenu.Trigger`     | `DropdownMenuTrigger`     |
| `Tooltip.Root`             | `TooltipRoot`             |
| `Tooltip.Trigger`          | `TooltipTrigger`          |
| `Tooltip.Content`          | `TooltipContent`          |
| `Tooltip.Provider`         | `TooltipProvider`         |
| `TextField.Input`          | `TextFieldInput`          |
| `TextField.Label`          | `TextFieldLabel`          |
| `TextField.Footer`         | `TextFieldFooter`         |
| `TextField.Helper`         | `TextFieldHelper`         |
| `TextField.Counter`        | `TextFieldCounter`        |
| `Textarea.Control`         | `TextareaControl`         |
| `Textarea.Label`           | `TextareaLabel`           |
| `Textarea.Footer`          | `TextareaFooter`          |
| `Textarea.Helper`          | `TextareaHelper`          |
| `Textarea.Counter`         | `TextareaCounter`         |
| `SelectField.Input`        | `SelectFieldInput`        |
| `SelectField.Label`        | `SelectFieldLabel`        |
| `SelectField.Helper`       | `SelectFieldHelper`       |
| `MultiSelectField.Input`   | `MultiSelectFieldInput`   |
| `MultiSelectField.Label`   | `MultiSelectFieldLabel`   |
| `MultiSelectField.Footer`  | `MultiSelectFieldFooter`  |
| `MultiSelectField.Helper`  | `MultiSelectFieldHelper`  |
| `MultiSelectField.Counter` | `MultiSelectFieldCounter` |
| `SuggestionField.Input`    | `SuggestionFieldInput`    |
| `SuggestionField.Label`    | `SuggestionFieldLabel`    |
| `SuggestionField.Footer`   | `SuggestionFieldFooter`   |
| `SuggestionField.Helper`   | `SuggestionFieldHelper`   |
| `SuggestionField.Counter`  | `SuggestionFieldCounter`  |
| `FileField.Input`          | `FileFieldInput`          |
| `FileField.Size`           | `FileFieldSize`           |
| `FileField.Label`          | `FileFieldLabel`          |
| `FileField.Footer`         | `FileFieldFooter`         |
| `FileField.Helper`         | `FileFieldHelper`         |

## 스타일과 서버에서 사용하는 값

앱의 전역 스타일 진입점에서 `@jects/jds/styles`를 불러와요. 테마 설정은 `@jects/jds/theme`, 토큰은 `@jects/jds/tokens`, 서버에서 호출할 순수 유틸은 `@jects/jds/utils`를 사용해요. 예를 들어 `formatFileSize`를 서버에서 호출하려면 `/utils`에서 가져와요.

개별 컴포넌트 export 추가는 `toastController`, `snackbarController`의 서버 호출을 지원하지 않아요. 해당 컨트롤러는 클라이언트 코드에서 사용해요.

- [React의 use client 설명](https://react.dev/reference/rsc/use-client)
- [Next.js의 use client 설명](https://nextjs.org/docs/app/api-reference/directives/use-client)
