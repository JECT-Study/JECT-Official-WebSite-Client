import { ReactNode, useState } from 'react';

import Icon from '../icon/Icon';
import Label from '../label/Label';
import Title from '../title/Title';

interface AccordionProps {
  title: string;
  label: string;
  children: ReactNode;
  caption: ReactNode;
}

function Accordion({ title, label, children, caption }: AccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='gap-xs flex flex-col'>
      <button
        onClick={toggle}
        className='interaction-default-subtle transition-faster-fluent-hover gap-xs radius-3xs flex w-full text-start before:scale-x-102 before:scale-y-128 [&>*:first-child]:grow'
      >
        <Title hierarchy='weak' textColor={isOpen ? null : 'text-object-neutral-dark'}>
          {title}
        </Title>
        {isOpen ? (
          <Icon name='less' size='xl' fillColor={'fill-object-hero-dark'} />
        ) : (
          <Icon name='expand' size='xl' fillColor='fill-object-neutral-dark' />
        )}
      </button>

      <div
        className={`${isOpen ? 'max-h-[500px] border py-(--gap-md)' : 'max-h-0'} bg-surface-deep-dark radius-2xs border-border-trans-assistive-dark gap-xs duration-normal ease(--motion-fluent) flex flex-col overflow-hidden px-(--gap-xs)`}
      >
        <Label hierarchy='stronger' weight='normal' textColor='text-object-hero-dark'>
          {label}
        </Label>
        <div className='body-md text-object-normal-dark'>{children}</div>
        {caption && <div className='body-sm text-object-alternative-dark'>{caption}</div>}
      </div>
    </div>
  );
}

export default Accordion;
