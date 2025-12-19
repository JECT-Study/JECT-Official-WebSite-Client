import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { BlockButton } from "components";
import { useState } from "react";

import { TagField } from "./index";
import type { Tag } from "./tagField.types";

const meta = {
  title: "Components/Input/TagField",
  component: TagField,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    style: {
      control: "select",
      options: ["outlined", "empty"],
      description: "Input 필드의 시각적 스타일",
      table: {
        defaultValue: { summary: "outlined" },
      },
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "레이아웃 방향",
      table: {
        defaultValue: { summary: "vertical" },
      },
    },
    validation: {
      control: "select",
      options: ["none", "error", "success"],
      description: "유효성 검증 상태",
      table: {
        defaultValue: { summary: "none" },
      },
    },
    interaction: {
      control: "select",
      options: ["enabled", "disabled", "readOnly"],
      description: "인터랙션 상태 (활성화, 비활성화, 읽기 전용)",
      table: {
        defaultValue: { summary: "enabled" },
      },
    },
    label: {
      control: "text",
      description: "레이블 텍스트",
    },
    labelIcon: {
      control: "text",
      description: "레이블 옆에 표시할 아이콘 (IconName)",
    },
    helperText: {
      control: "text",
      description: "Helper 메시지",
    },
    placeholder: {
      control: "text",
      description: "Placeholder 텍스트",
    },
    maxTags: {
      control: "number",
      description: "최대 태그 개수",
    },
    allowDuplicates: {
      control: "boolean",
      description: "중복 태그 허용 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof TagField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "TypeScript" },
    ]);

    return (
      <div style={{ width: "20rem" }}>
        <TagField.Button
          label='기술 스택'
          placeholder='태그를 입력하세요'
          helperText='Enter로 추가, Backspace로 삭제'
          tags={tags}
          onTagsChange={setTags}
          button={<BlockButton.Basic size='md'>저장</BlockButton.Basic>}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**TagField.Button (기본)**\n\n" +
          "태그를 입력하고 관리할 수 있는 필드에 버튼이 포함된 형태입니다.\n" +
          "- Enter: 태그 추가\n" +
          "- Backspace (입력값 비어있을 때): 마지막 태그 삭제\n" +
          "- Badge 클릭: 해당 태그 삭제",
      },
    },
  },
};

export const BasicTagField: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "TypeScript" },
      { id: "3", label: "Design System" },
    ]);

    return (
      <div style={{ width: "20rem" }}>
        <TagField
          label='관심 기술 스택'
          placeholder='태그를 입력하고 Enter를 누르세요'
          helperText='Enter로 추가, Backspace로 삭제'
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**기본 TagField**\n\n" +
          "Label + Tag Input + Helper가 모두 포함된 완전한 TagField입니다.\n" +
          "Controlled Pattern 전용: tags와 onTagsChange는 필수입니다.",
      },
    },
  },
};

export const WithLabelIcon: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags, setTags] = useState<Tag[]>([
      { id: "1", label: "Frontend" },
      { id: "2", label: "Backend" },
    ]);

    return (
      <div style={{ width: "20rem" }}>
        <TagField
          label='개발 분야'
          labelIcon='information-line'
          placeholder='태그를 입력하세요'
          helperText='관심있는 개발 분야를 태그로 추가하세요'
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Label Icon 포함**\n\n레이블 옆에 아이콘을 추가할 수 있습니다. 어떤 IconName이든 사용 가능합니다.",
      },
    },
  },
};

export const WithValidation: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([{ id: "1", label: "React" }]);
    const [tags2, setTags2] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "Vue" },
      { id: "3", label: "Angular" },
      { id: "4", label: "Svelte" },
      { id: "5", label: "Solid" },
      { id: "6", label: "Qwik" },
    ]);
    const [tags3, setTags3] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "TypeScript" },
    ]);

    return (
      <FlexColumn gap='24px'>
        <TagField
          label='기술 스택 (Normal)'
          placeholder='태그를 입력하세요'
          helperText='최소 1개 이상 입력해주세요'
          validation='none'
          tags={tags1}
          onTagsChange={setTags1}
        />

        <TagField
          label='기술 스택 (Error)'
          placeholder='태그를 입력하세요'
          helperText='최대 5개까지만 입력 가능합니다'
          validation='error'
          tags={tags2}
          onTagsChange={setTags2}
        />

        <TagField
          label='기술 스택 (Success)'
          placeholder='태그를 입력하세요'
          helperText='올바르게 입력되었습니다'
          validation='success'
          tags={tags3}
          onTagsChange={setTags3}
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Validation 상태**\n\n" +
          "- `none`: 기본 상태\n" +
          "- `error`: 에러 상태 (빨간색 테두리 및 메시지)\n" +
          "- `success`: 성공 상태 (초록색 테두리 및 메시지)",
      },
    },
  },
};

export const States: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "TypeScript" },
    ]);

    const tags2 = [
      { id: "1", label: "JavaScript" },
      { id: "2", label: "Python" },
    ];

    const tags3 = [
      { id: "1", label: "Java" },
      { id: "2", label: "Kotlin" },
    ];

    return (
      <FlexColumn gap='32px'>
        <TagField
          label='Normal'
          placeholder='태그를 입력하세요'
          tags={tags1}
          onTagsChange={setTags1}
        />

        <TagField
          label='Disabled'
          placeholder='비활성화된 필드'
          helperText='이 필드는 비활성화되어 있습니다'
          interaction='disabled'
          tags={tags2}
          onTagsChange={() => {}}
        />

        <TagField
          label='Read Only'
          helperText='이 필드는 읽기 전용 상태입니다'
          interaction='readOnly'
          tags={tags3}
          onTagsChange={() => {}}
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**상태 예시**\n\n" +
          "- Normal: InteractionLayer 기반 hover/focus/active 인터랙션\n" +
          "- Disabled: 비활성화 상태 (회색, 태그 제거 불가)\n" +
          "- Read Only: 읽기 전용 상태 (태그 제거 불가)",
      },
    },
  },
};

export const ButtonWithValidation: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([{ id: "1", label: "React" }]);
    const [tags2, setTags2] = useState<Tag[]>([
      { id: "1", label: "A" },
      { id: "2", label: "B" },
      { id: "3", label: "C" },
      { id: "4", label: "D" },
      { id: "5", label: "E" },
      { id: "6", label: "F" },
    ]);
    const [tags3, setTags3] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "Vue" },
    ]);

    return (
      <div style={{ width: "20rem" }}>
        <TagField.Button
          label='기술 스택 (Normal)'
          placeholder='태그를 입력하세요'
          tags={tags1}
          onTagsChange={setTags1}
          button={<BlockButton.Basic size='md'>저장</BlockButton.Basic>}
          validation='none'
        />
        <TagField.Button
          label='기술 스택 (Error)'
          helperText='최대 5개까지만 입력 가능합니다'
          tags={tags2}
          onTagsChange={setTags2}
          button={
            <BlockButton.Feedback intent='destructive' size='md'>
              초기화
            </BlockButton.Feedback>
          }
          validation='error'
        />
        <TagField.Button
          label='기술 스택 (Success)'
          helperText='올바르게 입력되었습니다'
          tags={tags3}
          onTagsChange={setTags3}
          button={<BlockButton.Basic size='md'>확인</BlockButton.Basic>}
          validation='success'
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**TagField.Button + Validation**\n\n버튼과 validation 상태를 함께 사용할 수 있습니다.",
      },
    },
  },
};

export const AllStyles: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "Vue" },
    ]);
    const [tags2, setTags2] = useState<Tag[]>([
      { id: "1", label: "Angular" },
      { id: "2", label: "Svelte" },
    ]);
    const [tags3, setTags3] = useState<Tag[]>([
      { id: "1", label: "Solid" },
      { id: "2", label: "Qwik" },
    ]);
    const [tags4, setTags4] = useState<Tag[]>([
      { id: "1", label: "Next.js" },
      { id: "2", label: "Remix" },
    ]);
    const [tags5, setTags5] = useState<Tag[]>([
      { id: "1", label: "Gatsby" },
      { id: "2", label: "Astro" },
    ]);
    const [tags6, setTags6] = useState<Tag[]>([
      { id: "1", label: "Nuxt" },
      { id: "2", label: "SvelteKit" },
    ]);

    return (
      <FlexColumn gap='32px'>
        <FlexColumn gap='16px'>
          <Label>Outlined Style:</Label>
          <FlexRow gap='24px'>
            <TagField
              style='outlined'
              validation='none'
              label='Normal'
              placeholder='Outlined'
              tags={tags1}
              onTagsChange={setTags1}
            />
            <TagField
              style='outlined'
              validation='error'
              label='Error'
              placeholder='Outlined'
              tags={tags2}
              onTagsChange={setTags2}
            />
            <TagField
              style='outlined'
              validation='success'
              label='Success'
              placeholder='Outlined'
              tags={tags3}
              onTagsChange={setTags3}
            />
          </FlexRow>
        </FlexColumn>

        <FlexColumn gap='16px'>
          <Label>Empty Style:</Label>
          <FlexRow gap='24px'>
            <TagField
              style='empty'
              validation='none'
              label='Normal'
              placeholder='Empty'
              tags={tags4}
              onTagsChange={setTags4}
            />
            <TagField
              style='empty'
              validation='error'
              label='Error'
              placeholder='Empty'
              tags={tags5}
              onTagsChange={setTags5}
            />
            <TagField
              style='empty'
              validation='success'
              label='Success'
              placeholder='Empty'
              tags={tags6}
              onTagsChange={setTags6}
            />
          </FlexRow>
        </FlexColumn>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**스타일 변형**\n\n" +
          "- `outlined`: 테두리가 있는 스타일 (기본값)\n" +
          "- `empty`: 테두리가 없는 스타일",
      },
    },
  },
};

export const Layouts: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [tags1, setTags1] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "Vue" },
    ]);
    const [tags2, setTags2] = useState<Tag[]>([
      { id: "1", label: "Angular" },
      { id: "2", label: "Svelte" },
    ]);

    return (
      <FlexColumn gap='32px'>
        <div>
          <Label>Vertical Layout:</Label>
          <TagField
            layout='vertical'
            label='기술 스택'
            placeholder='태그를 입력하세요'
            helperText='Enter로 태그를 추가하세요'
            tags={tags1}
            onTagsChange={setTags1}
          />
        </div>
        <div>
          <Label>Horizontal Layout:</Label>
          <TagField
            layout='horizontal'
            label='기술 스택'
            placeholder='태그를 입력하세요'
            helperText='Enter로 태그를 추가하세요'
            tags={tags2}
            onTagsChange={setTags2}
          />
        </div>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**레이아웃 방향**\n\n" +
          "- `vertical`: 세로 방향 (기본값)\n" +
          "- `horizontal`: 가로 방향",
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    tags: [],
    onTagsChange: () => {},
  },
  render: function Render() {
    const [basicTags, setBasicTags] = useState<Tag[]>([
      { id: "1", label: "React" },
      { id: "2", label: "TypeScript" },
    ]);
    const [buttonTags, setButtonTags] = useState<Tag[]>([
      { id: "1", label: "Vue" },
      { id: "2", label: "Vite" },
    ]);

    return (
      <FlexColumn gap='48px'>
        <FlexColumn gap='16px'>
          <label>
            <strong>TagField 기본형</strong>
          </label>
          <TagField
            label='관심 기술'
            placeholder='태그를 입력하세요'
            helperText='Enter로 추가, Backspace로 삭제'
            tags={basicTags}
            onTagsChange={setBasicTags}
          />
        </FlexColumn>

        <FlexColumn gap='16px'>
          <label>
            <strong>TagField.Button (BlockButton.Basic 권장)</strong>
          </label>
          <TagField.Button
            label='프로젝트 기술'
            placeholder='태그를 입력하세요'
            helperText='사용한 기술을 태그로 추가해주세요'
            tags={buttonTags}
            onTagsChange={setButtonTags}
            button={<BlockButton.Basic size='md'>저장</BlockButton.Basic>}
          />
        </FlexColumn>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**모든 TagField 변형 (Controlled Pattern)**\n\n" +
          "Base + Variants 구조로 관심사를 분리하고, Namespace Pattern을 사용합니다:\n\n" +
          "1. **TagField**: 기본 태그 입력 필드 (TagField.tsx)\n" +
          "2. **TagField.Button**: 버튼 포함 (TagFieldButton.tsx)\n\n" +
          "**권장사항:**\n" +
          "- TagField.Button의 button prop에는 BlockButton.Basic 사용을 권장합니다.\n" +
          '- size는 "md"로 고정하여 일관성을 유지합니다.\n\n' +
          "```tsx\n" +
          'import { TagField, BlockButton } from "@ject/jds";\n' +
          'import { useState } from "react";\n\n' +
          "const [tags, setTags] = useState<Tag[]>([]);\n\n" +
          "// 기본\n" +
          "<TagField\n" +
          '  label="기술 스택"\n' +
          "  tags={tags}\n" +
          "  onTagsChange={setTags}\n" +
          "/>\n\n" +
          "// 버튼 포함 (BlockButton.Basic 권장)\n" +
          "<TagField.Button\n" +
          '  label="기술 스택"\n' +
          "  tags={tags}\n" +
          "  onTagsChange={setTags}\n" +
          '  button={<BlockButton.Basic size="md">저장</BlockButton.Basic>}\n' +
          "/>\n" +
          "```",
      },
    },
  },
};
