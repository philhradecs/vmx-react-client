import { forwardRef, useContext } from 'react';
import { TextInput } from 'grommet';
import { DispatchContext, StateContext } from './lib/contexts';

export default forwardRef(function YearHotInput({ name, placeholder }, ref) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { selectedYears, inputValue } = state;

  function selectTextAndOpenDrop(event) {
    event.target.select();
    dispatch({ type: 'openDrop' });
  }

  function handleKeyDown(event) {
    if (event.keyCode === 38) {
      dispatch({ type: 'incrementDropValues' });
    }
    if (event.keyCode === 40) {
      dispatch({ type: 'decrementDropValues' });
    }
  }

  function handleChange(event) {
    event.persist();
    if (event.target.value === '' && selectedYears.length > 0) {
      dispatch({ type: 'reset' });
    } else {
      dispatch({ type: 'parseInput', payload: event.target.value });
    }
  }

  return (
    <TextInput
      id="yearInput"
      type="string"
      value={inputValue}
      onChange={handleChange}
      onFocusCapture={selectTextAndOpenDrop}
      onKeyDown={handleKeyDown}
      plain
      onClick={selectTextAndOpenDrop}
      name={name}
      ref={ref}
      placeholder={placeholder}
    />
  );
});
