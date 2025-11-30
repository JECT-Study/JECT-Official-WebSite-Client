import type { ReactNode } from "react";

import Label from "@/components/common/label/Label";

interface BadgeProps {
  children: ReactNode;
  backgroundColor: string;
  textColor: string;
}

function Badge({ children, backgroundColor, textColor }: BadgeProps) {
  return (
    <div className={`radius-2xs ${backgroundColor} inline-block px-(--gap-xs) py-(--gap-5xs)`}>
      <Label hierarchy='stronger' weight='normal' textColor={textColor}>
        {children}
      </Label>
    </div>
  );
}

export default Badge;
