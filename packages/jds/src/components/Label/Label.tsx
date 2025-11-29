import type { ElementType } from "react";

import { LabelStyled } from "./Label.style";
import type { LabelOwnProps } from "./label.types";

import { PolymorphicForwardRef } from "@/utils/forwardRef";

/**
 * Label - Polymorphic Label 컴포넌트
 *
 * `as` prop을 통해 다양한 HTML 요소로 렌더링할 수 있습니다.
 * TypeScript가 `as` prop에 따라 올바른 HTML 속성을 자동으로 추론합니다.
 *
 *
 */
export const Label = PolymorphicForwardRef<"label", LabelOwnProps>(
  ({ as, size = "md", textAlign = "left", weight = "normal", children, ...restProps }, ref) => {
    const Component = as || ("label" as ElementType);

    return (
      <LabelStyled
        ref={ref}
        as={Component}
        $size={size}
        $textAlign={textAlign}
        $weight={weight}
        {...restProps}
      >
        {children}
      </LabelStyled>
    );
  },
);
