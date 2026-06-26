import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./index";

const sizeFor = (layout: "vertical" | "horizontal") =>
  layout === "horizontal" ? { width: 480 } : { width: 300 };

const meta = {
  title: "Components/Card/Plate",
  component: Card.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Plate 카드는 관심을 끄는 항목을 카드 면(plate)에 담는 표현형 컴포넌트입니다. 이미지 영역과 텍스트(제목·본문·선택적 캡션)로 구성되며, 카드 전체가 하나의 링크/버튼으로 동작합니다.

\`variant='plate'\`로 Compound(\`Card.Root\` + \`Card.Thumbnail\` + \`Card.Content\` + \`Card.Title/Body/Caption\` + \`Card.Overlay\`)를 직접 조합합니다.

**변형 축**
- **layout**: vertical(이미지 위) / horizontal(이미지 좌측)
- **withCaption**: \`Card.Caption\` 표시 여부
- **disabled**: 비활성화 (클릭·키보드 차단)

**사용 시 주의**: 부모는 width만 지정하면 됩니다. 카드 높이는 콘텐츠가 결정하며(이미지는 그 높이에 맞춘 정사각형), vertical·horizontal 모두 caption 유무에 따라 높이가 달라집니다.`,
      },
    },
  },
  argTypes: {
    layout: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "이미지와 텍스트의 배치 방향",
      table: { defaultValue: { summary: "vertical" } },
    },
    isDisabled: {
      control: "boolean",
      description: "비활성화 상태 (클릭·키보드 차단)",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    layout: "vertical",
    isDisabled: false,
  },
} satisfies Meta<typeof Card.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ layout = "vertical", isDisabled }) => (
    <div style={sizeFor(layout)}>
      <Card.Root layout={layout} variant='plate' isDisabled={isDisabled} interactive>
        <Card.Thumbnail image={{ alt: "플레이트 카드 이미지" }} />
        <Card.Content>
          <Card.Title>플레이트 카드 제목</Card.Title>
          <Card.Body>카드 내용은 두 줄을 넘어가면 말줄임(...) 표시합니다.</Card.Body>
          <Card.Caption>캡션 레이블</Card.Caption>
        </Card.Content>
        <Card.Overlay as='a' href='#' />
      </Card.Root>
    </div>
  ),
};

const OVERVIEW_CASES = [
  { key: "default", label: "기본", isDisabled: false, withCaption: false },
  { key: "withCaption", label: "withCaption", isDisabled: false, withCaption: true },
  { key: "disabled", label: "disabled", isDisabled: true, withCaption: true },
] as const;

export const Overview: Story = {
  name: "Overview (layout · caption · disabled)",
  parameters: {
    docs: {
      description: {
        story:
          "Figma 변형 table의 Plate 축(layout × withCaption × disabled)을 간략히 재현합니다. hover/active/focus는 정적 렌더로 강제할 수 없어 Playground에서 직접 확인하세요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {(["vertical", "horizontal"] as const).map(layout => (
        <section key={layout} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: "bold" }}>layout = {layout}</h3>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
            {OVERVIEW_CASES.map(({ key, label, isDisabled, withCaption }) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#999" }}>{label}</span>
                <div style={sizeFor(layout)}>
                  <Card.Root layout={layout} variant='plate' isDisabled={isDisabled} interactive>
                    <Card.Thumbnail image={{ alt: "플레이트 카드 이미지" }} />
                    <Card.Content>
                      <Card.Title>플레이트 카드 제목</Card.Title>
                      <Card.Body>카드 내용은 두 줄을 넘어가면 말줄임(...) 표시합니다.</Card.Body>
                      {withCaption && <Card.Caption>캡션 레이블</Card.Caption>}
                    </Card.Content>
                    <Card.Overlay as='a' href='#' />
                  </Card.Root>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
