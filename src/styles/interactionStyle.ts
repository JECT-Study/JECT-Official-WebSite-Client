export type Variant = 'default' | 'brand';
export type Density = 'bold' | 'normal' | 'subtle';

interface InteractionStyleType {
  variant: {
    [key in Variant]: {
      density: Record<Density, string>;
    };
  };
}
// peer-hover:bg-[rgba(255,255,255,0.12)] peer-active:bg-[rgba(255,255,255,0.12)]
export const interactionStyle: InteractionStyleType = {
  variant: {
    default: {
      density: {
        bold: 'peer-hover:bg-[rgba(255,255,255,0.12)] peer-active:bg-[rgba(255,255,255,0.12)]',
        normal: 'peer-hover:bg-[rgba(212,211,222,0.08)] peer-active:bg-[rgba(212,211,222,0.08)]',
        subtle: 'peer-hover:bg-[rgba(247,245,255,0.033)] peer-active:bg-[rgba(247,245,255,0.033)]',
      },
    },
    brand: {
      density: {
        bold: 'peer-hover:bg-[rgba(145,147,255,0.12)] peer-active:bg-[rgba(145,147,255,0.12)]',
        normal: 'peer-hover:bg-[rgba(113,115,255,0.08)] peer-active:bg-[rgba(113,115,255,0.08)]',
        subtle: 'peer-hover:bg-[rgba(87,88,227,0.05)] peer-active:bg-[rgba(87,88,227,0.05)]',
      },
    },
  },
};

export const outlineOffsetMap: Record<number, string> = {
  1: '*:focus-visible:outline-offset-1',
  2: '*:focus-visible:outline-offset-2',
  3: '*:focus-visible:outline-offset-3',
  4: '*:focus-visible:outline-offset-4',
};
