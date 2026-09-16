import { vars } from "tokens";

import type { CellStatus } from "./cell.types";

export interface CellAppearance {
  status: CellStatus;
  outsideMonth: boolean;
  disabled: boolean;
  background: string;
  outline: string | null;
  label: string;
  overlay: string;
}

export const cellAppearances = [
  {
    status: "normal",
    outsideMonth: false,
    disabled: false,
    background: "transparent",
    outline: null,
    label: vars.color.semantic.object.bold,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "normal",
    outsideMonth: true,
    disabled: false,
    background: "transparent",
    outline: null,
    label: vars.color.semantic.object.subtle,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "normal",
    outsideMonth: false,
    disabled: true,
    background: vars.color.semantic.fill.subtlest,
    outline: null,
    label: vars.color.semantic.object.subtle,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "normal",
    outsideMonth: true,
    disabled: true,
    background: vars.color.semantic.fill.subtlest,
    outline: null,
    label: vars.color.semantic.object.subtlest,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "current",
    outsideMonth: false,
    disabled: false,
    background: vars.color.semantic.accent.alpha.subtlest,
    outline: vars.color.semantic.accent.alpha.subtle,
    label: vars.color.semantic.accent.bold,
    overlay: vars.color.semantic.accent.normal,
  },
  {
    status: "current",
    outsideMonth: true,
    disabled: false,
    background: vars.color.semantic.fill.subtlest,
    outline: vars.color.semantic.stroke.alpha.subtle,
    label: vars.color.semantic.object.subtle,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "current",
    outsideMonth: false,
    disabled: true,
    background: vars.color.semantic.accent.alpha.subtlest,
    outline: vars.color.semantic.accent.alpha.subtler,
    label: vars.color.semantic.accent.alpha.subtle,
    overlay: vars.color.semantic.accent.normal,
  },
  {
    status: "current",
    outsideMonth: true,
    disabled: true,
    background: vars.color.semantic.fill.subtlest,
    outline: vars.color.semantic.stroke.alpha.subtler,
    label: vars.color.semantic.object.subtler,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "selected",
    outsideMonth: false,
    disabled: false,
    background: vars.color.semantic.accent.neutral,
    outline: null,
    label: vars.color.semantic.object.static.inverse.boldest,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "selected",
    outsideMonth: true,
    disabled: false,
    background: vars.color.semantic.fill.alternative,
    outline: null,
    label: vars.color.semantic.object.static.inverse.boldest,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "selected",
    outsideMonth: false,
    disabled: true,
    background: vars.color.semantic.accent.alpha.subtle,
    outline: null,
    label: vars.color.semantic.accent.alpha.assistive,
    overlay: vars.color.semantic.fill.boldest,
  },
  {
    status: "selected",
    outsideMonth: true,
    disabled: true,
    background: vars.color.semantic.fill.subtler,
    outline: null,
    label: vars.color.semantic.object.static.subtle,
    overlay: vars.color.semantic.fill.boldest,
  },
] as const satisfies readonly CellAppearance[];
