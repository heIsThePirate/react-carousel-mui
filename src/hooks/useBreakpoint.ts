import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import useIsTabletMode from './useIsTabletMode';

const useBreakPoint = (): string => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));
  const matchesTabletMode = useIsTabletMode();

  switch (true) {
  case matchesXS:
    return 'xs';
  case matchesTabletMode:
    return 'tablet';
  case matchesLG:
    return 'lg';
  case matchesMD:
    return 'md';
  case matchesSM:
    return 'sm';
  default:
    return 'md';
  }
};

export default useBreakPoint;
