import { Anchor, Box, Drop } from 'grommet';
import { Performance, Iteration } from 'grommet-icons';

import { useState, useRef } from 'react';
import FilterForm from '../FilterForm/FilterForm';
import ViewSettings from '../ViewSettings/ViewSettings';
import IconWrapper from '../../IconWrapper';

function ControlBox() {
  const [showSettings, setShowSettings] = useState(false);
  const controlBox = useRef(null);

  return (
    <Box
      ref={controlBox}
      direction="row"
      fill="horizontal"
      align="center"
      justify="between"
      pad={{ horizontal: '1.5rem', top: '0.5rem' }}
    >
      <Box width="50px" justify="center" align="center">
        <Anchor href="/">
          <Box color="brand">VMX</Box>
        </Anchor>
      </Box>

      <FilterForm />

      <Box direction="row" gap="1rem">
        <IconWrapper
          onClick={() => setShowSettings(!showSettings)}
          highlightColor="accent-4"
        >
          <Performance color="neutral-3" />
        </IconWrapper>
        <IconWrapper highlightColor="accent-4" onClick={() => {}} disabled>
          <Iteration color="neutral-3" />
        </IconWrapper>
      </Box>

      {showSettings && (
        <Drop
          onClickOutside={() => setShowSettings(false)}
          onEsc={() => setShowSettings(false)}
          target={controlBox.current}
          align={{ top: 'bottom', left: 'left' }}
          elevation="none"
        >
          <ViewSettings />
        </Drop>
      )}
    </Box>
  );
}

export default ControlBox;
