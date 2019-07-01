import React from 'react';
import { Box, TextInput, Text } from 'grommet';
import useHover from 'react-use-hover';

export const StyledTextInput = React.forwardRef((props, ref) => {
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 0,
    mouseLeaveDelayMS: 0
  });

  return (
    <Box
      background={{ color: isHovering ? 'light-1' : 'inherit' }}
      style={{ transition: 'background 50ms ease' }}
      round="3px"
      {...hoverProps}
    >
      <TextInput ref={ref} {...props} />
    </Box>
  );
});

export const StyledPlaceholder = ({ value }) => (
  <Text color="#AAA">{value}</Text>
);
