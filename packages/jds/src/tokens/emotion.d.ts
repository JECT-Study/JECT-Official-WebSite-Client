// TODO(Emotion 제거): 이 파일 전체 삭제 — Emotion Theme 타입 augmentation 불필요
/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@emotion/react";
import type { theme } from "./theme";

type DesignToken = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends DesignToken {}
}
