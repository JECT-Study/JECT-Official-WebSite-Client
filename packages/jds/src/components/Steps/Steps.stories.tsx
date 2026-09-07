import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { Steps } from "./Steps";
import type { StepsLayout, StepsSize } from "./steps.types";

interface StepsStoryArgs {
  size: StepsSize;
  layout: StepsLayout;
  current: number;
  activated?: boolean;
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
}

const StepsPreview: (props: StepsStoryArgs) => null = () => null;

const HORIZONTAL_WIDTH = "600px";
const VERTICAL_WIDTH = "160px";

const DEFAULT_STEP_COUNT = 3;

const captionStyle = { width: "auto", whiteSpace: "nowrap" } as const;

const meta = {
  title: "Components/Steps",
  component: StepsPreview,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "스텝 컴포넌트는 사용자가 따라야 할 절차나 진행 단계를 시각적으로 나타냅니다. " +
          "Steps.Root로 컨테이너를 구성하고, 각 단계는 Steps.Item으로 표현합니다. " +
          "모든 Steps.Item은 명시적으로 index prop을 제공해야 합니다.\n\n" +
          "**활성 여부 결정 규칙:**\n" +
          "- 기본은 Steps.Root의 current입니다. index가 current 이하인 단계가 활성으로 계산됩니다.\n" +
          "- 개별 Steps.Item에 activated를 명시하면 current 계산을 덮어씁니다. 순차적이지 않은 조합이 필요할 때 사용합니다.\n" +
          "- current도 activated도 없으면 모든 단계가 비활성입니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "md"],
      description: "스텝의 크기",
      table: {
        category: "Steps.Root",
        type: { summary: "'lg' | 'md'" },
      },
    },
    layout: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "스텝의 배치 방향",
      table: {
        category: "Steps.Root",
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    current: {
      control: { type: "number", min: 0, max: 2, step: 1 },
      description: "현재 단계의 index입니다. index가 이 값 이하인 단계가 활성으로 계산됩니다.",
      table: {
        category: "Steps.Root",
        type: { summary: "number" },
      },
    },
    activated: {
      control: false,
      description:
        "Steps.Item의 활성 여부입니다. 생략하면 Steps.Root의 current로 계산되고, 명시하면 current 계산을 덮어씁니다.",
      table: {
        category: "Steps.Item",
        type: { summary: "boolean" },
      },
    },
    firstLabel: {
      control: "text",
      description: "첫 번째 스텝의 레이블 텍스트",
      table: {
        category: "Preview",
        type: { summary: "string" },
      },
    },
    secondLabel: {
      control: "text",
      description: "두 번째 스텝의 레이블 텍스트",
      table: {
        category: "Preview",
        type: { summary: "string" },
      },
    },
    thirdLabel: {
      control: "text",
      description: "세 번째 스텝의 레이블 텍스트",
      table: {
        category: "Preview",
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof StepsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;
type CustomStory = Omit<Story, "args">;

interface StepsSampleProps {
  size?: StepsSize;
  layout?: StepsLayout;
  current?: number;
  count?: number;
  labels?: string[];
}

const StepsSample = ({
  size = "md",
  layout = "horizontal",
  current,
  count = DEFAULT_STEP_COUNT,
  labels,
}: StepsSampleProps) => {
  const resolvedLabels = labels ?? Array.from({ length: count }, (_, i) => `단계 ${i + 1}`);
  const width = layout === "vertical" ? VERTICAL_WIDTH : HORIZONTAL_WIDTH;

  return (
    <div style={{ width }}>
      <Steps.Root size={size} layout={layout} current={current}>
        {resolvedLabels.map((label, index) => (
          <Steps.Item key={label} index={index}>
            {label}
          </Steps.Item>
        ))}
      </Steps.Root>
    </div>
  );
};

export const Default: Story = {
  args: {
    size: "md",
    layout: "horizontal",
    current: 1,
    firstLabel: "회원가입",
    secondLabel: "정보 입력",
    thirdLabel: "완료",
  },
  render: args => (
    <StepsSample
      size={args.size}
      layout={args.layout}
      current={args.current}
      labels={[args.firstLabel, args.secondLabel, args.thirdLabel]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "기본 스텝 컴포넌트입니다. Controls 패널에서 size, layout, current와 각 단계의 레이블을 조정하여 실시간으로 변경 사항을 확인할 수 있습니다.",
      },
    },
  },
};

export const StatusVariants: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      {[
        { label: "전체 활성 (current=2)", current: 2 },
        { label: "혼합 (current=1)", current: 1 },
        { label: "전체 비활성 (current 없음)", current: undefined },
      ].map(({ label, current }) => (
        <FlexColumn key={label} gap='8px'>
          <Label style={captionStyle}>{label}</Label>
          <StepsSample current={current} />
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "current 값에 따른 활성 상태입니다. index가 current 이하인 단계가 활성이 되고, current를 생략하면 모든 단계가 비활성입니다.",
      },
    },
  },
};

export const SizeVariant: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      {(["lg", "md"] as const).map(size => (
        <FlexColumn key={size} gap='8px'>
          <Label style={captionStyle}>size: {size}</Label>
          <StepsSample size={size} current={1} />
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "Steps 컴포넌트는 lg, md 2가지 크기를 제공합니다.",
      },
    },
  },
};

export const LayoutVariant: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "48px" }}>
      {(["horizontal", "vertical"] as const).map(layout => (
        <FlexColumn key={layout} gap='8px'>
          <Label style={captionStyle}>layout: {layout}</Label>
          <StepsSample size='lg' layout={layout} current={1} />
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "layout prop으로 수평(horizontal)과 수직(vertical) 레이아웃을 선택할 수 있습니다. 기본값은 horizontal입니다.",
      },
    },
  },
};

export const VerticalControlled: CustomStory = {
  render: () => (
    <FlexRow gap='48px' style={{ alignItems: "flex-start" }}>
      {[undefined, 0, 1, 2].map(current => (
        <FlexColumn key={current ?? "none"} gap='8px'>
          <Label style={captionStyle}>current: {current ?? "없음"}</Label>
          <StepsSample layout='vertical' current={current} />
        </FlexColumn>
      ))}
    </FlexRow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "수직 레이아웃의 current별 상태입니다. 연결선 높이가 단계 사이의 간격 역할을 하므로 별도 gap이 없습니다. " +
          "활성 단계로 이어지는 연결선은 accent, 이후 연결선은 subtle 색상입니다.",
      },
    },
  },
};

export const VariousItemCounts: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      {[2, 3, 4, 5].map(count => (
        <FlexColumn key={count} gap='8px'>
          <Label style={captionStyle}>{count}개 항목</Label>
          <StepsSample count={count} current={count - 2} />
        </FlexColumn>
      ))}
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story: "스텝 컴포넌트는 2개부터 5개 이상까지 다양한 개수의 항목을 지원합니다.",
      },
    },
  },
};

export const ActivatedOverridesCurrent: CustomStory = {
  render: () => (
    <FlexColumn style={{ width: "100%", gap: "32px" }}>
      <FlexColumn gap='8px'>
        <Label style={captionStyle}>current=2 (activated 없음)</Label>
        <StepsSample current={2} labels={["계정 생성", "선택 단계", "완료"]} />
      </FlexColumn>
      <FlexColumn gap='8px'>
        <Label style={captionStyle}>current=2 + 2단계를 activated false로 덮어쓰기</Label>
        <div style={{ width: HORIZONTAL_WIDTH }}>
          <Steps.Root size='md' current={2}>
            <Steps.Item index={0}>계정 생성</Steps.Item>
            <Steps.Item index={1} activated={false}>
              선택 단계
            </Steps.Item>
            <Steps.Item index={2}>완료</Steps.Item>
          </Steps.Root>
        </div>
      </FlexColumn>
    </FlexColumn>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "activated는 current 계산보다 우선합니다. 건너뛴 선택 단계처럼 current만으로 표현할 수 없는 상태를 개별 Steps.Item에서 덮어쓸 수 있습니다. " +
          "두 번째 예시는 current가 2여서 기본 계산으로는 모든 단계가 활성이지만, 2단계만 비활성으로 지정한 결과입니다.",
      },
    },
  },
};

export const ControlledExample: CustomStory = {
  render: () => {
    function StoryComponent() {
      const labels = ["회원가입", "정보 입력", "완료"];
      const [currentStep, setCurrentStep] = useState(0);

      return (
        <FlexColumn style={{ width: "100%", gap: "24px" }}>
          <StepsSample current={currentStep} labels={labels} />

          <FlexRow gap='8px'>
            {labels.map((label, index) => (
              <button
                key={label}
                onClick={() => setCurrentStep(index)}
                disabled={currentStep === index}
              >
                {index + 1}단계로
              </button>
            ))}
          </FlexRow>

          <Label style={captionStyle}>현재 단계: {currentStep + 1}</Label>
        </FlexColumn>
      );
    }

    return <StoryComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Steps.Root의 current만으로 제어하는 예시입니다. activated를 넘기지 않으면 index가 current 이하인 단계가 활성으로 계산됩니다. " +
          "버튼을 클릭하여 단계를 변경할 수 있습니다.",
      },
    },
  },
};

export const PerItemOverrideExample: CustomStory = {
  render: () => {
    function StoryComponent() {
      const labels = ["계정 생성", "프로필 설정", "이메일 인증", "완료"];
      const [activatedList, setActivatedList] = useState([true, true, true, false]);

      const toggleStep = (index: number) =>
        setActivatedList(prevList =>
          prevList.map((prevActivated, prevIndex) =>
            prevIndex === index ? !prevActivated : prevActivated,
          ),
        );

      return (
        <FlexColumn style={{ width: "100%", gap: "32px" }}>
          <div style={{ width: "700px" }}>
            <Steps.Root size='md'>
              {labels.map((label, index) => (
                <Steps.Item key={label} index={index} activated={activatedList[index]}>
                  {label}
                </Steps.Item>
              ))}
            </Steps.Root>
          </div>

          <FlexColumn gap='8px'>
            {labels.map((label, index) => (
              <FlexRow key={label} gap='8px' style={{ alignItems: "center" }}>
                <Label style={{ minWidth: "100px" }}>{label}</Label>
                <button onClick={() => toggleStep(index)}>
                  {activatedList[index] ? "비활성으로" : "활성으로"}
                </button>
              </FlexRow>
            ))}
          </FlexColumn>
        </FlexColumn>
      );
    }

    return <StoryComponent />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "각 Steps.Item에 activated를 직접 전달해 독립적으로 제어하는 예시입니다. activated는 current 계산을 덮어쓰므로 " +
          "current로 표현할 수 없는 순차적이지 않은 조합에 사용합니다.",
      },
    },
  },
};
