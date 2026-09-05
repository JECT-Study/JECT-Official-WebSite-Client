import type { SegmentedControlsSize } from "./segmentedControls.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface SegmentedControlsContextValue {
  size: SegmentedControlsSize;
}

export const [SegmentedControlsProvider, useSegmentedControlsContext] =
  createCtxProvider<SegmentedControlsContextValue>("SegmentedControls", "SegmentedControls.Root");
