import React from 'react';
import { Box } from 'grommet';
import IconWrapper from '../IconWrapper';

export default function NavigationPanel({
  icon,
  handleClick,
  disabled,
  ...props
}) {
  return (
    <Box {...props} justify="center" align="center">
      <IconWrapper
        onClick={handleClick}
        highlightColor="accent-4"
        disabled={disabled}
        iconPad={{ vertical: '2rem' }}
      >
        {icon}
      </IconWrapper>
    </Box>
  );
}
