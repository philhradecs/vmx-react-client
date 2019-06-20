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
    <Box {...props} justify="center" align="center" pad="0.5rem">
      <IconWrapper
        onClick={handleClick}
        highlightColor="accent-4"
        hoverIndicator="light-1"
        fill
        disabled={disabled}
      >
        {icon}
      </IconWrapper>
    </Box>
  );
}
