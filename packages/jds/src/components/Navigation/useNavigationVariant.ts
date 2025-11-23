import { useEffect, useState } from 'react';

import type { NavigationVariant } from './navigation.types';

interface UseNavigationVariantOptions {
  threshold?: number;
}

export const useNavigationVariant = (
  options: UseNavigationVariantOptions = {},
): NavigationVariant => {
  const { threshold = 0 } = options;
  const [variant, setVariant] = useState<NavigationVariant>('empty');

  useEffect(() => {
    const handleScroll = () => {
      setVariant(window.scrollY > threshold ? 'solid' : 'empty');
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return variant;
};
