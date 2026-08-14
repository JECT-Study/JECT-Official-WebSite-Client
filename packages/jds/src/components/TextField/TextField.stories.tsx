import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
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
    fieldStyle: {
      control: "inline-radio",
      options: ["outline", "hollow"],
      description: "필드 스타일 (outline: 테두리+인터랙션 레이어, hollow: 민무늬)",
      table: { defaultValue: { summary: "outline" } },
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
 * 컨트롤 패널에서 fieldStyle / status / disabled / readonly / required 를 바꿔가며
 * 직접 타이핑·hover·focus 해볼 수 있는 인터랙티브 예시입니다.
 *
 * TextField.Label 의 `suffixSlot` 으로 라벨(+required 별표) 오른쪽에
 * 도움말 아이콘 등 부가 요소를 배치할 수 있습니다.
 */
export const Playground: Story = {
  args: {
    fieldStyle: "outline",
    status: "default",
    disabled: false,
    readonly: false,
    required: false,
  },
  render: args => (
    <TextField {...args}>
      <TextField.Label
        suffixSlot={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        이메일
      </TextField.Label>
      <TextField.Content>
        <TextField.Input placeholder='이메일을 입력하세요' />
      </TextField.Content>
      <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
    </TextField>
  ),
};

/**
 * 필드 스타일 비교.
 * - `outline`: 테두리 + 배경 + 인터랙션 레이어(hover/press 틴트) + focus ring
 * - `hollow`: 테두리/배경/인터랙션 없이 입력만 노출
 */
export const Styles: Story = {
  render: () => (
    <FlexRow gap='32px'>
      <FlexColumn gap='8px'>
        <Label>outline</Label>
        <TextField fieldStyle='outline'>
          <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
          <TextField.Content>
            <TextField.Input placeholder='이메일을 입력하세요' />
          </TextField.Content>
          <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
        </TextField>
      </FlexColumn>

      <FlexColumn gap='8px'>
        <Label>hollow</Label>
        <TextField fieldStyle='hollow'>
          <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
          <TextField.Content>
            <TextField.Input placeholder='이메일을 입력하세요' />
          </TextField.Content>
          <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
        </TextField>
      </FlexColumn>
    </FlexRow>
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
        <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
        <TextField.Content>
          <TextField.Input placeholder='이메일을 입력하세요' />
        </TextField.Content>
        <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
      </TextField>
      <TextField status='success'>
        <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
        <TextField.Content>
          <TextField.Input placeholder='이메일을 입력하세요' defaultValue='user@example.com' />
        </TextField.Content>
        <TextField.HelperText>올바른 이메일 형식입니다</TextField.HelperText>
      </TextField>
      <TextField status='error'>
        <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
        <TextField.Content>
          <TextField.Input placeholder='이메일을 입력하세요' defaultValue='invalid-email' />
        </TextField.Content>
        <TextField.HelperText>유효하지 않은 이메일 형식입니다</TextField.HelperText>
      </TextField>
    </FlexColumn>
  ),
};

/**
 * 상호작용 상태.
 * - `disabled`: 비활성화(배경/보더 dim, 입력 불가)
 * - `readonly`: 읽기 전용
 * - `required`: 필수(라벨 옆 * 표시). suffixSlot 아이콘은 별표 오른쪽에 옵니다.
 */
export const States: Story = {
  render: () => (
    <FlexColumn gap='24px'>
      <TextField disabled>
        <TextField.Label
          suffixSlot={
            <Icon name='info' size='2xs' style={{ color: vars.color.semantic.object.subtle }} />
          }
        >
          Disabled
        </TextField.Label>
        <TextField.Content>
          <TextField.Input placeholder='비활성화된 입력 필드' />
        </TextField.Content>
        <TextField.HelperText>이 필드는 비활성화되어 있습니다</TextField.HelperText>
      </TextField>
      <TextField readonly>
        <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>Read Only</TextField.Label>
        <TextField.Content>
          <TextField.Input placeholder='이메일을 입력하세요' defaultValue='홍길동' />
        </TextField.Content>
        <TextField.HelperText>이 필드는 읽기 전용 상태입니다</TextField.HelperText>
      </TextField>
      <TextField required>
        <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>Required</TextField.Label>
        <TextField.Content>
          <TextField.Input placeholder='필수 입력 항목입니다' />
        </TextField.Content>
        <TextField.HelperText>필수로 입력해야 하는 필드입니다</TextField.HelperText>
      </TextField>
    </FlexColumn>
  ),
};

/**
 * TextField.Content 는 입력 좌우에 아이콘·버튼 등 부가 요소를 함께 배치할 수 있습니다.
 */
export const WithAddon: Story = {
  render: () => (
    <TextField>
      <TextField.Label suffixSlot={<Icon name='info' size='2xs' />}>이메일</TextField.Label>
      <TextField.Content>
        <Icon name='circle-user-round' size='sm' />
        <TextField.Input placeholder='이메일을 입력하세요' />
        <Icon name='close-line' size='sm' />
      </TextField.Content>
      <TextField.HelperText>유효한 이메일 주소를 입력해주세요</TextField.HelperText>
    </TextField>
  ),
};
