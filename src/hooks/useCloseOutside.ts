import { RefObject, useEffect, useState } from 'react';

const useCloseOutside = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const outsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', outsideClick);

    return () => document.removeEventListener('mousedown', outsideClick);
  }, [ref, isOpen]);

  return { isOpen, setIsOpen };
};

export default useCloseOutside;
