import * as React from 'react';

import useBreakPoint from './useBreakpoint';

export type SliderProps = {
  itemGap?: number;
  itemsPerPage: { [key: string]: number };
  maxContainerWidth?: number;
  defaultTotalPadding?: number;
  defaultItemWidthMobile?: number;
  defaultTotalPaddingMobile?: number;
  defaultContainerPaddingMobile?: number;
};

export type SliderContext = {
  currentItemIndex: number;
  itemWidth: number;
  maxWidth: number | undefined;
  switchSlide: (action: string) => () => void;
  updateCurrentItemIndex: (n: number) => void;
};

const useSlider = ({
  itemGap = 16,
  itemsPerPage,
  maxContainerWidth = 960,
  defaultItemWidthMobile = 230,
  defaultContainerPaddingMobile = 16,
  defaultTotalPadding = 48,
  defaultTotalPaddingMobile = 24,
}: SliderProps): SliderContext => {
  const breakPoint = useBreakPoint();

  const [currentItemIndex, updateCurrentItemIndex] = React.useState<number>(0);
  const [itemWidth, updateItemWidth] = React.useState<number>(293);
  const [maxWidth, updateMaxWidth] = React.useState<number>();

  const ipp = itemsPerPage[breakPoint];

  const switchSlide = React.useCallback(
    (action: string) => () => {
      updateCurrentItemIndex((n: number) => (action === 'prev' ? n - 1 : n + 1));
    },
    [],
  );

  const calculateItemWidth = React.useCallback(() => {
    if (breakPoint === 'xs') {
      updateItemWidth(defaultItemWidthMobile);
      return defaultItemWidthMobile;
    }

    const { clientWidth } = window.document.documentElement;

    // capture padding of container
    const paddingTotal = breakPoint === 'xs' ? defaultTotalPaddingMobile : defaultTotalPadding;

    // calculate space left for the carousel
    let containerWidth = clientWidth - paddingTotal;
    if (maxContainerWidth && clientWidth > maxContainerWidth) {
      containerWidth = maxContainerWidth - paddingTotal;
    }

    // calculate item width considering containerWidth and itemGap
    const currItemWidth = (containerWidth - (ipp - 1) * itemGap) / ipp;
    updateItemWidth(currItemWidth);
    return currItemWidth;
  }, [breakPoint, ipp, itemGap, defaultItemWidthMobile, defaultTotalPadding, defaultTotalPaddingMobile]);

  const calculateMaxWidth = React.useCallback(
    (itemWidthParam: number) => {
      const { clientWidth } = window.document.documentElement;

      if (breakPoint === 'xs') {
        updateMaxWidth(clientWidth - defaultContainerPaddingMobile);
        return;
      }

      updateMaxWidth(itemWidthParam * ipp + itemGap * (ipp - 1));
    },
    [breakPoint, ipp, itemGap, defaultContainerPaddingMobile],
  );

  const calculate = React.useCallback(() => {
    const itemWidthParam = calculateItemWidth();

    if (itemWidthParam) {
      calculateMaxWidth(itemWidthParam);
    }
  }, [calculateItemWidth, calculateMaxWidth]);

  React.useEffect(() => {
    calculate();
    window.addEventListener('resize', calculate);

    return () => window.removeEventListener('resize', calculate);
  }, [breakPoint]);

  return {
    currentItemIndex,
    itemWidth,
    maxWidth,
    switchSlide,
    updateCurrentItemIndex,
  };
};

export default useSlider;
