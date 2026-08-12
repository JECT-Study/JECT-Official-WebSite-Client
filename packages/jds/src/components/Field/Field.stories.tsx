import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn } from "@storybook-utils/layout";
import { type ComponentPropsWithoutRef } from "react";

import { Field } from "./Field";
import { useFieldContext } from "./Field.context";
import { Icon } from "../Icon";

const meta = {
  title: "Components/Internal/Field",
  component: Field,
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
      description: "필수 입력 여부 (라벨 옆 * 표시 및 하위 컨트롤 연결용 context 제공)",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Field.Content 안에 들어가는 데모용 input.
 * 테두리/배경/포커스는 Field.Content 가 담당하므로 여기서는 투명한 input 으로 두고,
 * uncontrolled(defaultValue)로 만들어 실제 타이핑·포커스가 가능하게 한다.
 */
const DemoInput = (props: ComponentPropsWithoutRef<"input">) => {
  const {
    fieldId,
    helperId,
    hasHelper,
    disabled: isDisabled,
    readonly: isReadonly,
    required: isRequired,
  } = useFieldContext("DemoInput");

  return (
    <input
      id={fieldId}
      aria-describedby={hasHelper ? helperId : undefined}
      disabled={isDisabled}
      readOnly={isReadonly}
      required={isRequired}
      style={{
        flex: "1 0 0",
        minWidth: 0,
        padding: 0,
        border: "none",
        outline: "none",
        background: "transparent",
        font: "inherit",
        color: "inherit",
      }}
      {...props}
    />
  );
};

/** 라벨 + 입력 + 헬퍼텍스트로 구성한 기본 필드 (스토리 반복을 줄이기 위한 헬퍼) */
const SampleField = ({
  label = "이메일",
  helper = "유효한 이메일 주소를 입력해주세요",
  placeholder = "이메일을 입력하세요",
  defaultValue,
}: {
  label?: string;
  helper?: string;
  placeholder?: string;
  defaultValue?: string;
}) => (
  <>
    <Field.Label suffixSlot={<Icon name='information-line' size='2xs' />}>{label}</Field.Label>
    <Field.Content>
      <DemoInput placeholder={placeholder} defaultValue={defaultValue} />
    </Field.Content>
    <Field.Helper>{helper}</Field.Helper>
  </>
);

/**
 * 컨트롤 패널에서 status / disabled / readonly / required 를 바꿔가며
 * 직접 타이핑·hover·focus 해볼 수 있는 인터랙티브 예시입니다.
 */
export const Playground: Story = {
  args: {
    status: "default",
    disabled: false,
    readonly: false,
    required: false,
  },
  render: args => (
    <div style={{ width: "20rem" }}>
      <Field {...args}>
        <SampleField />
      </Field>
    </div>
  ),
};

/**
 * `status` 에 따라 border·focus ring·헬퍼텍스트 색상이 함께 바뀝니다.
 * - `default`: 기본 / `success`: 성공(초록) / `error`: 에러(빨강)
 */
export const Statuses: Story = {
  render: () => (
    <FlexColumn gap='24px' style={{ width: "20rem" }}>
      <Field status='default'>
        <SampleField />
      </Field>
      <Field status='success'>
        <SampleField helper='올바른 이메일 형식입니다' defaultValue='user@example.com' />
      </Field>
      <Field status='error'>
        <SampleField helper='유효하지 않은 이메일 형식입니다' defaultValue='invalid-email' />
      </Field>
    </FlexColumn>
  ),
};

/**
 * 상호작용 상태.
 * - `disabled`: 비활성화(배경/보더 dim, 입력 불가)
 * - `readonly`: 읽기 전용
 * - `required`: 필수(라벨 옆 * 표시)
 */
export const States: Story = {
  render: () => (
    <FlexColumn gap='24px' style={{ width: "20rem" }}>
      <Field disabled>
        <SampleField
          label='Disabled'
          helper='이 필드는 비활성화되어 있습니다'
          placeholder='비활성화된 입력 필드'
        />
      </Field>
      <Field readonly>
        <SampleField
          label='Read Only'
          helper='이 필드는 읽기 전용 상태입니다'
          defaultValue='홍길동'
        />
      </Field>
      <Field required>
        <SampleField
          label='Required'
          helper='필수로 입력해야 하는 필드입니다'
          placeholder='필수 입력 항목입니다'
        />
      </Field>
    </FlexColumn>
  ),
};

/**
 * Field.Content 는 입력 좌우에 아이콘·버튼 등 부가 요소를 함께 배치할 수 있습니다.
 */
export const WithAddon: Story = {
  render: () => (
    <div style={{ width: "20rem" }}>
      <Field>
        <Field.Label suffixSlot={<Icon name='information-line' size='2xs' />}>이메일</Field.Label>
        <Field.Content>
          <Icon name='account-circle-line' size='sm' />
          <DemoInput placeholder='이메일을 입력하세요' />
          <Icon name='close-line' size='sm' />
        </Field.Content>
        <Field.Helper>유효한 이메일 주소를 입력해주세요</Field.Helper>
      </Field>
    </div>
  ),
};

/**
 * Field.Content 는 hover/press overlay 와 focus ring 을 함께 표시합니다.
 */
export const Interaction: Story = {
  render: () => (
    <div style={{ width: "18rem" }}>
      <Field>
        <Field.Label>이메일</Field.Label>
        <Field.Content>
          <DemoInput placeholder='이메일을 입력하세요' />
        </Field.Content>
        <Field.Helper>hover/press 시 overlay 틴트와 focus ring이 표시됩니다</Field.Helper>
      </Field>
    </div>
  ),
};

/**
 * Field.Label 의 `prefixSlot` / `suffixSlot` 으로 라벨 앞뒤에 도움말 아이콘 등 부가 요소를 배치합니다.
 * 슬롯은 라벨·required 별표와 같은 labelContainer 행 안에 렌더되므로 별도 정렬 이슈가 없습니다.
 * required 별표는 라벨 오른쪽·suffixSlot 왼쪽에 위치합니다 (이메일 * ⓘ).
 */
export const LabelSlots: Story = {
  render: () => (
    <FlexColumn gap='24px'>
      <Field>
        <Field.Label suffixSlot={<Icon name='information-line' size='2xs' />}>이메일</Field.Label>
        <Field.Content>
          <DemoInput placeholder='이메일을 입력하세요' />
        </Field.Content>
        <Field.Helper>유효한 이메일 주소를 입력해주세요</Field.Helper>
      </Field>

      <Field required>
        <Field.Label suffixSlot={<Icon name='information-line' size='2xs' />}>이메일</Field.Label>
        <Field.Content>
          <DemoInput placeholder='이메일을 입력하세요' />
        </Field.Content>
        <Field.Helper>필수 입력 항목입니다</Field.Helper>
      </Field>
    </FlexColumn>
  ),
};
