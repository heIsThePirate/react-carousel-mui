import * as React from 'react';
import Paper from '@mui/material/Paper';

import { useBreakpoint } from '../hooks';

export type CommonButtonProps = {
  children?: React.ReactNode;
  className?: string;
  sxButton?: object;
  onClick: () => void;
};

const CommonButton: React.FC<CommonButtonProps> = ({ children, onClick, sxButton }) => {
  const isMobile = useBreakpoint() === 'xs';

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translate(0px, -50%)',
        width: 34,
        height: 34,
        background: '#E0E0E0',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
        borderRadius: 17,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        display: isMobile ? 'none' : 'flex',
        ...sxButton,
      }}
      onClick={onClick}
    >
      {children}
    </Paper>
  );
};

export default CommonButton;
