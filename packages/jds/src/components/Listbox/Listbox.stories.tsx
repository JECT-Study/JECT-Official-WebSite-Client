import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { REGION_OPTIONS } from "@storybook-utils/selectOptions";
import { useState } from "react";
import { vars } from "tokens";

import { Listbox } from "./Listbox";
import { useListbox } from "./useListbox";
import { useSingleSelectState } from "./useSingleSelectState";
import { Code } from "../Code";
import type { ListboxProps } from "./listbox.types";

type RegionListboxProps = Pick<ListboxProps, "label" | "surface">;

const RegionListbox = ({ surface, label }: RegionListboxProps) => {
  const [value, setValue] = useState<string | null>("busan");
  const { selectedValues, select } = useSingleSelectState(value, undefined, setValue);
  const { listboxRef, behavior, getFocusableListboxProps } = useListbox({
    selectedValues,
    disabled: false,
    onSelect: select,
  });

  return (
    <Listbox
      behavior={behavior}
      selectionMode='single'
      variant='label'
      surface={surface}
      width='full'
      label={label}
      aria-label={label == null ? "지역" : undefined}
      listboxRef={listboxRef}
      listboxProps={getFocusableListboxProps()}
    >
      {REGION_OPTIONS.map(option => (
        <Listbox.Option key={option.value} value={option.value}>
          {option.label}
        </Listbox.Option>
      ))}
    </Listbox>
  );
};

const panelStyle = {
  width: 240,
  padding: 12,
  backgroundColor: vars.color.semantic.surface.shallow,
  borderRadius: vars.scheme.semantic.radius["12"],
  boxShadow: vars.environment.semantic.shadow.floated,
} as const;

const meta: Meta<typeof Listbox> = {
  title: "Components/Listbox",
  component: Listbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "목록에서 값을 고르는 프리미티브입니다. 상태 배선은 useSingleSelectState와 useListbox가 담당하고, Select와 MultiSelect가 이 컴포넌트를 감쌉니다. 기본값은 트리거 옆에 떠 있는 드롭다운 카드로 그려지고, surface를 false로 주면 배경과 테두리, 그림자, 패딩 없이 옵션만 렌더합니다.",
      },
    },
  },
  argTypes: {
    surface: {
      control: "boolean",
      description:
        "목록 자체의 표면을 그릴지 여부입니다. 이미 표면이 있는 컨테이너 안에 넣을 때 false로 설정합니다.",
      table: { defaultValue: { summary: "true" } },
    },
  },
} satisfies Meta<typeof Listbox>;

export default meta;

type Story = StoryObj<typeof Listbox>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <RegionListbox />
    </div>
  ),
};

export const WithoutSurface: Story = {
  render: () => (
    <div style={panelStyle}>
      <RegionListbox surface={false} />
    </div>
  ),
};

export const SurfaceComparison: Story = {
  render: () => (
    <FlexRow gap='24px' style={{ alignItems: "flex-start" }}>
      <FlexColumn gap='8px' style={{ alignItems: "flex-start" }}>
        <Code>surface (기본값)</Code>
        <div style={panelStyle}>
          <RegionListbox />
        </div>
      </FlexColumn>
      <FlexColumn gap='8px' style={{ alignItems: "flex-start" }}>
        <Code>surface={"{false}"}</Code>
        <div style={panelStyle}>
          <RegionListbox surface={false} />
        </div>
      </FlexColumn>
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "같은 패널 안에 넣었을 때의 차이입니다. 기본값은 패널 위에 카드가 한 겹 더 생기고, surface를 false로 두면 옵션이 패널 표면에 바로 표시됩니다.",
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <RegionListbox label='지역' />
    </div>
  ),
};
