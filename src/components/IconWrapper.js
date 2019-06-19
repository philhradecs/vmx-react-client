import React, { useEffect, useState } from 'react';
import { Box, Button } from 'grommet';
import useHover from 'react-use-hover';

export default function IconWrapper({
  children,
  highlightColor,
  onClick,
  fill,
  disabled,
  ...props
}) {
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 10,
    mouseLeaveDelayMS: 0
  });

  let color = {};
  if (!disabled && highlightColor && isHovering) {
    color = { color: highlightColor };
  }

  const colouredIcon = React.cloneElement(children, color);

  return (
    <Button
      fill={fill}
      onClick={onClick}
      background={isHovering ? 'light-1' : ''}
      plain
      disabled={disabled}
      {...hoverProps}
      {...props}
    >
      <Box align="center" justify="center">
        {colouredIcon}
      </Box>
    </Button>
  );
}
