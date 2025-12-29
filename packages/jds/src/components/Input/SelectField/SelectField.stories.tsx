import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { BlockButton } from "components";
import { useState } from "react";

import { SelectField } from "./index";

const meta = {
  title: "Components/Input/SelectField",
  component: SelectField,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    style: {
      control: "select",
      options: ["outlined", "empty"],
      description: "SelectField의 시각적 스타일",
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
      table: {
        defaultValue: { summary: "선택하세요" },
      },
    },
    dropdownIcon: {
      control: "text",
      description: "드롭다운 아이콘",
      table: {
        defaultValue: { summary: "arrow-down-s-fill" },
      },
    },
    isOpen: {
      control: "boolean",
      description: "드롭다운 열림 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState("");

    return (
      <div style={{ width: "20rem" }}>
        <SelectField.Button
          label='지역 선택'
          placeholder='거주 지역을 선택하세요'
          helperText='현재 거주하시는 지역을 선택해주세요'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          button={<BlockButton.Basic size='md'>확인</BlockButton.Basic>}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**SelectField.Button (기본)**\n\n" +
          "Select 필드 오른쪽에 버튼이 포함된 형태입니다.\n" +
          "확인 버튼이 필요한 선택 작업에 사용됩니다.",
      },
    },
  },
};

export const BasicSelectField: Story = {
  args: {
    value: "",
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState("");

    return (
      <div style={{ width: "20rem" }}>
        <SelectField
          label='지역 선택'
          placeholder='거주 지역을 선택하세요'
          helperText='현재 거주하시는 지역을 선택해주세요'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**기본 SelectField**\n\n" +
          "Label + Select + Helper가 모두 포함된 완전한 Select 필드입니다.\n" +
          "Controlled Pattern: value와 onClick는 필수입니다.",
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    value: "",
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState("서울특별시");

    return (
      <div style={{ width: "20rem" }}>
        <SelectField
          label='지역'
          helperText='선택된 지역: 서울특별시'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**선택된 값 표시**\n\n값이 선택된 상태를 보여줍니다.",
      },
    },
  },
};

export const WithLabelIcon: Story = {
  args: {
    value: "",
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [value] = useState("");

    return (
      <div style={{ width: "20rem" }}>
        <SelectField
          label='중요한 선택'
          labelIcon='information-line'
          placeholder='옵션을 선택하세요'
          helperText='중요한 정보이므로 신중히 선택하세요'
          value={value}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
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
    value: "",
  },
  render: function Render() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [value1] = useState("");
    const [value2] = useState("");
    const [value3] = useState("경기도");

    return (
      <FlexColumn gap='24px'>
        <SelectField
          label='지역 선택 (Normal)'
          placeholder='지역을 선택하세요'
          helperText='거주 지역을 선택해주세요'
          validation='none'
          value={value1}
          isOpen={isOpen1}
          onClick={() => setIsOpen1(!isOpen1)}
        />

        <SelectField
          label='지역 선택 (Error)'
          placeholder='지역을 선택하세요'
          validation='error'
          helperText='지역을 선택해주세요 (필수)'
          value={value2}
          isOpen={isOpen2}
          onClick={() => setIsOpen2(!isOpen2)}
        />

        <SelectField
          label='지역 선택 (Success)'
          validation='success'
          helperText='올바르게 선택되었습니다'
          value={value3}
          isOpen={isOpen3}
          onClick={() => setIsOpen3(!isOpen3)}
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
    value: "",
  },
  render: function Render() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [value1] = useState("");
    const [value2] = useState("");
    const [value3] = useState("인천광역시");

    return (
      <FlexColumn gap='32px'>
        <SelectField
          label='Normal'
          placeholder='마우스를 올리거나 클릭해보세요'
          value={value1}
          isOpen={isOpen1}
          onClick={() => setIsOpen1(!isOpen1)}
        />

        <SelectField
          label='Disabled'
          placeholder='선택할 수 없습니다'
          interaction='disabled'
          helperText='현재 선택이 비활성화되어 있습니다'
          value={value2}
          isOpen={isOpen2}
          onClick={() => setIsOpen2(!isOpen2)}
        />

        <SelectField
          label='Read Only'
          interaction='readOnly'
          helperText='읽기 전용 상태입니다'
          value={value3}
          isOpen={isOpen3}
          onClick={() => setIsOpen3(!isOpen3)}
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
          "- Disabled: 비활성화 상태 (회색, 클릭 불가)\n" +
          "- Read Only: 읽기 전용 상태 (변경 불가)",
      },
    },
  },
};

export const ButtonWithValidation: Story = {
  args: {
    value: "",
  },
  render: function Render() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [value1] = useState("");
    const [value2] = useState("");
    const [value3] = useState("부산광역시");

    return (
      <div style={{ width: "20rem" }}>
        <SelectField.Button
          label='지역 (Normal)'
          placeholder='선택하세요'
          value={value1}
          isOpen={isOpen1}
          onClick={() => setIsOpen1(!isOpen1)}
          button={<BlockButton.Basic size='md'>확인</BlockButton.Basic>}
          validation='none'
        />
        <SelectField.Button
          label='지역 (Error)'
          placeholder='선택하세요'
          helperText='지역을 선택해주세요'
          value={value2}
          isOpen={isOpen2}
          onClick={() => setIsOpen2(!isOpen2)}
          button={
            <BlockButton.Feedback intent='destructive' size='md'>
              재선택
            </BlockButton.Feedback>
          }
          validation='error'
        />
        <SelectField.Button
          label='지역 (Success)'
          helperText='올바르게 선택되었습니다'
          value={value3}
          isOpen={isOpen3}
          onClick={() => setIsOpen3(!isOpen3)}
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
          "**SelectField.Button + Validation**\n\n버튼과 validation 상태를 함께 사용할 수 있습니다.",
      },
    },
  },
};

export const AllStyles: Story = {
  args: {
    value: "",
  },
  render: function Render() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [value1] = useState("서울");
    const [value2] = useState("");
    const [value3] = useState("인천");
    const [value4] = useState("부산");
    const [value5] = useState("");
    const [value6] = useState("대구");

    return (
      <FlexColumn gap='32px'>
        <FlexColumn gap='16px'>
          <Label>Outlined Style:</Label>
          <FlexRow gap='24px'>
            <SelectField
              style='outlined'
              validation='none'
              label='Normal'
              placeholder='Outlined'
              value={value1}
              isOpen={isOpen1}
              onClick={() => setIsOpen1(!isOpen1)}
            />
            <SelectField
              style='outlined'
              validation='error'
              label='Error'
              placeholder='Outlined'
              value={value2}
              isOpen={isOpen2}
              onClick={() => setIsOpen2(!isOpen2)}
            />
            <SelectField
              style='outlined'
              validation='success'
              label='Success'
              placeholder='Outlined'
              value={value3}
              isOpen={isOpen3}
              onClick={() => setIsOpen3(!isOpen3)}
            />
          </FlexRow>
        </FlexColumn>

        <FlexColumn gap='16px'>
          <Label>Empty Style:</Label>
          <FlexRow gap='24px'>
            <SelectField
              style='empty'
              validation='none'
              label='Normal'
              placeholder='Empty'
              value={value4}
              isOpen={isOpen4}
              onClick={() => setIsOpen4(!isOpen4)}
            />
            <SelectField
              style='empty'
              validation='error'
              label='Error'
              placeholder='Empty'
              value={value5}
              isOpen={isOpen5}
              onClick={() => setIsOpen5(!isOpen5)}
            />
            <SelectField
              style='empty'
              validation='success'
              label='Success'
              placeholder='Empty'
              value={value6}
              isOpen={isOpen6}
              onClick={() => setIsOpen6(!isOpen6)}
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
    value: "",
  },
  render: function Render() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [value1] = useState("");
    const [value2] = useState("");

    return (
      <FlexColumn gap='32px'>
        <div>
          <Label>Vertical Layout:</Label>
          <SelectField
            layout='vertical'
            label='지역'
            placeholder='선택하세요'
            helperText='세로 방향 레이아웃'
            value={value1}
            isOpen={isOpen1}
            onClick={() => setIsOpen1(!isOpen1)}
          />
        </div>
        <div>
          <Label>Horizontal Layout:</Label>
          <SelectField
            layout='horizontal'
            label='지역'
            placeholder='선택하세요'
            helperText='가로 방향 레이아웃'
            value={value2}
            isOpen={isOpen2}
            onClick={() => setIsOpen2(!isOpen2)}
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
    value: "",
  },
  render: function Render() {
    const [isBasicOpen, setIsBasicOpen] = useState(false);
    const [isButtonOpen, setIsButtonOpen] = useState(false);
    const [basicValue] = useState("서울특별시");
    const [buttonValue] = useState("경기도");

    return (
      <FlexColumn gap='48px'>
        <FlexColumn gap='16px'>
          <label>
            <strong>SelectField 기본형</strong>
          </label>
          <SelectField
            label='거주 지역'
            placeholder='지역을 선택하세요'
            helperText='현재 거주하시는 지역을 선택해주세요'
            value={basicValue}
            isOpen={isBasicOpen}
            onClick={() => setIsBasicOpen(!isBasicOpen)}
          />
        </FlexColumn>

        <FlexColumn gap='16px'>
          <label>
            <strong>SelectField.Button (BlockButton.Basic 권장)</strong>
          </label>
          <SelectField.Button
            label='근무 지역'
            placeholder='지역을 선택하세요'
            helperText='근무 지역을 선택해주세요'
            value={buttonValue}
            isOpen={isButtonOpen}
            onClick={() => setIsButtonOpen(!isButtonOpen)}
            button={<BlockButton.Basic size='md'>확인</BlockButton.Basic>}
          />
        </FlexColumn>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**모든 SelectField 변형 (Controlled Pattern)**\n\n" +
          "Base + Variants 구조로 관심사를 분리하고, Namespace Pattern을 사용합니다:\n\n" +
          "1. **SelectField**: 기본 선택 필드 (SelectField.tsx)\n" +
          "2. **SelectField.Button**: 버튼 포함 (SelectFieldButton.tsx)\n\n" +
          "**권장사항:**\n" +
          "- SelectField.Button의 button prop에는 BlockButton.Basic 사용을 권장합니다.\n" +
          '- size는 "md"로 고정하여 일관성을 유지합니다.\n\n' +
          "```tsx\n" +
          'import { SelectField, BlockButton } from "@ject/jds";\n' +
          'import { useState } from "react";\n\n' +
          "const [isOpen, setIsOpen] = useState(false);\n" +
          'const [value, setValue] = useState("");\n\n' +
          "// 기본\n" +
          "<SelectField\n" +
          '  label="지역"\n' +
          "  value={value}\n" +
          "  isOpen={isOpen}\n" +
          "  onClick={() => setIsOpen(!isOpen)}\n" +
          "/>\n\n" +
          "// 버튼 포함 (BlockButton.Basic 권장)\n" +
          "<SelectField.Button\n" +
          '  label="지역"\n' +
          "  value={value}\n" +
          "  isOpen={isOpen}\n" +
          "  onClick={() => setIsOpen(!isOpen)}\n" +
          '  button={<BlockButton.Basic size="md">확인</BlockButton.Basic>}\n' +
          "/>\n" +
          "```",
      },
    },
  },
};
