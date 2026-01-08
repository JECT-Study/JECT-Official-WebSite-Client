import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { Radio } from "./Radio";
import type { RadioSize } from "./radio.types";

const meta: Meta<typeof Radio.Basic> = {
  title: "Components/Radio",
  component: Radio.Basic,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    radioSize: {
      control: { type: "radio" },
      options: ["lg", "md", "sm", "xs"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio.Basic>;

export const RadioBasicDefault: Story = {
  args: {
    radioSize: "lg",
  },
};

export const RadioBasicChecked: Story = {
  render: () => <Radio.Basic radioSize='md' name='disabledGroup' value='1' checked={true} />,
};

export const RadioBasicDisabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <Radio.Basic radioSize='md' name='disabledGroup' value='2' checked={false} disabled={true} />
      <Radio.Basic radioSize='md' name='disabledGroup' value='1' checked={true} disabled={true} />
    </div>
  ),
};

export const RadioBasicSizes: Story = {
  render: () => {
    const [checkedSize, setCheckedSize] = useState<RadioSize | undefined>("md");

    const sizes: RadioSize[] = ["lg", "md", "sm", "xs"];

    return (
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {sizes.map(radioSize => (
          <Radio.Basic
            key={radioSize}
            radioSize={radioSize}
            name='sizeGroup'
            value={radioSize}
            checked={checkedSize === radioSize}
            onChange={() => setCheckedSize(radioSize)}
          />
        ))}
      </div>
    );
  },
};

export const RadioContentEmpty: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow style={{ alignItems: "flex-start" }}>
        <Radio.Root radioSize='md'>
          <Radio.Basic value='1' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Root>
        <Radio.Root radioSize='md'>
          <Radio.Basic value='2' />
          <Radio.Label>레이블</Radio.Label>
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
        <Radio.Root radioSize='md'>
          <Radio.Basic value='3' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Root>
        <Radio.Root radioSize='md'>
          <Radio.Basic value='4' />
          <Radio.Label>레이블</Radio.Label>
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
      </FlexRow>
      <FlexRow style={{ alignItems: "flex-start" }}>
        <Radio.Root radioSize='md'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='1' />
        </Radio.Root>
        <Radio.Root radioSize='md' align='right'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='2' />
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
        <Radio.Root radioSize='md'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='3' />
        </Radio.Root>
        <Radio.Root radioSize='md' align='right'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='4' />
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
      </FlexRow>
    </FlexColumn>
  ),
};

export const RadioContentOutline: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Radio.Root radioSize='md' radioStyle='outline'>
          <Radio.Basic value='1' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Root>
        <Radio.Root radioSize='md' radioStyle='outline'>
          <Radio.Basic value='2' />
          <Radio.Label>레이블</Radio.Label>
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
        <Radio.Root radioSize='md' radioStyle='outline'>
          <Radio.Basic value='3' />
          <Radio.Label>레이블</Radio.Label>
        </Radio.Root>
        <Radio.Root radioSize='md' radioStyle='outline'>
          <Radio.Basic value='4' />
          <Radio.Label>레이블</Radio.Label>
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
      </FlexRow>
      <FlexRow>
        <Radio.Root radioSize='md' radioStyle='outline'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='1' />
        </Radio.Root>
        <Radio.Root radioSize='md' radioStyle='outline' align='right'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='2' />
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
        <Radio.Root radioSize='md' radioStyle='outline'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='3' />
        </Radio.Root>
        <Radio.Root radioSize='md' radioStyle='outline' align='right'>
          <Radio.Label>레이블</Radio.Label>
          <Radio.Basic value='4' />
          <Radio.SubLabel>레이블</Radio.SubLabel>
        </Radio.Root>
      </FlexRow>
    </FlexColumn>
  ),
};
