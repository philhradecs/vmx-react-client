import { useContext, useRef } from 'react';
import useDebounce from 'react-use/lib/useDebounce';
import { Box, Keyboard } from 'grommet';
import { StateContext, DispatchContext } from './lib/contexts';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';

export default function InputRangeCompound({ onChange, ...formikInputProps }) {
  const { yearDropOpen, inputValue } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const firstRender = useRef(onChange); // avoid infinite render loop
  const inputRef = useRef();

  useDebounce(
    () => {
      firstRender.current({
        target: { value: inputValue, name: formikInputProps.name } // manually trigger onChange event with imitated event object
      });
    },
    0,
    [inputValue]
  );

  return (
    <Keyboard onEsc={() => dispatch({ type: 'closeDrop' })} target="document">
      <YearHotInput ref={inputRef} {...formikInputProps} />
      <Box fill="horizontal">
        {yearDropOpen && <YearSelectDrop inputRef={inputRef} />}
      </Box>
    </Keyboard>
  );
}
