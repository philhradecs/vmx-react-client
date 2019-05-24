import { useContext, useRef, useEffect } from 'react';
import { StateContext } from './lib/contexts';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';

export default function InputRangeCompound({ onChange }) {
  const { yearDropOpen, selectedYears } = useContext(StateContext);

  const firstRender = useRef(onChange);
  const inputEl = useRef();

  useEffect(() => {
    firstRender.current({ target: { value: selectedYears } });
  }, [selectedYears]);
  return (
    <>
      <YearHotInput ref={inputEl} />
      {yearDropOpen && <YearSelectDrop textInputRef={inputEl} />}
    </>
  );
}
