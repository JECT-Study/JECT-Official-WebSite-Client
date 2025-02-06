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
          bgColor: 'bg-object-hero-dark',
          opacity: 'opacity-88',
        },
        normal: {
          bgColor: 'bg-object-normal-dark',
          opacity: 'opacity-92',
        },
        subtle: {
          bgColor: 'bg-object-neutral-dark',
          opacity: 'opacity-95',
        },
      },
    },
    brand: {
      density: {
        bold: {
          bgColor: 'bg-accent-hero-dark',
          opacity: 'opacity-88',
        },
        normal: {
          bgColor: 'bg-accent-normal-dark',
          opacity: 'opacity-92',
        },
        subtle: {
          bgColor: 'bg-accent-neutral-dark',
          opacity: 'opacity-95',
        },
      },
    },
  },
};
