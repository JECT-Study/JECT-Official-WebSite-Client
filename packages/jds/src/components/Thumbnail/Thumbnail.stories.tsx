import type { Meta, StoryObj } from "@storybook/react-vite";
import SAMPLE_SRC from "@storybook-assets/thumbnail.jpg";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import {
  THUMBNAIL_APPEARANCE_OPTIONS,
  THUMBNAIL_CORNER_STYLE_OPTIONS,
  THUMBNAIL_ORIENTATION_OPTIONS,
  THUMBNAIL_RATIO_OPTIONS,
  Thumbnail,
} from "components";

const meta = {
  title: "Components/Thumbnail",
  component: Thumbnail,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `Thumbnail은 root element가 두 가지 형태로 결정되는 primitive입니다

- **비인터랙티브** (default): root는 \`<div>\` 단순한 이미지 표시 컨텍스트(Banner / Card / MenuItem 등)에 사용합니다
- **인터랙티브** (\`asChild\`): caller가 자식으로 제공한 \`<button>\` / \`<a>\` 등이 root가 됩니다 hover / focus-visible / active 시각 상태가 native pseudo-class로 자동 표현됩니다

\`asChild\` 패턴은 Radix Slot을 사용합니다 caller가 root element의 의미·동작·a11y를 결정하고, Thumbnail은 시각만 책임집니다`,
      },
    },
  },
  args: {
    src: SAMPLE_SRC,
    alt: "샘플 썸네일",
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text", description: "스크린리더가 낭독할 대체 텍스트" },
    ratio: { control: "select", options: THUMBNAIL_RATIO_OPTIONS },
    orientation: { control: "radio", options: THUMBNAIL_ORIENTATION_OPTIONS },
    cornerStyle: { control: "radio", options: THUMBNAIL_CORNER_STYLE_OPTIONS },
    appearance: { control: "radio", options: THUMBNAIL_APPEARANCE_OPTIONS },
    asChild: {
      control: "boolean",
      description:
        "true이면 root를 caller가 제공한 자식 element로 대체(Radix Slot) 인터랙티브 컨텍스트에서 button/a를 자식으로 넘겨 사용",
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

const FixedBox = ({ children, size = 160 }: { children: React.ReactNode; size?: number }) => (
  <div style={{ width: size }}>{children}</div>
);

export const Default: Story = {
  render: args => (
    <FixedBox>
      <Thumbnail {...args} />
    </FixedBox>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 모드 — root는 `<div>`로 렌더되고 인터랙션 시각 변화가 없습니다",
      },
    },
  },
};

export const AsChildButton: Story = {
  render: args => (
    <FixedBox>
      <Thumbnail {...args} asChild>
        <button type='button' onClick={() => alert("클릭")} aria-label='이미지 확대' />
      </Thumbnail>
    </FixedBox>
  ),
  parameters: {
    docs: {
      description: {
        story: `\`asChild\`로 \`<button>\`을 root로 사용합니다 마우스 hover / 키보드 Tab focus-visible / 클릭 active 시 native pseudo-class로 시각 상태가 표현됩니다`,
      },
    },
  },
};

export const AsChildAnchor: Story = {
  render: args => (
    <FixedBox>
      <Thumbnail {...args} asChild>
        <a href='#example' aria-label='상세 페이지로 이동' />
      </Thumbnail>
    </FixedBox>
  ),
  parameters: {
    docs: {
      description: {
        story: `\`<a>\`를 root로 사용한 예 —\`href\`, focus 동작 모두 자식 element가 책임집니다`,
      },
    },
  },
};

export const DefaultFallback: Story = {
  args: { src: "https://invalid.example/broken.png" },
  render: args => (
    <FixedBox>
      <Thumbnail {...args} />
    </FixedBox>
  ),
  parameters: {
    docs: {
      description: {
        story: `src 로드 실패 시 기본 \`<ThumbnailFallback />\`(회색 블록 + 아이콘)이 렌더됩니다
다른 이미지 URL로 swap하지 않으므로 라이브러리가 placeholder 파일을 ship하지 않습니다`,
      },
    },
  },
};

export const CustomFallback: Story = {
  args: { src: undefined },
  render: args => (
    <FixedBox>
      <Thumbnail
        {...args}
        fallback={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: "#1f2937",
              color: "#9ca3af",
              fontSize: 13,
            }}
          >
            이미지 없음
          </div>
        }
      />
    </FixedBox>
  ),
  parameters: {
    docs: {
      description: {
        story: "`fallback` prop에 임의 ReactNode를 넘겨 placeholder를 완전히 대체할 수 있습니다",
      },
    },
  },
};

export const RatioMatrix: Story = {
  render: () => (
    <FlexColumn>
      {THUMBNAIL_RATIO_OPTIONS.map(ratio => (
        <FlexRow key={ratio}>
          <Label>{ratio}</Label>
          <div style={{ width: 120 }}>
            {ratio === "1:1" ? (
              <Thumbnail src={SAMPLE_SRC} alt={ratio} ratio='1:1' orientation='portrait' />
            ) : (
              <Thumbnail src={SAMPLE_SRC} alt={ratio} ratio={ratio} orientation='portrait' />
            )}
          </div>
          {ratio !== "1:1" && (
            <div style={{ width: 120 }}>
              <Thumbnail src={SAMPLE_SRC} alt={ratio} ratio={ratio} orientation='landscape' />
            </div>
          )}
        </FlexRow>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`ratio='1:1'`은 좌우대칭이라 landscape 셀이 비어 있습니다 — type-level에서 1:1+landscape를 차단합니다",
      },
    },
  },
};

export const CornerStyleVariants: Story = {
  render: () => (
    <FlexRow>
      {THUMBNAIL_CORNER_STYLE_OPTIONS.map(cornerStyle => (
        <FlexColumn key={cornerStyle}>
          <Label>{cornerStyle}</Label>
          <div style={{ width: 120 }}>
            <Thumbnail src={SAMPLE_SRC} alt={cornerStyle} cornerStyle={cornerStyle} ratio='1:1' />
          </div>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: "`rounded`는 `ratio='1:1'`에서만 적용됩니다 — 그 외 비율에서는 angular로 폴백됩니다",
      },
    },
  },
};

export const AsChildCornerStyleMatrix: Story = {
  render: () => (
    <FlexRow>
      {THUMBNAIL_CORNER_STYLE_OPTIONS.map(cornerStyle => (
        <FlexColumn key={cornerStyle}>
          <Label>{cornerStyle}</Label>
          <div style={{ width: 120 }}>
            <Thumbnail
              src={SAMPLE_SRC}
              alt={`${cornerStyle} 썸네일`}
              cornerStyle={cornerStyle}
              ratio='1:1'
              asChild
            >
              <button type='button' aria-label={`${cornerStyle} 썸네일 열기`} />
            </Thumbnail>
          </div>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story: `asChild로 각 cornerStyle을 인터랙티브(\`<button>\`)하게 렌더합니다
**Tab으로 포커스를 옮기면** focus ring이 angular(각짐) / curved / rounded 의 모서리 radius를 그대로 따라가는지 확인할 수 있습니다 (④ 검증용) hover / active dim도 함께 확인 가능 (\`rounded\`는 \`ratio='1:1'\`에서만 적용)`,
      },
    },
  },
};

export const AppearanceVariants: Story = {
  render: () => (
    <FlexRow>
      {THUMBNAIL_APPEARANCE_OPTIONS.map(appearance => (
        <FlexColumn key={appearance}>
          <Label>{appearance}</Label>
          <div style={{ width: 120 }}>
            <Thumbnail src={SAMPLE_SRC} alt={appearance} appearance={appearance} ratio='1:1' />
          </div>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};
