import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentType, ReactNode } from "react";

import { Callout } from "./Callout";
import type { CalloutFeedback, CalloutProps, CalloutSize } from "./callout.types";
import type { IconName } from "../Icon";
import { iconMap } from "../Icon/IconMap";

const CALLOUT_SIZES: CalloutSize[] = ["lg", "md", "sm", "xs"];
const CALLOUT_FEEDBACKS: CalloutFeedback[] = ["none", "positive", "destructive", "notifying"];

const CALLOUT_TITLE = "타이틀";
const CALLOUT_BODY =
  "콜아웃 텍스트의 최대 입력 글자수 제한은 없지만, 너무 많은 글자수는 핵심적인 내용을 효과적으로 전달하는 데에 적절치 않다는 점을 유의합니다.";

const meta = {
  title: "Components/Callout",
  component: Callout,
  render: args => <CalloutExample {...args} />,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "주요 텍스트 콘텐츠를 강조하거나 추가 설명을 제공하는 메시지 영역입니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: CALLOUT_SIZES,
      description: "컴포넌트의 시각적 크기입니다.",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    title: {
      control: "text",
      description: "타이틀 텍스트입니다. 미입력 시 본문만 표시됩니다.",
    },
    children: {
      control: "text",
      description: "본문 텍스트입니다.",
    },
    icon: {
      control: "select",
      options: Object.keys(iconMap),
      description:
        "타이틀 접두 별도 아이콘을 포함하는지의 여부입니다. 타이틀이 있을 때만 유효합니다.",
    },
    feedback: {
      control: "radio",
      options: CALLOUT_FEEDBACKS,
      description: "피드백 유형에 대한 변형입니다.",
      table: {
        defaultValue: { summary: "none" },
      },
    },
  },
} satisfies Meta<CalloutProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleLabel = ({ children }: Pick<CalloutProps, "children">) => (
  <code
    style={{
      padding: "0.125rem 0.5rem",
      borderRadius: "0.25rem",
      backgroundColor: "rgba(0, 0, 0, 0.06)",
      fontSize: "0.8125rem",
    }}
  >
    {children}
  </code>
);

const LabeledExample = ({ label, children }: { label: string; children: ReactNode }) => (
  <div
    style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", gap: "1rem" }}
  >
    <ExampleLabel>{label}</ExampleLabel>
    {children}
  </div>
);

const exampleRowStyle = { display: "flex", gap: "1.5rem", width: "40rem" } as const;

const withFixedWidth = (Story: ComponentType) => (
  <div style={{ width: "20rem" }}>
    <Story />
  </div>
);

const CalloutExample = ({ title, icon, children, ...restProps }: CalloutProps) =>
  title ? (
    <Callout {...restProps} title={title} icon={icon}>
      {children}
    </Callout>
  ) : (
    <Callout {...restProps}>{children}</Callout>
  );

const withIconWhenTitled = (args: CalloutProps, icon: IconName): CalloutProps =>
  args.title ? { ...args, icon } : args;

export const Default: Story = {
  decorators: [withFixedWidth],
  parameters: {
    docs: {
      description: {
        story: "타이틀 없이 본문만 표시하는 기본 형태입니다. Controls로 속성을 조작할 수 있습니다.",
      },
    },
  },
  args: {
    size: "md",
    feedback: "none",
    children: CALLOUT_BODY,
  },
};

export const WithTitle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "콜아웃 문장을 요약하는 제목이 필요하거나 콜아웃 자체의 주목도를 올려야 할 때 `title` 을 입력합니다.",
      },
    },
  },
  args: {
    children: CALLOUT_BODY,
  },
  render: () => (
    <div style={exampleRowStyle}>
      <LabeledExample label='title 없음'>
        <Callout>{CALLOUT_BODY}</Callout>
      </LabeledExample>
      <LabeledExample label='title 있음'>
        <Callout title={CALLOUT_TITLE}>{CALLOUT_BODY}</Callout>
      </LabeledExample>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`title` 이 있을 때 `icon` 을 지정해 타이틀 접두 아이콘을 표시할 수 있습니다.\n이 때 콜아웃의 내용이나 제목과 관련이 있는 아이콘을 사용하도록 합니다.",
      },
    },
  },
  args: {
    children: CALLOUT_BODY,
  },
  render: () => (
    <div style={exampleRowStyle}>
      <LabeledExample label='icon 없음'>
        <Callout title={CALLOUT_TITLE}>{CALLOUT_BODY}</Callout>
      </LabeledExample>
      <LabeledExample label='icon 있음'>
        <Callout title={CALLOUT_TITLE} icon='vector-square'>
          {CALLOUT_BODY}
        </Callout>
      </LabeledExample>
    </div>
  ),
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "주변 UI 요소들과의 크기 균형감이나 디바이스 환경 등을 고려해 적절한 사이즈를 사용하세요.",
      },
    },
  },
  args: {
    feedback: "none",
    title: CALLOUT_TITLE,
    icon: "vector-square",
    children: CALLOUT_BODY,
  },
  render: args => (
    <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
      {CALLOUT_SIZES.map(size => (
        <LabeledExample key={size} label={`size=${size}`}>
          <CalloutExample {...args} size={size} />
        </LabeledExample>
      ))}
    </div>
  ),
};

const feedbackIconMap: Record<CalloutFeedback, IconName> = {
  none: "vector-square",
  positive: "check-line",
  destructive: "close-line",
  notifying: "error-warning-line",
};

export const Feedback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "피드백 유형에 대한 값은 다음과 같습니다:\n\n" +
          "- `none` 은 피드백 유형이 없는 콜아웃입니다. 기본적으로 이 콜아웃을 사용하도록 합니다.\n" +
          "- `positive` 는 사용자에게 전달해야 하는 정보가 긍정적인 결과와 관련이 있다면 사용합니다.\n" +
          "- `destructive` 는 부정적인 결과, 에러, 위험 등의 상황과 관련이 있다면 사용합니다.\n" +
          "- `notifying` 는 긍정과 부정 중 하나로 규정할 수 없지만 정보 전달 우선도가 높을 때 사용합니다.",
      },
    },
  },
  args: {
    title: CALLOUT_TITLE,
    children: CALLOUT_BODY,
  },
  render: args => (
    <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
      {CALLOUT_FEEDBACKS.map(feedback => (
        <LabeledExample key={feedback} label={`feedback=${feedback}`}>
          <CalloutExample
            {...withIconWhenTitled(args, feedbackIconMap[feedback])}
            feedback={feedback}
          />
        </LabeledExample>
      ))}
    </div>
  ),
};
