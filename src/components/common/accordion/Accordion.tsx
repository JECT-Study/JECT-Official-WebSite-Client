import { ReactNode, useEffect, useRef, useState } from 'react';

import Icon from '../icon/Icon';
import Interaction from '../interaction/Interaction';
import Label from '../label/Label';
import Title from '../title/Title';

interface AccordionProps {
  title: string;
  label: string;
  children: ReactNode;
  caption: ReactNode;
}

function Accordion({ title, label, children, caption }: AccordionProps) {
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
          onClick={toggle}
          className='gap-xs radius-3xs peer flex w-full text-start [&>*:first-child]:grow'
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
      </Interaction>

      <div
        ref={ref}
        className={`${isOpen ? 'border py-(--gap-md)' : ''} bg-surface-deep-dark radius-2xs border-border-trans-assistive-dark gap-xs duration-normal ease(--motion-fluent) flex flex-col overflow-hidden px-(--gap-xs)`}
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
