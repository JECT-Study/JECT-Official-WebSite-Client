import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";
import { vars } from "tokens";

import { MultiSelectField } from "./MultiSelectField";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";

import { getLabelClassName } from "@/utils/typography";

const REGIONS = [
  "서울특별시",
  "전남광주통합특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전북특별자치도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

const options = REGIONS.slice(0, 4);

const FIELD_WIDTH = { width: "16rem" };

const meta = {
  title: "Components/MultiSelectField",
  component: MultiSelectField,
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
      description: "필드 스타일",
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
      description: "필수 입력 여부 (레이블 옆 * 표시)",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof MultiSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 선택한 값은 태그로 쌓이고, 입력 영역이 100px보다 좁아지면 다음 줄로 내려갑니다.
 */
export const Playground: Story = {
  args: {
    fieldStyle: "outline",
    status: "default",
    disabled: false,
    readonly: false,
    required: false,
    defaultValue: ["서울특별시"],
  },
  render: args => (
    <MultiSelectField {...args} style={FIELD_WIDTH}>
      <MultiSelectField.Label
        suffixSlot={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </MultiSelectField.Label>
      <MultiSelectField.Content>
        <MultiSelectField.Input options={options} placeholder='플레이스홀더' />
      </MultiSelectField.Content>
      <MultiSelectField.Footer>
        <MultiSelectField.HelperText>헬퍼 텍스트</MultiSelectField.HelperText>
      </MultiSelectField.Footer>
    </MultiSelectField>
  ),
};

/**
 * `fieldStyle`에 따른 필드의 스타일 변형입니다.
 */
export const Styles: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["outline", "hollow"] as const).map(style => (
        <FlexColumn key={style} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{style}</Label>
          <MultiSelectField fieldStyle={style} defaultValue={["서울특별시"]} style={FIELD_WIDTH}>
            <MultiSelectField.Label>레이블</MultiSelectField.Label>
            <MultiSelectField.Content>
              <MultiSelectField.Input options={options} placeholder='플레이스홀더' />
            </MultiSelectField.Content>
            <MultiSelectField.Footer>
              <MultiSelectField.HelperText>헬퍼 텍스트</MultiSelectField.HelperText>
            </MultiSelectField.Footer>
          </MultiSelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트, 개수 표시 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "success", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <MultiSelectField status={status} defaultValue={["서울특별시"]} style={FIELD_WIDTH}>
            <MultiSelectField.Label>레이블</MultiSelectField.Label>
            <MultiSelectField.Content>
              <MultiSelectField.Input options={options} placeholder='플레이스홀더' />
            </MultiSelectField.Content>
            <MultiSelectField.Footer>
              <MultiSelectField.HelperText>헬퍼 텍스트</MultiSelectField.HelperText>
            </MultiSelectField.Footer>
          </MultiSelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 목록을 열 수 없고 태그의 제거 버튼도 사라집니다.
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
          <MultiSelectField
            {...props}
            defaultValue={["서울특별시", "부산광역시"]}
            style={FIELD_WIDTH}
          >
            <MultiSelectField.Label>레이블</MultiSelectField.Label>
            <MultiSelectField.Content>
              <MultiSelectField.Input options={options} placeholder='플레이스홀더' />
            </MultiSelectField.Content>
            <MultiSelectField.Footer>
              <MultiSelectField.HelperText>헬퍼 텍스트</MultiSelectField.HelperText>
            </MultiSelectField.Footer>
          </MultiSelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * 값이 없으면 placeholder를 표시합니다.
 * 태그가 늘어나 남은 가로 폭이 100px 미만이 되면 입력이 다음 줄로 내려갑니다.
 */
export const Values: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["0개", []],
          ["1개", ["서울특별시"]],
          ["3개", ["서울특별시", "전남광주통합특별시", "부산광역시"]],
        ] as const
      ).map(([name, defaultValue]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <MultiSelectField defaultValue={[...defaultValue]} style={FIELD_WIDTH}>
            <MultiSelectField.Label>레이블</MultiSelectField.Label>
            <MultiSelectField.Content>
              <MultiSelectField.Input options={options} placeholder='플레이스홀더' />
            </MultiSelectField.Content>
          </MultiSelectField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `maxValues`를 지정하면 `MultiSelectField.Counter`에 현재 선택한 개수와 최대 개수를 함께 표시합니다.
 * 최대 개수에 도달하면 더 이상 항목을 선택할 수 없습니다.
 */
export const WithCounter: Story = {
  render: () => (
    <MultiSelectField
      defaultValue={["서울특별시", "부산광역시", "대구광역시"]}
      maxValues={3}
      style={FIELD_WIDTH}
    >
      <MultiSelectField.Label>레이블</MultiSelectField.Label>
      <MultiSelectField.Content>
        <MultiSelectField.Input options={options} placeholder='플레이스홀더' />
      </MultiSelectField.Content>
      <MultiSelectField.Footer>
        <MultiSelectField.HelperText>헬퍼 텍스트</MultiSelectField.HelperText>
        <MultiSelectField.Counter />
      </MultiSelectField.Footer>
    </MultiSelectField>
  ),
};

export const CustomValue: Story = {
  render: () => (
    <MultiSelectField maxValues={20} style={FIELD_WIDTH}>
      <MultiSelectField.Label>레이블</MultiSelectField.Label>
      <MultiSelectField.Content>
        <MultiSelectField.Input
          options={options}
          allowCustomValue
          placeholder='플레이스홀더'
          suffix={
            <Kbd type='function' size='sm'>
              ⏎
            </Kbd>
          }
        />
      </MultiSelectField.Content>
      <MultiSelectField.Footer>
        <MultiSelectField.HelperText>헬퍼 텍스트</MultiSelectField.HelperText>
        <MultiSelectField.Counter />
      </MultiSelectField.Footer>
    </MultiSelectField>
  ),
};

/**
 * 목록이 길면 열리는 시점에 선택된 항목이 보이도록 스크롤 위치가 조정됩니다.
 */
export const ScrollToSelected: Story = {
  render: () => (
    <MultiSelectField defaultValue={["제주특별자치도"]} style={FIELD_WIDTH}>
      <MultiSelectField.Label>레이블</MultiSelectField.Label>
      <MultiSelectField.Content>
        <MultiSelectField.Input options={REGIONS} placeholder='플레이스홀더' />
      </MultiSelectField.Content>
    </MultiSelectField>
  ),
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const entries = new FormData(e.currentTarget).getAll("regions");
        setSubmitted(entries.filter(entry => typeof entry === "string").join(", "));
      }}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <MultiSelectField
          name='regions'
          defaultValue={["서울특별시", "부산광역시"]}
          style={FIELD_WIDTH}
        >
          <MultiSelectField.Label>레이블</MultiSelectField.Label>
          <MultiSelectField.Content>
            <MultiSelectField.Input options={REGIONS} placeholder='플레이스홀더' />
          </MultiSelectField.Content>
        </MultiSelectField>
        <BlockButton type='submit' style={{ width: "100%" }}>
          제출
        </BlockButton>
        <output className={getLabelClassName()} style={{ ...FIELD_WIDTH, display: "block" }}>
          {submitted == null ? "미제출" : `전송된 데이터: ${submitted}`}
        </output>
      </FlexColumn>
    </form>
  );
};

/**
 * `name`을 지정하면 선택한 값마다 hidden input이 렌더되어 폼 제출에 포함됩니다.
 * 선택값이 여러 개이므로 소비처에서는 `FormData.getAll(name)`으로 값을 가져올 수 있습니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};
