import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";
import { vars } from "tokens";

import { SelectField } from "./SelectField";
import { ContentBadge } from "../Badge";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";
import type { SelectOption } from "../Listbox";

import { getLabelClassName } from "@/utils/typography";

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
            name='information-line'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </SelectField.Label>
      <SelectField.Input options={options} defaultValue='seoul' placeholder='플레이스홀더' />
      <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
    </SelectField>
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
          <SelectField status={status} style={FIELD_WIDTH}>
            <SelectField.Label>레이블</SelectField.Label>
            <SelectField.Input options={options} defaultValue='seoul' placeholder='플레이스홀더' />
            <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
          </SelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 목록을 열 수 없습니다. `disabled`는 포커스도 받지 않고 `readonly`는 포커스만 받습니다.
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
          <SelectField {...props} style={FIELD_WIDTH}>
            <SelectField.Label>레이블</SelectField.Label>
            <SelectField.Input options={options} defaultValue='seoul' placeholder='플레이스홀더' />
            <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
          </SelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * 값이 없으면 placeholder를 표시하고, 값이 있으면 선택된 옵션의 `label`을 표시합니다.
 */
export const Values: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["placeholder", undefined],
          ["selected", "seoul"],
        ] as const
      ).map(([name, defaultValue]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <SelectField style={FIELD_WIDTH}>
            <SelectField.Label>레이블</SelectField.Label>
            <SelectField.Input
              options={options}
              defaultValue={defaultValue}
              placeholder='플레이스홀더'
            />
          </SelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `searchable`을 켜면 검색어로 항목을 찾을 수 있습니다.
 * 목록이 닫히거나 포커스가 제거되면 선택한 옵션의 `label`로 돌아갑니다.
 */
export const Searchable: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {([true, false] as const).map(searchable => (
        <FlexColumn key={String(searchable)} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{String(searchable)}</Label>
          <SelectField style={FIELD_WIDTH}>
            <SelectField.Label>레이블</SelectField.Label>
            <SelectField.Input
              options={options}
              searchable={searchable}
              defaultValue='seoul'
              placeholder='플레이스홀더'
            />
          </SelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `suffix`는 입력과 화살표 사이에 형제로 배치되므로 배지나 단축키 표시 같은 읽기 전용 요소만 사용합니다.
 */
export const WithSuffix: Story = {
  render: () => (
    <SelectField style={FIELD_WIDTH}>
      <SelectField.Label>레이블</SelectField.Label>
      <SelectField.Input
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
 * 옵션 별로 캡션과 부가 요소, 비활성 여부를 함께 지정할 수 있습니다.
 */
export const OptionExpression: Story = {
  render: () => {
    const expressive: SelectOption[] = options.map(option => {
      if (option.value === "busan") return { ...option, disabled: true };
      return {
        ...option,
        caption: "캡션",
        suffix: (
          <ContentBadge hierarchy='tertiary' size='xs' badgeStyle='outlined'>
            레이블
          </ContentBadge>
        ),
      };
    });

    return (
      <SelectField style={FIELD_WIDTH}>
        <SelectField.Label>레이블</SelectField.Label>
        <SelectField.Input options={expressive} defaultValue='seoul' placeholder='플레이스홀더' />
        <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
      </SelectField>
    );
  },
};

/**
 * 팝업 높이는 입력 요소 아래(또는 위)의 남은 화면 공간만큼으로 제한됩니다.
 * 목록이 그보다 길면 열리는 시점에 선택된 옵션이 보이도록 스크롤 위치가 조정됩니다.
 */
export const ScrollToSelected: Story = {
  render: () => (
    <SelectField style={FIELD_WIDTH}>
      <SelectField.Label>레이블</SelectField.Label>
      <SelectField.Input options={REGIONS} defaultValue='jeju' placeholder='플레이스홀더' />
    </SelectField>
  ),
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const entry = new FormData(e.currentTarget).get("region");
        setSubmitted(typeof entry === "string" ? entry : null);
      }}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <SelectField style={FIELD_WIDTH}>
          <SelectField.Label>레이블</SelectField.Label>
          <SelectField.Input
            options={options}
            name='region'
            defaultValue='seoul'
            placeholder='플레이스홀더'
          />
        </SelectField>
        <BlockButton type='submit' style={{ width: "100%" }}>
          제출
        </BlockButton>
        <output className={getLabelClassName()} style={{ ...FIELD_WIDTH, display: "block" }}>
          {submitted == null || submitted === "" ? "미제출" : `전송된 데이터: ${submitted}`}
        </output>
      </FlexColumn>
    </form>
  );
};

/**
 * `name`을 지정하면 선택한 값이 hidden input으로 렌더되어 폼 제출에 포함됩니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};
