import { RefObject, useEffect, useState } from 'react';

const useCloseOutside = <T extends HTMLElement>(refs: RefObject<T>[] | RefObject<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const isOutSide = (e: MouseEvent) => {
      if (refs instanceof Array) {
        return refs.every(ref => ref.current && !ref.current.contains(e.target as Node));
      }

      return refs.current && !refs.current.contains(e.target as Node);
    };

    const outsideClick = (e: MouseEvent) => {
      if (isOutSide(e)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', outsideClick);

    return () => document.removeEventListener('mousedown', outsideClick);
  }, [refs, isOpen]);

  return { isOpen, setIsOpen };
};

export default useCloseOutside;
