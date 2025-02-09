export type Hierarchy = 'stronger' | 'strong' | 'normal' | 'weak';
export type Weight = 'normal' | 'bold';

interface LabelStyleType {
  weight: {
    [key in Weight]: {
      hierarchy: {
        [key in Hierarchy]: {
          typo: string;
        };
      };
    };
  };
}

export const labelStyle: LabelStyleType = {
  weight: {
    normal: {
      hierarchy: {
        stronger: {
          typo: 'label-lg',
        },
        strong: {
          typo: 'label-md',
        },
        normal: {
          typo: 'label-sm',
        },
        weak: {
          typo: 'label-xs',
        },
      },
    },
    bold: {
      hierarchy: {
        stronger: {
          typo: 'label-bold-lg',
        },
        strong: {
          typo: 'label-bold-md',
        },
        normal: {
          typo: 'label-bold-sm',
        },
        weak: {
          typo: 'label-bold-xs',
        },
      },
    },
  },
};
