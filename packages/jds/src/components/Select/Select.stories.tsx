import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { MultiSelect } from "./MultiSelect";
import { Select } from "./Select";
import type { SelectOption } from "./select.types";
import { ContentBadge } from "../Badge/contentBadge/ContentBadge";

const REGIONS: SelectOption[] = [
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
  args: { value: "seoul", onChange: () => {}, options: REGIONS },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    return <Select value={value} onChange={setValue} label='거주 지역' options={REGIONS} />;
  },
};

export const Radio: Story = {
  args: { value: "seoul", onChange: () => {}, options: REGIONS },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    return <Select value={value} onChange={setValue} variant='control' options={REGIONS} />;
  },
};

export const Checkbox: Story = {
  args: { value: "seoul", onChange: () => {}, options: REGIONS },
  render: function Render() {
    const [value, setValue] = useState<string[]>(["seoul"]);
    return <MultiSelect value={value} onChange={setValue} options={REGIONS} />;
  },
};

export const WithCaptionAndDisabled: Story = {
  args: { value: "seoul", onChange: () => {}, options: REGIONS },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    const options: SelectOption[] = [
      { value: "seoul", label: "서울특별시", caption: "수도" },
      { value: "gyeonggi", label: "경기도" },
      { value: "incheon", label: "인천광역시", disabled: true },
      { value: "busan", label: "부산광역시" },
    ];
    return (
      <Select
        value={value}
        onChange={setValue}
        variant='control'
        label='거주 지역'
        options={options}
      />
    );
  },
};

export const WithSuffix: Story = {
  args: { value: "seoul", onChange: () => {}, options: REGIONS },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    const options: SelectOption[] = REGIONS.map(region => ({
      ...region,
      caption: "설명",
      suffix: (
        <ContentBadge.Basic hierarchy='tertiary' size='xs' badgeStyle='outlined'>
          레이블
        </ContentBadge.Basic>
      ),
    }));
    return (
      <Select
        value={value}
        onChange={setValue}
        variant='label'
        label='거주 지역'
        options={options}
      />
    );
  },
};
