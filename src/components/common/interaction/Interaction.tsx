import { ReactElement, useEffect, useRef, useState } from 'react';

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
  isInversed: boolean;
  scale?: string;
}

function Interaction({ children, variant, density, isInversed, scale }: InteractionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const interaction = isInversed
    ? interactionStyle.inverse[variant][density]
    : interactionStyle.noInverse[variant][density];

  const classNames = children.props.className.split(' ');

  const childRadius = classNames.filter(classname => classname.includes('radius'))[0] as
    | Radius
    | undefined;

  useEffect(() => {
    if (ref.current && ref.current.firstElementChild) {
      const { width, height } = ref.current.firstElementChild.getBoundingClientRect();

      setSize({ width, height });
    }
  }, [children]);

  return (
    <div className={`relative`} ref={ref}>
      {children}
      <div
        className={`${interaction} ${childRadius || ''} ${scale || ''} peer-focus-visible:shadow-focus-visible pointer-events-none absolute top-0 left-0`}
        style={{ width: size.width, height: size.height }}
      ></div>
    </div>
  );
}

export default Interaction;
