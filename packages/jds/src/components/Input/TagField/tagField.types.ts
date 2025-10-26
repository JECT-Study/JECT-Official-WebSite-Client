import type { ComponentPropsWithoutRef } from 'react';

import type { IconName } from '../../Icon/Icon.types';
import type { FieldPublicProps } from '../input.types';

export interface Tag {
  id: string;
  label: string;
}

export interface TagFieldPublicProps
  extends FieldPublicProps,
    Omit<
      ComponentPropsWithoutRef<'input'>,
      'value' | 'onChange' | 'defaultValue' | 'style' | 'type'
    > {
  label?: string;
  labelIcon?: IconName;
  helperText?: string;
  tags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  maxTags?: number;
  allowDuplicates?: boolean;
  placeholder?: string;
}

export type TagFieldProps = TagFieldPublicProps;
