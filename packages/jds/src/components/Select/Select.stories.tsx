import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Select } from "./index";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["label", "checkbox", "radio"],
      description: "Select의 변형 (label, checkbox, radio)",
      table: {
        defaultValue: { summary: "label" },
      },
    },
    size: {
      control: "select",
      options: ["md", "sm"],
      description: "Select의 크기",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    label: {
      control: "text",
      description: "Select 레이블 (선택적)",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "label",
    value: "seoul",
    onChange: () => { },
  },
  render: function Render(args) {
    const isMulti = args.variant === "checkbox";
    const [singleValue, setSingleValue] = useState("seoul");
    const [multiValue, setMultiValue] = useState<string[]>(["seoul"]);

    const currentValue = isMulti ? multiValue : singleValue;
    const handleChange = isMulti ? setMultiValue : setSingleValue;

    const Item = args.variant === "checkbox" ? Select.Checkbox : args.variant === "radio" ? Select.Radio : Select.Label;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "20rem" }}>
        <Select {...(args)} value={currentValue} onChange={handleChange}>
          <Item value='seoul'>서울특별시</Item>
          <Item value='gyeonggi'>경기도</Item>
          <Item value='incheon'>인천광역시</Item>
          <Item value='busan'>부산광역시</Item>
          <Item value='daegu'>대구광역시</Item>
        </Select>

        <div style={{ padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "6px" }}>
          <strong>선택된 값:</strong> {Array.isArray(currentValue) ? currentValue.join(", ") : currentValue}
        </div>
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: {
    variant: "label",
    value: "seoul",
    label: "지역 선택",
    onChange: () => { },
  },
  render: function Render(args) {
    const isMulti = args.variant === "checkbox";
    const [singleValue, setSingleValue] = useState("seoul");
    const [multiValue, setMultiValue] = useState<string[]>(["seoul"]);

    const currentValue = isMulti ? multiValue : singleValue;
    const handleChange = isMulti ? setMultiValue : setSingleValue;

    const Item = args.variant === "checkbox" ? Select.Checkbox : args.variant === "radio" ? Select.Radio : Select.Label;

    return (
      <div style={{ width: "20rem" }}>
        <Select {...(args)} value={currentValue} onChange={handleChange}>
          <Item value='seoul'>서울특별시</Item>
          <Item value='gyeonggi'>경기도</Item>
          <Item value='incheon'>인천광역시</Item>
          <Item value='busan'>부산광역시</Item>
        </Select>
      </div>
    );
  },
};

export const SmallSize: Story = {
  args: {
    variant: "label",
    value: "option1",
    size: "sm",
    onChange: () => { },
  },
  render: function Render(args) {
    const isMulti = args.variant === "checkbox";
    const [singleValue, setSingleValue] = useState("option1");
    const [multiValue, setMultiValue] = useState<string[]>(["option1"]);

    const currentValue = isMulti ? multiValue : singleValue;
    const handleChange = isMulti ? setMultiValue : setSingleValue;

    const Item = args.variant === "checkbox" ? Select.Checkbox : args.variant === "radio" ? Select.Radio : Select.Label;

    return (
      <div style={{ width: "20rem" }}>
        <Select {...(args)} value={currentValue} onChange={handleChange}>
          <Item value='option1'>Option 1</Item>
          <Item value='option2'>Option 2</Item>
          <Item value='option3'>Option 3</Item>
        </Select>
      </div>
    );
  },
};

export const WithCaption: Story = {
  args: {
    variant: "label",
    value: "pro",
    label: "요금제 선택",
    onChange: () => { },
  },
  render: function Render(args) {
    const isMulti = args.variant === "checkbox";
    const [singleValue, setSingleValue] = useState("pro");
    const [multiValue, setMultiValue] = useState<string[]>(["pro"]);

    const currentValue = isMulti ? multiValue : singleValue;
    const handleChange = isMulti ? setMultiValue : setSingleValue;

    const Item = args.variant === "checkbox" ? Select.Checkbox : args.variant === "radio" ? Select.Radio : Select.Label;

    return (
      <div style={{ width: "20rem" }}>
        <Select {...(args)} value={currentValue} onChange={handleChange}>
          <Item value='free' caption='무료로 시작하세요'>
            Free
          </Item>
          <Item value='pro' caption='개인 사용자에게 추천'>
            Pro
          </Item>
          <Item value='team' caption='팀 협업을 위한 플랜'>
            Team
          </Item>
          <Item value='enterprise' caption='대규모 조직을 위한 플랜'>
            Enterprise
          </Item>
        </Select>
      </div>
    );
  },
};

export const WithBadge: Story = {
  args: {
    variant: "label",
    value: "pro",
    label: "요금제 선택",
    onChange: () => { },
  },
  render: function Render(args) {
    const isMulti = args.variant === "checkbox";
    const [singleValue, setSingleValue] = useState("pro");
    const [multiValue, setMultiValue] = useState<string[]>(["pro"]);

    const currentValue = isMulti ? multiValue : singleValue;
    const handleChange = isMulti ? setMultiValue : setSingleValue;

    const Item = args.variant === "checkbox" ? Select.Checkbox : args.variant === "radio" ? Select.Radio : Select.Label;

    return (
      <div style={{ width: "20rem" }}>
        <Select {...(args)} value={currentValue} onChange={handleChange}>
          <Item value='free' caption='무료로 시작하세요' {...(args.variant === 'label' ? { badge: 'Free' } : {})}>
            Free Plan
          </Item>
          <Item value='pro' caption='개인 사용자에게 추천' {...(args.variant === 'label' ? { badge: '인기' } : {})}>
            Pro Plan
          </Item>
          <Item value='team' caption='팀 협업을 위한 플랜' {...(args.variant === 'label' ? { badge: 'NEW' } : {})}>
            Team Plan
          </Item>
        </Select>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  args: {
    variant: "label",
    value: "available1",
    label: "옵션 선택",
    onChange: () => { },
  },
  render: function Render(args) {
    const isMulti = args.variant === "checkbox";
    const [singleValue, setSingleValue] = useState("available1");
    const [multiValue, setMultiValue] = useState<string[]>(["available1"]);

    const currentValue = isMulti ? multiValue : singleValue;
    const handleChange = isMulti ? setMultiValue : setSingleValue;

    const Item = args.variant === "checkbox" ? Select.Checkbox : args.variant === "radio" ? Select.Radio : Select.Label;

    return (
      <div style={{ width: "20rem" }}>
        <Select {...(args)} value={currentValue} onChange={handleChange}>
          <Item value='available1'>사용 가능 1</Item>
          <Item value='disabled1' isDisabled>
            비활성화됨 1
          </Item>
          <Item value='available2'>사용 가능 2</Item>
          <Item value='disabled2' isDisabled>
            비활성화됨 2
          </Item>
        </Select>
      </div>
    );
  },
};

export const AllFeatures: Story = {
  args: {
    variant: "label",
    value: "standard",
    label: "서비스 플랜 선택",
    size: "md",
    onChange: () => { },
  },
  render: function Render(args) {
    const isMulti = args.variant === "checkbox";
    const [singleValue, setSingleValue] = useState("standard");
    const [multiValue, setMultiValue] = useState<string[]>(["standard"]);

    const currentValue = isMulti ? multiValue : singleValue;
    const handleChange = isMulti ? setMultiValue : setSingleValue;

    const Item = args.variant === "checkbox" ? Select.Checkbox : args.variant === "radio" ? Select.Radio : Select.Label;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "20rem" }}>
        <Select {...(args)} value={currentValue} onChange={handleChange}>
          <Item value='free' caption='무료 체험 플랜' {...(args.variant === 'label' ? { badge: '무료' } : {})}>
            Free
          </Item>
          <Item value='standard' caption='개인 사용자에게 추천' {...(args.variant === 'label' ? { badge: '인기' } : {})}>
            Standard
          </Item>
          <Item value='premium' caption='프리미엄 기능 제공' {...(args.variant === 'label' ? { badge: '신규' } : {})}>
            Premium
          </Item>
          <Item value='enterprise' caption='기업용 맞춤 플랜' isDisabled>
            Enterprise (준비중)
          </Item>
        </Select>

        <div style={{ padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "6px" }}>
          <strong>선택된 플랜:</strong> {Array.isArray(currentValue) ? currentValue.join(", ") : currentValue}
        </div>
      </div>
    );
  },
};
