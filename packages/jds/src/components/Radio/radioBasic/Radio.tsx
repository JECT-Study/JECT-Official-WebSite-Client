import { forwardRef } from "react";

import { RadioInput, RadioLabel, RadioSpan } from "./Radio.style";
import type { RadioProps } from "./radio.types";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ radioSize = "md", ...props }, ref) => {
    return (
      <RadioLabel radioSize={radioSize}>
        <RadioInput ref={ref} type='radio' {...props} />
        <RadioSpan className='visual' aria-hidden='true' radioSize={radioSize} />
      </RadioLabel>
    );
  },
);

Radio.displayName = "Radio";
