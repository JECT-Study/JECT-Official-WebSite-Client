import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type HeroSize = "lg" | "md" | "sm" | "xs";
type HeroAlign = "center" | "left" | "right";

interface HeroProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  size?: HeroSize;
  textAlign?: HeroAlign;
  children: ReactNode;
}

const sizeClassName: Record<HeroSize, string> = {
  lg: "semantic-textStyle-title-4",
  md: "semantic-textStyle-title-3",
  sm: "semantic-textStyle-title-2",
  xs: "semantic-textStyle-title-1",
};

const alignClassName: Record<HeroAlign, string> = {
  center: "justify-center",
  left: "justify-start",
  right: "justify-end",
};

function Hero({
  size = "lg",
  textAlign = "center",
  className,
  children,
  ...props
}: HeroProps) {
  return (
    <div
      className={cn(
        "flex cursor-default items-center",
        sizeClassName[size],
        alignClassName[textAlign],
        "text-(--semantic-object-boldest)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Hero;
