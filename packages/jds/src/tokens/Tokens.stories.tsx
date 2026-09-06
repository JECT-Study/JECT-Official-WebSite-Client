import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { vars } from "tokens";

import {
  getBodyClassName,
  getLabelClassName,
  getSyntaxClassName,
  getTitleClassName,
} from "@/utils/typography";

const labelWeights = ["bold", "normal", "subtle"] as const;
const titleSizes = ["2xl", "xl", "lg", "md", "sm", "xs"] as const;
const bodyWeights = ["bold", "normal"] as const;
const marginSizeOrder = [
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
const semanticToneOrder = [
  "boldest",
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
const surfaceToneOrder = [
  "shallowest",
  "shallower",
  "shallow",
  "standard",
  "deep",
  "deeper",
  "deepest",
] as const;
const motionOrder = ["bouncy", "fluent", "entrance", "leave"] as const;

const tokenKeys = <Tokens extends Record<string, string>>(tokens: Tokens) =>
  Object.keys(tokens) as (keyof Tokens & string)[];

const tokenValue = (tokens: Record<string, string>, label: string) => tokens[label];

const tokenItems = (tokens: Record<string, unknown>) =>
  Object.entries(tokens).flatMap(([label, value]) =>
    typeof value === "string" ? [{ label, value }] : [],
  );

const sortByLabelOrder = <Item extends { label: string }>(
  items: Item[],
  order: readonly string[],
) =>
  items.sort((a, b) => {
    const aIndex = order.indexOf(a.label);
    const bIndex = order.indexOf(b.label);

    return (aIndex < 0 ? order.length : aIndex) - (bIndex < 0 ? order.length : bIndex);
  });

const colorItems = (tokens: Record<string, unknown>) =>
  tokenItems(tokens).map(({ label, value: color }) => ({ color, label }));

const semanticColorItems = (tokens: Record<string, unknown>) =>
  sortByLabelOrder(colorItems(tokens), semanticToneOrder);

const surfaceColorItems = (tokens: Record<string, unknown>) =>
  sortByLabelOrder(colorItems(tokens), surfaceToneOrder);

const toWeightLabel = (value: string) =>
  `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`;

const stackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: vars.scheme.semantic.spacing["16"],
};

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

type TypographyProperty = "fontFamily" | "fontSize" | "fontWeight" | "letterSpacing" | "lineHeight";

const typographyPropertyLabels: Record<TypographyProperty, string> = {
  fontFamily: "Font family",
  fontSize: "Font size",
  fontWeight: "Font weight",
  letterSpacing: "Letter spacing",
  lineHeight: "Line height",
};

const TypographyPrimitiveRow = ({
  divided,
  label,
  properties,
  sampleStyle,
}: {
  divided: boolean;
  label: string;
  properties: TypographyProperty[];
  sampleStyle: CSSProperties;
}) => {
  const sampleRef = useRef<HTMLSpanElement>(null);
  const [computedValues, setComputedValues] = useState<Partial<Record<TypographyProperty, string>>>(
    {},
  );

  useEffect(() => {
    const updateComputedValues = () => {
      if (!sampleRef.current) return;

      const computedStyle = window.getComputedStyle(sampleRef.current);

      setComputedValues({
        fontFamily: computedStyle.fontFamily,
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        letterSpacing: computedStyle.letterSpacing,
        lineHeight: computedStyle.lineHeight,
      });
    };

    updateComputedValues();
    window.addEventListener("resize", updateComputedValues);

    return () => window.removeEventListener("resize", updateComputedValues);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px minmax(0, 1fr) auto",
        alignItems: "center",
        gap: vars.scheme.semantic.spacing["12"],
        minWidth: 0,
        padding: `${vars.scheme.semantic.spacing["12"]} 0`,
        borderTop: divided
          ? `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`
          : undefined,
      }}
    >
      <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: `${vars.scheme.semantic.spacing["4"]} ${vars.scheme.semantic.spacing["12"]}`,
          minWidth: 0,
        }}
      >
        {properties.map(property => (
          <span
            key={property}
            style={{
              display: "inline-flex",
              gap: vars.scheme.semantic.spacing["4"],
              minWidth: 0,
            }}
          >
            <span
              className={getLabelClassName({ size: "xs", weight: "normal" })}
              style={{ color: vars.color.semantic.object.neutral }}
            >
              {typographyPropertyLabels[property]}
            </span>
            <code
              className={getSyntaxClassName({ size: "xs" })}
              style={{ overflowWrap: "anywhere" }}
            >
              {computedValues[property] ?? "-"}
            </code>
          </span>
        ))}
      </div>
      <span
        ref={sampleRef}
        aria-hidden='true'
        style={{
          minWidth: "48px",
          color: vars.color.semantic.object.bold,
          textAlign: "center",
          ...sampleStyle,
        }}
      >
        Aa
      </span>
    </div>
  );
};

const TypographyPrimitiveGroup = ({
  items,
  properties,
  title,
  tokenPath,
}: {
  items: { label: string; sampleStyle: CSSProperties }[];
  properties: TypographyProperty[];
  title: string;
  tokenPath: string;
}) => (
  <TokenPanel title={title} tokenPath={tokenPath}>
    {items.map(({ label, sampleStyle }, index) => (
      <TypographyPrimitiveRow
        key={label}
        divided={index > 0}
        label={label}
        properties={properties}
        sampleStyle={sampleStyle}
      />
    ))}
  </TokenPanel>
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
            colors={colorItems(vars.colorPrimitive.primitive.base)}
          />
          <ColorScale
            compact
            title='Shade'
            tokenPath='colorPrimitive.primitive.shade'
            colors={colorItems(vars.colorPrimitive.primitive.shade)}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Flow'>
        <div style={stackStyle}>
          <ColorScale
            compact
            title='Default'
            tokenPath='colorPrimitive.primitive.flow'
            colors={colorItems(vars.colorPrimitive.primitive.flow)}
          />
          <ColorScale
            compact
            title='Dark'
            tokenPath='colorPrimitive.primitive.flow.dark'
            colors={colorItems(vars.colorPrimitive.primitive.flow.dark)}
          />
          <ColorScale
            compact
            title='Alpha'
            tokenPath='colorPrimitive.primitive.flow.alpha'
            colors={colorItems(vars.colorPrimitive.primitive.flow.alpha)}
          />
          <ColorScale
            compact
            title='Dark Alpha'
            tokenPath='colorPrimitive.primitive.flow.dark.alpha'
            colors={colorItems(vars.colorPrimitive.primitive.flow.dark.alpha)}
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
            colors={semanticColorItems(vars.color.semantic.accent)}
          />
          <ColorScale
            title='Object'
            tokenPath='color.semantic.object'
            colors={semanticColorItems(vars.color.semantic.object)}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Layers & Boundaries'>
        <div style={stackStyle}>
          <ColorScale
            title='Surface'
            tokenPath='color.semantic.surface'
            colors={surfaceColorItems(vars.color.semantic.surface)}
          />
          <ColorScale
            title='Fill'
            tokenPath='color.semantic.fill'
            colors={semanticColorItems(vars.color.semantic.fill)}
          />
          <ColorScale
            title='Stroke'
            tokenPath='color.semantic.stroke'
            colors={semanticColorItems(vars.color.semantic.stroke)}
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
            colors={colorItems(vars.color.semantic.system)}
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
            colors={semanticColorItems(vars.color.semantic.feedback.positive)}
          />
          <ColorScale
            title='Destructive'
            tokenPath='color.semantic.feedback.destructive'
            colors={semanticColorItems(vars.color.semantic.feedback.destructive)}
          />
          <ColorScale
            title='Notifying'
            tokenPath='color.semantic.feedback.notifying'
            colors={semanticColorItems(vars.color.semantic.feedback.notifying)}
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
      <TypographyPrimitiveGroup
        title='Typeface'
        tokenPath='typo.primitive.typeface'
        properties={["fontFamily"]}
        items={(["title", "label", "body", "syntax"] as const).map(label => ({
          label,
          sampleStyle: { fontFamily: vars.typo.primitive.typeface[label] },
        }))}
      />

      <TokenSubsection title='Type Scale'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: vars.scheme.semantic.spacing["16"],
          }}
        >
          <TypographyPrimitiveGroup
            title='Title'
            tokenPath='typo.primitive.fontSize.title · typo.primitive.font.lineHeight.title · typo.primitive.font.letterSpacing.title'
            properties={["fontSize", "lineHeight", "letterSpacing"]}
            items={tokenKeys(vars.typo.primitive.fontSize.title)
              .reverse()
              .map(label => ({
                label,
                sampleStyle: {
                  fontFamily: vars.typo.primitive.typeface.title,
                  fontSize: vars.typo.primitive.fontSize.title[label],
                  lineHeight: vars.typo.primitive.font.lineHeight.title[label],
                  letterSpacing: vars.typo.primitive.font.letterSpacing.title[label],
                },
              }))}
          />
          <TypographyPrimitiveGroup
            title='Body'
            tokenPath='typo.primitive.fontSize.body · typo.primitive.font.lineHeight.body · typo.primitive.font.letterSpacing.body'
            properties={["fontSize", "lineHeight", "letterSpacing"]}
            items={tokenKeys(vars.typo.primitive.fontSize.body).map(label => ({
              label,
              sampleStyle: {
                fontFamily: vars.typo.primitive.typeface.body,
                fontSize: vars.typo.primitive.fontSize.body[label],
                lineHeight: vars.typo.primitive.font.lineHeight.body[label],
                letterSpacing: vars.typo.primitive.font.letterSpacing.body[label],
              },
            }))}
          />
          <TypographyPrimitiveGroup
            title='Label'
            tokenPath='typo.primitive.fontSize.label · typo.primitive.font.lineHeight.label · typo.primitive.font.letterSpacing.label'
            properties={["fontSize", "lineHeight", "letterSpacing"]}
            items={tokenKeys(vars.typo.primitive.fontSize.label).map(label => ({
              label,
              sampleStyle: {
                fontFamily: vars.typo.primitive.typeface.label,
                fontSize: vars.typo.primitive.fontSize.label[label],
                lineHeight: vars.typo.primitive.font.lineHeight.label[label],
                letterSpacing: vars.typo.primitive.font.letterSpacing.label[label],
              },
            }))}
          />
          <TypographyPrimitiveGroup
            title='Syntax'
            tokenPath='typo.primitive.fontSize.syntax · typo.primitive.font.lineHeight.syntax'
            properties={["fontSize", "lineHeight"]}
            items={tokenKeys(vars.typo.primitive.fontSize.syntax).map(label => ({
              label,
              sampleStyle: {
                fontFamily: vars.typo.primitive.typeface.syntax,
                fontSize: vars.typo.primitive.fontSize.syntax[label],
                lineHeight: vars.typo.primitive.font.lineHeight.syntax[label],
              },
            }))}
          />
        </div>
      </TokenSubsection>

      <TokenSubsection title='Font Weight'>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: vars.scheme.semantic.spacing["16"],
          }}
        >
          <TypographyPrimitiveGroup
            title='Title'
            tokenPath='typo.primitive.fontWeight.title'
            properties={["fontWeight"]}
            items={tokenKeys(vars.typo.primitive.fontWeight.title).map(label => ({
              label,
              sampleStyle: {
                fontFamily: vars.typo.primitive.typeface.title,
                fontWeight: vars.typo.primitive.fontWeight.title[label],
              },
            }))}
          />
          <TypographyPrimitiveGroup
            title='Label'
            tokenPath='typo.primitive.fontWeight.label'
            properties={["fontWeight"]}
            items={tokenKeys(vars.typo.primitive.fontWeight.label).map(label => ({
              label,
              sampleStyle: {
                fontFamily: vars.typo.primitive.typeface.label,
                fontWeight: vars.typo.primitive.fontWeight.label[label],
              },
            }))}
          />
          <TypographyPrimitiveGroup
            title='Body'
            tokenPath='typo.primitive.fontWeight.body'
            properties={["fontWeight"]}
            items={tokenKeys(vars.typo.primitive.fontWeight.body).map(label => ({
              label,
              sampleStyle: {
                fontFamily: vars.typo.primitive.typeface.body,
                fontWeight: vars.typo.primitive.fontWeight.body[label],
              },
            }))}
          />
          <TypographyPrimitiveGroup
            title='Syntax'
            tokenPath='typo.primitive.fontWeight.syntax'
            properties={["fontWeight"]}
            items={tokenKeys(vars.typo.primitive.fontWeight.syntax).map(label => ({
              label,
              sampleStyle: {
                fontFamily: vars.typo.primitive.typeface.syntax,
                fontWeight: vars.typo.primitive.fontWeight.syntax[label],
              },
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
          "Typography primitive의 토큰 경로와 현재 viewport에서 계산된 속성값을 보여줍니다. 오른쪽의 Aa는 값이 적용된 짧은 미리보기이며, 조합된 typography는 TextStyle 스토리에서 확인할 수 있습니다.",
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
          {tokenKeys(vars.typo.primitive.fontSize.label).map((size, index) => (
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
          {tokenKeys(vars.typo.primitive.fontSize.body).map((size, index) => (
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
          {tokenKeys(vars.typo.primitive.fontSize.syntax).map((size, index) => (
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

export const Scheme: Story = {
  render: () => (
    <TokenSection title='Scheme Tokens'>
      <TokenSubsection title='Layout'>
        <div style={stackStyle}>
          <LengthScale
            title='Spacing'
            tokenPath='scheme.semantic.spacing'
            items={tokenItems(vars.scheme.semantic.spacing)}
          />
          <LengthScale
            title='Margin'
            tokenPath='scheme.semantic.margin'
            items={sortByLabelOrder(tokenItems(vars.scheme.semantic.margin), marginSizeOrder)}
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
              {tokenItems(vars.scheme.semantic.radius).map(({ label, value }) => (
                <div key={label} style={{ minWidth: 0, textAlign: "center" }}>
                  <div
                    aria-label={`radius.${label} 모서리`}
                    style={{
                      width: "64px",
                      maxWidth: "100%",
                      aspectRatio: "1",
                      margin: "0 auto",
                      border: `${vars.scheme.semantic.strokeWeight["2"]} solid ${vars.color.semantic.object.bold}`,
                      borderRadius: value,
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
              {tokenItems(vars.scheme.semantic.strokeWeight).map(({ label, value }) => (
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
                      borderTop: `${value} solid ${vars.color.semantic.object.bold}`,
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
            {tokenItems(vars.scheme.semantic.opacity).map(({ label, value }) => (
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
                      opacity: `calc(${value} / 100)`,
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
              tracks={tokenItems(vars.environment.semantic.duration).map(
                ({ label, value: duration }) => ({
                  label: `${label}ms`,
                  duration,
                  motion: vars.environment.semantic.motion.fluent,
                }),
              )}
            />
          </TokenPanel>

          <TokenPanel title='Motion' tokenPath='environment.semantic.motion'>
            <TimingComparison
              description='같은 500ms duration으로 같은 거리를 이동하며 motion 차이를 비교합니다.'
              tracks={sortByLabelOrder(
                tokenItems(vars.environment.semantic.motion),
                motionOrder,
              ).map(({ label, value: motion }) => ({
                label,
                duration: vars.environment.semantic.duration["500"],
                motion,
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
              {tokenItems(vars.environment.semantic.shadow).map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    minHeight: "72px",
                    boxSizing: "border-box",
                    padding: vars.scheme.semantic.spacing["16"],
                    borderRadius: vars.scheme.semantic.radius["8"],
                    backgroundColor: vars.color.semantic.surface.shallow,
                    boxShadow: value,
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
              {tokenItems(vars.environment.semantic.zIndex).map(({ label, value }, index) => (
                <div
                  key={label}
                  style={{
                    position: "absolute",
                    top: `${index * 36}px`,
                    left: `${index * 24}px`,
                    zIndex: value,
                    width: "min(240px, calc(100% - 96px))",
                    height: "88px",
                    boxSizing: "border-box",
                    padding: vars.scheme.semantic.spacing["12"],
                    border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
                    borderRadius: vars.scheme.semantic.radius["8"],
                    backgroundColor: vars.color.semantic.surface.shallow,
                    boxShadow:
                      label === "standard"
                        ? undefined
                        : tokenValue(vars.environment.semantic.shadow, label),
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
