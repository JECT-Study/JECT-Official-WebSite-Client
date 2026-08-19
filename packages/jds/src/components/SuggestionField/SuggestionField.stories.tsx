import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FIELD_PLAYGROUND_ARGS,
  FIELD_WIDTH,
  fieldArgTypes,
  FormResult,
} from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";
import { vars } from "tokens";

import { SuggestionField } from "./SuggestionField";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";

const SUGGESTIONS = ["React", "TypeScript", "Next.js", "vanilla-extract"];

/**
 * 입력한 문자열을 값으로 받는 필드입니다. 추가한 값은 제안 목록에서 사라집니다.
 * 값을 옵션으로 제한해야 하면 `MultiSelectField`를 사용합니다.
 */
const meta = {
  title: "Components/SuggestionField",
  component: SuggestionField,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: fieldArgTypes,
} satisfies Meta<typeof SuggestionField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <SuggestionField {...args} style={FIELD_WIDTH}>
      <SuggestionField.Label
        suffix={
          <Icon
            name='information-line'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </SuggestionField.Label>
      <SuggestionField.Input
        suggestions={SUGGESTIONS}
        defaultValue={["React"]}
        placeholder='플레이스홀더'
      />
      <SuggestionField.Footer>
        <SuggestionField.Helper>헬퍼 텍스트</SuggestionField.Helper>
      </SuggestionField.Footer>
    </SuggestionField>
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
          <SuggestionField status={status} style={FIELD_WIDTH}>
            <SuggestionField.Label>레이블</SuggestionField.Label>
            <SuggestionField.Input
              suggestions={SUGGESTIONS}
              defaultValue={["React"]}
              placeholder='플레이스홀더'
            />
            <SuggestionField.Footer>
              <SuggestionField.Helper>헬퍼 텍스트</SuggestionField.Helper>
            </SuggestionField.Footer>
          </SuggestionField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 목록을 열 수 없고 태그의 제거 버튼도 사라집니다.
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
          <SuggestionField {...props} style={FIELD_WIDTH}>
            <SuggestionField.Label>레이블</SuggestionField.Label>
            <SuggestionField.Input
              suggestions={SUGGESTIONS}
              defaultValue={["React", "TypeScript"]}
              placeholder='플레이스홀더'
            />
            <SuggestionField.Footer>
              <SuggestionField.Helper>헬퍼 텍스트</SuggestionField.Helper>
            </SuggestionField.Footer>
          </SuggestionField>
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
          ["1개", ["React"]],
          ["3개", ["React", "TypeScript", "Next.js"]],
        ] as const
      ).map(([name, defaultValue]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <SuggestionField style={FIELD_WIDTH}>
            <SuggestionField.Label>레이블</SuggestionField.Label>
            <SuggestionField.Input
              suggestions={SUGGESTIONS}
              defaultValue={[...defaultValue]}
              placeholder='플레이스홀더'
            />
          </SuggestionField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `maxValues`를 지정하면 `SuggestionField.Counter`에 현재 추가한 개수와 최대 개수를 함께 표시합니다.
 * 최대 개수에 도달하면 값을 더 추가할 수 없습니다.
 */
export const WithCounter: Story = {
  render: () => (
    <SuggestionField style={FIELD_WIDTH}>
      <SuggestionField.Label>레이블</SuggestionField.Label>
      <SuggestionField.Input
        suggestions={SUGGESTIONS}
        defaultValue={["React", "TypeScript"]}
        maxValues={3}
        placeholder='플레이스홀더'
      />
      <SuggestionField.Footer>
        <SuggestionField.Helper>헬퍼 텍스트</SuggestionField.Helper>
        <SuggestionField.Counter />
      </SuggestionField.Footer>
    </SuggestionField>
  ),
};

/**
 * 포커스가 제거될 때 입력 중인 값을 처리하는 방식을 정합니다.
 * `true`면 입력 중인 값을 선택값으로 반영하고, `false`면 반영하지 않고 버립니다.
 */
export const AcceptValueOnBlur: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {([true, false] as const).map(accept => (
        <FlexColumn key={String(accept)} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{String(accept)}</Label>
          <SuggestionField style={FIELD_WIDTH}>
            <SuggestionField.Label>레이블</SuggestionField.Label>
            <SuggestionField.Input
              suggestions={SUGGESTIONS}
              acceptValueOnBlur={accept}
              placeholder='플레이스홀더'
            />
          </SuggestionField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `suggestions` 없이도 동작합니다. 이때는 입력한 값을 추가하는 항목만 표시됩니다.
 */
export const WithoutSuggestions: Story = {
  render: () => (
    <SuggestionField style={FIELD_WIDTH}>
      <SuggestionField.Label>레이블</SuggestionField.Label>
      <SuggestionField.Input defaultValue={["React"]} placeholder='플레이스홀더' />
      <SuggestionField.Footer>
        <SuggestionField.Helper>헬퍼 텍스트</SuggestionField.Helper>
      </SuggestionField.Footer>
    </SuggestionField>
  ),
};

/**
 * `suffix`는 입력 오른쪽에 형제로 배치되므로 배지나 단축키 표시 같은 읽기 전용 요소만 사용합니다.
 */
export const WithSuffix: Story = {
  render: () => (
    <SuggestionField style={FIELD_WIDTH}>
      <SuggestionField.Label>레이블</SuggestionField.Label>
      <SuggestionField.Input
        suggestions={SUGGESTIONS}
        defaultValue={["React"]}
        placeholder='플레이스홀더'
        suffix={
          <Kbd type='function' size='sm'>
            ⏎
          </Kbd>
        }
      />
      <SuggestionField.Footer>
        <SuggestionField.Helper>헬퍼 텍스트</SuggestionField.Helper>
      </SuggestionField.Footer>
    </SuggestionField>
  ),
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const entries = new FormData(e.currentTarget).getAll("stacks");
        setSubmitted(entries.filter(entry => typeof entry === "string").join(", "));
      }}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <SuggestionField style={FIELD_WIDTH}>
          <SuggestionField.Label>레이블</SuggestionField.Label>
          <SuggestionField.Input
            suggestions={SUGGESTIONS}
            name='stacks'
            defaultValue={["React", "TypeScript"]}
            placeholder='플레이스홀더'
          />
        </SuggestionField>
        <BlockButton type='submit' style={{ width: "100%" }}>
          제출
        </BlockButton>
        <FormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * `name`을 지정하면 추가한 값마다 hidden input이 렌더되어 폼 제출에 포함됩니다.
 * 값이 여러 개이므로 소비처에서는 `FormData.getAll(name)`으로 값을 가져올 수 있습니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};
