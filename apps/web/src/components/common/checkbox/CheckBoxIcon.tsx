import type { CheckBoxIconProps } from "./CheckBox.types.ts";

import Icon from "@/components/common/icon/Icon";

export const CheckBoxIcon = ({ checked, isIndeterminate, disabled }: CheckBoxIconProps) => {
  if (isIndeterminate) {
    return (
      <Icon
        name='minus'
        size='2xs'
        fillColor={
          disabled
            ? "fill-object-static-inverse-assistive-dark"
            : "fill-object-static-inverse-hero-dark"
        }
      />
    );
  }
  if (checked) {
    return (
      <Icon
        name='check'
        size='2xs'
        fillColor={
          disabled
            ? "fill-object-static-inverse-assistive-dark"
            : "fill-object-static-inverse-hero-dark"
        }
      />
    );
  }
  return <div className='h-[0.875rem] w-[0.875rem]' />;
};
