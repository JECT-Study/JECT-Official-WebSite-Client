import "@emotion/react";
import type { theme } from "@jects/jds/tokens";

type DesignToken = typeof theme;

declare module "@emotion/react" {
  export type Theme = DesignToken;
}
