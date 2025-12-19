import "@emotion/react";
import type { theme } from "@ject/jds/tokens";

type DesignToken = typeof theme;

declare module "@emotion/react" {
  export type Theme = DesignToken;
}
