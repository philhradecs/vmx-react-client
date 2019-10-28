import React from 'react';
import { Box, TextInput, Text } from 'grommet';
import styled from 'styled-components';
import { FormClose } from 'grommet-icons';
import useHover from 'react-use-hover';
import IconWrapper from '../../IconWrapper';

const HoverBox = styled(Box)`
  &:hover,
  &:focus-within {
    background: #f8f8f8;
    transition: all 100ms ease-out;
  }
`;

export const StyledTextInput = React.forwardRef((props, ref) => {
  return (
    <HoverBox round="3px">
      <ClearButtonOverlay
        clearInput={props.clearInput}
        hasValue={props.hasValue}
      >
        <TextInput ref={ref} {...props} />
      </ClearButtonOverlay>
    </HoverBox>
  );
});

export const StyledPlaceholder = ({ value }) => (
  <Text color="#AAA">{value}</Text>
);

function ClearButtonOverlay({ children, clearInput, hasValue }) {
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 0,
    mouseLeaveDelayMS: 0
  });

  return (
    <Box style={{ position: 'relative' }} {...hoverProps}>
      {children}
      {hasValue &&
        isHovering && (
          <Box
            fill="vertical"
            align="end"
            justify="center"
            // animation={{ type: 'fadeIn', duration: '100' }}
            style={{
              position: 'absolute',
              right: '0'
            }}
          >
            <IconWrapper onClick={clearInput} iconPad="0.2rem">
              <FormClose color="light-6" />
            </IconWrapper>
          </Box>
        )}
    </Box>
  );
}
