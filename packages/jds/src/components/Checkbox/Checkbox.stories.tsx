import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import type { ComponentProps } from "react";

import { Checkbox } from "./Checkbox";
import { CHECKBOX_SIZE_OPTIONS } from "./checkbox.types";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

const GROUP_GAP = "12px";
const SECTION_GAP = "32px";
const CONTAINER_WIDTH = "280px";

const ItemColumn = ({ style, ...props }: ComponentProps<typeof FlexColumn>) => (
  <FlexColumn style={{ alignItems: "flex-start", ...style }} {...props} />
);

export const Sizes: Story = {
  render: () => (
    <FlexRow>
      {CHECKBOX_SIZE_OPTIONS.map(size => (
        <Checkbox key={size} size={size} />
      ))}
    </FlexRow>
  ),
};

export const States: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Checkbox checked={false} onCheckedChange={() => {}} />
        <Checkbox checked={true} onCheckedChange={() => {}} />
        <Checkbox checked='indeterminate' onCheckedChange={() => {}} />
        <Checkbox checked={false} isInvalid onCheckedChange={() => {}} />
      </FlexRow>
      <FlexRow>
        <Checkbox checked={false} disabled onCheckedChange={() => {}} />
        <Checkbox checked={true} disabled onCheckedChange={() => {}} />
        <Checkbox checked='indeterminate' disabled onCheckedChange={() => {}} />
        <Checkbox checked={false} isInvalid disabled onCheckedChange={() => {}} />
      </FlexRow>
    </FlexColumn>
  ),
};

export const Variants: Story = {
  render: () => (
    <ItemColumn gap={SECTION_GAP}>
      <ItemColumn gap={GROUP_GAP}>
        {CHECKBOX_SIZE_OPTIONS.map(size => (
          <Checkbox key={size} size={size} variant='hollow' label={size} />
        ))}
      </ItemColumn>
      <ItemColumn gap={GROUP_GAP}>
        {CHECKBOX_SIZE_OPTIONS.map(size => (
          <Checkbox key={size} size={size} variant='outlined' label={size} helper='헬퍼 텍스트' />
        ))}
      </ItemColumn>
    </ItemColumn>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ItemColumn gap={GROUP_GAP}>
      <Checkbox variant='hollow' disabled label='레이블' />
      <Checkbox variant='outlined' disabled label='레이블' helper='헬퍼 텍스트' />
    </ItemColumn>
  ),
};

export const Invalid: Story = {
  render: () => (
    <ItemColumn gap={GROUP_GAP}>
      <Checkbox variant='hollow' isInvalid label='레이블' />
      <Checkbox variant='outlined' isInvalid label='레이블' helper='헬퍼 텍스트' />
      <Checkbox variant='outlined' isInvalid disabled label='레이블' helper='헬퍼 텍스트' />
      <Checkbox variant='outlined' isInvalid defaultChecked label='레이블' helper='헬퍼 텍스트' />
    </ItemColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "invalid는 체크되지 않은 상태에 대한 유효성 검사이므로 `checked = false`일 때만 적용됩니다. checked 항목은 `isInvalid`를 전달하더라도 invalid 스타일이 표시되지 않습니다.",
      },
    },
  },
};

export const Stretched: Story = {
  render: () => (
    <ItemColumn gap={GROUP_GAP} style={{ width: CONTAINER_WIDTH }}>
      <Checkbox variant='hollow' stretched label='레이블' />
      <Checkbox variant='outlined' stretched label='레이블' helper='헬퍼 텍스트' />
    </ItemColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "`stretched`를 지정하면 아이템이 부모 컨테이너 너비를 가득 채웁니다.",
      },
    },
  },
};
