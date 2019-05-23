import { useContext, useRef } from 'react';
import { StateContext } from './lib/contexts';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';

export default function InputRangeCompound({ placeholder, name }) {
  const { yearDropOpen } = useContext(StateContext);

  const inputEl = useRef();
  return (
    <>
      <YearHotInput ref={inputEl} placeholder={placeholder} name={name} />
      {yearDropOpen && <YearSelectDrop textInputRef={inputEl} />}
    </>
  );
}
