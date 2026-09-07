import { getLabelClassName } from "@/utils/typography";

export const FIELD_WIDTH = { width: "16rem" };

export const fieldArgTypes = {
  children: {
    control: false as const,
    table: { disable: true },
  },
  status: {
    control: "inline-radio" as const,
    options: ["default", "success", "error"],
    description: "유효성/피드백 상태",
    table: { defaultValue: { summary: "default" } },
  },
  disabled: {
    control: "boolean" as const,
    description: "비활성화 상태",
    table: { defaultValue: { summary: "false" } },
  },
  readonly: {
    control: "boolean" as const,
    description: "읽기 전용 상태",
    table: { defaultValue: { summary: "false" } },
  },
  required: {
    control: "boolean" as const,
    description: "필수 입력 여부 (레이블 옆 * 표시)",
    table: { defaultValue: { summary: "false" } },
  },
};

export const FIELD_PLAYGROUND_ARGS = {
  status: "default" as const,
  disabled: false,
  readonly: false,
  required: false,
};

export function FormResult({ value }: { value: string | null }) {
  return (
    <output className={getLabelClassName()} style={{ ...FIELD_WIDTH, display: "block" }}>
      {value == null || value === "" ? "미제출" : `전송된 데이터: ${value}`}
    </output>
  );
}
