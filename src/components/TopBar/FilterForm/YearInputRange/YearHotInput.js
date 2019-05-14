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
    const newYears = inputParser(input);

    if (newYears && !newYears.every((year, i) => year === activeYears[i])) {
      dispatch({ type: 'applyUserInput', payload: newYears });
      updateFormValue(newYears);
    }
  }, [input]);

  function handleInputFocus() {
    dispatch({ type: 'readyInput' });
  }

  return (
    <TextInput
      id="yearInput"
      type="string"
      value={input}
      onChange={event => setInput(event.target.value)}
      onFocusCapture={handleInputFocus}
      plain
      onClick={event => event.target.select()}
      name={formProps.name}
      ref={ref}
    />
  );
});
