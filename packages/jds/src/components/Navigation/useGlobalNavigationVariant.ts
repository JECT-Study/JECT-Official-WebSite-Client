import { useEffect, useState } from 'react';

import type { GlobalNavigationVariant } from './globalNavigation.types';

interface UseGlobalNavigationVariantOptions {
  threshold?: number;
}

export const useGlobalNavigationVariant = (
  options: UseGlobalNavigationVariantOptions = {},
): GlobalNavigationVariant => {
  const { threshold = 0 } = options;
  const [variant, setVariant] = useState<GlobalNavigationVariant>('empty');

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
