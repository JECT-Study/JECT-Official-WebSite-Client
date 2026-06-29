import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { Radio } from "./Radio";

const meta: Meta<typeof Radio.Item> = {
  title: "Components/Radio",
  component: Radio.Item,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Radio.Item>;

export default meta;

type Story = StoryObj<typeof Radio.Item>;

export const RadioBasicSizes: Story = {
  render: () => (
    <FlexRow>
      <Radio.Basic value='lg' size='lg' />
      <Radio.Basic value='md' size='md' />
      <Radio.Basic value='sm' size='sm' />
      <Radio.Basic value='xs' size='xs' />
    </FlexRow>
  ),
};

export const RadioBasicStates: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Radio.Basic value='unchecked' checked={false} onChange={() => {}} />
        <Radio.Basic value='checked' checked={true} onChange={() => {}} />
      </FlexRow>
      <FlexRow>
        <Radio.Basic value='unchecked' checked={false} disabled onChange={() => {}} />
        <Radio.Basic value='checked' checked={true} disabled onChange={() => {}} />
      </FlexRow>
    </FlexColumn>
  ),
};

export const RadioItemVariant: Story = {
  render: () => (
    <FlexColumn>
      <FlexColumn>
        {(["lg", "md", "sm", "xs"] as const).map(size => (
          <Radio.Item key={size} size={size} variant='hollow'>
            <Radio.Basic value='item' />
            <Radio.Label>레이블</Radio.Label>
          </Radio.Item>
        ))}
      </FlexColumn>
      <FlexColumn>
        {(["lg", "md", "sm", "xs"] as const).map(size => (
          <Radio.Item key={size} size={size} variant='outlined'>
            <Radio.Basic value='item' />
            <Radio.Label>레이블</Radio.Label>
            <Radio.Helper>헬퍼 텍스트</Radio.Helper>
          </Radio.Item>
        ))}
      </FlexColumn>
    </FlexColumn>
  ),
};

export const RadioItemDisabled: Story = {
  render: () => (
    <FlexColumn>
      <Radio.Item variant='hollow' disabled>
        <Radio.Basic value='item' />
        <Radio.Label>레이블</Radio.Label>
      </Radio.Item>
      <Radio.Item variant='outlined' disabled>
        <Radio.Basic value='item' />
        <Radio.Label>레이블</Radio.Label>
        <Radio.Helper>헬퍼 텍스트</Radio.Helper>
      </Radio.Item>
    </FlexColumn>
  ),
};

export const RadioGroupUncontrolled: Story = {
  render: () => (
    <FlexColumn>
      <Radio.Root defaultValue='2' name='groupUncontrolled'>
        <Radio.Item>
          <Radio.Basic value='1' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Item>
        <Radio.Item>
          <Radio.Basic value='2' />
          <Radio.Label>레이블 (기본 선택)</Radio.Label>
        </Radio.Item>
        <Radio.Item>
          <Radio.Basic value='3' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Item>
      </Radio.Root>
    </FlexColumn>
  ),
};

export const RadioGroupControlled: Story = {
  render: () => {
    const ControlledGroup = () => {
      const [selected, setSelected] = useState("1");

      return (
        <FlexColumn>
          <span>선택: {selected}</span>
          <Radio.Root value={selected} onChange={setSelected} name='groupControlled'>
            <Radio.Item>
              <Radio.Basic value='1' />
              <Radio.Label>레이블</Radio.Label>
            </Radio.Item>
            <Radio.Item>
              <Radio.Basic value='2' />
              <Radio.Label>레이블</Radio.Label>
            </Radio.Item>
            <Radio.Item>
              <Radio.Basic value='3' />
              <Radio.Label>레이블</Radio.Label>
            </Radio.Item>
          </Radio.Root>
        </FlexColumn>
      );
    };

    return <ControlledGroup />;
  },
};

export const RadioGroupDisabled: Story = {
  render: () => (
    <FlexRow>
      <Radio.Root disabled defaultValue='2' name='groupDisabled'>
        <Radio.Item>
          <Radio.Basic value='1' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Item>
        <Radio.Item>
          <Radio.Basic value='2' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Item>
      </Radio.Root>
    </FlexRow>
  ),
};

export const RadioComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn>
      <FlexColumn>
        {(["lg", "md", "sm", "xs"] as const).map(size => (
          <FlexRow key={size}>
            <Radio.Basic value='unchecked' size={size} checked={false} onChange={() => {}} />
            <Radio.Basic value='checked' size={size} checked={true} onChange={() => {}} />
            <Radio.Basic
              value='unchecked'
              size={size}
              checked={false}
              disabled
              onChange={() => {}}
            />
            <Radio.Basic
              value='checked'
              size={size}
              checked={true}
              disabled
              onChange={() => {}}
            />
          </FlexRow>
        ))}
      </FlexColumn>
      <FlexColumn>
        {(["hollow", "outlined"] as const).map(variant => (
          <FlexColumn key={variant}>
            <Radio.Item variant={variant}>
              <Radio.Basic value='item' defaultChecked />
              <Radio.Label>레이블</Radio.Label>
              <Radio.Helper>헬퍼 텍스트</Radio.Helper>
            </Radio.Item>
            <Radio.Item variant={variant} disabled>
              <Radio.Basic value='item' />
              <Radio.Label>레이블</Radio.Label>
              <Radio.Helper>헬퍼 텍스트</Radio.Helper>
            </Radio.Item>
          </FlexColumn>
        ))}
      </FlexColumn>
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
