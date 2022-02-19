import * as React from 'react';

const tabletRegex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;

const useIsTabletMode = () => {
  const [isTabletMode, toggleTabletMode] = React.useState<boolean>();

  React.useEffect(() => {
    const checkViewport = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isTablet = tabletRegex.test(userAgent);

      toggleTabletMode(isTablet);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport, true);

    return () => window.removeEventListener('resize', checkViewport, true);
  }, []);

  return isTabletMode;
};

export default useIsTabletMode;
