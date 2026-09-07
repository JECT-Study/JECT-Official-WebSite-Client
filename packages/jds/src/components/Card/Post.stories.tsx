import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./index";

const sizeFor = (layout: "vertical" | "horizontal") =>
  layout === "horizontal" ? { width: 480 } : { width: 240 };

const meta = {
  title: "Components/Card/Post",
  component: Card.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `포스트 카드는 게시글, 콘텐츠의 핵심 정보를 요약해 목록, 그리드에서 빠르게 훑게 하는 카드입니다. 썸네일, 제목, 요약, 메타 데이터 같은 슬롯을 고정된 구조로 담습니다.

\`variant='post'\`로 Compound(\`Card.Root\` + \`Card.Thumbnail\` + \`Card.Content\` + \`Card.ContentGroup\`(\`Card.Title/Body\`) + \`Card.Meta/MetaItem\` + \`Card.Overlay\`)를 직접 조합합니다. 제목과 요약은 \`Card.ContentGroup\`으로 묶습니다. horizontal에서는 이미지를 \`Card.Content\` 뒤에 배치해 우측에 둡니다.

**변형 축**
- **layout**: vertical(이미지 위) / horizontal(이미지 우측, 80×80)
- **disabled**: 비활성화 (클릭·키보드 차단)

**사용 시 주의**: 부모가 width를 지정해야 합니다.`,
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
      <Card.Root layout={layout} variant='post' isDisabled={isDisabled} interactive>
        {layout === "vertical" && <Card.Thumbnail image={{ alt: "포스트 카드 이미지" }} />}
        <Card.Content>
          <Card.ContentGroup>
            <Card.Title>포스트 카드 제목</Card.Title>
            <Card.Body>카드 내용은 두 줄을 넘어가면 말줄임(...) 표시합니다.</Card.Body>
          </Card.ContentGroup>
          <Card.Meta>
            <Card.MetaItem>김젝트</Card.MetaItem>
            <Card.MetaItem>2026년 2월 25일(수)</Card.MetaItem>
          </Card.Meta>
        </Card.Content>
        {layout === "horizontal" && <Card.Thumbnail image={{ alt: "포스트 카드 이미지" }} />}
        <Card.Overlay as='a' href='#' />
      </Card.Root>
    </div>
  ),
};

const OVERVIEW_CASES = [
  { key: "default", label: "기본", isDisabled: false },
  { key: "disabled", label: "disabled", isDisabled: true },
] as const;

export const Overview: Story = {
  name: "Overview (layout · disabled)",
  parameters: {
    docs: {
      description: {
        story:
          "Figma 변형 table의 Post 축(layout × disabled)을 간략히 재현합니다. hover/active/focus는 정적 렌더로 강제할 수 없어 Playground에서 직접 확인하세요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {(["vertical", "horizontal"] as const).map(layout => (
        <section key={layout} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: "bold" }}>layout = {layout}</h3>
          <div
            style={{
              display: "flex",
              gap: 40,
              flexWrap: layout === "vertical" ? "nowrap" : "wrap",
              alignItems: "flex-start",
            }}
          >
            {OVERVIEW_CASES.map(({ key, label, isDisabled }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  flexShrink: layout === "vertical" ? 0 : undefined,
                }}
              >
                <span style={{ fontSize: 12, color: "#999" }}>{label}</span>
                <div style={sizeFor(layout)}>
                  <Card.Root layout={layout} variant='post' isDisabled={isDisabled} interactive>
                    {layout === "vertical" && (
                      <Card.Thumbnail image={{ alt: "포스트 카드 이미지" }} />
                    )}
                    <Card.Content>
                      <Card.ContentGroup>
                        <Card.Title>포스트 카드 제목</Card.Title>
                        <Card.Body>카드 내용은 두 줄을 넘어가면 말줄임(...) 표시합니다.</Card.Body>
                      </Card.ContentGroup>
                      <Card.Meta>
                        <Card.MetaItem>김젝트</Card.MetaItem>
                        <Card.MetaItem>2026년 2월 25일(수)</Card.MetaItem>
                      </Card.Meta>
                    </Card.Content>
                    {layout === "horizontal" && (
                      <Card.Thumbnail image={{ alt: "포스트 카드 이미지" }} />
                    )}
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

const LONG_TITLE = "포스트 카드 제목이 한 줄에 담기지 않을 만큼 길어진 경우";
const LONG_META = "아주 긴 작성자 이름이 들어간 메타 항목";

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "제목과 메타 항목이 한 줄에 담기지 않을 때 말줄임(...)으로 끊기는지 확인합니다. 본문은 두 줄까지 표시한 뒤 말줄임합니다.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {(["vertical", "horizontal"] as const).map(layout => (
        <section key={layout} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: "bold" }}>layout = {layout}</h3>
          <div style={sizeFor(layout)}>
            <Card.Root layout={layout} variant='post' interactive>
              {layout === "vertical" && <Card.Thumbnail image={{ alt: "포스트 카드 이미지" }} />}
              <Card.Content>
                <Card.ContentGroup>
                  <Card.Title>{LONG_TITLE}</Card.Title>
                  <Card.Body>
                    카드 내용은 두 줄을 넘어가면 말줄임으로 끊깁니다. 이 문장은 두 줄을 넘기기 위해
                    충분히 길게 적어 둔 예시입니다.
                  </Card.Body>
                </Card.ContentGroup>
                <Card.Meta>
                  <Card.MetaItem>{LONG_META}</Card.MetaItem>
                  <Card.MetaItem>2026년 2월 25일(수)</Card.MetaItem>
                </Card.Meta>
              </Card.Content>
              {layout === "horizontal" && <Card.Thumbnail image={{ alt: "포스트 카드 이미지" }} />}
              <Card.Overlay as='a' href='#' />
            </Card.Root>
          </div>
        </section>
      ))}
    </div>
  ),
};
