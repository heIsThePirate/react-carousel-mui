import * as React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import useSlider from '../hooks/useSlider';
import CommonButton from './CommonButton';
import Wrapper from './Wrapper';
import { useBreakpoint } from '../hooks';

export enum ItemsPerPage {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  tablet = 'tablet',
}

export type CarouselProps = {
  children?: React.ReactNode;
  className?: string;
  items: any;
  itemGap?: number;
  maxContainerWidth?: number;
  defaultTotalPadding?: number;
  defaultItemWidthMobile?: number;
  defaultTotalPaddingMobile?: number;
  defaultContainerPaddingMobile?: number;
  customPrevButton?: React.ReactNode;
  customNextButton?: React.ReactNode;
  itemsPerPage: { [key in ItemsPerPage]: number };
  itemRenderer: (slide: any) => React.ReactElement;
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  itemGap = 16,
  itemsPerPage,
  itemRenderer,
  customPrevButton,
  customNextButton,
  ...other
}) => {
  const breakPoint = useBreakpoint();
  const {
    currentItemIndex, itemWidth, maxWidth, switchSlide,
  } = useSlider({ itemGap, itemsPerPage, ...other });

  const isMobile = breakPoint === 'xs';
  const ipp = itemsPerPage[breakPoint];
  const shouldShowNext = currentItemIndex < items.length - ipp;
  const shouldShowPrev = currentItemIndex > 0;

  return (
    <Wrapper
      sx={{
        position: 'relative',
        maxWidth,
      }}
    >
      {shouldShowPrev
        && (customPrevButton || (
          <CommonButton sxButton={{ left: -17 }} onClick={switchSlide('prev')}>
            <ChevronLeftIcon />
          </CommonButton>
        ))}

      <Wrapper
        sx={{
          overflow: isMobile ? 'auto' : 'hidden',
          maxWidth: '100%',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',

          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Wrapper
          sx={{
            width: items.length * itemWidth + (items.length - 1) * itemGap,
            display: 'grid',
            gridAutoFlow: 'column',
            gridColumnGap: itemGap,
            position: 'relative',
            left: `-${currentItemIndex * itemWidth + currentItemIndex * itemGap}px`,
            transition: 'left 200ms ease-in-out',
          }}
        >
          {items.map((slide: any) => React.cloneElement(itemRenderer(slide), {
            style: { width: itemWidth },
          }))}
        </Wrapper>
      </Wrapper>

      {shouldShowNext
        && (customNextButton || (
          <CommonButton sxButton={{ right: -17 }} onClick={switchSlide('next')}>
            <ChevronRightIcon />
          </CommonButton>
        ))}
    </Wrapper>
  );
};

export default Carousel;
