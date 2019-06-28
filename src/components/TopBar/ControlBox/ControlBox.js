import { Anchor, Box, Keyboard, Layer, Drop } from 'grommet';
import { Performance, Iteration } from 'grommet-icons';

import { useState, useRef, useContext } from 'react';
import FilterForm from '../FilterForm/FilterForm';
import ViewSettings from '../ViewSettings/ViewSettings';
import IconWrapper from '../../IconWrapper';

function ControlBox({ prevQuery, small }) {
  const [showSettings, setShowSettings] = useState(false);
  const controlBox = useRef(null);

  return (
    <Box
      ref={controlBox}
      direction="row"
      fill="horizontal"
      align="center"
      justify="between"
      pad={{ horizontal: '1.5rem', vertical:'0.5rem' }}
    >
      <Box width="50px" justify="center" align="center">
        <Anchor href="/">
          <Box color="brand">VMX</Box>
        </Anchor>
      </Box>

      <FilterForm prevQuery={prevQuery} small={small} />

      <Box direction="row" gap="1rem">
        <IconWrapper
          onClick={() => setShowSettings(!showSettings)}
          highlightColor="accent-4"
        >
          <Performance color="neutral-3" />
        </IconWrapper>
        <IconWrapper highlightColor="accent-4" onClick={()=>{}}>
          <Iteration color="neutral-3" />
        </IconWrapper>
      </Box>

      {/* {showSettings && (
        <Keyboard onEsc={() => setShowSettings(false)} target="document">
          <Layer
            position="center"
            onClickOutside={() => setShowSettings(false)}
          >
            <ViewSettings small={small} />
          </Layer>
        </Keyboard>
      )} */}
      {showSettings && (
        <Drop
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
