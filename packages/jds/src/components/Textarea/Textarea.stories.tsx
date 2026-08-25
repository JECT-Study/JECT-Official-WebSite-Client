import type { Meta, StoryObj } from "@storybook/react-vite";
import { FIELD_PLAYGROUND_ARGS, FIELD_WIDTH, fieldArgTypes } from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { vars } from "tokens";

import { Textarea } from "./Textarea";
import { Icon } from "../Icon";

/**
 * 여러 줄 텍스트를 입력하는 필드입니다. 오른쪽 아래 손잡이로 세로 방향 크기를 조절할 수 있습니다.
 */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: fieldArgTypes,
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <Textarea {...args} style={FIELD_WIDTH}>
      <Textarea.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </Textarea.Label>
      <Textarea.Control placeholder='플레이스홀더' />
      <Textarea.Footer>
        <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
      </Textarea.Footer>
    </Textarea>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트, 글자 수 표시 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "success", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <Textarea status={status} style={FIELD_WIDTH}>
            <Textarea.Label>레이블</Textarea.Label>
            <Textarea.Control defaultValue='입력 값' placeholder='플레이스홀더' />
            <Textarea.Footer>
              <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
            </Textarea.Footer>
          </Textarea>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 입력과 크기 조절을 할 수 없습니다.
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
          <Textarea {...props} style={FIELD_WIDTH}>
            <Textarea.Label>레이블</Textarea.Label>
            <Textarea.Control defaultValue='입력 값' placeholder='플레이스홀더' />
            <Textarea.Footer>
              <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
            </Textarea.Footer>
          </Textarea>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `maxLength`를 지정하면 `Textarea.Counter`에 현재 글자 수와 최대 글자 수를 함께 표시합니다.
 */
export const WithCounter: Story = {
  render: () => (
    <Textarea style={FIELD_WIDTH}>
      <Textarea.Label>레이블</Textarea.Label>
      <Textarea.Control maxLength={100} defaultValue='입력 값' placeholder='플레이스홀더' />
      <Textarea.Footer>
        <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
        <Textarea.Counter />
      </Textarea.Footer>
    </Textarea>
  ),
};
