import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useState } from "react";

import Icon from "../icon/Icon";
import Label from "../label/Label";
import Title from "../title/Title";

interface AccordionItemProps extends ComponentPropsWithoutRef<"button"> {
  id: string;
  title: string;
  label: string;
  children: ReactNode;
  caption?: ReactNode;
  isOpen: boolean;
  toggleHandler: (id: string) => void;
}

export const AccordionItem = ({
  id,
  title,
  label,
  children,
  caption,
  isOpen,
  toggleHandler,
  ...restProps
}: AccordionItemProps) => {
  const buttonClass = clsx(
    "interaction-default-subtle-scale transition-faster-fluent-hover gap-xs radius-3xs flex w-full text-start before:scale-x-102 before:scale-y-128 [&>*:first-child]:grow",
  );

  const contentClass = clsx(
    "bg-surface-deep-dark radius-2xs border-border-trans-assistive-dark gap-xs duration-normal ease(--motion-fluent) flex flex-col overflow-hidden px-(--gap-xs)",
    {
      "max-h-[500px] border py-(--gap-md)": isOpen,
      "max-h-0": !isOpen,
    },
  );

  return (
    <div className="gap-xs flex flex-col">
      <button onClick={() => toggleHandler(id)} className={buttonClass} {...restProps}>
        <Title hierarchy="weak" textColor={isOpen ? null : "text-object-neutral-dark"}>
          {title}
        </Title>
        {isOpen ? (
          <Icon name="less" size="xl" fillColor={"fill-object-hero-dark"} />
        ) : (
          <Icon name="expand" size="xl" fillColor="fill-object-neutral-dark" />
        )}
      </button>

      <div className={contentClass}>
        <Label hierarchy="stronger" weight="normal" textColor="text-object-hero-dark">
          {label}
        </Label>
        <div className="body-md text-object-normal-dark">{children}</div>
        {caption && <div className="body-sm text-object-alternative-dark">{caption}</div>}
      </div>
    </div>
  );
};

interface AccordionItemData {
  id: string;
  title: string;
  label: string;
  content: ReactNode;
  caption?: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string | null;
  onChange?: (id: string | null) => void;
}

export const Accordion = ({ items, defaultOpenId = null, onChange }: AccordionProps) => {
  const [openItemId, setOpenItemId] = useState<string | null>(defaultOpenId);

  const handleItemToggle = (id: string) => {
    const newValue = openItemId === id ? null : id;
    setOpenItemId(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="gap-4xl flex flex-col">
      {items.map(({ id, title, label, content, caption }) => (
        <AccordionItem
          key={id}
          id={id}
          title={title}
          label={label}
          isOpen={openItemId === id}
          toggleHandler={handleItemToggle}
          caption={caption}
        >
          {content}
        </AccordionItem>
      ))}
    </div>
  );
};
