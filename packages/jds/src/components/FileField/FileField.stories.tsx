import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FIELD_PLAYGROUND_ARGS,
  FIELD_WIDTH,
  fieldArgTypes,
  FormResult,
} from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";
import { vars } from "tokens";

import { FileField } from "./FileField";
import type { FileFieldError } from "./fileField.types";
import { BlockButton } from "../Button/BlockButton";
import { Icon } from "../Icon";
import { Kbd } from "../Kbd";

/**
 * 파일 하나를 첨부하는 필드입니다. 박스 전체가 파일 선택창을 여는 트리거로 동작하며,
 * 파일이 있는 상태에서 박스를 클릭하면 다른 파일로 교체할 수 있습니다.
 */
const meta = {
  title: "Components/FileField",
  component: FileField,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: fieldArgTypes,
} satisfies Meta<typeof FileField>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_FILE = { name: "파일명.pdf", size: 2.6 * 1024 * 1024 };

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <FileField {...args} style={FIELD_WIDTH}>
      <FileField.Label
        suffix={
          <Icon
            name='info'
            size='2xs'
            style={args.disabled ? { color: vars.color.semantic.object.subtle } : undefined}
          />
        }
      >
        레이블
      </FileField.Label>
      <FileField.Input placeholder='플레이스홀더' />
      <FileField.Footer>
        <FileField.Helper>헬퍼 텍스트</FileField.Helper>
      </FileField.Footer>
    </FileField>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트와 용량 표시 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "success", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <FileField status={status} style={FIELD_WIDTH}>
            <FileField.Label>레이블</FileField.Label>
            <FileField.Input defaultValue={SAMPLE_FILE} placeholder='플레이스홀더' />
            <FileField.Footer>
              <FileField.Helper>헬퍼 텍스트</FileField.Helper>
            </FileField.Footer>
          </FileField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 파일을 선택하거나 삭제할 수 없습니다.
 * `disabled`는 포커스를 받을 수 없으며, `readonly`는 포커스를 받을 수 있습니다.
 */
export const States: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["disabled", { disabled: true }],
          ["readonly", { readonly: true }],
          ["required", { required: true }],
        ] as const
      ).map(([name, props]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <FileField {...props} style={FIELD_WIDTH}>
            <FileField.Label>레이블</FileField.Label>
            <FileField.Input defaultValue={SAMPLE_FILE} placeholder='플레이스홀더' />
            <FileField.Footer>
              <FileField.Helper>헬퍼 텍스트</FileField.Helper>
            </FileField.Footer>
          </FileField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * 값은 `File`이거나 이름과 용량만 가진 값입니다.
 * 서버에 이미 있는 파일처럼 실제 파일 데이터가 없는 경우에는 후자로 표시합니다.
 */
export const Values: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["없음", undefined],
          ["있음", SAMPLE_FILE],
        ] as const
      ).map(([name, defaultValue]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <FileField style={FIELD_WIDTH}>
            <FileField.Label>레이블</FileField.Label>
            <FileField.Input defaultValue={defaultValue} placeholder='플레이스홀더' />
          </FileField>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `FileField.Size`는 선택된 파일의 용량을 표시하고, 파일이 없으면 렌더되지 않습니다.
 */
export const WithSize: Story = {
  render: () => (
    <FileField style={FIELD_WIDTH}>
      <FileField.Label>레이블</FileField.Label>
      <FileField.Input defaultValue={SAMPLE_FILE} placeholder='플레이스홀더' />
      <FileField.Footer>
        <FileField.Helper>헬퍼 텍스트</FileField.Helper>
        <FileField.Size />
      </FileField.Footer>
    </FileField>
  ),
};

/**
 * `accept`와 `maxSize`를 만족하지 않는 파일은 선택되지 않고 `onError`로 전달됩니다.
 * `accept`는 native 속성으로도 함께 전달되어 파일 선택창의 목록을 제한합니다.
 */
export const WithValidation: Story = {
  render: function Render() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<FileFieldError | null>(null);

    const handleChange = (next: File | null) => {
      setFile(next);
      setError(null);
    };

    return (
      <FileField status={error == null ? "default" : "error"} style={FIELD_WIDTH}>
        <FileField.Label>레이블</FileField.Label>
        <FileField.Input
          accept='.pdf'
          maxSize={5 * 1024 * 1024}
          placeholder='플레이스홀더'
          value={file}
          onChange={handleChange}
          onError={setError}
        />
        <FileField.Footer>
          <FileField.Helper>
            {error?.type === "INVALID_TYPE"
              ? "PDF 파일만 첨부할 수 있어요"
              : error?.type === "FILE_TOO_LARGE"
                ? "5MB 이하의 파일만 첨부할 수 있어요"
                : "5MB 이하의 PDF 파일을 첨부해주세요"}
          </FileField.Helper>
        </FileField.Footer>
      </FileField>
    );
  },
};

/**
 * `suffix`는 삭제 버튼 오른쪽에 형제로 배치되므로 배지나 단축키 표시 같은 읽기 전용 요소만 사용합니다.
 */
export const WithSuffix: Story = {
  render: () => (
    <FileField style={FIELD_WIDTH}>
      <FileField.Label>레이블</FileField.Label>
      <FileField.Input
        defaultValue={SAMPLE_FILE}
        placeholder='플레이스홀더'
        suffix={
          <Kbd type='function' size='sm'>
            ⌘
          </Kbd>
        }
      />
      <FileField.Footer>
        <FileField.Helper>헬퍼 텍스트</FileField.Helper>
      </FileField.Footer>
    </FileField>
  ),
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const entry = new FormData(e.currentTarget).get("portfolio");
        setSubmitted(entry instanceof File && entry.name !== "" ? entry.name : null);
      }}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <FileField style={FIELD_WIDTH}>
          <FileField.Label>레이블</FileField.Label>
          <FileField.Input name='portfolio' defaultValue={SAMPLE_FILE} placeholder='플레이스홀더' />
          <FileField.Footer>
            <FileField.Helper>헬퍼 텍스트</FileField.Helper>
            <FileField.Size />
          </FileField.Footer>
        </FileField>
        <BlockButton type='submit' style={{ width: "100%" }}>
          제출
        </BlockButton>
        <FormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * `name`을 지정하면 선택한 파일이 폼에 함께 전송됩니다.
 * 실제 파일 데이터가 없는 초기값은 전송되지 않으며, 새로 파일을 선택한 후부터 전송됩니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};
