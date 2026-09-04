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
      <div style={gridStyle}>
        <Swatch color={vars.colorPrimitive.primitive.flow["25"]} label='flow.25' />
        <Swatch color={vars.colorPrimitive.primitive.flow["100"]} label='flow.100' />
        <Swatch color={vars.colorPrimitive.primitive.flow["300"]} label='flow.300' />
        <Swatch color={vars.colorPrimitive.primitive.flow["500"]} label='flow.500' />
        <Swatch color={vars.colorPrimitive.primitive.flow["700"]} label='flow.700' />
        <Swatch color={vars.colorPrimitive.primitive.flow["900"]} label='flow.900' />
      </div>
    </TokenSection>
  ),
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
    <TokenSection title='Typography Tokens'>
      <div style={stackStyle}>
        <p
          className={getBodyClassName({ size: "lg" })}
          style={{ margin: 0, color: vars.color.semantic.object.bold }}
        >
          Body Large · {vars.typo.primitive.fontSize.body.lg}
        </p>
        <p
          className={getBodyClassName({ size: "md" })}
          style={{ margin: 0, color: vars.color.semantic.object.bold }}
        >
          Body Medium · {vars.typo.primitive.fontSize.body.md}
        </p>
        <p
          className={getBodyClassName({ size: "sm" })}
          style={{ margin: 0, color: vars.color.semantic.object.bold }}
        >
          Body Small · {vars.typo.primitive.fontSize.body.sm}
        </p>
      </div>
    </TokenSection>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typography primitive는 TextStyle을 구성하는 개별 CSS 변수입니다.",
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
        <div style={stackStyle}>
          <span className={getTitleClassName({ size: "2xl" })}>Title 2XL</span>
          <span className={getTitleClassName({ size: "xl" })}>Title XL</span>
          <span className={getTitleClassName({ size: "lg" })}>Title LG</span>
          <span className={getTitleClassName({ size: "md" })}>Title MD</span>
          <span className={getTitleClassName({ size: "sm" })}>Title SM</span>
          <span className={getTitleClassName({ size: "xs" })}>Title XS</span>
        </div>
      </TokenSection>

      <TokenSection title='Label Styles'>
        <div style={stackStyle}>
          <span className={getLabelClassName({ size: "lg", weight: "bold" })}>Label LG Bold</span>
          <span className={getLabelClassName({ size: "md", weight: "normal" })}>
            Label MD Normal
          </span>
          <span className={getLabelClassName({ size: "sm", weight: "subtle" })}>
            Label SM Subtle
          </span>
        </div>
      </TokenSection>

      <TokenSection title='Body Styles'>
        <div style={stackStyle}>
          <span className={getBodyClassName({ size: "lg", weight: "bold" })}>Body LG Bold</span>
          <span className={getBodyClassName({ size: "md", weight: "normal" })}>Body MD Normal</span>
          <span className={getBodyClassName({ size: "2xs", weight: "normal" })}>
            Body 2XS Normal
          </span>
        </div>
      </TokenSection>

      <TokenSection title='Syntax Styles'>
        <div style={stackStyle}>
          <code className={getSyntaxClassName({ size: "lg" })}>Syntax LG</code>
          <code className={getSyntaxClassName({ size: "md" })}>Syntax MD</code>
          <code className={getSyntaxClassName({ size: "sm" })}>Syntax SM</code>
          <code className={getSyntaxClassName({ size: "xs" })}>Syntax XS</code>
        </div>
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
