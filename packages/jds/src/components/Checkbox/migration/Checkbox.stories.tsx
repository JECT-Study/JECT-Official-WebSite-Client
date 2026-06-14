import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { Checkbox } from "./Checkbox";
import type { CheckState } from "./checkbox.types";

const meta: Meta<typeof Checkbox.Item> = {
  title: "Components/Checkbox (Migration)",
  component: Checkbox.Item,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox.Item>;

export default meta;

type Story = StoryObj<typeof Checkbox.Item>;

export const CheckboxBasicSizes: Story = {
  render: () => (
    <FlexRow>
      <Checkbox.Basic size='lg' />
      <Checkbox.Basic size='md' />
      <Checkbox.Basic size='sm' />
      <Checkbox.Basic size='xs' />
    </FlexRow>
  ),
};

export const CheckboxBasicStates: Story = {
  render: () => (
    <FlexColumn>
      <FlexRow>
        <Checkbox.Basic checked={false} onCheckedChange={() => {}} />
        <Checkbox.Basic checked={true} onCheckedChange={() => {}} />
        <Checkbox.Basic checked='indeterminate' onCheckedChange={() => {}} />
        <Checkbox.Basic checked={false} isInvalid onCheckedChange={() => {}} />
      </FlexRow>
      <FlexRow>
        <Checkbox.Basic checked={false} disabled onCheckedChange={() => {}} />
        <Checkbox.Basic checked={true} disabled onCheckedChange={() => {}} />
        <Checkbox.Basic checked='indeterminate' disabled onCheckedChange={() => {}} />
        <Checkbox.Basic checked={false} isInvalid disabled onCheckedChange={() => {}} />
      </FlexRow>
    </FlexColumn>
  ),
};

export const CheckboxItemStyle: Story = {
  render: () => (
    <FlexColumn>
      <FlexColumn>
        {(["lg", "md", "sm", "xs"] as const).map(size => (
          <Checkbox.Item key={size} size={size} variant='hollow'>
            <Checkbox.Basic value='item' />
            <Checkbox.Label>레이블</Checkbox.Label>
          </Checkbox.Item>
        ))}
      </FlexColumn>
      <FlexColumn>
        {(["lg", "md", "sm", "xs"] as const).map(size => (
          <Checkbox.Item key={size} size={size} variant='outlined'>
            <Checkbox.Basic value='item' />
            <Checkbox.Label>레이블</Checkbox.Label>
            <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
          </Checkbox.Item>
        ))}
      </FlexColumn>
    </FlexColumn>
  ),
};

export const CheckboxItemDisabled: Story = {
  render: () => (
    <FlexColumn>
      <Checkbox.Item variant='hollow' disabled>
        <Checkbox.Basic value='item' />
        <Checkbox.Label>레이블</Checkbox.Label>
      </Checkbox.Item>
      <Checkbox.Item variant='outlined' disabled>
        <Checkbox.Basic value='item' />
        <Checkbox.Label>레이블</Checkbox.Label>
        <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
      </Checkbox.Item>
    </FlexColumn>
  ),
};

export const CheckboxItemInvalid: Story = {
  render: () => (
    <FlexColumn>
      <Checkbox.Item variant='hollow' isInvalid>
        <Checkbox.Basic value='item' />
        <Checkbox.Label>레이블</Checkbox.Label>
      </Checkbox.Item>
      <Checkbox.Item variant='outlined' isInvalid>
        <Checkbox.Basic value='item' />
        <Checkbox.Label>레이블</Checkbox.Label>
        <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
      </Checkbox.Item>
      <Checkbox.Item variant='outlined' isInvalid disabled>
        <Checkbox.Basic value='item' />
        <Checkbox.Label>레이블</Checkbox.Label>
        <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
      </Checkbox.Item>
      <Checkbox.Item variant='outlined' isInvalid>
        <Checkbox.Basic value='item' defaultChecked />
        <Checkbox.Label>레이블</Checkbox.Label>
        <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
      </Checkbox.Item>
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
    <FlexColumn>
      <Checkbox.Root defaultValue={["2"]} name='groupUncontrolled'>
        <Checkbox.Item>
          <Checkbox.Basic value='1' />
          <Checkbox.Label>레이블</Checkbox.Label>
        </Checkbox.Item>
        <Checkbox.Item>
          <Checkbox.Basic value='2' />
          <Checkbox.Label>레이블 (기본 선택)</Checkbox.Label>
        </Checkbox.Item>
        <Checkbox.Item>
          <Checkbox.Basic value='3' />
          <Checkbox.Label>레이블</Checkbox.Label>
        </Checkbox.Item>
      </Checkbox.Root>
    </FlexColumn>
  ),
};

export const CheckboxGroupControlled: Story = {
  render: () => {
    const ControlledGroup = () => {
      const [selected, setSelected] = useState<string[]>(["1"]);

      return (
        <FlexColumn>
          <span>선택: {selected.join(", ") || "(없음)"}</span>
          <Checkbox.Root value={selected} onChange={setSelected} name='groupControlled'>
            <Checkbox.Item>
              <Checkbox.Basic value='1' />
              <Checkbox.Label>레이블</Checkbox.Label>
            </Checkbox.Item>
            <Checkbox.Item>
              <Checkbox.Basic value='2' />
              <Checkbox.Label>레이블</Checkbox.Label>
            </Checkbox.Item>
            <Checkbox.Item>
              <Checkbox.Basic value='3' />
              <Checkbox.Label>레이블</Checkbox.Label>
            </Checkbox.Item>
          </Checkbox.Root>
        </FlexColumn>
      );
    };

    return <ControlledGroup />;
  },
};

export const CheckboxGroupSelectAll: Story = {
  render: () => {
    const ALL = ["1", "2", "3"];

    const SelectAllGroup = () => {
      const [selected, setSelected] = useState<string[]>(["1"]);

      const isAllChecked = selected.length === ALL.length;
      const isSomeChecked = selected.length > 0 && !isAllChecked;
      const parentState: CheckState = isAllChecked ? true : isSomeChecked ? "indeterminate" : false;

      return (
        <FlexColumn>
          <Checkbox.Item>
            <Checkbox.Basic
              checked={parentState}
              onCheckedChange={() => setSelected(isAllChecked ? [] : [...ALL])}
            />
            <Checkbox.Label>전체 선택</Checkbox.Label>
          </Checkbox.Item>
          <FlexColumn>
            <Checkbox.Root value={selected} onChange={setSelected} name='groupSelectAll'>
              {ALL.map(value => (
                <Checkbox.Item key={value}>
                  <Checkbox.Basic value={value} />
                  <Checkbox.Label>레이블 {value}</Checkbox.Label>
                </Checkbox.Item>
              ))}
            </Checkbox.Root>
          </FlexColumn>
        </FlexColumn>
      );
    };

    return <SelectAllGroup />;
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
    <FlexRow>
      <Checkbox.Root disabled defaultValue={["2"]} name='groupDisabled'>
        <Checkbox.Item>
          <Checkbox.Basic value='1' />
          <Checkbox.Label>레이블</Checkbox.Label>
        </Checkbox.Item>
        <Checkbox.Item>
          <Checkbox.Basic value='2' />
          <Checkbox.Label>레이블</Checkbox.Label>
        </Checkbox.Item>
      </Checkbox.Root>
    </FlexRow>
  ),
};

export const CheckboxGroupInvalid: Story = {
  render: () => {
    const InvalidGroup = () => {
      const [selected, setSelected] = useState<string[]>([]);
      const isInvalid = selected.length === 0;

      return (
        <FlexRow>
          <Checkbox.Root
            value={selected}
            onChange={setSelected}
            isInvalid={isInvalid}
            name='groupInvalid'
            variant='outlined'
          >
            <Checkbox.Item>
              <Checkbox.Basic value='1' />
              <Checkbox.Label>레이블</Checkbox.Label>
              <Checkbox.Helper>1개 이상 선택해 주세요</Checkbox.Helper>
            </Checkbox.Item>
            <Checkbox.Item>
              <Checkbox.Basic value='2' />
              <Checkbox.Label>레이블</Checkbox.Label>
            </Checkbox.Item>
          </Checkbox.Root>
        </FlexRow>
      );
    };

    return <InvalidGroup />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "`Checkbox.Root`의 `isInvalid`를 선택 상태에서 파생하면 그룹 단위 유효성 검사를 표현할 수 있습니다. 아무것도 선택하지 않은 초기 상태에서는 invalid가 그룹 전체로 전파되며, 하나 이상 선택하면 invalid가 해제됩니다.",
      },
    },
  },
};

export const CheckboxComprehensiveMatrix: Story = {
  render: () => (
    <FlexColumn>
      <FlexColumn>
        {(["lg", "md", "sm", "xs"] as const).map(size => (
          <FlexRow key={size}>
            <Checkbox.Basic size={size} checked={false} onCheckedChange={() => {}} />
            <Checkbox.Basic size={size} checked={true} onCheckedChange={() => {}} />
            <Checkbox.Basic size={size} checked='indeterminate' onCheckedChange={() => {}} />
            <Checkbox.Basic size={size} checked={false} disabled onCheckedChange={() => {}} />
            <Checkbox.Basic size={size} checked={true} disabled onCheckedChange={() => {}} />
            <Checkbox.Basic
              size={size}
              checked='indeterminate'
              disabled
              onCheckedChange={() => {}}
            />
          </FlexRow>
        ))}
      </FlexColumn>
      <FlexColumn>
        {(["hollow", "outlined"] as const).map(variant => (
          <FlexColumn key={variant}>
            <Checkbox.Item variant={variant}>
              <Checkbox.Basic defaultChecked />
              <Checkbox.Label>레이블</Checkbox.Label>
              <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
            </Checkbox.Item>
            <Checkbox.Item variant={variant} disabled>
              <Checkbox.Basic />
              <Checkbox.Label>레이블</Checkbox.Label>
              <Checkbox.Helper>헬퍼 텍스트</Checkbox.Helper>
            </Checkbox.Item>
            <Checkbox.Item variant={variant} isInvalid>
              <Checkbox.Basic />
              <Checkbox.Label>레이블</Checkbox.Label>
              <Checkbox.Helper>필수 항목입니다</Checkbox.Helper>
            </Checkbox.Item>
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
