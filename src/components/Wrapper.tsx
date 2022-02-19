import * as React from 'react';
import Paper from '@mui/material/Paper';

export type WrapperProps = {
  children?: React.ReactNode;
  className?: string;
  sx?: object;
};

const Wrapper: React.FC<WrapperProps> = ({ sx, children }) => (
  <Paper elevation={0} sx={sx}>
    {children}
  </Paper>
);

export default Wrapper;
