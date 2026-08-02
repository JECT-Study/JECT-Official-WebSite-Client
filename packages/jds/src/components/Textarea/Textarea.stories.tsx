import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn } from "@storybook-utils/layout";
import { useState } from "react";
import { vars } from "tokens";

import { Textarea } from "./Textarea";
import { Icon } from "../Icon";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: {
    children: {
      control: false,
      table: { disable: true },
    },
    status: {
      control: "inline-radio",
      options: ["default", "success", "error"],
      description: "유효성/피드백 상태",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
      table: { defaultValue: { summary: "false" } },
    },
    readonly: {
      control: "boolean",
      description: "읽기 전용 상태",
      table: { defaultValue: { summary: "false" } },
    },
    required: {
      control: "boolean",
      description: "필수 입력 여부 (라벨 옆 * 표시)",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 컨트롤 패널에서 status / disabled / readonly / required 를 바꿔가며
 * 직접 입력·resize·focus 해볼 수 있는 인터랙티브 예시입니다.
 * Textarea.Control 에 `maxLength` 를 주면 박스 내부 우측 하단의 Counter 가 자동으로 글자 수를 표시합니다.
 */
export const Playground: Story = {
  args: {
    status: "default",
    disabled: false,
    readonly: false,
    required: false,
  },
  render: args => (
    <div style={{ width: "24rem" }}>
      <Textarea {...args}>
        <Textarea.Label
          suffixSlot={
            <Icon
              name='information-line'
              size='2xs'
              style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
            />
          }
        >
          자기소개
        </Textarea.Label>
        <Textarea.Content>
          <Textarea.Control maxLength={500} placeholder='내용을 입력하세요' />
          <Textarea.Counter />
        </Textarea.Content>
        <Textarea.HelperText>500자 이내로 입력해주세요</Textarea.HelperText>
      </Textarea>
    </div>
  ),
};

/**
 * `status` 에 따라 border·focus ring·헬퍼텍스트 색상이 함께 바뀝니다.
 * - `default`: 기본 / `success`: 성공(초록) / `error`: 에러(빨강)
 */
export const Statuses: Story = {
  render: () => (
    <FlexColumn gap='24px' style={{ width: "24rem" }}>
      <Textarea status='default'>
        <Textarea.Label>자기소개</Textarea.Label>
        <Textarea.Content>
          <Textarea.Control placeholder='내용을 입력하세요' />
        </Textarea.Content>
        <Textarea.HelperText>500자 이내로 입력해주세요</Textarea.HelperText>
      </Textarea>
      <Textarea status='success'>
        <Textarea.Label>자기소개</Textarea.Label>
        <Textarea.Content>
          <Textarea.Control defaultValue='안녕하세요, 잘 부탁드립니다.' />
        </Textarea.Content>
        <Textarea.HelperText>올바르게 입력되었습니다</Textarea.HelperText>
      </Textarea>
      <Textarea status='error'>
        <Textarea.Label>자기소개</Textarea.Label>
        <Textarea.Content>
          <Textarea.Control defaultValue='너무 짧습니다' />
        </Textarea.Content>
        <Textarea.HelperText>10자 이상 입력해주세요</Textarea.HelperText>
      </Textarea>
    </FlexColumn>
  ),
};

/**
 * 상호작용 상태.
 * - `disabled`: 비활성화(배경/보더 dim, 입력·resize 불가)
 * - `readonly`: 읽기 전용
 * - `required`: 필수(라벨 옆 * 표시)
 */
export const States: Story = {
  render: () => (
    <FlexColumn gap='24px' style={{ width: "24rem" }}>
      <Textarea disabled>
        <Textarea.Label>Disabled</Textarea.Label>
        <Textarea.Content>
          <Textarea.Control maxLength={100} defaultValue='비활성화된 내용입니다.' />
          <Textarea.Counter />
        </Textarea.Content>
        <Textarea.HelperText>이 필드는 비활성화되어 있습니다</Textarea.HelperText>
      </Textarea>
      <Textarea readonly>
        <Textarea.Label>Read Only</Textarea.Label>
        <Textarea.Content>
          <Textarea.Control defaultValue='읽기 전용 내용입니다.' />
        </Textarea.Content>
        <Textarea.HelperText>이 필드는 읽기 전용 상태입니다</Textarea.HelperText>
      </Textarea>
      <Textarea required>
        <Textarea.Label>Required</Textarea.Label>
        <Textarea.Content>
          <Textarea.Control placeholder='필수 입력 항목입니다' />
        </Textarea.Content>
        <Textarea.HelperText>필수로 입력해야 하는 필드입니다</Textarea.HelperText>
      </Textarea>
    </FlexColumn>
  ),
};

/**
 * `maxLength` 를 주면 박스 내부 우측 하단의 Counter 가 입력 길이에 따라 `현재/최대` 로 갱신됩니다.
 * controlled(value+onChange) / uncontrolled(defaultValue) 모두 자동 추적됩니다.
 */
export const WithCounter: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("첫 줄 내용");
      return (
        <Textarea>
          <Textarea.Label>controlled</Textarea.Label>
          <Textarea.Content>
            <Textarea.Control
              maxLength={100}
              value={value}
              onChange={event => setValue(event.target.value)}
              placeholder='내용을 입력하세요'
            />
            <Textarea.Counter />
          </Textarea.Content>
          <Textarea.HelperText>100자 이내로 입력해주세요</Textarea.HelperText>
        </Textarea>
      );
    };

    return (
      <FlexColumn gap='24px' style={{ width: "24rem" }}>
        <ControlledExample />
        <Textarea>
          <Textarea.Label>uncontrolled (헬퍼텍스트 없이 counter만)</Textarea.Label>
          <Textarea.Content>
            <Textarea.Control
              maxLength={50}
              defaultValue='기본값'
              placeholder='내용을 입력하세요'
            />
            <Textarea.Counter />
          </Textarea.Content>
        </Textarea>
      </FlexColumn>
    );
  },
};
