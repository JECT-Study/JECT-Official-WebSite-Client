import type { Meta, StoryObj } from "@storybook/react-vite";
import { FIELD_PLAYGROUND_ARGS, FIELD_WIDTH, fieldArgTypes } from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useEffect, useState } from "react";

import { TextField } from "./TextField";
import { BlockButton } from "../Button/BlockButton";
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
      <TextField.Label suffix={<Icon name='info' size='2xs' />}>레이블</TextField.Label>
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

const TIMER_SECONDS = 180;

/**
 * `TextField.Timer`는 소비처가 넘긴 남은 시간(초)을 Counter 자리에 `m:ss` 형식으로 표시합니다.
 * 카운트다운 진행과 만료 처리는 소비처가 담당하며, `TextField.Counter`와 함께 배치하지 않습니다.
 */
export const WithTimer: Story = {
  render: function Render() {
    const [seconds, setSeconds] = useState(TIMER_SECONDS);
    const [isRunning, setIsRunning] = useState(false);

    const isActive = isRunning && seconds > 0;
    const isExpired = isRunning && seconds <= 0;

    useEffect(() => {
      if (!isActive) return;

      const timer = setTimeout(() => setSeconds(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }, [seconds, isActive]);

    const handleStart = () => {
      setSeconds(TIMER_SECONDS);
      setIsRunning(true);
    };

    return (
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <TextField status={isExpired ? "error" : "default"} style={FIELD_WIDTH}>
          <TextField.Label>인증번호</TextField.Label>
          <TextField.Input placeholder='인증번호 6자리를 입력해주세요' />
          <TextField.Footer>
            <TextField.Helper>
              {isExpired ? "유효 시간이 만료되었습니다" : "인증번호를 입력해주세요"}
            </TextField.Helper>
            <TextField.Timer seconds={seconds} />
          </TextField.Footer>
        </TextField>
        <BlockButton disabled={isActive} onClick={handleStart} style={{ width: "100%" }}>
          타이머 시작
        </BlockButton>
      </FlexColumn>
    );
  },
};
