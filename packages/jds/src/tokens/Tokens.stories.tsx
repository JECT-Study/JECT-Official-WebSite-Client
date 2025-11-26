/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { css } from "@emotion/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const TokenShowcase = () => {
  return <div>Token Showcase</div>;
};

const meta = {
  title: "Design Tokens/Token Usage",
  component: TokenShowcase,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TokenShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

// 토큰 사용 예시
export const HowToUseTokens: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: ${theme.scheme.semantic.spacing[6]};
          padding: ${theme.scheme.semantic.spacing[6]};
        `}
      >
        {/* 기본 카드 예시 */}
        <div
          css={css`
            padding: ${theme.scheme.semantic.spacing[6]};
            background-color: ${theme.color.semantic.surface.shallow};
            border-radius: ${theme.scheme.semantic.radius[4]};
            border: 1px solid ${theme.color.semantic.object.subtle};
          `}
        >
          <h3
            css={css`
              ${theme.textStyle["semantic-textStyle-title-2"]}
              margin-bottom: ${theme.scheme.semantic.spacing[3]};
            `}
          >
            기본 카드 컴포넌트
          </h3>
          <p
            css={css`
              ${theme.textStyle["semantic-textStyle-body-md-normal"]}
              color: ${theme.color.semantic.accent.alpha.assistive};
              margin-bottom: ${theme.scheme.semantic.spacing[4]};
            `}
          >
            토큰을 사용한 기본적인 카드 레이아웃입니다.
          </p>
          <button
            css={css`
              ${theme.textStyle["semantic-textStyle-label-md-bold"]}
              padding: ${theme.scheme.semantic.spacing[3]} ${theme.scheme.semantic.spacing[4]};
              background-color: ${theme.color.semantic.accent.normal};
              color: ${theme.color.semantic.accent.inverse.normal};
              border: none;
              border-radius: ${theme.scheme.semantic.radius[2]};
              cursor: pointer;

              &:hover {
                background-color: ${theme.color.semantic.accent.bold};
              }
            `}
          >
            액션 버튼
          </button>
        </div>

        {/* 다양한 텍스트 스타일 */}
        <div
          css={css`
            padding: ${theme.scheme.semantic.spacing[6]};
            background-color: ${theme.color.semantic.surface.shallow};
            border-radius: ${theme.scheme.semantic.radius[4]};
          `}
        >
          <div
            css={css`
              ${theme.textStyle["semantic-textStyle-hero-3"]}
              margin-bottom: ${theme.scheme.semantic.spacing[2]};
            `}
          >
            Hero 텍스트
          </div>
          <div
            css={css`
              ${theme.textStyle["semantic-textStyle-title-1"]}
              margin-bottom: ${theme.scheme.semantic.spacing[2]};
            `}
          >
            Title 텍스트
          </div>
          <div
            css={css`
              ${theme.textStyle["semantic-textStyle-body-lg-normal"]}
              margin-bottom: ${theme.scheme.semantic.spacing[2]};
            `}
          >
            Body Large 텍스트
          </div>
          <div
            css={css`
              ${theme.textStyle["semantic-textStyle-label-sm-subtle"]}
            `}
          >
            Label Small Subtle 텍스트
          </div>
        </div>

        {/* 색상 조합 예시 */}
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: ${theme.scheme.semantic.spacing[4]};
          `}
        >
          <div
            css={css`
              padding: ${theme.scheme.semantic.spacing[4]};
              background-color: ${theme.color.semantic.accent.alpha.subtlest};
              border-radius: ${theme.scheme.semantic.radius[2]};
              text-align: center;
            `}
          >
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-label-md-bold"]}
                color: ${theme.color.semantic.accent.normal};
              `}
            >
              Primary
            </div>
          </div>
          <div
            css={css`
              padding: ${theme.scheme.semantic.spacing[4]};
              background-color: ${theme.color.semantic.surface.deep};
              border-radius: ${theme.scheme.semantic.radius[2]};
              text-align: center;
            `}
          >
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-label-md-bold"]}
                color: ${theme.color.semantic.accent.normal};
              `}
            >
              Surface Deep
            </div>
          </div>
          <div
            css={css`
              padding: ${theme.scheme.semantic.spacing[4]};
              background-color: ${theme.color.semantic.object.neutral};
              border-radius: ${theme.scheme.semantic.radius[2]};
              text-align: center;
            `}
          >
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-label-md-bold"]}
                color: ${theme.color.semantic.object.inverse.neutral};
              `}
            >
              Object Neutral
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Color Primitive 예시
export const ColorPrimitive: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div>
        <h2>Color Primitive Tokens</h2>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          `}
        >
          <div>
            <div
              css={css`
                width: 100px;
                height: 100px;
                background-color: ${theme.colorPrimitive.primitive.flow[20]};
                border: 1px solid #ccc;
              `}
            />
            <p>Flow 20</p>
          </div>
          <div>
            <div
              css={css`
                width: 100px;
                height: 100px;
                background-color: ${theme.colorPrimitive.primitive.flow[40]};
                border: 1px solid #ccc;
              `}
            />
            <p>Flow 40</p>
          </div>
          <div>
            <div
              css={css`
                width: 100px;
                height: 100px;
                background-color: ${theme.colorPrimitive.primitive.flow[60]};
                border: 1px solid #ccc;
              `}
            />
            <p>Flow 60</p>
          </div>
          <div>
            <div
              css={css`
                width: 100px;
                height: 100px;
                background-color: ${theme.colorPrimitive.primitive.flow[80]};
                border: 1px solid #ccc;
              `}
            />
            <p>Flow 80</p>
          </div>
        </div>
      </div>
    );
  },
};

// Color Semantic 예시
export const ColorSemantic: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div>
        <h2>Color Semantic Tokens</h2>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          <div
            css={css`
              padding: 20px;
              background-color: ${theme.color.semantic.surface.standard};
              color: ${theme.color.semantic.accent.normal};
            `}
          >
            Surface Standard
          </div>
          <div
            css={css`
              padding: 20px;
              background-color: ${theme.color.semantic.surface.deep};
              color: ${theme.color.semantic.accent.normal};
            `}
          >
            Surface Deep
          </div>
          <div
            css={css`
              padding: 20px;
              background-color: ${theme.color.semantic.accent.neutral};
              color: white;
            `}
          >
            Accent Neutral
          </div>
        </div>
      </div>
    );
  },
};

// Typography 예시
export const Typography: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div>
        <h2>Typography Tokens</h2>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          <div
            css={css`
              font-size: ${theme.typo.primitive.fontSize.hero[4]};
              line-height: ${theme.typo.primitive.font.lineHeight.hero[4]};
              font-weight: ${theme.typo.primitive.fontWeight.hero.bold};
              font-family: ${theme.typo.primitive.typeface.hero};
            `}
          >
            Hero 4 Typography (individual properties)
          </div>
          <div
            css={css`
              font-size: ${theme.typo.primitive.fontSize.hero[3]};
              line-height: ${theme.typo.primitive.font.lineHeight.hero[3]};
              font-weight: ${theme.typo.primitive.fontWeight.hero.bold};
              font-family: ${theme.typo.primitive.typeface.hero};
            `}
          >
            Hero 3 Typography (individual properties)
          </div>
        </div>
      </div>
    );
  },
};

// Scheme 예시
export const Scheme: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div>
        <h2>Scheme Tokens</h2>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          <div
            css={css`
              padding: ${theme.scheme.semantic.spacing[4]};
              background-color: ${theme.color.semantic.surface.shallow};
              border-radius: ${theme.scheme.semantic.radius[2]};
            `}
          >
            Spacing 4, Border Radius 2
          </div>
          <div
            css={css`
              padding: ${theme.scheme.semantic.spacing[8]};
              background-color: ${theme.color.semantic.surface.shallow};
              border-radius: ${theme.scheme.semantic.radius[4]};
            `}
          >
            Spacing 8, Border Radius 4
          </div>
        </div>
      </div>
    );
  },
};

// Environment 예시
export const Environment: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div>
        <h2>Environment Tokens</h2>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 16px;
          `}
        >
          <div
            css={css`
              padding: 16px;
              background-color: ${theme.color.semantic.accent.alpha};
            `}
          ></div>
        </div>
      </div>
    );
  },
};

// TextStyle 예시 (가장 중요!)
export const TextStyle: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div>
        <h2>TextStyle Tokens - All Text Properties Combined</h2>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 24px;
          `}
        >
          <div>
            <h3>Hero Styles</h3>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-hero-4"]}
              `}
            >
              Hero 4 - All text properties applied via theme.textStyle
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-hero-3"]}
              `}
            >
              Hero 3 - All text properties applied via theme.textStyle
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-hero-2"]}
              `}
            >
              Hero 2 - All text properties applied via theme.textStyle
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-hero-1"]}
              `}
            >
              Hero 1 - All text properties applied via theme.textStyle
            </div>
          </div>

          <div>
            <h3>Title Styles</h3>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-title-4"]}
              `}
            >
              Title 4 - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-title-3"]}
              `}
            >
              Title 3 - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-title-2"]}
              `}
            >
              Title 2 - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-title-1"]}
              `}
            >
              Title 1 - All text properties applied
            </div>
          </div>

          <div>
            <h3>Label Styles</h3>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-label-lg-bold"]}
              `}
            >
              Label LG Bold - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-label-md-normal"]}
              `}
            >
              Label MD Normal - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-label-sm-normal"]}
              `}
            >
              Label SM Normal - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-label-xs-normal"]}
              `}
            >
              Label XS Normal - All text properties applied
            </div>
          </div>

          <div>
            <h3>Body Styles</h3>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-body-lg-normal"]}
              `}
            >
              Body LG - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-body-md-normal"]}
              `}
            >
              Body MD - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-body-sm-normal"]}
              `}
            >
              Body SM - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-body-xs-normal"]}
              `}
            >
              Body XS - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-body-2xs-normal"]}
              `}
            >
              Body 2XS - All text properties applied
            </div>
          </div>

          <div>
            <h3>Syntax Styles</h3>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-syntax-lg"]}
              `}
            >
              Syntax LG - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-syntax-md"]}
              `}
            >
              Syntax MD - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-syntax-sm"]}
              `}
            >
              Syntax SM - All text properties applied
            </div>
            <div
              css={css`
                ${theme.textStyle["semantic-textStyle-syntax-xs"]}
              `}
            >
              Syntax XS - All text properties applied
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// 모든 토큰 종합 예시
export const AllTokensCombined: Story = {
  render: () => {
    const theme = useTheme();

    return (
      <div
        css={css`
          padding: ${theme.scheme.semantic.spacing[8]};
          background-color: ${theme.color.semantic.surface.standard};
        `}
      >
        <h1
          css={css`
            ${theme.textStyle["semantic-textStyle-hero-4"]}
          `}
        >
          Design System Showcase
        </h1>

        <div
          css={css`
            margin-top: ${theme.scheme.semantic.spacing[6]};
            padding: ${theme.scheme.semantic.spacing[4]};
            background-color: ${theme.color.semantic.surface.shallow};
            border-radius: ${theme.scheme.semantic.radius[4]};
          `}
        >
          <h2
            css={css`
              ${theme.textStyle["semantic-textStyle-title-2"]}
            `}
          >
            Card with Multiple Tokens
          </h2>
          <p
            css={css`
              ${theme.textStyle["semantic-textStyle-body-md-normal"]}
              margin-top: ${theme.scheme.semantic.spacing[3]};
              color: ${theme.color.semantic.accent.alpha.assistive};
            `}
          >
            This card demonstrates the combination of color, spacing, border-radius, and textStyle
            tokens all working together.
          </p>
          <div
            css={css`
              display: inline-block;
              margin-top: ${theme.scheme.semantic.spacing[4]};
              padding: ${theme.scheme.semantic.spacing[2]} ${theme.scheme.semantic.spacing[4]};
              background-color: ${theme.color.semantic.accent.neutral};
              color: white;
              border-radius: ${theme.scheme.semantic.radius[2]};
              ${theme.textStyle["semantic-textStyle-label-md-normal"]}
            `}
          >
            Button with TextStyle
          </div>
        </div>
      </div>
    );
  },
};
