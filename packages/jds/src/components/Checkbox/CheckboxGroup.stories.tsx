import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState, type ComponentProps } from "react";

import { Checkbox } from "./Checkbox";
import { CHECKBOX_SIZE_OPTIONS, type CheckedState } from "./checkbox.types";
import { CheckboxGroup } from "./CheckboxGroup";

const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

const GROUP_GAP = "12px";
const CONTAINER_WIDTH = "280px";

const ItemColumn = ({ style, ...props }: ComponentProps<typeof FlexColumn>) => (
  <FlexColumn style={{ alignItems: "flex-start", ...style }} {...props} />
);

export const Sizes: Story = {
  render: () => (
    <FlexColumn>
      {CHECKBOX_SIZE_OPTIONS.map(size => (
        <CheckboxGroup
          key={size}
          size={size}
          defaultValue={["checked"]}
          options={[
            { value: "unchecked", label: size },
            { value: "checked", label: size },
          ]}
        />
      ))}
    </FlexColumn>
  ),
};

export const Variants: Story = {
  render: () => (
    <FlexRow>
      <CheckboxGroup
        variant='hollow'
        defaultValue={["a"]}
        options={[
          { value: "a", label: "hollow" },
          { value: "b", label: "hollow", helper: "헬퍼 텍스트" },
        ]}
      />
      <CheckboxGroup
        variant='outlined'
        defaultValue={["a"]}
        options={[
          { value: "a", label: "outlined" },
          { value: "b", label: "outlined", helper: "헬퍼 텍스트" },
        ]}
      />
    </FlexRow>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FlexRow>
      <CheckboxGroup
        variant='hollow'
        defaultValue={["a"]}
        disabled
        options={[
          { value: "a", label: "checked" },
          { value: "b", label: "unchecked" },
        ]}
      />
      <CheckboxGroup
        variant='outlined'
        defaultValue={["a"]}
        disabled
        options={[
          { value: "a", label: "checked", helper: "헬퍼 텍스트" },
          { value: "b", label: "unchecked", helper: "헬퍼 텍스트" },
        ]}
      />
    </FlexRow>
  ),
};

export const Invalid: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>([]);
    const isInvalid = selected.length === 0;

    return (
      <CheckboxGroup
        value={selected}
        onChange={setSelected}
        isInvalid={isInvalid}
        name='groupInvalid'
        variant='outlined'
        options={[
          { value: "1", label: "레이블 1", helper: "헬퍼 텍스트" },
          { value: "2", label: "레이블 2" },
        ]}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`CheckboxGroup`의 `isInvalid`를 사용하여 그룹 단위 유효성 검사를 표현할 수 있습니다. 아무것도 선택하지 않은 초기 상태에서는 invalid가 그룹 전체로 전파되며 하나 이상 선택하면 invalid가 해제됩니다.",
      },
    },
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <CheckboxGroup
      defaultValue={["2"]}
      name='uncontrolled'
      options={[
        { value: "1", label: "레이블 1" },
        { value: "2", label: "레이블 2" },
        { value: "3", label: "레이블 3" },
      ]}
    />
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(["1"]);

    return (
      <FlexColumn>
        <span>선택: {selected.join(", ") || "(없음)"}</span>
        <CheckboxGroup
          value={selected}
          onChange={setSelected}
          name='controlled'
          options={[
            { value: "1", label: "레이블 1" },
            { value: "2", label: "레이블 2" },
            { value: "3", label: "레이블 3" },
          ]}
        />
      </FlexColumn>
    );
  },
};

export const GridLayout: Story = {
  render: () => (
    <FlexColumn style={{ width: CONTAINER_WIDTH }}>
      <CheckboxGroup
        layout='grid'
        columns={3}
        defaultValue={["1"]}
        name='grid'
        options={[
          { value: "1", label: "레이블 1" },
          { value: "2", label: "레이블 2" },
          { value: "3", label: "레이블 3" },
          { value: "4", label: "레이블 4" },
          { value: "5", label: "레이블 5" },
        ]}
      />
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "`layout='grid'`는 그룹 너비 전체를 `columns` 개수로 균등 분할합니다.",
      },
    },
  },
};

export const Stretched: Story = {
  render: () => (
    <FlexColumn style={{ width: CONTAINER_WIDTH }}>
      <CheckboxGroup
        stretched
        variant='outlined'
        defaultValue={["1"]}
        name='stretchedVertical'
        options={[
          { value: "1", label: "레이블 1" },
          { value: "2", label: "레이블 2", helper: "헬퍼 텍스트" },
        ]}
      />
      <CheckboxGroup
        layout='grid'
        columns={2}
        stretched
        variant='outlined'
        defaultValue={["1"]}
        name='stretchedGrid'
        options={[
          { value: "1", label: "레이블 1" },
          { value: "2", label: "레이블 2" },
        ]}
      />
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "그룹에 `stretched`를 지정하면 각 아이템이 컨테이너(vertical) 또는 셀(grid) 너비를 가득 채웁니다.",
      },
    },
  },
};

export const SelectAll: Story = {
  render: function Render() {
    const ALL = ["1", "2", "3"];
    const [selected, setSelected] = useState<string[]>(["1"]);

    const isAllChecked = selected.length === ALL.length;
    const isSomeChecked = selected.length > 0 && !isAllChecked;
    const parentState: CheckedState = isAllChecked ? true : isSomeChecked ? "indeterminate" : false;

    return (
      <ItemColumn gap={GROUP_GAP}>
        <Checkbox
          checked={parentState}
          onCheckedChange={() => setSelected(isAllChecked ? [] : [...ALL])}
          label='전체 선택'
        />
        <CheckboxGroup
          value={selected}
          onChange={setSelected}
          name='groupSelectAll'
          options={ALL.map(value => ({ value, label: `레이블 ${value}` }))}
        />
      </ItemColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "부모 체크박스는 그룹의 선택 상태에서 파생되어, 모두 선택되면 checked, 일부만 선택되면 indeterminate, 아무것도 선택되지 않으면 unchecked로 표시됩니다. 부모를 클릭하면 전체 선택과 전체 해제를 토글합니다.",
      },
    },
  },
};
