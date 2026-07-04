import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { Radio } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio.Item,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Radio.Item>;

export default meta;

type Story = StoryObj<typeof Radio.Item>;

const SIZES = ["lg", "md", "sm", "xs"] as const;

const GROUP_GAP = "12px";

export const Sizes: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      <Radio.Root defaultValue='md'>
        {SIZES.map(size => (
          <Radio.Item key={size} value={size} size={size}>
            <Radio.Indicator />
            <Radio.Label>{size}</Radio.Label>
          </Radio.Item>
        ))}
      </Radio.Root>
    </FlexColumn>
  ),
};

export const Variants: Story = {
  render: () => (
    <FlexRow>
      <FlexColumn gap={GROUP_GAP}>
        <Radio.Root defaultValue='a' variant='hollow'>
          <Radio.Item value='a'>
            <Radio.Indicator />
            <Radio.Label>hollow</Radio.Label>
          </Radio.Item>
          <Radio.Item value='b'>
            <Radio.Indicator />
            <Radio.Label>hollow</Radio.Label>
            <Radio.Helper>헬퍼 텍스트</Radio.Helper>
          </Radio.Item>
        </Radio.Root>
      </FlexColumn>
      <FlexColumn gap={GROUP_GAP}>
        <Radio.Root defaultValue='a' variant='outlined'>
          <Radio.Item value='a'>
            <Radio.Indicator />
            <Radio.Label>outlined</Radio.Label>
          </Radio.Item>
          <Radio.Item value='b'>
            <Radio.Indicator />
            <Radio.Label>outlined</Radio.Label>
            <Radio.Helper>헬퍼 텍스트</Radio.Helper>
          </Radio.Item>
        </Radio.Root>
      </FlexColumn>
    </FlexRow>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FlexRow>
      <FlexColumn gap={GROUP_GAP}>
        <Radio.Root defaultValue='a' disabled variant='hollow'>
          <Radio.Item value='a'>
            <Radio.Indicator />
            <Radio.Label>checked</Radio.Label>
          </Radio.Item>
          <Radio.Item value='b'>
            <Radio.Indicator />
            <Radio.Label>unchecked</Radio.Label>
          </Radio.Item>
        </Radio.Root>
      </FlexColumn>
      <FlexColumn gap={GROUP_GAP}>
        <Radio.Root defaultValue='a' disabled variant='outlined'>
          <Radio.Item value='a'>
            <Radio.Indicator />
            <Radio.Label>checked</Radio.Label>
            <Radio.Helper>헬퍼 텍스트</Radio.Helper>
          </Radio.Item>
          <Radio.Item value='b'>
            <Radio.Indicator />
            <Radio.Label>unchecked</Radio.Label>
            <Radio.Helper>헬퍼 텍스트</Radio.Helper>
          </Radio.Item>
        </Radio.Root>
      </FlexColumn>
    </FlexRow>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      <Radio.Root defaultValue='2' name='uncontrolled'>
        <Radio.Item value='1'>
          <Radio.Indicator />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Item>
        <Radio.Item value='2'>
          <Radio.Indicator />
          <Radio.Label>레이블 (기본 선택)</Radio.Label>
        </Radio.Item>
        <Radio.Item value='3'>
          <Radio.Indicator />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Item>
      </Radio.Root>
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
          <Radio.Root value={selected} onChange={setSelected} name='controlled'>
            <Radio.Item value='1'>
              <Radio.Indicator />
              <Radio.Label>레이블</Radio.Label>
            </Radio.Item>
            <Radio.Item value='2'>
              <Radio.Indicator />
              <Radio.Label>레이블</Radio.Label>
            </Radio.Item>
            <Radio.Item value='3'>
              <Radio.Indicator />
              <Radio.Label>레이블</Radio.Label>
            </Radio.Item>
          </Radio.Root>
        </FlexColumn>
      </FlexColumn>
    );
  },
};

export const ComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn>
      {SIZES.map(size => (
        <FlexRow key={size}>
          <FlexColumn gap={GROUP_GAP}>
            <Radio.Root defaultValue='checked' size={size}>
              <Radio.Item value='unchecked'>
                <Radio.Indicator />
                <Radio.Label>{size}</Radio.Label>
              </Radio.Item>
              <Radio.Item value='checked'>
                <Radio.Indicator />
                <Radio.Label>{size}</Radio.Label>
              </Radio.Item>
            </Radio.Root>
          </FlexColumn>
          <FlexColumn gap={GROUP_GAP}>
            <Radio.Root defaultValue='checked' size={size} disabled>
              <Radio.Item value='unchecked'>
                <Radio.Indicator />
                <Radio.Label>{size}</Radio.Label>
              </Radio.Item>
              <Radio.Item value='checked'>
                <Radio.Indicator />
                <Radio.Label>{size}</Radio.Label>
              </Radio.Item>
            </Radio.Root>
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
