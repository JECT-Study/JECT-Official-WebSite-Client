import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Select } from "./Select";
import { ContentBadge } from "../Badge";
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

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "목록에서 하나의 값을 선택하는 컴포넌트입니다. 여러 값을 선택하려면 `MultiSelect`를 사용합니다.",
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {
  args: { value: "seoul", onChange: () => {}, options: REGIONS.slice(0, 5) },
  render: function Render() {
    const [value, setValue] = useState<string | null>("seoul");
    return (
      <Select
        value={value}
        onChange={setValue}
        aria-label='거주 지역'
        options={REGIONS.slice(0, 5)}
      />
    );
  },
};

export const Control: Story = {
  args: { value: "seoul", onChange: () => {}, options: REGIONS.slice(0, 5) },
  render: function Render() {
    const [value, setValue] = useState("seoul");
    return (
      <Select
        value={value}
        onChange={setValue}
        variant='control'
        aria-label='거주 지역'
        options={REGIONS.slice(0, 5)}
      />
    );
  },
};

export const WithSelectLabel: Story = {
  args: { value: null, onChange: () => {}, options: REGIONS.slice(0, 5) },
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Select value={value} onChange={setValue} label='거주 지역' options={REGIONS.slice(0, 5)} />
    );
  },
};

export const WithCaptionAndDisabled: Story = {
  args: { value: null, onChange: () => {}, options: REGIONS.slice(0, 5) },
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);
    const options: SelectOption[] = REGIONS.slice(0, 5).map(region => {
      if (region.value === "seoul") return { ...region, caption: "수도" };
      if (region.value === "busan") return { ...region, disabled: true };
      return region;
    });
    return (
      <Select
        value={value}
        onChange={setValue}
        variant='control'
        aria-label='거주 지역'
        options={options}
      />
    );
  },
};

export const WithSuffix: Story = {
  args: { value: null, onChange: () => {}, options: REGIONS.slice(0, 5) },
  render: function Render() {
    const [value, setValue] = useState<string | null>(null);
    const options: SelectOption[] = REGIONS.slice(0, 5).map(region => ({
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
        aria-label='거주 지역'
        options={options}
      />
    );
  },
};

export const ScrollToSelected: Story = {
  args: { value: "ulsan", onChange: () => {}, options: REGIONS },
  parameters: {
    docs: {
      description: {
        story:
          "`height`를 지정해 스크롤이 생기는 경우, 마운트 시 선택된 옵션이 스크롤 영역 밖에 있으면 해당 옵션이 보이도록 스크롤 위치가 조정됩니다.",
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState("ulsan");
    return (
      <Select
        value={value}
        onChange={setValue}
        aria-label='거주 지역'
        height='240px'
        options={REGIONS}
      />
    );
  },
};
