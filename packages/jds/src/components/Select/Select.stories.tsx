import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { MultiSelect } from "./MultiSelect";
import { Select } from "./Select";
import { ContentBadge } from "../Badge/contentBadge/ContentBadge";

const REGIONS = [
  { value: "seoul", label: "서울특별시" },
  { value: "busan", label: "부산광역시" },
  { value: "daegu", label: "대구광역시" },
  { value: "incheon", label: "인천광역시" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {
  args: { value: "seoul", onChange: () => {} },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    return (
      <Select value={value} onChange={setValue} label='거주 지역'>
        {REGIONS.map(({ value: v, label }) => (
          <Select.Option key={v} value={v}>
            {label}
          </Select.Option>
        ))}
      </Select>
    );
  },
};

export const Radio: Story = {
  args: { value: "seoul", onChange: () => {} },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    return (
      <Select value={value} onChange={setValue} variant='control'>
        {REGIONS.map(({ value: v, label }) => (
          <Select.Option key={v} value={v}>
            {label}
          </Select.Option>
        ))}
      </Select>
    );
  },
};

export const Checkbox: Story = {
  args: { value: "seoul", onChange: () => {} },
  render: function Render() {
    const [value, setValue] = useState<string[]>(["seoul"]);
    return (
      <MultiSelect value={value} onChange={setValue}>
        {REGIONS.map(({ value: v, label }) => (
          <MultiSelect.Option key={v} value={v}>
            {label}
          </MultiSelect.Option>
        ))}
      </MultiSelect>
    );
  },
};

export const WithCaptionAndDisabled: Story = {
  args: { value: "seoul", onChange: () => {} },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    return (
      <Select value={value} onChange={setValue} variant='control' label='거주 지역'>
        <Select.Option value='seoul' caption='수도'>
          서울특별시
        </Select.Option>
        <Select.Option value='gyeonggi'>경기도</Select.Option>
        <Select.Option value='incheon' disabled>
          인천광역시
        </Select.Option>
        <Select.Option value='busan'>부산광역시</Select.Option>
      </Select>
    );
  },
};

export const WithSuffix: Story = {
  args: { value: "seoul", onChange: () => {} },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    return (
      <Select value={value} onChange={setValue} variant='label' label='거주 지역'>
        {REGIONS.map(({ value: v, label }) => (
          <Select.Option
            key={v}
            value={v}
            caption='설명'
            suffix={
              <ContentBadge.Basic hierarchy='tertiary' size='xs' badgeStyle='outlined'>
                레이블
              </ContentBadge.Basic>
            }
          >
            {label}
          </Select.Option>
        ))}
      </Select>
    );
  },
};
