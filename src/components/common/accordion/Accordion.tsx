import { ReactNode, useEffect, useRef, useState } from 'react';

import Icon from '../icon/Icon';
import Interaction from '../interaction/Interaction';
import Label from '../label/Label';
import Title from '../title/Title';

interface AccordionProps {
  title: string;
  label: string;
  children: ReactNode;
}

function Accordion({ title, label, children }: AccordionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      ref.current?.style.setProperty('max-height', '500px');
    } else {
      ref.current?.style.setProperty('max-height', '0px');
    }
  }, [ref, isOpen]);

  return (
    <div className='gap-xs flex flex-col'>
      <Interaction
        variant='default'
        density='subtle'
        isInversed={false}
        scale='scale-x-102 scale-y-128'
        className='peer-hover:duration-slower peer-hover:ease(--motion-fluent)'
      >
        <button
          className='gap-xs radius-3xs peer flex w-full cursor-pointer text-start [&>*:first-child]:grow'
          onClick={toggle}
        >
          <Title hierarchy='weak' textColor={isOpen ? null : 'text-object-neutral-dark'}>
            {title}
          </Title>
          <Icon
            name='less'
            size='xl'
            fillColor={isOpen ? 'fill-object-hero-dark' : 'fill-object-neutral-dark'}
          />
        </button>
      </Interaction>

      <div
        ref={ref}
        className={`${isOpen ? 'border py-(--gap-md)' : ''} bg-surface-deep-dark radius-2xs border-border-trans-assistive-dark gap-xs duration-normal ease(--motion-fluent) flex flex-col overflow-hidden px-(--gap-xs)`}
      >
        <Label hierarchy='stronger' weight='normal' textColor='text-object-hero-dark'>
          {label}
        </Label>
        <div className='body-md text-object-normal-dark'>{children}</div>
      </div>
    </div>
  );
}

export default Accordion;
