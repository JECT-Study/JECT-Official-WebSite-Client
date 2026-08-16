import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { vars } from "tokens";

import { SelectField } from "./SelectField";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";
import type { SelectOption } from "../Listbox";

const REGIONS: SelectOption[] = [
  { value: "seoul", label: "서울특별시" },
  { value: "jeonnam-gwangju", label: "전남광주통합특별시" },
  { value: "busan", label: "부산광역시" },
  { value: "daegu", label: "대구광역시" },
  { value: "incheon", label: "인천광역시" },
  { value: "daejeon", label: "대전광역시" },
  { value: "ulsan", label: "울산광역시" },
  { value: "sejong", label: "세종특별자치시" },
  { value: "gyeonggi", label: "경기도" },
  { value: "gangwon", label: "강원특별자치도" },
  { value: "chungbuk", label: "충청북도" },
  { value: "chungnam", label: "충청남도" },
  { value: "jeonbuk", label: "전북특별자치도" },
  { value: "gyeongbuk", label: "경상북도" },
  { value: "gyeongnam", label: "경상남도" },
  { value: "jeju", label: "제주특별자치도" },
];

const options = REGIONS.slice(0, 4);

const FIELD_WIDTH = { width: "16rem" };

const meta = {
  title: "Components/SelectField",
  component: SelectField,
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
      description: "필수 입력 여부 (레이블 옆 * 표시)",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 트리거 너비는 선택된 값의 길이에 따라 달라지므로 루트에 `style`이나 `className`으로 지정합니다.
 */
export const Playground: Story = {
  args: {
    status: "default",
    disabled: false,
    readonly: false,
    required: false,
  },
  render: args => (
    <SelectField {...args} style={FIELD_WIDTH}>
      <SelectField.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </SelectField.Label>
      <SelectField.Trigger options={options} defaultValue='seoul' placeholder='플레이스홀더' />
      <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
    </SelectField>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px'>
      {(["default", "success", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px'>
          <Label>{status}</Label>
          <SelectField status={status} style={FIELD_WIDTH}>
            <SelectField.Label>레이블</SelectField.Label>
            <SelectField.Trigger
              options={options}
              defaultValue='seoul'
              placeholder='플레이스홀더'
            />
            <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
          </SelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly` 상태에서는 모두 목록을 열 수 없지만, 포커스 동작에 차이가 있습니다.
 * - `disabled`: 배경과 테두리가 흐려지고 포커스도 받지 않습니다.
 * - `readonly`: 포커스를 받을 수 있지만 클릭이나 키보드로 열리지 않습니다.
 * - `required`: 레이블 옆에 별표가 표시됩니다.
 */
export const States: Story = {
  render: () => (
    <FlexRow gap='32px'>
      <FlexColumn gap='16px'>
        <Label>disabled</Label>
        <SelectField disabled style={FIELD_WIDTH}>
          <SelectField.Label>레이블</SelectField.Label>
          <SelectField.Trigger options={options} defaultValue='seoul' placeholder='플레이스홀더' />
          <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
        </SelectField>
      </FlexColumn>
      <FlexColumn gap='16px'>
        <Label>readonly</Label>
        <SelectField readonly style={FIELD_WIDTH}>
          <SelectField.Label>레이블</SelectField.Label>
          <SelectField.Trigger options={options} defaultValue='seoul' placeholder='플레이스홀더' />
          <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
        </SelectField>
      </FlexColumn>
      <FlexColumn gap='16px'>
        <Label>required</Label>
        <SelectField required style={FIELD_WIDTH}>
          <SelectField.Label>레이블</SelectField.Label>
          <SelectField.Trigger options={options} defaultValue='seoul' placeholder='플레이스홀더' />
          <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
        </SelectField>
      </FlexColumn>
    </FlexRow>
  ),
};

/**
 * 값이 없으면 placeholder를 표시하고, 값이 있으면 선택된 옵션의 `label`을 표시합니다.
 */
export const Values: Story = {
  render: () => (
    <FlexRow gap='32px'>
      <FlexColumn gap='16px'>
        <Label>placeholder</Label>
        <SelectField style={FIELD_WIDTH}>
          <SelectField.Label>레이블</SelectField.Label>
          <SelectField.Trigger options={options} placeholder='플레이스홀더' />
        </SelectField>
      </FlexColumn>
      <FlexColumn gap='16px'>
        <Label>selected</Label>
        <SelectField style={FIELD_WIDTH}>
          <SelectField.Label>레이블</SelectField.Label>
          <SelectField.Trigger options={options} defaultValue='seoul' placeholder='플레이스홀더' />
        </SelectField>
      </FlexColumn>
    </FlexRow>
  ),
};

/**
 * `suffix`는 값과 화살표 사이에 놓입니다. 트리거 버튼 안에 있기 때문에 이 영역을 클릭해도 목록이 열립니다.
 *
 * 같은 이유로 버튼이나 링크는 전달하면 안 됩니다. 버튼 안에 버튼이 중첩되어 마크업이 깨지고
 * 콤보박스의 접근 이름도 함께 오염됩니다. 배지, 아이콘, 단축키 표시처럼 읽기 전용 콘텐츠만 사용합니다.
 */
export const WithSuffix: Story = {
  render: () => (
    <SelectField style={FIELD_WIDTH}>
      <SelectField.Label>레이블</SelectField.Label>
      <SelectField.Trigger
        options={options}
        defaultValue='seoul'
        placeholder='플레이스홀더'
        suffix={
          <Kbd type='function' size='sm'>
            ⌘
          </Kbd>
        }
      />
      <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
    </SelectField>
  ),
};

/**
 * 팝업 높이는 트리거 아래(또는 위)의 남은 화면 공간만큼으로 제한됩니다.
 * 목록이 그보다 길면 열리는 시점에 선택된 옵션이 보이도록 스크롤 위치가 조정됩니다.
 */
export const ScrollToSelected: Story = {
  render: () => (
    <SelectField style={FIELD_WIDTH}>
      <SelectField.Label>레이블</SelectField.Label>
      <SelectField.Trigger options={REGIONS} defaultValue='jeju' placeholder='플레이스홀더' />
    </SelectField>
  ),
};
