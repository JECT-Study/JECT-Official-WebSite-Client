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
  radius?: Radius;
}

function Interaction({ children, variant, density, radius }: InteractionProps) {
  const background = interactionStyle.variant[variant].density[density].bgColor;
  const opacity = interactionStyle.variant[variant].density[density].opacity;

  return (
    <div>
      <div
        className={`${background} ${opacity} ${radius || ''} *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:focus-visible:outline-4`}
      >
        {children}
      </div>
    </div>
  );
}

export default Interaction;
