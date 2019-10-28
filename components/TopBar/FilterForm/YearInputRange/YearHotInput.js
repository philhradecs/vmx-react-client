import React, { useContext } from 'react';
import { Keyboard } from 'grommet';
import { ConfigContext, DispatchContext, StateContext } from './lib/contexts';
import { StyledTextInput } from '../StyledFilterFormComponents';

export default React.forwardRef(function YearHotInput(formikInputProps, ref) {
  const dispatch = useContext(DispatchContext);
  const { dropValuesRange } = useContext(ConfigContext);
  const { selectedYears } = useContext(StateContext);

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
    dispatch({ type: 'parseInput', payload: event.target.value });
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
    <Keyboard
      onUp={() => handleSelectedYearsMod(+1)}
      onDown={() => handleSelectedYearsMod(-1)}
      onEsc={() => dispatch({ type: 'closeDrop' })}
    >
      <StyledTextInput
        ref={ref}
        type="string"
        {...formikInputProps}
        onChange={handleChange}
        onFocus={selectTextAndOpenDrop}
        onWheel={handleWheel}
        onClick={selectTextAndOpenDrop}
      />
    </Keyboard>
  );
});
