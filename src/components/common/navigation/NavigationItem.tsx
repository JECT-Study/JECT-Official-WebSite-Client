import { ComponentPropsWithoutRef } from 'react';

import Interaction from '../interaction/Interaction';

interface NavigationItemProps extends ComponentPropsWithoutRef<'button'> {
  children: string;
  isSelected: boolean;
}

function NavigationItem({ children, isSelected, disabled, ...props }: NavigationItemProps) {
  return (
    <>
      {disabled ? (
        <button
          disabled
          className={`text-object-disabled-dark radius-2xs label-bold-lg cursor-pointer px-(--gap-xs) py-(--gap-4xs)`}
        >
          {children}
        </button>
      ) : (
        <Interaction variant={isSelected ? 'brand' : 'default'} density='subtle' isInversed={false}>
          <button
            {...props}
            className={`${isSelected ? 'text-accent-hero-dark' : 'text-object-hero-dark'} peer radius-2xs label-bold-lg cursor-pointer px-(--gap-xs) py-(--gap-4xs)`}
          >
            {children}
          </button>
        </Interaction>
      )}
    </>
  );
}

export default NavigationItem;
