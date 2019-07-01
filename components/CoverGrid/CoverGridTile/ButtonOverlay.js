import React from 'react';

import { Box } from 'grommet';

import IconWrapper from '../../IconWrapper';

export default function ButtonOverlay({
  children,
  buttonMap,
  icons,
  ...props
}) {
  const highlightColor = 'accent-4';
  const color = 'brand';
  const size = '1.3rem';

  return (
    <Box fill>
      <Box align="end" direction="column" gap="0.15rem" {...props}>
        {buttonMap.map(button => (
          <IconWrapper
            key={button.action.toString()}
            onClick={button.action}
            highlightColor={highlightColor}
            iconPad="0.5rem"
            {...button.props}
          >
            {React.cloneElement(button.icon, { color, size })}
          </IconWrapper>
        ))}
      </Box>
    </Box>
  );
}
