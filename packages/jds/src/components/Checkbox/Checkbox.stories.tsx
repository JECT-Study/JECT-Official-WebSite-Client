import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { Checkbox } from "./Checkbox";
import { CHECKBOX_SIZE_OPTIONS, CHECKBOX_VARIANT_OPTIONS, type CheckedState } from "./checkbox.types";
import { CheckboxGroup } from "./CheckboxGroup";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

const GROUP_GAP = "12px";
const SECTION_GAP = "32px";

export const CheckboxBasicSizes: Story = {
  render: () => (
    <FlexRow>
      <Checkbox size='lg' />
      <Checkbox size='md' />
      <Checkbox size='sm' />
      <Checkbox size='xs' />
    </FlexRow>
  ),
};

export const CheckboxBasicStates: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Checkbox checked={false} onCheckedChange={() => {}} />
        <Checkbox checked={true} onCheckedChange={() => {}} />
        <Checkbox checked='indeterminate' onCheckedChange={() => {}} />
        <Checkbox checked={false} isInvalid onCheckedChange={() => {}} />
      </FlexRow>
      <FlexRow>
        <Checkbox checked={false} disabled onCheckedChange={() => {}} />
        <Checkbox checked={true} disabled onCheckedChange={() => {}} />
        <Checkbox checked='indeterminate' disabled onCheckedChange={() => {}} />
        <Checkbox checked={false} isInvalid disabled onCheckedChange={() => {}} />
      </FlexRow>
    </FlexColumn>
  ),
};

export const CheckboxItemStyle: Story = {
  render: () => (
    <FlexColumn gap={SECTION_GAP}>
      <FlexColumn gap={GROUP_GAP}>
        {CHECKBOX_SIZE_OPTIONS.map(size => (
          <Checkbox key={size} size={size} variant='hollow' label='레이블' />
        ))}
      </FlexColumn>
      <FlexColumn gap={GROUP_GAP}>
        {CHECKBOX_SIZE_OPTIONS.map(size => (
          <Checkbox key={size} size={size} variant='outlined' label='레이블' helper='헬퍼 텍스트' />
        ))}
      </FlexColumn>
    </FlexColumn>
  ),
};

export const CheckboxItemDisabled: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      <Checkbox variant='hollow' disabled label='레이블' />
      <Checkbox variant='outlined' disabled label='레이블' helper='헬퍼 텍스트' />
    </FlexColumn>
  ),
};

export const CheckboxItemInvalid: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      <Checkbox variant='hollow' isInvalid label='레이블' />
      <Checkbox variant='outlined' isInvalid label='레이블' helper='헬퍼 텍스트' />
      <Checkbox variant='outlined' isInvalid disabled label='레이블' helper='헬퍼 텍스트' />
      <Checkbox variant='outlined' isInvalid defaultChecked label='레이블' helper='헬퍼 텍스트' />
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "invalid는 체크되지 않은 상태에 대한 유효성 검사이므로 `checked = false`일 때만 적용됩니다. checked 항목은 `isInvalid`를 전달하더라도 invalid 스타일이 표시되지 않습니다.",
      },
    },
  },
};

export const CheckboxGroupUncontrolled: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      <CheckboxGroup
        defaultValue={["2"]}
        name='groupUncontrolled'
        options={[
          { value: "1", label: "레이블" },
          { value: "2", label: "레이블 (기본 선택)" },
          { value: "3", label: "레이블" },
        ]}
      />
    </FlexColumn>
  ),
};

export const CheckboxGroupControlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(["1"]);

    return (
      <FlexColumn>
        <span>선택: {selected.join(", ") || "(없음)"}</span>
        <FlexColumn gap={GROUP_GAP}>
          <CheckboxGroup
            value={selected}
            onChange={setSelected}
            name='groupControlled'
            options={[
              { value: "1", label: "레이블" },
              { value: "2", label: "레이블" },
              { value: "3", label: "레이블" },
            ]}
          />
        </FlexColumn>
      </FlexColumn>
    );
  },
};

export const CheckboxGroupSelectAll: Story = {
  render: function Render() {
    const ALL = ["1", "2", "3"];
    const [selected, setSelected] = useState<string[]>(["1"]);

    const isAllChecked = selected.length === ALL.length;
    const isSomeChecked = selected.length > 0 && !isAllChecked;
    const parentState: CheckedState = isAllChecked ? true : isSomeChecked ? "indeterminate" : false;

    return (
      <FlexColumn gap={GROUP_GAP}>
        <Checkbox
          checked={parentState}
          onCheckedChange={() => setSelected(isAllChecked ? [] : [...ALL])}
          label='전체 선택'
        />
        <FlexColumn gap={GROUP_GAP}>
          <CheckboxGroup
            value={selected}
            onChange={setSelected}
            name='groupSelectAll'
            options={ALL.map(value => ({ value, label: `레이블 ${value}` }))}
          />
        </FlexColumn>
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "부모 체크박스는 그룹의 선택 상태에서 파생되어, 모두 선택되면 checked, 일부만 선택되면 indeterminate, 아무것도 선택되지 않으면 unchecked로 표시됩니다. 부모를 클릭하면 전체 선택과 전체 해제를 토글합니다.",
      },
    },
  },
};

export const CheckboxGroupDisabled: Story = {
  render: () => (
    <FlexColumn gap={GROUP_GAP}>
      <CheckboxGroup
        disabled
        defaultValue={["2"]}
        name='groupDisabled'
        options={[
          { value: "1", label: "레이블" },
          { value: "2", label: "레이블" },
        ]}
      />
    </FlexColumn>
  ),
};

export const CheckboxGroupInvalid: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>([]);
    const isInvalid = selected.length === 0;

    return (
      <FlexColumn gap={GROUP_GAP}>
        <CheckboxGroup
          value={selected}
          onChange={setSelected}
          isInvalid={isInvalid}
          name='groupInvalid'
          variant='outlined'
          options={[
            { value: "1", label: "레이블", helper: "1개 이상 선택해 주세요" },
            { value: "2", label: "레이블" },
          ]}
        />
      </FlexColumn>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "`CheckboxGroup`의 `isInvalid`를 선택 상태에서 파생하면 그룹 단위 유효성 검사를 표현할 수 있습니다. 아무것도 선택하지 않은 초기 상태에서는 invalid가 그룹 전체로 전파되며, 하나 이상 선택하면 invalid가 해제됩니다.",
      },
    },
  },
};

export const CheckboxComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn gap={SECTION_GAP}>
      <FlexColumn>
        {CHECKBOX_SIZE_OPTIONS.map(size => (
          <FlexRow key={size}>
            <Checkbox size={size} checked={false} onCheckedChange={() => {}} />
            <Checkbox size={size} checked={true} onCheckedChange={() => {}} />
            <Checkbox size={size} checked='indeterminate' onCheckedChange={() => {}} />
            <Checkbox size={size} checked={false} disabled onCheckedChange={() => {}} />
            <Checkbox size={size} checked={true} disabled onCheckedChange={() => {}} />
            <Checkbox size={size} checked='indeterminate' disabled onCheckedChange={() => {}} />
          </FlexRow>
        ))}
      </FlexColumn>
      <FlexColumn gap={SECTION_GAP}>
        {CHECKBOX_VARIANT_OPTIONS.map(variant => (
          <FlexColumn key={variant} gap={GROUP_GAP}>
            <Checkbox variant={variant} defaultChecked label='레이블' helper='헬퍼 텍스트' />
            <Checkbox variant={variant} disabled label='레이블' helper='헬퍼 텍스트' />
            <Checkbox variant={variant} isInvalid label='레이블' helper='필수 항목입니다' />
          </FlexColumn>
        ))}
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 size와 상태 조합을 한눈에 확인할 수 있습니다.",
      },
    },
  },
};
