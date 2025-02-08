import { Hierarchy } from './labelStyle';

interface TitleStyleType {
  hierarchy: {
    [key in Hierarchy]: {
      typo: string;
      lineHeight: string;
    };
  };
}

export const titleStyle: TitleStyleType = {
  hierarchy: {
    stronger: {
      typo: 'title-04',
      lineHeight: 'leading-[56px]',
    },
    strong: {
      typo: 'title-03',
      lineHeight: 'leading-[44.8px]',
    },
    normal: {
      typo: 'title-02',
      lineHeight: 'leading-[35px]',
    },
    weak: {
      typo: 'title-01',
      lineHeight: 'leading-[28px]',
    },
  },
};
