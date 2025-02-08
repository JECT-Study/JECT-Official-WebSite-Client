import { Density, interactionStyle, Variant } from '@/styles/interactionStyle';

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
  children: React.ReactNode;
  variant: Variant;
  density: Density;
  childHasBg: boolean;
  childRadius?: Radius;
}

function Interaction({ children, variant, density, childHasBg, childRadius }: InteractionProps) {
  const bgColor = interactionStyle.variant[variant].density[density].bgColor;
  const opacity = interactionStyle.variant[variant].density[density].opacity;
  const bgRgba = interactionStyle.variant[variant].density[density].bgRgba;

  return (
    <div>
      <div
        className={`${childHasBg ? bgColor : bgRgba} ${childHasBg ? opacity : ''} ${childRadius || ''} *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:focus-visible:outline-4`}
      >
        {children}
      </div>
    </div>
  );
}

export default Interaction;
