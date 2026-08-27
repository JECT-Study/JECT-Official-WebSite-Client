import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  REGIONS,
  REGION_OPTIONS,
  toCaptionedOptions,
  toSuffixedOptions,
} from "@storybook-utils/selectOptions";
import { useState } from "react";

import { MultiSelect } from "./MultiSelect";

/**
 * 목록에서 여러 값을 선택하는 컴포넌트입니다. 하나의 값만 선택하려면 `Select`를 사용합니다.
 */
const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    value: [],
    onChange: () => {},
    options: REGION_OPTIONS,
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `variant`가 `control`이면 항목 왼쪽에 체크박스 인디케이터를 표시합니다.
 */
export const Control: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(["seoul", "busan"]);
    return (
      <MultiSelect value={value} onChange={setValue} aria-label='레이블' options={REGION_OPTIONS} />
    );
  },
};

/**
 * `variant`가 `label`이면 선택한 항목 오른쪽에 체크 아이콘을 표시합니다.
 */
export const Label: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>(["seoul", "busan"]);
    return (
      <MultiSelect
        value={value}
        onChange={setValue}
        variant='label'
        aria-label='레이블'
        options={REGION_OPTIONS}
      />
    );
  },
};

/**
 * `label`을 지정하면 목록 위에 제목이 표시되고 접근 이름으로도 쓰입니다.
 */
export const WithSelectLabel: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect value={value} onChange={setValue} label='레이블' options={REGION_OPTIONS} />
    );
  },
};

/**
 * 옵션별로 캡션과 비활성 여부를 지정할 수 있습니다.
 */
export const WithCaptionAndDisabled: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        value={value}
        onChange={setValue}
        aria-label='레이블'
        options={toCaptionedOptions(REGION_OPTIONS)}
      />
    );
  },
};

/**
 * `suffix`는 항목 오른쪽에 배치되며 선택 표시와 나란히 놓입니다.
 */
export const WithSuffix: Story = {
  render: function Render() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        value={value}
        onChange={setValue}
        variant='label'
        aria-label='레이블'
        options={toSuffixedOptions(REGION_OPTIONS)}
      />
    );
  },
};

/**
 * `height`를 지정해 스크롤이 생기면, 마운트 시 선택한 항목이 보이도록 스크롤 위치가 조정됩니다.
 */
export const ScrollToSelected: Story = {
  args: { value: ["ulsan", "sejong"], options: REGIONS },
  render: function Render() {
    const [value, setValue] = useState<string[]>(["ulsan", "sejong"]);
    return (
      <MultiSelect
        value={value}
        onChange={setValue}
        aria-label='레이블'
        height='240px'
        options={REGIONS}
      />
    );
  },
};
