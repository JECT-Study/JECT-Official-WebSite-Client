import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import Label from '@/components/common/label/Label';
import Title from '@/components/common/title/Title';

interface PostProps extends ComponentPropsWithoutRef<'a'> {
  title: string;
  label: string;
  children: ReactNode;
  disabled?: boolean;
}
export const Post = ({
  title,
  label,
  children,
  disabled = false,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...restProps
}: PostProps) => {
  const containerClass = clsx(
    'peer box-border radius-sm gap-3xs border border-border-assistive-dark flex w-full flex-col items-start px-(--gap-lg) py-(--gap-md) *:first:w-full *:first:truncate *:last:w-full *:last:truncate',
    disabled
      ? 'bg-surface-deep-dark pointer-events-none cursor-not-allowed'
      : 'bg-surface-embossed-dark pointer-events-auto cursor-pointer',
  );

  return (
    <a className={containerClass} target={target} rel={rel} {...restProps}>
      <Title
        hierarchy='weak'
        textColor={disabled ? 'text-object-disabled-dark' : 'text-object-hero-dark'}
      >
        {title}
      </Title>
      <span
        className={clsx(
          'body-lg line-clamp-2 h-[3.375rem] w-full text-left break-words whitespace-normal',
          disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark',
        )}
      >
        {children}
      </span>
      <Label
        hierarchy='strong'
        weight='bold'
        textColor={disabled ? 'text-object-disabled-dark' : 'text-object-assistive-dark'}
      >
        {label}
      </Label>
    </a>
  );
};
