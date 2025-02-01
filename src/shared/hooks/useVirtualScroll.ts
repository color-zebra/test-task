import { useLayoutEffect, useMemo, useState } from 'react';

const OVERSCAN_AMOUNT = 3;

type UseVirtualScrollParams = {
  itemHeight: number;
  totalItems: number;
  getScrollElement: () => HTMLDivElement | null;
};

export const useVirtualScroll = ({
  getScrollElement,
  itemHeight,
  totalItems,
}: UseVirtualScrollParams) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [scroll, setScroll] = useState(0);

  useLayoutEffect(() => {
    const container = getScrollElement();
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      const height =
        entry.borderBoxSize[0]?.blockSize ??
        entry.target.getBoundingClientRect().height;
      setContainerHeight(height);
    });
    observer.observe(container);
    return () => observer.disconnect();
  });

  useLayoutEffect(() => {
    const scrollableElement = getScrollElement();

    if (!scrollableElement) {
      return;
    }

    const handleScroll = () => {
      setScroll(scrollableElement.scrollTop);
    };

    scrollableElement.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => scrollableElement.removeEventListener('scroll', handleScroll);
  }, [getScrollElement]);

  const [startIndex, endIndex, totalHeight, offset] = useMemo(() => {
    const rangeStart = scroll;
    const rangeEnd = scroll + containerHeight;
    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);
    startIndex = Math.max(0, startIndex - OVERSCAN_AMOUNT);
    endIndex = Math.min(totalItems - 1, endIndex + OVERSCAN_AMOUNT);

    const totalHeight = totalItems * itemHeight;
    const offset = itemHeight * startIndex;

    return [startIndex, endIndex, totalHeight, offset];
  }, [scroll, containerHeight, itemHeight, totalItems]);

  return { startIndex, endIndex, totalHeight, offset };
};
