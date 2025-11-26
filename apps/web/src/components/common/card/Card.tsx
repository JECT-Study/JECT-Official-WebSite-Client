import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

import Label from "@/components/common/label/Label";
import Title from "@/components/common/title/Title";

interface CardProps extends ComponentPropsWithoutRef<typeof Link> {
  title: string;
  label: string;
  children: ReactNode;
  imgUrl: string;
  isDescriptionVisible?: boolean;
  disabled?: boolean;
}

export const Card = ({
  title,
  label,
  children,
  imgUrl,
  isDescriptionVisible = true,
  disabled = false,
  ...restProps
}: CardProps) => {
  const cardClass = clsx(
    "transition-normal-fluent-hover transition-normal-fluent-focus interaction-default-subtle border border-border-assistive-dark radius-md overflow-hidden box-border flex w-full h-[21.25rem] flex-col",
    disabled
      ? "bg-surface-deep-dark pointer-events-none cursor-not-allowed"
      : "bg-surface-embossed-dark pointer-events-auto cursor-pointer",
  );
  const imageContainerClass = clsx(
    "flex w-full overflow-hidden border-border-assistive-dark border-b",
    isDescriptionVisible ? "h-[11.6875rem]" : "h-[15.5625rem]",
  );

  return (
    <Link className={cardClass} {...restProps}>
      <div className={imageContainerClass}>
        <img src={imgUrl} alt='카드 이미지' className='block h-full w-full object-cover' />
      </div>
      <div className='gap-3xs flex w-full flex-col px-(--gap-md) pt-(--gap-xs) pb-(--gap-lg)'>
        <div className='gap-4xs flex flex-col items-start *:w-full *:truncate'>
          <Title
            hierarchy='weak'
            textColor={disabled ? "text-object-disabled-dark" : "text-object-hero-dark"}
          >
            {title}
          </Title>
          <Label
            hierarchy='stronger'
            weight='normal'
            textColor={disabled ? "text-object-disabled-dark" : "text-object-normal-dark"}
          >
            {label}
          </Label>
        </div>
        {isDescriptionVisible && (
          <span
            className={clsx(
              "body-lg line-clamp-2 h-[3.375rem] w-full text-left break-words whitespace-normal",
              disabled ? "text-object-disabled-dark" : "text-object-neutral-dark",
            )}
          >
            {children}
          </span>
        )}
      </div>
    </Link>
  );
};
