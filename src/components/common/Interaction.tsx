type Variant = 'default' | 'brand';
type Density = 'bold' | 'normal' | 'subtle';
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

export function Interaction({ children, variant, density, radius }: InteractionProps) {
  if (variant === 'default' && density === 'bold') {
    return (
      <div>
        <div
          className={`hover:bg-object-hero-dark focus-visible::bg-object-hero-dark active:bg-object-hero-dark *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:hover:opacity-88 *:focus-visible:outline-4 *:active:opacity-78 ${radius}`}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'default' && density === 'normal') {
    return (
      <div>
        <div
          className={`hover:bg-object-normal-dark focus-visible:bg-object-normal-dark active:bg-object-normal-dark *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:hover:opacity-92 *:focus-visible:outline-4 *:active:opacity-84 ${radius}`}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'default' && density === 'subtle') {
    return (
      <div>
        <div
          className={`hover:bg-object-neutral-dark active:bg-object-neutral-dark focus-visible:bg-object-neutral-dark *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:hover:opacity-95 *:focus-visible:outline-4 *:active:opacity-88 ${radius}`}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'brand' && density === 'bold') {
    return (
      <div>
        <div
          className={`hover:bg-accent-hero-dark active:bg-accent-hero-dark focus-visible:bg-accent-hero-dark *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:hover:opacity-88 *:focus-visible:outline-4 *:active:opacity-78 ${radius}`}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'brand' && density === 'normal') {
    return (
      <div>
        <div
          className={`hover:bg-accent-normal-dark active:bg-accent-normal-dark focus-visible:bg-accent-normal-dark *:focus:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:hover:opacity-92 *:focus-visible:outline-4 *:active:opacity-84 ${radius}`}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'brand' && density === 'subtle') {
    return (
      <div>
        <div
          className={`hover:bg-accent-neutral-dark active:bg-accent-neutral-dark focus-visible:bg-accent-neutral-dark *:focus-visible:outline-interactive-focus-dark *:focus-visible:hover:opacity-visible inline-block *:hover:opacity-95 *:focus-visible:outline-4 *:active:opacity-88 ${radius}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return;
}
