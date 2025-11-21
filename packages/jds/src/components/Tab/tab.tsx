import { Tabs as TabPrimitive } from 'radix-ui';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { createStyleContext } from './styleContext';
import { tabRecipe } from './tab.style';
import { mergeRefs } from '../../hooks/mergeRefs';

const { withRootProvider, withContext } = createStyleContext(tabRecipe);
export const TabIndicator = withContext('div', 'indicator');

export const Tab = withRootProvider(TabPrimitive.Root);

type TabListProps = ComponentPropsWithoutRef<typeof TabPrimitive.List>;

const ListBase = forwardRef<ElementRef<typeof TabPrimitive.List>, TabListProps>(
  ({ children, ...rest }, ref) => {
    const listRef = useRef<ElementRef<typeof TabPrimitive.List> | null>(null);

    const [indicatorStyle, setIndicatorStyle] = useState({
      left: 0,
      width: 0,
      bottom: 0,
      height: 0,
    });

    const mergedRef = mergeRefs(listRef, ref);

    //선택된 item([data-state="active"]')에 따라 indicator를 움직이는 로직
    const updateIndicator = useCallback(() => {
      if (!listRef.current) return;

      const activeTab = listRef.current.querySelector<HTMLElement>('[data-state="active"]');
      if (!activeTab) return;

      const activeRect = activeTab.getBoundingClientRect();
      const listEl = listRef.current;
      const listRect = listEl.getBoundingClientRect();

      requestAnimationFrame(() => {
        setIndicatorStyle({
          left: activeRect.left - listRect.left + listEl.scrollLeft,
          width: activeRect.width,
          bottom: 0,
          height: 0,
        });
      });
    }, []);

    useEffect(() => {
      const el = listRef.current;
      if (!el) return;

      const t = window.setTimeout(updateIndicator, 0);
      window.addEventListener('resize', updateIndicator);

      const observer = new MutationObserver(updateIndicator);
      observer.observe(el, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      const handleScroll = () => updateIndicator();
      el.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        clearTimeout(t);
        window.removeEventListener('resize', updateIndicator);
        observer.disconnect();
        el.removeEventListener('scroll', handleScroll);
      };
    }, [updateIndicator]);

    return (
      <TabPrimitive.List ref={mergedRef} {...rest}>
        {children}
        <TabIndicator style={indicatorStyle} />
      </TabPrimitive.List>
    );
  },
);
ListBase.displayName = 'TabListBase';

export const TabList = withContext(ListBase, 'list');
TabList.displayName = TabPrimitive.List.displayName;

export const TabTrigger = withContext(TabPrimitive.Trigger, 'trigger');
TabTrigger.displayName = TabPrimitive.Trigger.displayName;

export const TabContent = withContext(TabPrimitive.Content, 'content');
TabContent.displayName = TabPrimitive.Content.displayName;
