import { Hierarchy } from '@/components/common/label/label.style';

interface TitleStyleType {
  hierarchy: {
    [key in Hierarchy]: {
      typo: string;
    };
  };
}

export const titleStyle: TitleStyleType = {
  hierarchy: {
    stronger: {
      typo: 'title-04',
    },
    strong: {
      typo: 'title-03',
    },
    normal: {
      typo: 'title-02',
    },
    weak: {
      typo: 'title-01',
    },
  },
};
