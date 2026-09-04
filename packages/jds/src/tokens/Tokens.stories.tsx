import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
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

const Swatch = ({ color, label }: { color: string; label: string }) => (
  <div style={{ ...panelStyle, padding: vars.scheme.semantic.spacing["12"] }}>
    <div
      aria-label={`${label} 색상`}
      style={{
        height: "80px",
        marginBottom: vars.scheme.semantic.spacing["8"],
        border: `${vars.scheme.semantic.strokeWeight["1"]} solid ${vars.color.semantic.stroke.subtle}`,
        borderRadius: vars.scheme.semantic.radius["4"],
        backgroundColor: color,
      }}
    />
    <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
  </div>
);

const PrimitiveColorScale = ({
  colors,
  title,
  tokenPath,
}: {
  colors: { color: string; label: string }[];
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
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 52px), 72px))",
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
          <PrimitiveColorScale
            title='Base'
            tokenPath='colorPrimitive.primitive.base'
            colors={(["0", "1000"] as const).map(label => ({
              label,
              color: vars.colorPrimitive.primitive.base[label],
            }))}
          />
          <PrimitiveColorScale
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
          <PrimitiveColorScale
            title='Default'
            tokenPath='colorPrimitive.primitive.flow'
            colors={primitiveColorSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.flow[label],
            }))}
          />
          <PrimitiveColorScale
            title='Dark'
            tokenPath='colorPrimitive.primitive.flow.dark'
            colors={primitiveColorSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.flow.dark[label],
            }))}
          />
          <PrimitiveColorScale
            title='Alpha'
            tokenPath='colorPrimitive.primitive.flow.alpha'
            colors={primitiveColorSteps.map(label => ({
              label,
              color: vars.colorPrimitive.primitive.flow.alpha[label],
            }))}
          />
          <PrimitiveColorScale
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
      <div style={gridStyle}>
        <Swatch color={vars.color.semantic.accent.normal} label='accent.normal' />
        <Swatch color={vars.color.semantic.accent.subtle} label='accent.subtle' />
        <Swatch color={vars.color.semantic.surface.standard} label='surface.standard' />
        <Swatch color={vars.color.semantic.surface.deep} label='surface.deep' />
        <Swatch color={vars.color.semantic.object.neutral} label='object.neutral' />
        <Swatch color={vars.color.semantic.object.bold} label='object.bold' />
      </div>
    </TokenSection>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Storybook 툴바에서 Light/Dark 테마를 전환하면 동일한 semantic 토큰의 값이 변경됩니다.",
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
      <div style={stackStyle}>
        {[
          [
            "spacing.4 / radius.2",
            vars.scheme.semantic.spacing["4"],
            vars.scheme.semantic.radius["2"],
          ],
          [
            "spacing.8 / radius.4",
            vars.scheme.semantic.spacing["8"],
            vars.scheme.semantic.radius["4"],
          ],
          [
            "spacing.16 / radius.8",
            vars.scheme.semantic.spacing["16"],
            vars.scheme.semantic.radius["8"],
          ],
        ].map(([label, padding, borderRadius]) => (
          <div
            key={label}
            style={{
              padding,
              borderRadius,
              backgroundColor: vars.color.semantic.accent.alpha.subtlest,
              color: vars.color.semantic.object.bold,
            }}
          >
            <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
          </div>
        ))}
      </div>
    </TokenSection>
  ),
};

export const Environment: Story = {
  render: () => (
    <TokenSection title='Environment Tokens'>
      <div style={gridStyle}>
        {[
          ["shadow.raised", vars.environment.semantic.shadow.raised],
          ["shadow.floated", vars.environment.semantic.shadow.floated],
          ["shadow.overlay", vars.environment.semantic.shadow.overlay],
        ].map(([label, boxShadow]) => (
          <div
            key={label}
            style={{
              ...panelStyle,
              minHeight: "88px",
              boxShadow,
              transition: `transform ${vars.environment.semantic.duration["200"]} ${vars.environment.semantic.motion.fluent}`,
            }}
          >
            <code className={getSyntaxClassName({ size: "xs" })}>{label}</code>
          </div>
        ))}
      </div>
    </TokenSection>
  ),
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
