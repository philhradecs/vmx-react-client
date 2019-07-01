import { useContext, useRef, useEffect } from 'react';
import { Box, Keyboard } from 'grommet';
import { StateContext, DispatchContext } from './lib/contexts';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';

export default function InputRangeCompound({ onChange, ...props }) {
  const { yearDropOpen, inputValue } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const firstRender = useRef(onChange);
  const inputRef = useRef();

  useEffect(() => {
    firstRender.current({ target: { value: inputValue } });
  }, [inputValue]);

  return (
    <Keyboard onEsc={() => dispatch({ type: 'closeDrop' })} target="document">
      <YearHotInput ref={inputRef} {...props} />
      <Box fill="horizontal">
        {yearDropOpen && <YearSelectDrop inputRef={inputRef} />}
      </Box>
    </Keyboard>
  );
}
