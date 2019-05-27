import React, { useContext } from 'react';
import { TextInput } from 'grommet';
import { ConfigContext, DispatchContext, StateContext } from './lib/contexts';

export default React.forwardRef(function YearHotInput(_, ref) {
  const dispatch = useContext(DispatchContext);
  const { placeholder, name, dropValuesRange } = useContext(ConfigContext);
  const state = useContext(StateContext);
  const { selectedYears, inputValue } = state;

  function selectTextAndOpenDrop(event) {
    event.target.select();
    dispatch({ type: 'openDrop' });
  }

  function handleSelectedYearsMod(mod) {
    const [minRange, maxRange] = [...dropValuesRange];
    const [minYear, maxYear] = [
      selectedYears[0],
      selectedYears[selectedYears.length - 1]
    ];

    if (minYear + mod >= minRange && maxYear + mod <= maxRange) {
      dispatch({ type: 'shiftSelectedYears', payload: mod });
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

  function handleKeyDown(event) {
    if (event.keyCode === 38) {
      event.preventDefault();
      handleSelectedYearsMod(+1);
    }
    if (event.keyCode === 40) {
      event.preventDefault();
      handleSelectedYearsMod(-1);
    }
  }

  function handleWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
      handleSelectedYearsMod(+1);
    } else if (event.deltaY > 0) {
      handleSelectedYearsMod(-1);
    }
  }

  return (
    <TextInput
      ref={ref}
      id="yearInput"
      type="string"
      value={inputValue}
      onChange={handleChange}
      onFocus={selectTextAndOpenDrop}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      plain
      onClick={selectTextAndOpenDrop}
      name={name}
      placeholder={placeholder}
    />
  );
});
