export type Variant = 'default' | 'brand';
export type Density = 'bold' | 'normal' | 'subtle';

interface InteractionStyleType {
  variant: {
    [key in Variant]: {
      density: {
        [key in Density]: {
          bgColor: string;
          opacity: string;
        };
      };
    };
  };
}

export const interactionStyle: InteractionStyleType = {
  variant: {
    default: {
      density: {
        bold: {
          bgColor:
            'hover:bg-object-hero-dark focus-visible:bg-object-hero-dark active:bg-object-hero-dark',
          opacity: '*:hover:opacity-88 *:active:opacity-88',
        },
        normal: {
          bgColor:
            'hover:bg-object-normal-dark focus-visible:bg-object-normal-dark  active:bg-object-normal-dark',
          opacity: '*:hover:opacity-92 *:active:opacity-92',
        },
        subtle: {
          bgColor:
            'hover:bg-object-neutral-dark focus-visible:bg-object-neutral-dark  active:bg-object-neutral-dark ',
          opacity: '*:hover:opacity-95 *:active:opacity-95',
        },
      },
    },
    brand: {
      density: {
        bold: {
          bgColor:
            'hover:bg-accent-hero-dark focus-visible:bg-accent-hero-dark  active:bg-accent-hero-dark',
          opacity: '*:hover:opacity-88 *:active:opacity-88',
        },
        normal: {
          bgColor:
            'hover:bg-accent-normal-dark focus-visible:bg-accent-normal-dark  active:bg-accent-normal-dark',
          opacity: '*:hover:opacity-92 *:active:opacity-92',
        },
        subtle: {
          bgColor:
            'hover:bg-accent-neutral-dark focus-visible:bg-accent-neutral-dark  active:bg-accent-neutral-dark',
          opacity: '*:hover:opacity-95 *:active:opacity-95',
        },
      },
    },
  },
};
