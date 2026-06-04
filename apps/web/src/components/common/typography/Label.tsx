import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type LabelSize = "lg" | "md" | "sm" | "xs";
type LabelAlign = "center" | "left" | "right";
type LabelWeight = "bold" | "normal" | "subtle";
type LabelCursor = "pointer" | "default";

interface LabelProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  as?: ElementType;
  size?: LabelSize;
  textAlign?: LabelAlign;
  weight?: LabelWeight;
  cursor?: LabelCursor;
  htmlFor?: string;
  children: ReactNode;
}

const sizeWeightClassName: Record<LabelSize, Record<LabelWeight, string>> = {
  lg: {
    bold: "semantic-textStyle-label-lg-bold",
    normal: "semantic-textStyle-label-lg-normal",
    subtle: "semantic-textStyle-label-lg-subtle",
  },
  md: {
    bold: "semantic-textStyle-label-md-bold",
    normal: "semantic-textStyle-label-md-normal",
    subtle: "semantic-textStyle-label-md-subtle",
  },
  sm: {
    bold: "semantic-textStyle-label-sm-bold",
    normal: "semantic-textStyle-label-sm-normal",
    subtle: "semantic-textStyle-label-sm-subtle",
  },
  xs: {
    bold: "semantic-textStyle-label-xs-bold",
    normal: "semantic-textStyle-label-xs-normal",
    subtle: "semantic-textStyle-label-xs-subtle",
  },
};

const alignClassName: Record<LabelAlign, string> = {
  center: "justify-center text-center",
  left: "justify-start text-left",
  right: "justify-end text-right",
};

function Label({
  as,
  size = "md",
  textAlign = "left",
  weight = "normal",
  cursor = "default",
  className,
  children,
  ...props
}: LabelProps) {
  const Component = as ?? "label";

  return (
    <Component
      className={cn(
        "flex items-center",
        sizeWeightClassName[size][weight],
        alignClassName[textAlign],
        cursor === "pointer" ? "cursor-pointer" : "cursor-default",
        "text-(--semantic-object-bold)",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Label;
