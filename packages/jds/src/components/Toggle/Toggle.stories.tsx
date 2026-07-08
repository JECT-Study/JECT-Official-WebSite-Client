import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "켜고 끄는 두 가지 상태를 제어하는 입력 컴포넌트입니다. 설정의 활성화 여부를 직관적으로 전환할 때 활용합니다.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "스위치가 켜져 있는지 여부입니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "스위치의 비활성화 여부입니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: args => {
    const DefaultToggle = () => {
      const [checked, setChecked] = useState(args.checked ?? false);

      return <Toggle {...args} checked={checked} onChange={e => setChecked(e.target.checked)} />;
    };

    return <DefaultToggle />;
  },
};

export const States: Story = {
  render: () => (
    <FlexColumn gap='0.75rem'>
      <FlexRow gap='1rem'>
        <Label style={{ width: "6rem" }}>Unchecked</Label>
        <Toggle checked={false} aria-label='꺼진 토글' readOnly />
      </FlexRow>
      <FlexRow gap='1rem'>
        <Label style={{ width: "6rem" }}>Checked</Label>
        <Toggle checked aria-label='켜진 토글' readOnly />
      </FlexRow>
      <FlexRow gap='1rem'>
        <Label style={{ width: "6rem" }}>Disabled</Label>
        <Toggle checked={false} disabled aria-label='비활성 꺼진 토글' readOnly />
        <Toggle checked disabled aria-label='비활성 켜진 토글' readOnly />
      </FlexRow>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "rest, active, disabled 상태를 확인합니다. hover 스타일은 적용하지 않고, 누르는 동안에만 overlay active 스타일이 표시됩니다.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const ControlledToggle = () => {
      const [checked, setChecked] = useState(false);

      return (
        <FlexColumn gap='0.75rem'>
          <Toggle checked={checked} onChange={e => setChecked(e.target.checked)} />
          <Label>Checked: {String(checked)}</Label>
        </FlexColumn>
      );
    };

    return <ControlledToggle />;
  },
  parameters: {
    docs: {
      description: {
        story: "`checked`와 `onChange`를 사용해 외부에서 상태를 관리하는 예시입니다.",
      },
    },
  },
};
