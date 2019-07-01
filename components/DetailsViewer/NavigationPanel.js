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
    <Box
      {...props}
      justify="center"
      align="center"
      round="10px"
      overflow="hidden"
    >
      <IconWrapper
        onClick={handleClick}
        highlightColor="accent-4"
        // hoverIndicator="rgba(0,0,0,0.1)"
        disabled={disabled}
        iconPad={{ vertical: '2rem' }}
        fill
      >
        {icon}
      </IconWrapper>
    </Box>
  );
}
