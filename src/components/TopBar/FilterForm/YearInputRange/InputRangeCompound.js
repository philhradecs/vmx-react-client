import { useContext, useRef, useEffect } from 'react';
import { StateContext } from './lib/contexts';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';

export default function InputRangeCompound({ onChange }) {
  const { yearDropOpen, inputValue } = useContext(StateContext);

  const firstRender = useRef(onChange);
  const inputRef = useRef();

  useEffect(() => {
    firstRender.current({ target: { value: inputValue } });
  }, [inputValue]);
  return (
    <>
      <YearHotInput ref={inputRef} />
      {yearDropOpen && <YearSelectDrop inputRef={inputRef} />}
    </>
  );
}
