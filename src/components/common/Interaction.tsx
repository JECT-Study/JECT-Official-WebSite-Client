import { ReactElement } from 'react';

import { Density, interactionStyle, outlineOffsetMap, Variant } from '@/styles/interactionStyle';

type Radius =
  | 'radius-4xs'
  | 'radius-3xs'
  | 'radius-2xs'
  | 'radius-xs'
  | 'radius-sm'
  | 'radius-md'
  | 'radius-lg'
  | 'radius-circle';

interface InteractionProps {
  children: ReactElement<HTMLElement>;
  variant: Variant;
  density: Density;
  outlineOffset?: number;
}

function Interaction({ children, variant, density, outlineOffset }: InteractionProps) {
  const bgColor = interactionStyle.variant[variant].density[density].bgColor;
  const opacity = interactionStyle.variant[variant].density[density].opacity;
  const bgRgba = interactionStyle.variant[variant].density[density].bgRgba;
  const outlineOffsetClass = outlineOffset
    ? outlineOffsetMap[outlineOffset]
    : '*:focus-visible:outline-4';

  const classNames = children.props.className.split(' ');
  const childHasBg = classNames.filter(classname => classname.includes('bg-'))[0];
  const childRadius = classNames.filter(classname => classname.includes('radius'))[0] as
    | Radius
    | undefined;

  return (
    <div>
      <div
        className={`${childHasBg ? bgColor : bgRgba} ${childHasBg ? opacity : ''} ${childRadius || ''} ${outlineOffsetClass} *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block`}
      >
        {children}
      </div>
    </div>
  );
}

export default Interaction;
