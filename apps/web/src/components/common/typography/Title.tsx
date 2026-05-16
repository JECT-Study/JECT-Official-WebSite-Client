import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type TitleSize = "lg" | "md" | "sm" | "xs";
type TitleTextAlign = "center" | "left" | "right";

interface TitleProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  size?: TitleSize;
  textAlign?: TitleTextAlign;
  children: ReactNode;
}

const sizeClassName: Record<TitleSize, string> = {
  lg: "semantic-textStyle-title-4",
  md: "semantic-textStyle-title-3",
  sm: "semantic-textStyle-title-2",
  xs: "semantic-textStyle-title-1",
};

const alignClassName: Record<TitleTextAlign, string> = {
  center: "justify-center",
  left: "justify-start",
  right: "justify-end",
};

function Title({
  size = "md",
  textAlign = "left",
  className,
  children,
  ...props
}: TitleProps) {
  return (
    <div
      className={cn(
        "flex cursor-default items-center",
        sizeClassName[size],
        alignClassName[textAlign],
        "text-(--semantic-object-bolder)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Title;
