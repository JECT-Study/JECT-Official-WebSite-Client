export type Variant = 'default' | 'brand';
export type Density = 'bold' | 'normal' | 'subtle';

interface InteractionStyleType {
  noInverse: {
    [key in Variant]: Record<Density, string>;
  };
  inverse: {
    [key in Variant]: Record<Density, string>;
  };
}

export const interactionStyle: InteractionStyleType = {
  noInverse: {
    default: {
      bold: 'peer-hover:bg-[rgba(255,255,255,0.12)] peer-active:bg-[rgba(255,255,255,0.12)]',
      normal: 'peer-hover:bg-[rgba(212,211,222,0.08)] peer-active:bg-[rgba(212,211,222,0.08)]',
      subtle: 'peer-hover:bg-[rgba(247,245,255,0.033)] peer-active:bg-[rgba(247,245,255,0.033)]',
    },
    brand: {
      bold: 'peer-hover:bg-[rgba(145,147,255,0.12)] peer-active:bg-[rgba(145,147,255,0.12)]',
      normal: 'peer-hover:bg-[rgba(113,115,255,0.08)] peer-active:bg-[rgba(113,115,255,0.08)]',
      subtle: 'peer-hover:bg-[rgba(87,88,227,0.05)] peer-active:bg-[rgba(87,88,227,0.05)]',
    },
  },
  inverse: {
    default: {
      bold: 'peer-hover:bg-[rgba(26,27,35,0.12)] peer-active:bg-[rgba(26,27,35,0.12)]',
      normal: 'peer-hover:bg-[rgba(58,59,67,0.08)] peer-active:bg-[rgba(58,59,67,0.08)]',
      subtle: 'peer-hover:bg-[rgba(2,3,18,0.032)] peer-active:bg-[rgba(2,3,18,0.032)]',
    },
    brand: {
      bold: 'peer-hover:bg-[rgba(48,45,190,0.12)] peer-active:bg-[rgba(48,45,190,0.12)]',
      normal: 'peer-hover:bg-[rgba(74,74,214,0.08)] peer-active:bg-[rgba(74,74,214,0.08)]',
      subtle: 'peer-hover:bg-[rgba(100,101,241,0.05)] peer-active:bg-[rgba(100,101,241,0.05)]',
    },
  },
};

export const outlineOffsetMap: Record<number, string> = {
  1: '*:focus-visible:outline-offset-1',
  2: '*:focus-visible:outline-offset-2',
  3: '*:focus-visible:outline-offset-3',
  4: '*:focus-visible:outline-offset-4',
};
