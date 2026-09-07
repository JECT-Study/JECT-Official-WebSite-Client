import type { Meta, StoryObj } from "@storybook/react-vite";
import { FIELD_PLAYGROUND_ARGS, FIELD_WIDTH, fieldArgTypes } from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { vars } from "tokens";

import { TextField } from "./TextField";
import { Icon } from "../Icon";

/**
 * 한 줄 텍스트를 입력하는 필드입니다. 여러 줄을 입력하려면 `Textarea`를 사용합니다.
 */
const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: fieldArgTypes,
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <TextField {...args} style={FIELD_WIDTH}>
      <TextField.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </TextField.Label>
      <TextField.Input placeholder='플레이스홀더' />
      <TextField.Helper>헬퍼 텍스트</TextField.Helper>
    </TextField>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "success", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <TextField status={status} style={FIELD_WIDTH}>
            <TextField.Label>레이블</TextField.Label>
            <TextField.Input defaultValue='입력 값' placeholder='플레이스홀더' />
            <TextField.Helper>헬퍼 텍스트</TextField.Helper>
          </TextField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 값을 입력할 수 없습니다.
 * `disabled`는 포커스를 받을 수 없으며, `readonly`는 포커스를 받을 수 있습니다.
 */
export const States: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["disabled", { disabled: true }],
          ["readonly", { readonly: true }],
          ["required", { required: true }],
        ] as const
      ).map(([name, props]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <TextField {...props} style={FIELD_WIDTH}>
            <TextField.Label>레이블</TextField.Label>
            <TextField.Input defaultValue='입력 값' placeholder='플레이스홀더' />
            <TextField.Helper>헬퍼 텍스트</TextField.Helper>
          </TextField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `prefix`와 `suffix`로 입력 좌우에 부가 요소를 배치합니다.
 */
export const WithAddon: Story = {
  render: () => (
    <TextField style={FIELD_WIDTH}>
      <TextField.Label>레이블</TextField.Label>
      <TextField.Input
        prefix={<Icon name='circle-user-round' size='sm' />}
        suffix={<Icon name='x' size='sm' />}
        placeholder='플레이스홀더'
      />
      <TextField.Helper>헬퍼 텍스트</TextField.Helper>
    </TextField>
  ),
};

/**
 * `maxLength`를 지정하면 `TextField.Counter`에 현재 글자 수와 최대 글자 수를 함께 표시합니다.
 */
export const WithCounter: Story = {
  render: () => (
    <TextField style={FIELD_WIDTH}>
      <TextField.Label>레이블</TextField.Label>
      <TextField.Input maxLength={20} defaultValue='입력 값' placeholder='플레이스홀더' />
      <TextField.Footer>
        <TextField.Helper>헬퍼 텍스트</TextField.Helper>
        <TextField.Counter />
      </TextField.Footer>
    </TextField>
  ),
};
