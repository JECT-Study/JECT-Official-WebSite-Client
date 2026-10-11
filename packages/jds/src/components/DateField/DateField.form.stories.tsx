import type { Meta, StoryObj } from "@storybook/react-vite";
import { FIELD_WIDTH } from "@storybook-utils/field";
import { FlexColumn, FlexRow } from "@storybook-utils/layout";
import { StrictMode, useId, useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { DateField } from "./DateField";
import { BlockButton } from "../Button/BlockButton";

const meta = {
  title: "Components/DateField",
  component: DateField,
  parameters: { layout: "centered" },
  args: { children: null },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

const DEFAULT_VALUE = "2026-07-25";
const formAssociationChange = fn();
const canceledResetChange = fn();
const unmountedResetChange = fn();

const FormAssociationPreview = () => {
  const firstFormId = useId();
  const secondFormId = useId();
  const [isSecondForm, setIsSecondForm] = useState(false);

  return (
    <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
      <span>{`현재 연결: ${isSecondForm ? "B" : "A"} 폼`}</span>
      <DateField style={FIELD_WIDTH}>
        <DateField.Label>연결된 날짜</DateField.Label>
        <DateField.Input
          form={isSecondForm ? secondFormId : firstFormId}
          name='date'
          defaultValue={DEFAULT_VALUE}
          onChange={formAssociationChange}
          withPicker={false}
        />
      </DateField>
      <BlockButton onClick={() => setIsSecondForm(current => !current)}>폼 전환</BlockButton>
      <FlexRow gap='8px'>
        <form id={firstFormId}>
          <BlockButton type='reset'>A 폼 초기화</BlockButton>
        </form>
        <form id={secondFormId}>
          <BlockButton type='reset'>B 폼 초기화</BlockButton>
        </form>
      </FlexRow>
    </FlexColumn>
  );
};

/** `form`을 바꾸면 새 폼의 초기화에 반응하고 이전 폼의 초기화에는 반응하지 않습니다. */
export const FormAssociation: Story = {
  render: () => (
    <StrictMode>
      <FormAssociationPreview />
    </StrictMode>
  ),
  play: async ({ canvasElement }) => {
    formAssociationChange.mockClear();
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "연결된 날짜" });

    await userEvent.click(input);
    await userEvent.keyboard("{ArrowUp}");
    await expect(input).toHaveValue("2027.07.25");
    await userEvent.click(canvas.getByRole("button", { name: "폼 전환" }));

    await userEvent.click(canvas.getByRole("button", { name: "A 폼 초기화" }));
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    await expect(input).toHaveValue("2027.07.25");
    await expect(formAssociationChange).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole("button", { name: "B 폼 초기화" }));
    await waitFor(() => expect(input).toHaveValue("2026.07.25"));
    await expect(formAssociationChange).toHaveBeenCalledTimes(2);

    await userEvent.click(input);
    await userEvent.keyboard("{Control>}a{/Control}{Backspace}2026");
    await expect(input).toHaveValue("2026.MM.DD");
    await userEvent.click(canvas.getByRole("button", { name: "B 폼 초기화" }));
    await waitFor(() => expect(input).toHaveValue("2026.07.25"));

    await userEvent.click(canvas.getByRole("button", { name: "폼 전환" }));
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.click(canvas.getByRole("button", { name: "B 폼 초기화" }));
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    await expect(input).toHaveValue("2027.07.25");
    await userEvent.click(canvas.getByRole("button", { name: "A 폼 초기화" }));
    await waitFor(() => expect(input).toHaveValue("2026.07.25"));
  },
};

const ResetLifecyclePreview = () => {
  const [isShown, setIsShown] = useState(true);
  const [changeCount, setChangeCount] = useState(0);

  return (
    <FlexColumn gap='24px' style={{ alignItems: "flex-start" }}>
      <form onReset={event => event.preventDefault()}>
        <DateField style={FIELD_WIDTH}>
          <DateField.Label>초기화 취소 날짜</DateField.Label>
          <DateField.Input defaultValue={DEFAULT_VALUE} onChange={canceledResetChange} />
        </DateField>
        <BlockButton type='reset'>초기화 취소</BlockButton>
      </form>
      <form onReset={() => setIsShown(false)}>
        {isShown && (
          <DateField style={FIELD_WIDTH}>
            <DateField.Label>제거할 날짜</DateField.Label>
            <DateField.Input
              defaultValue={DEFAULT_VALUE}
              onChange={next => {
                unmountedResetChange(next);
                setChangeCount(current => current + 1);
              }}
            />
          </DateField>
        )}
        <BlockButton type='reset'>초기화 후 필드 제거</BlockButton>
        <BlockButton onClick={() => setIsShown(true)}>필드 다시 표시</BlockButton>
        <p>{`변경 횟수: ${changeCount}`}</p>
      </form>
    </FlexColumn>
  );
};

/** 취소된 초기화나 필드 제거 이후의 초기화는 `onChange`를 호출하지 않습니다. */
export const ResetLifecycle: Story = {
  render: () => (
    <StrictMode>
      <ResetLifecyclePreview />
    </StrictMode>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const canceledInput = canvas.getByRole("textbox", { name: "초기화 취소 날짜" });
    await userEvent.click(canceledInput);
    await userEvent.keyboard("{ArrowUp}");
    canceledResetChange.mockClear();
    await userEvent.click(canvas.getByRole("button", { name: "초기화 취소" }));
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    await expect(canceledInput).toHaveValue("2027.07.25");
    await expect(canceledResetChange).not.toHaveBeenCalled();

    for (let count = 0; count < 2; count += 1) {
      await userEvent.click(canvas.getByRole("textbox", { name: "제거할 날짜" }));
      await userEvent.keyboard("{ArrowUp}");
      unmountedResetChange.mockClear();
      await userEvent.click(canvas.getByRole("button", { name: "초기화 후 필드 제거" }));
      // reset의 다음 태스크까지 기다린 뒤 늦은 콜백이 없는지 확인한다.
      await new Promise<void>(resolve => setTimeout(resolve, 0));
      await expect(canvas.queryByRole("textbox", { name: "제거할 날짜" })).not.toBeInTheDocument();
      await expect(unmountedResetChange).not.toHaveBeenCalled();
      await userEvent.click(canvas.getByRole("button", { name: "필드 다시 표시" }));
      await expect(canvas.getByRole("textbox", { name: "제거할 날짜" })).toHaveValue("2026.07.25");
    }
    await expect(canvas.getByText("변경 횟수: 2")).toBeInTheDocument();
  },
};
