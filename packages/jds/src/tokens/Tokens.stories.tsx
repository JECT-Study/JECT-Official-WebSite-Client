import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { vars } from "tokens";

import {
  getBodyClassName,
  getLabelClassName,
  getSyntaxClassName,
  getTitleClassName,
} from "@/utils/typography";

const stackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: vars.scheme.semantic.spacing["16"],
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: vars.scheme.semantic.spacing["16"],
};

const labelSizes = ["lg", "md", "sm", "xs"] as const;
const labelWeights = ["bold", "normal", "subtle"] as const;
const titleSizes = ["2xl", "xl", "lg", "md", "sm", "xs"] as const;
const bodySizes = ["lg", "md", "sm", "xs", "2xs"] as const;
const bodyWeights = ["bold", "normal"] as const;
const syntaxSizes = ["lg", "md", "sm", "xs"] as const;
const primitiveColorSteps = [
  "25",
  "50",
  "75",
  "100",
  "150",
  "200",
  "300",
  "400",
  "500",
  "550",
  "600",
  "700",
  "750",
  "800",
  "850",
  "900",
] as const;
const primitiveShadeSteps = ["2", "4", "6", "8", "12", "16"] as const;
const semanticAccentTones = [
  "bolder",
  "bold",
  "normal",
  "neutral",
  "alternative",
  "assistive",
  "subtle",
  "subtler",
  "subtlest",
] as const;
const semanticObjectTones = ["boldest", ...semanticAccentTones] as const;
const semanticSurfaceTones = [
  "shallowest",
  "shallower",
  "shallow",
  "standard",
  "deep",
  "deeper",
  "deepest",
] as const;
const semanticStrokeTones = [
  "bold",
  "normal",
  "neutral",
  "alternative",
  "assistive",
  "subtle",
  "subtler",
  "subtlest",
] as const;
const schemeSpacingSteps = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "6",
  "8",
  "10",
  "12",
  "16",
  "20",
  "24",
  "28",
  "32",
  "40",
  "48",
  "56",
  "64",
  "72",
  "80",
  "96",
  "112",
  "128",
  "144",
] as const;
const schemeMarginSizes = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
] as const;
const schemeRadiusSteps = ["0", "2", "4", "6", "8", "10", "12", "16", "24", "max"] as const;
const schemeStrokeSteps = ["1", "2", "3", "4", "5", "6"] as const;
const schemeOpacitySteps = [
  "0",
  "5",
  "8",
  "12",
  "16",
  "23",
  "29",
  "36",
  "44",
  "54",
  "63",
  "76",
  "91",
  "100",
] as const;
const environmentDurationSteps = [
  "50",
  "100",
  "150",
  "200",
  "250",
  "300",
  "350",
  "400",
  "450",
  "500",
] as const;
const environmentMotionNames = ["bouncy", "fluent", "entrance", "leave"] as const;
const environmentShadowNames = ["embossed", "raised", "floated", "overlay"] as const;
const environmentZIndexNames = ["standard", "embossed", "raised", "floated", "overlay"] as const;

const toWeightLabel = (value: string) =>
  `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`;

const panelStyle: CSSProperties = {
  padding: vars.scheme.semantic.spacing["20"],
  border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
  borderRadius: vars.scheme.semantic.radius["8"],
  backgroundColor: vars.color.semantic.surface.shallow,
  color: vars.color.semantic.object.bold,
};

const TokenSection = ({ children, title }: { children: ReactNode; title: string }) => (
  <section style={stackStyle}>
    <h2 className={getTitleClassName({ size: "sm" })} style={{ margin: 0 }}>
      {title}
    </h2>
    {children}
  </section>
);

const ColorScale = ({
  colors,
  compact = false,
  title,
  tokenPath,
}: {
  colors: { color: string; label: string }[];
  compact?: boolean;
  title: string;
  tokenPath: string;
}) => (
  <article
    style={{
      ...panelStyle,
      minWidth: 0,
      boxSizing: "border-box",
      padding: vars.scheme.semantic.spacing["16"],
    }}
  >
    <h4 className={getLabelClassName({ size: "md", weight: "bold" })} style={{ margin: 0 }}>
      {title}
    </h4>
    <code
      className={getSyntaxClassName({ size: "xs" })}
      style={{
        display: "block",
        overflowWrap: "anywhere",
        color: vars.color.semantic.object.neutral,
      }}
    >
      {tokenPath}
    </code>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: compact
          ? "repeat(auto-fill, minmax(min(100%, 52px), 72px))"
          : "repeat(auto-fill, minmax(min(100%, 88px), 112px))",
        gap: vars.scheme.semantic.spacing["8"],
        marginTop: vars.scheme.semantic.spacing["16"],
      }}
    >
      {colors.map(({ color, label }) => (
        <div key={label} style={{ minWidth: 0 }}>
          <div
            aria-label={`${tokenPath}.${label} 색상`}
            style={{
              height: "56px",
              overflow: "hidden",
              border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
              borderRadius: vars.scheme.semantic.radius["4"],
              background: `linear-gradient(90deg, ${vars.colorPrimitive.primitive.base["0"]} 50%, ${vars.colorPrimitive.primitive.base["1000"]} 50%)`,
            }}
          >
            <div style={{ width: "100%", height: "100%", backgroundColor: color }} />
          </div>
          <code
            className={getSyntaxClassName({ size: "xs" })}
            style={{
              display: "block",
              marginTop: vars.scheme.semantic.spacing["4"],
              overflowWrap: "anywhere",
              textAlign: "center",
            }}
          >
            {label}
          </code>
        </div>
      ))}
    </div>
  </article>
);

const TypographyToken = ({
  children,
  label,
  sampleStyle,
}: {
  children: ReactNode;
  label: string;
  sampleStyle: CSSProperties;
}) => (
  <div style={{ ...panelStyle, padding: vars.scheme.semantic.spacing["12"] }}>
    <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
    <div style={{ marginTop: vars.scheme.semantic.spacing["12"] }}>
      <span
        style={{
          display: "inline-block",
          color: vars.color.semantic.object.bold,
          ...sampleStyle,
        }}
      >
        {children}
      </span>
    </div>
  </div>
);

const TokenSubsection = ({ children, title }: { children: ReactNode; title: string }) => (
  <section style={{ ...stackStyle, gap: vars.scheme.semantic.spacing["12"] }}>
    <h3 className={getTitleClassName({ size: "xs" })} style={{ margin: 0 }}>
      {title}
    </h3>
    {children}
  </section>
);

const TokenPanel = ({
  children,
  title,
  tokenPath,
}: {
  children: ReactNode;
  title: string;
  tokenPath: string;
}) => (
  <article
    style={{
      ...panelStyle,
      minWidth: 0,
      boxSizing: "border-box",
      padding: vars.scheme.semantic.spacing["16"],
    }}
  >
    <h4 className={getLabelClassName({ size: "md", weight: "bold" })} style={{ margin: 0 }}>
      {title}
    </h4>
    <code
      className={getSyntaxClassName({ size: "xs" })}
      style={{
        display: "block",
        overflowWrap: "anywhere",
        color: vars.color.semantic.object.neutral,
      }}
    >
      {tokenPath}
    </code>
    <div style={{ marginTop: vars.scheme.semantic.spacing["16"] }}>{children}</div>
  </article>
);

const TimingComparison = ({
  description,
  tracks,
}: {
  description: string;
  tracks: {
    duration: string;
    label: string;
    motion: string;
  }[];
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={stackStyle}>
      <p className={getBodyClassName({ size: "sm" })} style={{ margin: 0 }}>
        {description}
      </p>
      <button
        aria-pressed={isActive}
        className={getLabelClassName({ size: "sm", weight: "bold" })}
        onClick={() => setIsActive(current => !current)}
        style={{
          alignSelf: "flex-start",
          padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["12"]}`,
          border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
          borderRadius: vars.scheme.semantic.radius["4"],
          backgroundColor: vars.color.semantic.surface.shallow,
          color: vars.color.semantic.object.bold,
          cursor: "pointer",
        }}
        type='button'
      >
        비교하기
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: vars.scheme.semantic.spacing["12"],
        }}
      >
        {tracks.map(({ duration, label, motion }) => (
          <div
            key={label}
            style={{
              display: "grid",
              gridTemplateColumns: "72px minmax(0, 1fr)",
              alignItems: "center",
              gap: vars.scheme.semantic.spacing["8"],
            }}
          >
            <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
            <div
              aria-hidden='true'
              style={{
                position: "relative",
                height: "40px",
                borderRadius: vars.scheme.semantic.radius.max,
                backgroundColor: vars.color.semantic.surface.deep,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: vars.scheme.semantic.spacing["4"],
                  left: isActive ? "calc(100% - 32px)" : 0,
                  width: "32px",
                  height: "32px",
                  borderRadius: vars.scheme.semantic.radius.max,
                  backgroundColor: vars.color.semantic.object.bold,
                  transitionProperty: "left",
                  transitionDuration: duration,
                  transitionTimingFunction: motion,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LengthScale = ({
  items,
  title,
  tokenPath,
}: {
  items: { label: string; value: string }[];
  title: string;
  tokenPath: string;
}) => (
  <TokenPanel title={title} tokenPath={tokenPath}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
        gap: vars.scheme.semantic.spacing["12"],
      }}
    >
      {items.map(({ label, value }) => (
        <div
          key={label}
          style={{
            display: "grid",
            gridTemplateColumns: "40px minmax(0, 1fr)",
            alignItems: "center",
            gap: vars.scheme.semantic.spacing["8"],
            minWidth: 0,
          }}
        >
          <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
          <div
            style={{
              height: "8px",
              overflow: "hidden",
              borderRadius: vars.scheme.semantic.radius.max,
              backgroundColor: vars.color.semantic.surface.deep,
            }}
          >
            <div
              style={{
                width: value,
                maxWidth: "100%",
                height: "100%",
                backgroundColor: vars.color.semantic.object.bold,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </TokenPanel>
);

const TypographyScaleGroup = ({
  items,
  tokenPath,
  title,
}: {
  items: {
    fontFamily: string;
    fontSize: string;
    label: string;
    letterSpacing?: string;
    lineHeight: string;
  }[];
  tokenPath: string;
  title: string;
}) => (
  <article
    style={{
      ...panelStyle,
      minWidth: 0,
      boxSizing: "border-box",
      padding: vars.scheme.semantic.spacing["16"],
    }}
  >
    <h4 className={getLabelClassName({ size: "md", weight: "bold" })} style={{ margin: 0 }}>
      {title}
    </h4>
    <code
      className={getSyntaxClassName({ size: "xs" })}
      style={{
        display: "block",
        overflowWrap: "anywhere",
        color: vars.color.semantic.object.neutral,
      }}
    >
      {tokenPath}
    </code>
    <div style={{ marginTop: vars.scheme.semantic.spacing["12"] }}>
      {items.map(({ fontFamily, fontSize, label, letterSpacing, lineHeight }, index) => (
        <div
          key={label}
          style={{
            display: "grid",
            gridTemplateColumns: "32px minmax(0, 1fr)",
            alignItems: "baseline",
            gap: vars.scheme.semantic.spacing["8"],
            padding: `${vars.scheme.semantic.spacing["12"]} 0`,
            borderTop:
              index === 0
                ? undefined
                : `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
          }}
        >
          <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
          <span
            style={{
              minWidth: 0,
              overflowWrap: "anywhere",
              color: vars.color.semantic.object.bold,
              fontFamily,
              fontSize,
              lineHeight,
              letterSpacing,
            }}
          >
            JDS Typography
          </span>
        </div>
      ))}
    </div>
  </article>
);

const TypographyWeightGroup = ({
  fontFamily,
  items,
  title,
}: {
  fontFamily: string;
  items: { fontWeight: string; label: string }[];
  title: string;
}) => (
  <article style={{ ...panelStyle, padding: vars.scheme.semantic.spacing["16"] }}>
    <h4 className={getLabelClassName({ size: "md", weight: "bold" })} style={{ margin: 0 }}>
      {title}
    </h4>
    <code
      className={getSyntaxClassName({ size: "xs" })}
      style={{ color: vars.color.semantic.object.neutral }}
    >
      fontWeight.{title.toLowerCase()}
    </code>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: vars.scheme.semantic.spacing["12"],
        marginTop: vars.scheme.semantic.spacing["16"],
      }}
    >
      {items.map(({ fontWeight, label }) => (
        <div
          key={label}
          style={{
            display: "grid",
            gridTemplateColumns: "64px minmax(0, 1fr)",
            alignItems: "baseline",
            gap: vars.scheme.semantic.spacing["12"],
          }}
        >
          <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
          <span style={{ fontFamily, fontWeight }}>JDS Typography</span>
        </div>
      ))}
    </div>
  </article>
);

const TextStylePanel = ({ children }: { children: ReactNode }) => (
  <article
    style={{
      ...panelStyle,
      minWidth: 0,
      boxSizing: "border-box",
      padding: `0 ${vars.scheme.semantic.spacing["16"]}`,
    }}
  >
    {children}
  </article>
);

const TextStyleRow = ({
  children,
  divided,
  label,
}: {
  children: ReactNode;
  divided?: boolean;
  label: string;
}) => (
  <div
    style={{
      minWidth: 0,
      padding: `${vars.scheme.semantic.spacing["16"]} 0`,
      borderTop: divided
        ? `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`
        : undefined,
    }}
  >
    <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
    <div
      style={{
        minWidth: 0,
        marginTop: vars.scheme.semantic.spacing["8"],
        overflowWrap: "anywhere",
      }}
    >
      {children}
    </div>
  </div>
);

const TextStyleVariants = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
      gap: vars.scheme.semantic.spacing["16"],
    }}
  >
    {children}
  </div>
);

const TextStyleVariant = ({ children, label }: { children: ReactNode; label: string }) => (
  <div style={{ minWidth: 0 }}>
    <code
      className={getSyntaxClassName({ size: "xs" })}
      style={{ color: vars.color.semantic.object.neutral }}
    >
      {label}
    </code>
    <div style={{ minWidth: 0, marginTop: vars.scheme.semantic.spacing["4"] }}>{children}</div>
  </div>
);

const meta = {
  title: "Design Tokens/Token Usage",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HowToUseTokens: Story = {
  render: () => (
    <article style={{ ...panelStyle, maxWidth: "560px" }}>
      <h2 className={getTitleClassName({ size: "sm" })} style={{ margin: 0 }}>
        기본 카드 컴포넌트
      </h2>
      <p
        className={getBodyClassName({ size: "md" })}
        style={{
          margin: `${vars.scheme.semantic.spacing["8"]} 0 ${vars.scheme.semantic.spacing["16"]}`,
          color: vars.color.semantic.object.neutral,
        }}
      >
        토큰을 사용한 기본적인 카드 레이아웃입니다.
      </p>
      <button
        className={getLabelClassName({ size: "md", weight: "bold" })}
        style={{
          padding: `${vars.scheme.semantic.spacing["8"]} ${vars.scheme.semantic.spacing["16"]}`,
          border: 0,
          borderRadius: vars.scheme.semantic.radius["4"],
          backgroundColor: vars.color.semantic.accent.normal,
          color: vars.color.semantic.object.inverse.bold,
          cursor: "pointer",
        }}
        type='button'
      >
        액션 버튼
      </button>
    </article>
  ),
};

export const ColorPrimitive: Story = {
  render: () => (
    <TokenSection title='Color Primitive Tokens'>
      <TokenSubsection title='Base & Shade'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: vars.scheme.semantic.spacing["16"],
          }}
        >
          <ColorScale
            compact
            title='Base'
            tokenPath='colorPrimitive.primitive.base'
            colors={(["0", "1000"] as const).map(label => ({
              label,
              color: vars.colorPrimitive.primitive.base[label],
            }))}
          />
          <ColorScale
            compact
            title='Shade'
            tokenPath='colorPrimitive.primitive.shade'
            colors={primitiveShadeSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.shade[label],
            }))}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Flow'>
        <div style={stackStyle}>
          <ColorScale
            compact
            title='Default'
            tokenPath='colorPrimitive.primitive.flow'
            colors={primitiveColorSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.flow[label],
            }))}
          />
          <ColorScale
            compact
            title='Dark'
            tokenPath='colorPrimitive.primitive.flow.dark'
            colors={primitiveColorSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.flow.dark[label],
            }))}
          />
          <ColorScale
            compact
            title='Alpha'
            tokenPath='colorPrimitive.primitive.flow.alpha'
            colors={primitiveColorSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.flow.alpha[label],
            }))}
          />
          <ColorScale
            compact
            title='Dark Alpha'
            tokenPath='colorPrimitive.primitive.flow.dark.alpha'
            colors={primitiveColorSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.flow.dark.alpha[label],
            }))}
          />
        </div>
      </TokenSubsection>
    </TokenSection>
  ),
  parameters: {
    docs: {
      description: {
        story: "Base, shade와 Flow의 기본·다크·투명도 primitive 색상 단계를 모두 보여줍니다.",
      },
    },
  },
};

export const ColorSemantic: Story = {
  render: () => (
    <TokenSection title='Color Semantic Tokens'>
      <TokenSubsection title='Emphasis & Content'>
        <div style={stackStyle}>
          <ColorScale
            title='Accent'
            tokenPath='color.semantic.accent'
            colors={semanticAccentTones.map(label => ({
              label,
              color: vars.color.semantic.accent[label],
            }))}
          />
          <ColorScale
            title='Object'
            tokenPath='color.semantic.object'
            colors={semanticObjectTones.map(label => ({
              label,
              color: vars.color.semantic.object[label],
            }))}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Layers & Boundaries'>
        <div style={stackStyle}>
          <ColorScale
            title='Surface'
            tokenPath='color.semantic.surface'
            colors={semanticSurfaceTones.map(label => ({
              label,
              color: vars.color.semantic.surface[label],
            }))}
          />
          <ColorScale
            title='Fill'
            tokenPath='color.semantic.fill'
            colors={semanticObjectTones.map(label => ({
              label,
              color: vars.color.semantic.fill[label],
            }))}
          />
          <ColorScale
            title='Stroke'
            tokenPath='color.semantic.stroke'
            colors={semanticStrokeTones.map(label => ({
              label,
              color: vars.color.semantic.stroke[label],
            }))}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='System & Overlay'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: vars.scheme.semantic.spacing["16"],
          }}
        >
          <ColorScale
            title='System'
            tokenPath='color.semantic.system'
            colors={(["white", "black"] as const).map(label => ({
              label,
              color: vars.color.semantic.system[label],
            }))}
          />
          <ColorScale
            title='Curtain'
            tokenPath='color.semantic.curtain'
            colors={[
              { label: "standard", color: vars.color.semantic.curtain.standard },
              { label: "static.bright", color: vars.color.semantic.curtain.static.bright },
              { label: "static.dim", color: vars.color.semantic.curtain.static.dim },
              { label: "static.dimmer", color: vars.color.semantic.curtain.static.dimmer },
            ]}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Feedback'>
        <div style={stackStyle}>
          <ColorScale
            title='Positive'
            tokenPath='color.semantic.feedback.positive'
            colors={semanticAccentTones.map(label => ({
              label,
              color: vars.color.semantic.feedback.positive[label],
            }))}
          />
          <ColorScale
            title='Destructive'
            tokenPath='color.semantic.feedback.destructive'
            colors={semanticAccentTones.map(label => ({
              label,
              color: vars.color.semantic.feedback.destructive[label],
            }))}
          />
          <ColorScale
            title='Notifying'
            tokenPath='color.semantic.feedback.notifying'
            colors={semanticAccentTones.map(label => ({
              label,
              color: vars.color.semantic.feedback.notifying[label],
            }))}
          />
        </div>
      </TokenSubsection>
    </TokenSection>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Semantic 색상의 주요 역할을 용도별로 보여줍니다. Storybook 툴바에서 Light/Dark 테마를 전환하면 동일한 토큰의 값이 변경됩니다.",
      },
    },
  },
};

export const Typography: Story = {
  render: () => (
    <TokenSection title='Typography Primitive Tokens'>
      <TokenSubsection title='Typeface'>
        <div style={gridStyle}>
          <TypographyToken
            label='typeface.title'
            sampleStyle={{ fontFamily: vars.typo.primitive.typeface.title }}
          >
            Title Typeface
          </TypographyToken>
          <TypographyToken
            label='typeface.label'
            sampleStyle={{ fontFamily: vars.typo.primitive.typeface.label }}
          >
            Label Typeface
          </TypographyToken>
          <TypographyToken
            label='typeface.body'
            sampleStyle={{ fontFamily: vars.typo.primitive.typeface.body }}
          >
            Body Typeface
          </TypographyToken>
          <TypographyToken
            label='typeface.syntax'
            sampleStyle={{ fontFamily: vars.typo.primitive.typeface.syntax }}
          >
            const token = &quot;JDS&quot;;
          </TypographyToken>
        </div>
      </TokenSubsection>

      <TokenSubsection title='Type Scale'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: vars.scheme.semantic.spacing["16"],
          }}
        >
          <TypographyScaleGroup
            title='Title'
            tokenPath='fontSize.title · font.lineHeight.title · font.letterSpacing.title'
            items={(["6", "5", "4", "3", "2", "1"] as const).map(label => ({
              label,
              fontFamily: vars.typo.primitive.typeface.title,
              fontSize: vars.typo.primitive.fontSize.title[label],
              lineHeight: vars.typo.primitive.font.lineHeight.title[label],
              letterSpacing: vars.typo.primitive.font.letterSpacing.title[label],
            }))}
          />
          <TypographyScaleGroup
            title='Body'
            tokenPath='fontSize.body · font.lineHeight.body · font.letterSpacing.body'
            items={(["lg", "md", "sm", "xs", "2xs"] as const).map(label => ({
              label,
              fontFamily: vars.typo.primitive.typeface.body,
              fontSize: vars.typo.primitive.fontSize.body[label],
              lineHeight: vars.typo.primitive.font.lineHeight.body[label],
              letterSpacing: vars.typo.primitive.font.letterSpacing.body[label],
            }))}
          />
          <TypographyScaleGroup
            title='Label'
            tokenPath='fontSize.label · font.lineHeight.label · font.letterSpacing.label'
            items={(["lg", "md", "sm", "xs"] as const).map(label => ({
              label,
              fontFamily: vars.typo.primitive.typeface.label,
              fontSize: vars.typo.primitive.fontSize.label[label],
              lineHeight: vars.typo.primitive.font.lineHeight.label[label],
              letterSpacing: vars.typo.primitive.font.letterSpacing.label[label],
            }))}
          />
          <TypographyScaleGroup
            title='Syntax'
            tokenPath='fontSize.syntax · font.lineHeight.syntax'
            items={(["lg", "md", "sm", "xs"] as const).map(label => ({
              label,
              fontFamily: vars.typo.primitive.typeface.syntax,
              fontSize: vars.typo.primitive.fontSize.syntax[label],
              lineHeight: vars.typo.primitive.font.lineHeight.syntax[label],
            }))}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Font Weight'>
        <div style={gridStyle}>
          <TypographyWeightGroup
            title='Title'
            fontFamily={vars.typo.primitive.typeface.title}
            items={[
              { label: "normal", fontWeight: vars.typo.primitive.fontWeight.title.normal },
              { label: "bold", fontWeight: vars.typo.primitive.fontWeight.title.bold },
              { label: "subtle", fontWeight: vars.typo.primitive.fontWeight.title.subtle },
            ]}
          />
          <TypographyWeightGroup
            title='Label'
            fontFamily={vars.typo.primitive.typeface.label}
            items={[
              { label: "normal", fontWeight: vars.typo.primitive.fontWeight.label.normal },
              { label: "bold", fontWeight: vars.typo.primitive.fontWeight.label.bold },
              { label: "subtle", fontWeight: vars.typo.primitive.fontWeight.label.subtle },
            ]}
          />
          <TypographyWeightGroup
            title='Body'
            fontFamily={vars.typo.primitive.typeface.body}
            items={[
              { label: "normal", fontWeight: vars.typo.primitive.fontWeight.body.normal },
              { label: "bold", fontWeight: vars.typo.primitive.fontWeight.body.bold },
            ]}
          />
          <TypographyWeightGroup
            title='Syntax'
            fontFamily={vars.typo.primitive.typeface.syntax}
            items={[{ label: "normal", fontWeight: vars.typo.primitive.fontWeight.syntax.normal }]}
          />
        </div>
      </TokenSubsection>
    </TokenSection>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Typography primitive를 서체, 역할별 크기 체계, 굵기로 나누어 보여줍니다. 조합된 typography는 TextStyle 스토리에서 확인할 수 있습니다.",
      },
    },
  },
};

export const Scheme: Story = {
  render: () => (
    <TokenSection title='Scheme Tokens'>
      <TokenSubsection title='Layout'>
        <div style={stackStyle}>
          <LengthScale
            title='Spacing'
            tokenPath='scheme.semantic.spacing'
            items={schemeSpacingSteps.map(label => ({
              label,
              value: vars.scheme.semantic.spacing[label],
            }))}
          />
          <LengthScale
            title='Margin'
            tokenPath='scheme.semantic.margin'
            items={schemeMarginSizes.map(label => ({
              label,
              value: vars.scheme.semantic.margin[label],
            }))}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Shape & Border'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: vars.scheme.semantic.spacing["16"],
          }}
        >
          <TokenPanel title='Radius' tokenPath='scheme.semantic.radius'>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 64px), 1fr))",
                gap: vars.scheme.semantic.spacing["12"],
              }}
            >
              {schemeRadiusSteps.map(label => (
                <div key={label} style={{ minWidth: 0, textAlign: "center" }}>
                  <div
                    aria-label={`radius.${label} 모서리`}
                    style={{
                      width: "64px",
                      maxWidth: "100%",
                      aspectRatio: "1",
                      margin: "0 auto",
                      border: `${vars.scheme.semantic.strokeWeight["2"]} solid ${vars.color.semantic.object.bold}`,
                      borderRadius: vars.scheme.semantic.radius[label],
                      backgroundColor: vars.color.semantic.surface.deep,
                    }}
                  />
                  <code
                    className={getSyntaxClassName({ size: "xs" })}
                    style={{ display: "block", marginTop: vars.scheme.semantic.spacing["4"] }}
                  >
                    {label}
                  </code>
                </div>
              ))}
            </div>
          </TokenPanel>

          <TokenPanel title='Stroke Weight' tokenPath='scheme.semantic.strokeWeight'>
            <div style={{ ...stackStyle, gap: vars.scheme.semantic.spacing["12"] }}>
              {schemeStrokeSteps.map(label => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px minmax(0, 1fr)",
                    alignItems: "center",
                    gap: vars.scheme.semantic.spacing["8"],
                  }}
                >
                  <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
                  <div
                    aria-label={`strokeWeight.${label} 선`}
                    style={{
                      borderTop: `${vars.scheme.semantic.strokeWeight[label]} solid ${vars.color.semantic.object.bold}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </TokenPanel>
        </div>
      </TokenSubsection>

      <TokenSubsection title='Visibility'>
        <TokenPanel title='Opacity' tokenPath='scheme.semantic.opacity'>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 64px), 88px))",
              gap: vars.scheme.semantic.spacing["12"],
            }}
          >
            {schemeOpacitySteps.map(label => (
              <div key={label} style={{ minWidth: 0, textAlign: "center" }}>
                <div
                  aria-label={`opacity.${label} 투명도`}
                  style={{
                    height: "56px",
                    overflow: "hidden",
                    borderRadius: vars.scheme.semantic.radius["4"],
                    backgroundColor: vars.color.semantic.surface.deep,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: vars.color.semantic.object.bold,
                      opacity: `calc(${vars.scheme.semantic.opacity[label]} / 100)`,
                    }}
                  />
                </div>
                <code
                  className={getSyntaxClassName({ size: "xs" })}
                  style={{ display: "block", marginTop: vars.scheme.semantic.spacing["4"] }}
                >
                  {label}
                </code>
              </div>
            ))}
          </div>
        </TokenPanel>
      </TokenSubsection>
    </TokenSection>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Spacing, margin, radius, stroke weight, opacity의 전체 semantic 단계를 속성에 맞는 형태로 보여줍니다. Margin은 viewport에 따라 실제 값이 변경됩니다.",
      },
    },
  },
};

export const Environment: Story = {
  render: () => (
    <TokenSection title='Environment Tokens'>
      <TokenSubsection title='Timing'>
        <div style={stackStyle}>
          <TokenPanel title='Duration' tokenPath='environment.semantic.duration'>
            <TimingComparison
              description='같은 fluent motion으로 같은 거리를 이동하며 duration 차이를 비교합니다.'
              tracks={environmentDurationSteps.map(label => ({
                label: `${label}ms`,
                duration: vars.environment.semantic.duration[label],
                motion: vars.environment.semantic.motion.fluent,
              }))}
            />
          </TokenPanel>

          <TokenPanel title='Motion' tokenPath='environment.semantic.motion'>
            <TimingComparison
              description='같은 500ms duration으로 같은 거리를 이동하며 motion 차이를 비교합니다.'
              tracks={environmentMotionNames.map(label => ({
                label,
                duration: vars.environment.semantic.duration["500"],
                motion: vars.environment.semantic.motion[label],
              }))}
            />
          </TokenPanel>
        </div>
      </TokenSubsection>

      <TokenSubsection title='Elevation'>
        <div style={stackStyle}>
          <TokenPanel title='Shadow' tokenPath='environment.semantic.shadow'>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                gap: vars.scheme.semantic.spacing["24"],
                padding: vars.scheme.semantic.spacing["8"],
              }}
            >
              {environmentShadowNames.map(label => (
                <div
                  key={label}
                  style={{
                    minHeight: "72px",
                    boxSizing: "border-box",
                    padding: vars.scheme.semantic.spacing["16"],
                    borderRadius: vars.scheme.semantic.radius["8"],
                    backgroundColor: vars.color.semantic.surface.shallow,
                    boxShadow: vars.environment.semantic.shadow[label],
                  }}
                >
                  <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
                </div>
              ))}
            </div>
          </TokenPanel>

          <TokenPanel title='Z-index' tokenPath='environment.semantic.zIndex'>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "400px",
                height: "232px",
              }}
            >
              {environmentZIndexNames.map((label, index) => (
                <div
                  key={label}
                  style={{
                    position: "absolute",
                    top: `${index * 36}px`,
                    left: `${index * 24}px`,
                    zIndex: vars.environment.semantic.zIndex[label],
                    width: "min(240px, calc(100% - 96px))",
                    height: "88px",
                    boxSizing: "border-box",
                    padding: vars.scheme.semantic.spacing["12"],
                    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
                    borderRadius: vars.scheme.semantic.radius["8"],
                    backgroundColor: vars.color.semantic.surface.shallow,
                    boxShadow:
                      label === "standard" ? undefined : vars.environment.semantic.shadow[label],
                  }}
                >
                  <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
                </div>
              ))}
            </div>
          </TokenPanel>
        </div>
      </TokenSubsection>
    </TokenSection>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Duration, motion, shadow, z-index의 전체 semantic 토큰을 보여줍니다. Timing 패널의 비교하기 버튼을 누르면 시간과 easing 차이를 각각 확인할 수 있습니다.",
      },
    },
  },
};

export const TextStyle: Story = {
  render: () => (
    <div style={stackStyle}>
      <TokenSection title='Title Styles'>
        <TextStylePanel>
          {titleSizes.map((size, index) => (
            <TextStyleRow key={size} divided={index > 0} label={size.toUpperCase()}>
              <span className={getTitleClassName({ size })}>
                Title {size.toUpperCase()} - All text properties applied
              </span>
            </TextStyleRow>
          ))}
        </TextStylePanel>
      </TokenSection>

      <TokenSection title='Label Styles'>
        <TextStylePanel>
          {labelSizes.map((size, index) => (
            <TextStyleRow key={size} divided={index > 0} label={size.toUpperCase()}>
              <TextStyleVariants>
                {labelWeights.map(weight => {
                  const weightLabel = toWeightLabel(weight);

                  return (
                    <TextStyleVariant key={weight} label={weightLabel}>
                      <span className={getLabelClassName({ size, weight })}>
                        All text properties applied
                      </span>
                    </TextStyleVariant>
                  );
                })}
              </TextStyleVariants>
            </TextStyleRow>
          ))}
        </TextStylePanel>
      </TokenSection>

      <TokenSection title='Body Styles'>
        <TextStylePanel>
          {bodySizes.map((size, index) => (
            <TextStyleRow key={size} divided={index > 0} label={size.toUpperCase()}>
              <TextStyleVariants>
                {bodyWeights.map(weight => {
                  const weightLabel = toWeightLabel(weight);

                  return (
                    <TextStyleVariant key={weight} label={weightLabel}>
                      <span className={getBodyClassName({ size, weight })}>
                        All text properties applied
                      </span>
                    </TextStyleVariant>
                  );
                })}
              </TextStyleVariants>
            </TextStyleRow>
          ))}
        </TextStylePanel>
      </TokenSection>

      <TokenSection title='Syntax Styles'>
        <TextStylePanel>
          {syntaxSizes.map((size, index) => (
            <TextStyleRow key={size} divided={index > 0} label={size.toUpperCase()}>
              <code className={getSyntaxClassName({ size })}>
                Syntax {size.toUpperCase()} - All text properties applied
              </code>
            </TextStyleRow>
          ))}
        </TextStylePanel>
      </TokenSection>
    </div>
  ),
};

export const AllTokensCombined: Story = {
  render: () => (
    <article
      style={{
        ...panelStyle,
        maxWidth: "640px",
        boxShadow: vars.environment.semantic.shadow.raised,
      }}
    >
      <h2 className={getTitleClassName({ size: "sm" })} style={{ margin: 0 }}>
        JDS Design Token
      </h2>
      <p
        className={getBodyClassName({ size: "md" })}
        style={{
          margin: `${vars.scheme.semantic.spacing["8"]} 0 0`,
          color: vars.color.semantic.object.neutral,
        }}
      >
        Semantic color, scheme, typography, environment 토큰을 함께 적용한 예시입니다.
      </p>
      <span
        className={getLabelClassName({ size: "sm", weight: "bold" })}
        style={{
          display: "inline-block",
          marginTop: vars.scheme.semantic.spacing["16"],
          padding: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["8"]}`,
          borderRadius: vars.scheme.semantic.radius.max,
          backgroundColor: vars.color.semantic.accent.alpha.subtlest,
          color: vars.color.semantic.accent.normal,
        }}
      >
        Token based UI
      </span>
    </article>
  ),
};
