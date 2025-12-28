import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexRow } from "@storybook-utils/layout";
import { useState } from "react";

import { Dialog } from "./Dialog";

import type { CheckedState } from "@/components";
import { BlockButton } from "@/components";

const SAMPLE_HEADER = "타이틀";
const SAMPLE_BODY =
  "다이얼로그 콘텐츠 내용의 입력 제한은 없지만, 과도하게 많은 내용을 안내하려 하는 것을 지양합니다.";
const SAMPLE_BUTTON = "레이블";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    header: {
      control: "text",
      description: "제목 역할의 텍스트 내용",
    },
    body: {
      control: "text",
      description: "본문 내용 역할의 텍스트 내용",
    },
    isButtonStretched: {
      control: "boolean",
      description: "컴포넌트 내부 버튼 컨테이너 및 버튼들이 정렬 없이 늘려져 있는지 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    primaryAction: {
      control: "object",
      description: "첫 번째 버튼",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    header: SAMPLE_HEADER,
    body: SAMPLE_BODY,
    isButtonStretched: false,
    primaryAction: {
      children: SAMPLE_BUTTON,
    },
  },

  render: args => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <BlockButton.Basic onClick={() => setIsOpen(true)}>다이얼로그 열기</BlockButton.Basic>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          isButtonStretched={args.isButtonStretched}
          header={args.header}
          body={args.body}
          primaryAction={{
            ...args.primaryAction,
          }}
        />
      </>
    );
  },
};

export const IsButtonStretched: Story = {
  render: () => {
    const [open, setOpen] = useState<"default" | "isStretched" | null>(null);

    return (
      <FlexRow>
        <BlockButton.Basic onClick={() => setOpen("default")}>정렬된 경우</BlockButton.Basic>
        <BlockButton.Basic onClick={() => setOpen("isStretched")}>
          정렬되지 않은 경우
        </BlockButton.Basic>

        <Dialog
          open={open === "default"}
          onOpenChange={value => (value ? setOpen("default") : setOpen(null))}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          primaryAction={{ children: "레이블" }}
        />
        <Dialog
          open={open === "isStretched"}
          onOpenChange={value => (value ? setOpen("isStretched") : setOpen(null))}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          isButtonStretched
          primaryAction={{ children: "레이블" }}
        />
      </FlexRow>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "컴포넌트 내부에 버튼 컨테이너 및 버튼들이 특정 방향으로 정렬 없이 늘려져 있는지 확인할 수 있습니다. 다이얼로그가 작을 때 버튼 시인성과 상호작용 용이를 위해 존재합니다.",
      },
    },
  },
};

export const WithSecondaryButton: Story = {
  render: () => {
    const [open, setOpen] = useState<"default" | "isStretched" | null>(null);

    return (
      <FlexRow>
        <BlockButton.Basic onClick={() => setOpen("default")}>정렬된 경우</BlockButton.Basic>
        <BlockButton.Basic onClick={() => setOpen("isStretched")}>
          정렬되지 않은 경우
        </BlockButton.Basic>

        <Dialog
          open={open === "default"}
          onOpenChange={value => (value ? setOpen("default") : setOpen(null))}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          primaryAction={{ children: "레이블" }}
          secondaryAction={{ children: "레이블" }}
        />
        <Dialog
          open={open === "isStretched"}
          onOpenChange={value => (value ? setOpen("isStretched") : setOpen(null))}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          isButtonStretched
          primaryAction={{ children: "레이블" }}
          secondaryAction={{ children: "레이블" }}
        />
      </FlexRow>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "secondaryAction을 통해 내부에 두 번째 위계(중요도)의 버튼 컴포넌트를 포함하는지 판단합니다.",
      },
    },
  },
};

export const WithTertiaryButton: Story = {
  render: () => {
    const [open, setOpen] = useState<"default" | "isStretched" | null>(null);

    return (
      <FlexRow>
        <BlockButton.Basic onClick={() => setOpen("default")}>정렬된 경우</BlockButton.Basic>
        <BlockButton.Basic onClick={() => setOpen("isStretched")}>
          정렬되지 않은 경우
        </BlockButton.Basic>

        <Dialog
          open={open === "default"}
          onOpenChange={value => (value ? setOpen("default") : setOpen(null))}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          primaryAction={{ children: "레이블" }}
          secondaryAction={{ children: "레이블" }}
          tertiaryAction={{ children: "레이블" }}
        />
        <Dialog
          open={open === "isStretched"}
          onOpenChange={value => (value ? setOpen("isStretched") : setOpen(null))}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          isButtonStretched
          primaryAction={{ children: "레이블" }}
          secondaryAction={{ children: "레이블" }}
          tertiaryAction={{ children: "레이블" }}
        />
      </FlexRow>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "tertiaryAction을 통해 내부에 세 번째 위계(중요도)의 버튼 컴포넌트를 포함하는지 판단합니다. secondaryAction이 존재하지 않을 경우 사용할 수 없습니다.",
      },
    },
  },
};

export const WithCheckbox: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState<CheckedState>(false);

    return (
      <>
        <BlockButton.Basic onClick={() => setIsOpen(true)}>
          체크박스 포함된 다이얼로그 열기
        </BlockButton.Basic>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          header={SAMPLE_HEADER}
          body={SAMPLE_BODY}
          checkboxAction={{
            label: "체크박스 항목 내용",
            checked: isChecked,
            onCheckedChange: setIsChecked,
          }}
          primaryAction={{ children: "레이블" }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "checkboxAction을 통해 내부에 체크박스 컴포넌트를 포함하는지의 판단합니다.",
      },
    },
  },
};
