import { Tabs as TabPrimitive } from "radix-ui";
import { Context } from "radix-ui/internal";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { tabStyles, type TabVariantProps } from "./tab.style";
import { mergeRefs } from "../../hooks/mergeRefs";

type StyleVariantContextValue = Required<TabVariantProps>;
const [StyleVariantProvider, useStyleVariant] =
  Context.createContext<StyleVariantContextValue>("TabStyleVariant");

// ----- Root -----
type TabRootProps = ComponentPropsWithoutRef<typeof TabPrimitive.Root> & TabVariantProps;

export const Tab = forwardRef<ElementRef<typeof TabPrimitive.Root>, TabRootProps>((props, ref) => {
  const {
    variant = tabStyles.defaultVariants?.variant || "content",
    layout = tabStyles.defaultVariants?.layout || "hug",
    ...rest
  } = props;

  const value = useMemo(() => ({ variant, layout }), [variant, layout]);

  return (
    <StyleVariantProvider {...value}>
      <TabPrimitive.Root ref={ref} {...rest} css={[tabStyles.base.root]} />
    </StyleVariantProvider>
  );
});
Tab.displayName = TabPrimitive.Root.displayName;

// ----- Indicator -----
type TabIndicatorProps = ComponentPropsWithoutRef<"div">;

const TabIndicator = (props: TabIndicatorProps) => {
  return (
    <div
      css={[tabStyles.base.indicator, tabStyles.variants.variant.content.indicator]}
      {...props}
    />
  );
};

// ----- List -----
type TabListProps = ComponentPropsWithoutRef<typeof TabPrimitive.List>;

export const TabList = forwardRef<ElementRef<typeof TabPrimitive.List>, TabListProps>(
  (props, ref) => {
    const listRef = useRef<ElementRef<typeof TabPrimitive.List> | null>(null);
    const { variant, layout } = useStyleVariant("TabList");

    const [indicatorStyle, setIndicatorStyle] = useState({
      left: 0,
      width: 0,
      height: 0,
    });

    const mergedRef = mergeRefs(listRef, ref);

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
          height: 0,
        });
      });
    }, []);

    useEffect(() => {
      const el = listRef.current;
      if (!el) {
        return;
      }

      const t = window.setTimeout(updateIndicator, 0);
      window.addEventListener("resize", updateIndicator);

      const observer = new MutationObserver(updateIndicator);
      observer.observe(el, { attributes: true, childList: true, subtree: true });

      const handleScroll = () => updateIndicator();
      el.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", updateIndicator);
        observer.disconnect();
        el.removeEventListener("scroll", handleScroll);
      };
    }, [updateIndicator]);
    return (
      <TabPrimitive.List
        ref={mergedRef}
        css={[
          tabStyles.base.list,
          tabStyles.variants.variant[variant].list,
          tabStyles.variants.layout[layout].list,
        ]}
        {...props}
      >
        {props.children}
        <TabIndicator
          style={{ ...indicatorStyle }}
          css={[tabStyles.variants.variant[variant].indicator]}
        />
      </TabPrimitive.List>
    );
  },
);
TabList.displayName = TabPrimitive.List.displayName;

// ----- Trigger -----
type TabTriggerProps = ComponentPropsWithoutRef<typeof TabPrimitive.Trigger>;

export const TabTrigger = forwardRef<ElementRef<typeof TabPrimitive.Trigger>, TabTriggerProps>(
  (props, ref) => {
    const { variant, layout } = useStyleVariant("TabTrigger");
    return (
      <TabPrimitive.Trigger
        ref={ref}
        css={[
          tabStyles.base.trigger,
          tabStyles.variants.variant[variant].trigger,
          tabStyles.variants.layout[layout].trigger,
        ]}
        {...props}
      />
    );
  },
);
TabTrigger.displayName = TabPrimitive.Trigger.displayName;

// ----- Content -----
type TabContentProps = ComponentPropsWithoutRef<typeof TabPrimitive.Content>;

export const TabContent = forwardRef<ElementRef<typeof TabPrimitive.Content>, TabContentProps>(
  (props, ref) => {
    return <TabPrimitive.Content ref={ref} css={[tabStyles.base.content]} {...props} />;
  },
);
TabContent.displayName = TabPrimitive.Content.displayName;
