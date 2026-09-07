import type { ReactNode } from "react";

export type RenderableNode = Exclude<ReactNode, null | undefined | boolean>;
