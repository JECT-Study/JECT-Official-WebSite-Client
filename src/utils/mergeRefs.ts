export const mergeRefs =
  <T>(...refs: (React.Ref<T> | undefined)[]) =>
  (element: T | null) => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(element);
      } else if ('current' in ref) {
        (ref as React.MutableRefObject<T | null>).current = element;
      }
    });
  };
