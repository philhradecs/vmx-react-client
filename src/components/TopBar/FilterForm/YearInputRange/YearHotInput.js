import { forwardRef, useEffect, useLayoutEffect, useState } from 'react';
import { TextInput } from 'grommet';

export default forwardRef(function YearHotInput(
  { activeYears, dispatch, serializeYears, inputParser, ...formProps },
  ref
) {
  const [input, setInput] = useState(serializeYears(activeYears));

  function updateFormValue(years) {
    formProps.onChange({ value: years });
  }

  useLayoutEffect(() => {
    setInput(serializeYears(activeYears));
    updateFormValue(activeYears);
  }, [activeYears]);

  useEffect(() => {
    if (input === '') {
      dispatch({ type: 'clearField' });
    } else {
      const newYears = inputParser(input);
      if (newYears && !newYears.every((year, i) => year === activeYears[i])) {
        dispatch({ type: 'applyUserInput', payload: newYears });
        dispatch({ type: 'openDrop' });
        updateFormValue(newYears);
      }
    }
  }, [input]);

  function handleInputFocus() {
    if (activeYears.length > 0) {
      dispatch({ type: 'openDrop' });
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 38) {
      dispatch({ type: 'incrementDropValues' });
    }
    if (event.keyCode === 40) {
      dispatch({ type: 'decrementDropValues' });
    }
  }

  // TODO: add scroll to inc & dec dropValues

  return (
    <TextInput
      id="yearInput"
      type="string"
      value={input}
      onChange={event => setInput(event.target.value)}
      onFocusCapture={handleInputFocus}
      onKeyDown={handleKeyDown}
      plain
      onClick={event => event.target.select()}
      name={formProps.name}
      ref={ref}
      placeholder={formProps.placeholder}
    />
  );
});
