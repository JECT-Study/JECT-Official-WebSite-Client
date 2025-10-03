import { LabelSize } from '@/components/Label/Label.style';

export type RadioSize = 'lg' | 'md' | 'sm' | 'xs';

export const RADIO_CONTAINER_SIZE = {
  lg: {
    width: 13,
    height: 8,
    gap: 12,
    padding: 12,
    borderRadius: 6,
  },
  md: {
    width: 13,
    height: 8,
    gap: 10,
    padding: 10,
    borderRadius: 6,
  },
  sm: {
    width: 11,
    height: 6,
    gap: 8,
    padding: 8,
    borderRadius: 4,
  },
  xs: {
    width: 9,
    height: 6,
    gap: 8,
    padding: 6,
    borderRadius: 4,
  },
};

export const SUB_LABEL_SIZE: Record<RadioSize, LabelSize> = {
  lg: 'md',
  md: 'sm',
  sm: 'xs',
  xs: 'xs',
};
