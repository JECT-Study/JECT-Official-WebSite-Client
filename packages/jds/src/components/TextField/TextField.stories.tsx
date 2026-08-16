import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn } from "@storybook-utils/layout";
import { vars } from "tokens";

import { TextField } from "./TextField";
import { Icon } from "../Icon";

const meta = {
  title: "Components/TextField",
  component: TextField,
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
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 컨트롤 패널에서 status / disabled / readonly / required 를 바꿔가며
 * 직접 타이핑·hover·focus 해볼 수 있는 인터랙티브 예시입니다.
 *
 * TextField.Label 의 `suffix` 으로 라벨(+required 별표) 오른쪽에
 * 도움말 아이콘 등 부가 요소를 배치할 수 있습니다.
 */
export const Playground: Story = {
  args: {
    status: "default",
    disabled: false,
    readonly: false,
    required: false,
  },
  render: args => (
    <TextField {...args}>
      <TextField.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        이메일
      </TextField.Label>
      <TextField.Input placeholder='이메일을 입력하세요' />
      <TextField.Helper>유효한 이메일 주소를 입력해주세요</TextField.Helper>
    </TextField>
  ),
};

/**
 * `status` 에 따라 border·focus ring·헬퍼텍스트 색상이 함께 바뀝니다.
 * - `default`: 기본 / `success`: 성공(초록) / `error`: 에러(빨강)
 */
export const Statuses: Story = {
  render: () => (
    <FlexColumn gap='24px'>
      <TextField status='default'>
        <TextField.Label suffix={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
        <TextField.Input placeholder='이메일을 입력하세요' />
        <TextField.Helper>유효한 이메일 주소를 입력해주세요</TextField.Helper>
      </TextField>
      <TextField status='success'>
        <TextField.Label suffix={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
        <TextField.Input placeholder='이메일을 입력하세요' defaultValue='user@example.com' />
        <TextField.Helper>올바른 이메일 형식입니다</TextField.Helper>
      </TextField>
      <TextField status='error'>
        <TextField.Label suffix={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
        <TextField.Input placeholder='이메일을 입력하세요' defaultValue='invalid-email' />
        <TextField.Helper>유효하지 않은 이메일 형식입니다</TextField.Helper>
      </TextField>
    </FlexColumn>
  ),
};

/**
 * 상호작용 상태.
 * - `disabled`: 비활성화(배경/보더 dim, 입력 불가)
 * - `readonly`: 읽기 전용
 * - `required`: 필수(라벨 옆 * 표시). suffix 아이콘은 별표 오른쪽에 옵니다.
 */
export const States: Story = {
  render: () => (
    <FlexColumn gap='24px'>
      <TextField disabled>
        <TextField.Label
          suffix={
            <Icon name='info' size='2xs' style={{ color: vars.color.semantic.object.subtle }} />
          }
        >
          Disabled
        </TextField.Label>
        <TextField.Input placeholder='비활성화된 입력 필드' />
        <TextField.Helper>이 필드는 비활성화되어 있습니다</TextField.Helper>
      </TextField>
      <TextField readonly>
        <TextField.Label suffix={<Icon name='info' size='2xs' />}>Read Only</TextField.Label>
        <TextField.Input placeholder='이메일을 입력하세요' defaultValue='홍길동' />
        <TextField.Helper>이 필드는 읽기 전용 상태입니다</TextField.Helper>
      </TextField>
      <TextField required>
        <TextField.Label suffix={<Icon name='info' size='2xs' />}>Required</TextField.Label>
        <TextField.Input placeholder='필수 입력 항목입니다' />
        <TextField.Helper>필수로 입력해야 하는 필드입니다</TextField.Helper>
      </TextField>
    </FlexColumn>
  ),
};

/**
 * `TextField.Input`의 `prefix` / `suffix`로 컨트롤 좌우에 아이콘, 버튼 등 부가 요소를 배치할 수 있습니다.
 */
export const WithAddon: Story = {
  render: () => (
    <TextField>
      <TextField.Label suffix={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
      <TextField.Input
        prefix={<Icon name='circle-user-round' size='sm' />}
        suffix={<Icon name='x' size='sm' />}
        placeholder='이메일을 입력하세요'
      />
      <TextField.Helper>유효한 이메일 주소를 입력해주세요</TextField.Helper>
    </TextField>
  ),
};
