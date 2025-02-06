export type Hierarchy = 'stronger' | 'strong' | 'normal' | 'weak';
export type Weight = 'normal' | 'bold';

interface LabelType {
  weight: {
    [key in Weight]: {
      [key in Hierarchy]: {
        typo: string;
        lineHeight: string;
      };
    };
  };
}

export const labelType: LabelType = {
  weight: {
    normal: {
      stronger: {
        typo: 'label-lg',
        lineHeight: 'leading-[27px]',
      },
      strong: {
        typo: 'label-md',
        lineHeight: 'leading-[24px]',
      },
      normal: {
        typo: 'label-sm',
        lineHeight: 'leading-[22.5px]',
      },
      weak: {
        typo: 'label-xs',
        lineHeight: 'leading-[21px]',
      },
    },
    bold: {
      stronger: {
        typo: 'label-bold-lg',
        lineHeight: 'leading-[27px]',
      },
      strong: {
        typo: 'label-bold-md',
        lineHeight: 'leading-[24px]',
      },
      normal: {
        typo: 'label-bold-sm',
        lineHeight: 'leading-[22.5px]',
      },
      weak: {
        typo: 'label-bold-xs',
        lineHeight: 'leading-[21px]',
      },
    },
  },
};
