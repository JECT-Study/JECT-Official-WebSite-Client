import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FIELD_PLAYGROUND_ARGS,
  FIELD_WIDTH,
  fieldArgTypes,
  FormResult,
} from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { REGIONS, REGION_OPTIONS, toExpressiveOptions } from "@storybook-utils/selectOptions";
import { useState } from "react";
import { vars } from "tokens";

import { SelectField } from "./SelectField";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";

/**
 * 목록에서 하나의 값을 선택하는 필드입니다. 항목을 선택하면 목록이 닫힙니다.
 * 여러 값을 선택해야 하면 `MultiSelectField`를 사용합니다.
 */
const meta = {
  title: "Components/SelectField",
  component: SelectField,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: fieldArgTypes,
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
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
      <SelectField.Input options={REGION_OPTIONS} defaultValue='seoul' placeholder='플레이스홀더' />
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
            <SelectField.Input
              options={REGION_OPTIONS}
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
 * `disabled`와 `readonly`에서는 목록을 열 수 없습니다.
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
          <SelectField {...props} style={FIELD_WIDTH}>
            <SelectField.Label>레이블</SelectField.Label>
            <SelectField.Input
              options={REGION_OPTIONS}
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
 * 값이 없으면 placeholder를 표시하고, 값이 있으면 선택한 항목의 표시명을 보여줍니다.
 */
export const Values: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["없음", undefined],
          ["있음", "seoul"],
        ] as const
      ).map(([name, defaultValue]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <SelectField style={FIELD_WIDTH}>
            <SelectField.Label>레이블</SelectField.Label>
            <SelectField.Input
              options={REGION_OPTIONS}
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
 * 목록이 닫히거나 포커스가 제거되면 선택한 항목의 표시명으로 돌아갑니다.
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
              options={REGION_OPTIONS}
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
 * `suffix`는 입력 오른쪽에 형제로 배치되므로 배지나 단축키 표시 같은 읽기 전용 요소만 사용합니다.
 */
export const WithSuffix: Story = {
  render: () => (
    <SelectField style={FIELD_WIDTH}>
      <SelectField.Label>레이블</SelectField.Label>
      <SelectField.Input
        options={REGION_OPTIONS}
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
 * 옵션별로 캡션과 부가 요소, 비활성 여부를 함께 지정할 수 있습니다.
 */
export const OptionExpression: Story = {
  render: () => (
    <SelectField style={FIELD_WIDTH}>
      <SelectField.Label>레이블</SelectField.Label>
      <SelectField.Input
        options={toExpressiveOptions(REGION_OPTIONS)}
        defaultValue='seoul'
        placeholder='플레이스홀더'
      />
      <SelectField.Helper>헬퍼 텍스트</SelectField.Helper>
    </SelectField>
  ),
};

/**
 * 팝업 높이는 남은 화면 공간만큼으로 제한됩니다.
 * 목록이 그보다 길면 열리는 시점에 선택한 항목이 보이도록 스크롤 위치가 조정됩니다.
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
        const entry = new FormData(e.currentTarget).get("regions");
        setSubmitted(typeof entry === "string" ? entry : null);
      }}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <SelectField style={FIELD_WIDTH}>
          <SelectField.Label>레이블</SelectField.Label>
          <SelectField.Input
            options={REGION_OPTIONS}
            name='regions'
            defaultValue='seoul'
            placeholder='플레이스홀더'
          />
        </SelectField>
        <BlockButton type='submit' style={{ width: "100%" }}>
          제출
        </BlockButton>
        <FormResult value={submitted} />
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
