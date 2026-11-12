import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "tokens";
import { pxToRem } from "utils";

import { thumbnailVars } from "@/components/Thumbnail/thumbnail.css";

// CSS `dashed`는 선과 간격 길이를 정할 수 없어 선 6px, 간격 4px 점선을 SVG 마스크로 그린다.
// stroke가 경계선 가운데에 그려지므로 두께를 2px로 두어 박스 안쪽 1px만 보이게 한다. rx는 root의 radius.8과 맞춘다.
const DASHED_BORDER_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='black' stroke-width='2' stroke-dasharray='6 4'/%3E%3C/svg%3E")`;

const root = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: vars.scheme.semantic.spacing["24"],
    paddingBlock: vars.scheme.semantic.margin.lg,
    borderRadius: vars.scheme.semantic.radius["8"],
  },
  variants: {
    variant: {
      hollow: {},
      // 테두리가 박스 크기를 늘리지 않도록 ::after에 점선을 그린다. 비상호작용 컴포넌트라 ::before는 비워 둔다.
      dashed: {
        position: "relative",
        selectors: {
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            backgroundColor: vars.color.semantic.stroke.alpha.assistive,
            maskImage: DASHED_BORDER_MASK,
            WebkitMaskImage: DASHED_BORDER_MASK,
          },
        },
        "@media": {
          // 고대비 모드는 배경색을 지우므로 테두리를 border로 되살린다.
          "(forced-colors: active)": {
            border: `${vars.scheme.semantic.strokeWeight["1"]} dashed currentColor`,
            selectors: {
              "&::after": { display: "none" },
            },
          },
        },
      },
      alpha: {
        backgroundColor: vars.color.semantic.fill.subtlest,
      },
    },
    layout: {
      vertical: {
        flexDirection: "column",
        paddingInline: vars.scheme.semantic.margin.sm,
      },
      horizontal: {
        gap: vars.scheme.semantic.spacing["28"],
        paddingInline: vars.scheme.semantic.margin.md,
      },
    },
  },
});

const content = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: vars.scheme.semantic.spacing["8"],
  },
  variants: {
    layout: {
      vertical: {},
      horizontal: {
        flex: 1,
      },
    },
  },
});

const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    color: vars.color.semantic.object.normal,
    cursor: "default",
  },
  variants: {
    layout: {
      vertical: { justifyContent: "center" },
      horizontal: { justifyContent: "flex-start" },
    },
  },
});

const thumbnail = style({
  flexShrink: 0,
  vars: {
    [thumbnailVars.width]: pxToRem(64),
  },
});

const body = recipe({
  base: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    margin: vars.scheme.semantic.spacing["0"],
    overflow: "hidden",
    color: vars.color.semantic.object.alternative,
    textOverflow: "ellipsis",
  },
  variants: {
    layout: {
      vertical: { textAlign: "center" },
      horizontal: { textAlign: "left" },
    },
  },
});

const buttonContainer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.scheme.semantic.spacing["12"],
});

export const emptyStateStyles = {
  root,
  content,
  header,
  thumbnail,
  body,
  buttonContainer,
} as const;
