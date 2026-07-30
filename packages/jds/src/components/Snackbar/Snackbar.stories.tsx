import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useEffect, useRef, useState } from "react";
import { visuallyHidden } from "utils";

import { Snackbar } from "./Snackbar";
import { snackbarController } from "./snackbarController";
import { SnackbarProvider, useSnackbar } from "./SnackbarProvider";
import { BlockButton } from "../Button/BlockButton";

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    feedback: {
      description: "스낵바 피드백 속성을 지정합니다.",
      control: "radio",
      options: ["none", "positive", "destructive", "notifying"],
    },
    title: {
      description: "스낵바 타이틀 텍스트입니다.",
      control: "text",
    },
    description: {
      description: "본문 아래에 표시되는 설명 텍스트입니다.",
      control: "text",
    },
    label: {
      description: "스낵바 오른쪽에 표시되는 레이블 버튼 텍스트입니다.",
      control: "text",
    },
    onClick: {
      description: "스낵바 레이블 버튼 클릭 핸들러입니다.",
    },
    duration: {
      description: "스낵바가 유지되는 시간입니다. 단위는 ms입니다.",
      control: "number",
    },
    withCloseButton: {
      description: "닫기 버튼 표시 여부입니다.",
      control: "boolean",
    },
  },
};

export default meta;

export const Basic: StoryObj<typeof Snackbar> = {
  args: {
    id: "snackbar-1",
    feedback: "none",
    title: "스낵바 레이블",
    description: "설명 텍스트",
    duration: Infinity,
    withCloseButton: false,
    label: "레이블",
    onClick: () => alert("클릭되었습니다."),
  },
  render: args => <Snackbar {...args} />,
};

export const Feedback: StoryObj<typeof Snackbar> = {
  args: {
    id: "snackbar-1",
    feedback: "positive",
    title: "스낵바 레이블",
    description: "설명 텍스트",
    duration: Infinity,
    withCloseButton: false,
    label: "레이블",
    onClick: () => alert("클릭되었습니다."),
  },
  render: args => <Snackbar {...args} />,
};

export const UseSnackbarProvider: StoryObj<typeof Snackbar> = {
  parameters: {
    docs: {
      description: {
        story:
          "useSnackbar훅을 사용하여 스낵바를 호출할 수 있습니다. use훅을 사용하기 위해서는 루트 컴포넌트 레벨에서 SnackbarProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  render: () => {
    const { snackbar } = useSnackbar();
    const label = "레이블";
    const onClick = () => alert("클릭되었습니다.");

    const basicSnackbar = () => snackbar.basic("베이직 스낵바", label, onClick);
    const positiveSnackbar = () => snackbar.positive("피드백 스낵바 - positive", label, onClick);
    const destructiveSnackbar = () =>
      snackbar.destructive("피드백 스낵바 - destructive", label, onClick);
    const notifyingSnackbar = () => snackbar.notifying("피드백 스낵바 - notifying", label, onClick);

    return (
      <FlexColumn>
        <BlockButton variant='outlined' onClick={basicSnackbar}>
          Basic
        </BlockButton>
        <BlockButton feedback='positive' onClick={positiveSnackbar}>
          Positive
        </BlockButton>
        <BlockButton feedback='destructive' onClick={destructiveSnackbar}>
          Destructive
        </BlockButton>
        <BlockButton hierarchy='accent' variant='solid' onClick={notifyingSnackbar}>
          Notifying
        </BlockButton>
      </FlexColumn>
    );
  },
};

const VoiceOverLiveRegionDemo = () => {
  const { snackbar } = useSnackbar();
  const [articleAnnouncement, setArticleAnnouncement] = useState("");
  const articleAnnouncementSpaceToggleRef = useRef(false);
  const snackbarTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onClick = () => {};

  const articleText =
    "접근성 안내는 모든 사용자가 정보를 동등하게 이해하도록 돕습니다. 일반 상태는 현재 낭독을 방해하지 않고, 긴급 오류는 즉시 전달되는지 VoiceOver로 확인합니다.";

  const startArticleReading = () => {
    articleAnnouncementSpaceToggleRef.current = !articleAnnouncementSpaceToggleRef.current;
    const invisibleSpace = articleAnnouncementSpaceToggleRef.current ? "\u200B" : "\u200B\u200B";

    setArticleAnnouncement(`${articleText} ${invisibleSpace}`);
  };

  useEffect(() => {
    return () => {
      if (snackbarTimerRef.current) {
        clearTimeout(snackbarTimerRef.current);
      }
    };
  }, []);

  const startTest = (feedback: "status" | "alert") => {
    if (snackbarTimerRef.current) clearTimeout(snackbarTimerRef.current);
    startArticleReading();

    snackbarTimerRef.current = setTimeout(() => {
      if (feedback === "alert") {
        snackbar.destructive("긴급 오류가 발생했습니다.", "확인", onClick, {
          description: "현재 읽고 있는 본문을 중단하고 즉시 낭독해야 합니다.",
        });
      } else {
        snackbar.basic("일반 상태 안내입니다.", "확인", onClick, {
          description: "현재 낭독을 즉시 중단하지 않고 다음 가능한 시점에 안내해야 합니다.",
        });
      }
      snackbarTimerRef.current = null;
    }, 4000);
  };

  return (
    <FlexColumn gap='24px' style={{ width: "min(768px, calc(100vw - 32px))" }}>
      <Label style={{ width: "auto" }}>
        버튼을 누르면 본문 낭독이 시작되고 4초 뒤 해당 스낵바가 자동으로 발생합니다. 두 테스트는 한
        번에 하나씩 실행하세요.
      </Label>
      <FlexRow
        gap='50px'
        style={{
          alignItems: "stretch",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "min(100%, 320px)",
            boxSizing: "border-box",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "rgba(127, 127, 127, 0.1)",
          }}
        >
          <h4 style={{ margin: 0 }}>VoiceOver 낭독 테스트용 본문</h4>
          <p>{articleText}</p>
        </div>
        <FlexColumn
          gap='12px'
          style={{
            flex: "0 0 180px",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <BlockButton variant='outlined' onClick={() => startTest("status")}>
            Status 비교 시작
          </BlockButton>
          <BlockButton feedback='destructive' onClick={() => startTest("alert")}>
            Alert 비교 시작
          </BlockButton>
        </FlexColumn>
      </FlexRow>
      <div className={visuallyHidden} role='status' aria-live='polite' aria-atomic='true'>
        {articleAnnouncement}
      </div>
    </FlexColumn>
  );
};

export const VoiceOverLiveRegion: StoryObj<typeof Snackbar> = {
  parameters: {
    docs: {
      description: {
        story:
          "각 버튼은 VoiceOver의 본문 낭독을 시작하고 4초 뒤 해당 스낵바를 자동 호출합니다. status 스낵바는 낭독을 즉시 끊지 않고 다음 자연스러운 시점에 읽히는지, alert 스낵바는 낭독을 중단하고 즉시 읽히는지 비교합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  render: () => <VoiceOverLiveRegionDemo />,
};

export const UseSnackbarProviderWithOptions: StoryObj<typeof Snackbar> = {
  parameters: {
    docs: {
      description: {
        story:
          "useSnackbar훅을 사용하여 스낵바를 호출할 수 있습니다. use훅을 사용하기 위해서는 루트 컴포넌트 레벨에서 SnackbarProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  render: () => {
    const { snackbar } = useSnackbar();
    const onClick = () => alert("클릭되었습니다.");

    const title = () => snackbar.basic("베이직 스낵바", "레이블", onClick);
    const titleDescription = () =>
      snackbar.basic("베이직 스낵바", "레이블", onClick, { description: "설명입니다." });
    const titleDescriptionButton = () =>
      snackbar.basic("베이직 스낵바", "레이블", onClick, {
        description: "설명입니다.",
        withCloseButton: true,
      });

    return (
      <FlexColumn>
        <BlockButton variant='outlined' onClick={title}>
          title
        </BlockButton>
        <BlockButton variant='outlined' onClick={titleDescription}>
          title + description
        </BlockButton>
        <BlockButton variant='outlined' onClick={titleDescriptionButton}>
          title + description + close button
        </BlockButton>
      </FlexColumn>
    );
  },
};

export const UseGlobalSnackbar: StoryObj<typeof Snackbar> = {
  parameters: {
    docs: {
      description: {
        story:
          "Axios interceptor와 같이 SnackbarProvider 외부에서 스낵바를 띄워야하는 경우(useSnackbar훅을 사용할 수 없을 경우), 전역 snackbar 함수를 사용하여 스낵바를 호출할 수 있습니다. 전역 snackbar 함수를 사용할 때도 SnackbarProvider 작성이 필요합니다.",
      },
    },
  },
  decorators: [
    Story => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  render: () => {
    const description = "스낵바 레이블로 상태나 결과를 충분히 설명할 수 없을 때 사용합니다.";
    const onClick = () => alert("클릭되었습니다.");

    const basicSnackbar = () =>
      snackbarController.basic("베이직 스낵바", "레이블", onClick, { description });
    const positiveSnackbar = () =>
      snackbarController.positive("피드백 스낵바 - positive", "레이블", onClick, {
        description,
      });
    const destructiveSnackbar = () =>
      snackbarController.destructive("피드백 스낵바 - destructive", "레이블", onClick, {
        description,
      });
    const notifyingSnackbar = () =>
      snackbarController.notifying("피드백 스낵바 - notifying", "레이블", onClick, {
        description,
      });

    return (
      <FlexColumn>
        <BlockButton variant='outlined' onClick={basicSnackbar}>
          Basic
        </BlockButton>
        <BlockButton feedback='positive' onClick={positiveSnackbar}>
          Positive
        </BlockButton>
        <BlockButton feedback='destructive' onClick={destructiveSnackbar}>
          Destructive
        </BlockButton>
        <BlockButton hierarchy='accent' variant='solid' onClick={notifyingSnackbar}>
          Notifying
        </BlockButton>
      </FlexColumn>
    );
  },
};
