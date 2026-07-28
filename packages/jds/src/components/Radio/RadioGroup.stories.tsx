import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { RADIO_SIZE_OPTIONS } from "./radio.types";
import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const CONTAINER_WIDTH = "280px";

export const Sizes: Story = {
  render: () => (
    <FlexColumn>
      {RADIO_SIZE_OPTIONS.map(size => (
        <RadioGroup
          key={size}
          size={size}
          defaultValue='checked'
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
      <RadioGroup
        variant='hollow'
        defaultValue='a'
        options={[
          { value: "a", label: "hollow" },
          { value: "b", label: "hollow", helper: "헬퍼 텍스트" },
        ]}
      />
      <RadioGroup
        variant='outlined'
        defaultValue='a'
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
      <RadioGroup
        variant='hollow'
        defaultValue='a'
        disabled
        options={[
          { value: "a", label: "checked" },
          { value: "b", label: "unchecked" },
        ]}
      />
      <RadioGroup
        variant='outlined'
        defaultValue='a'
        disabled
        options={[
          { value: "a", label: "checked", helper: "헬퍼 텍스트" },
          { value: "b", label: "unchecked", helper: "헬퍼 텍스트" },
        ]}
      />
    </FlexRow>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <RadioGroup
      defaultValue='2'
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
    const [selected, setSelected] = useState("1");
    return (
      <FlexColumn>
        <span>선택: {selected}</span>
        <RadioGroup
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
      <RadioGroup
        layout='grid'
        columns={3}
        defaultValue='1'
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
      <RadioGroup
        stretched
        variant='outlined'
        defaultValue='1'
        name='stretchedVertical'
        options={[
          { value: "1", label: "레이블 1" },
          { value: "2", label: "레이블 2", helper: "헬퍼 텍스트" },
        ]}
      />
      <RadioGroup
        layout='grid'
        columns={2}
        stretched
        variant='outlined'
        defaultValue='1'
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
          "`stretched`를 지정하면 아이템이 컨테이너(vertical) 또는 셀(grid) 너비를 가득 채웁니다.",
      },
    },
  },
};
