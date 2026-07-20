import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { RADIO_SIZE_OPTIONS } from "./radio.types";
import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const GROUP_GAP = "12px";

export const Sizes: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      {RADIO_SIZE_OPTIONS.map(size => (
        <FlexColumn key={size} gap={GROUP_GAP}>
          <RadioGroup
            size={size}
            defaultValue='checked'
            options={[
              { value: "unchecked", label: size },
              { value: "checked", label: size },
            ]}
          />
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
};

export const Variants: Story = {
  render: () => (
    <FlexRow>
      <FlexColumn gap={GROUP_GAP}>
        <RadioGroup
          variant='hollow'
          defaultValue='a'
          options={[
            { value: "a", label: "hollow" },
            { value: "b", label: "hollow", helper: "헬퍼 텍스트" },
          ]}
        />
      </FlexColumn>
      <FlexColumn gap={GROUP_GAP}>
        <RadioGroup
          variant='outlined'
          defaultValue='a'
          options={[
            { value: "a", label: "outlined" },
            { value: "b", label: "outlined", helper: "헬퍼 텍스트" },
          ]}
        />
      </FlexColumn>
    </FlexRow>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FlexRow>
      <FlexColumn gap={GROUP_GAP}>
        <RadioGroup
          variant='hollow'
          defaultValue='a'
          disabled
          options={[
            { value: "a", label: "checked" },
            { value: "b", label: "unchecked" },
          ]}
        />
      </FlexColumn>
      <FlexColumn gap={GROUP_GAP}>
        <RadioGroup
          variant='outlined'
          defaultValue='a'
          disabled
          options={[
            { value: "a", label: "checked", helper: "헬퍼 텍스트" },
            { value: "b", label: "unchecked", helper: "헬퍼 텍스트" },
          ]}
        />
      </FlexColumn>
    </FlexRow>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      <RadioGroup
        defaultValue='2'
        name='uncontrolled'
        options={[
          { value: "1", label: "레이블" },
          { value: "2", label: "레이블 (기본 선택)" },
          { value: "3", label: "레이블" },
        ]}
      />
    </FlexColumn>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("1");
    return (
      <FlexColumn>
        <span>선택: {selected}</span>
        <FlexColumn gap={GROUP_GAP}>
          <RadioGroup
            value={selected}
            onChange={setSelected}
            name='controlled'
            options={[
              { value: "1", label: "레이블" },
              { value: "2", label: "레이블" },
              { value: "3", label: "레이블" },
            ]}
          />
        </FlexColumn>
      </FlexColumn>
    );
  },
};

export const ComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn>
      {RADIO_SIZE_OPTIONS.map(size => (
        <FlexRow key={size}>
          <FlexColumn gap={GROUP_GAP}>
            <RadioGroup
              size={size}
              defaultValue='checked'
              options={[
                { value: "unchecked", label: size },
                { value: "checked", label: size },
              ]}
            />
          </FlexColumn>
          <FlexColumn gap={GROUP_GAP}>
            <RadioGroup
              size={size}
              defaultValue='checked'
              disabled
              options={[
                { value: "unchecked", label: size },
                { value: "checked", label: size },
              ]}
            />
          </FlexColumn>
        </FlexRow>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 size와 상태 조합을 한눈에 확인할 수 있습니다.",
      },
    },
  },
};
