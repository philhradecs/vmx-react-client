import { forwardRef, useEffect, useLayoutEffect, useState } from 'react';
import { TextInput, FormField } from 'grommet';

const YearHotInput = forwardRef(
  ({ activeYears, dispatch, serializeYears, inputParser }, ref) => {
    const [input, setInput] = useState(serializeYears(activeYears));

    useLayoutEffect(() => {
      setInput(serializeYears(activeYears));
    }, [activeYears]);

    useEffect(() => {
      const newYears = inputParser(input);

      if (newYears && !newYears.every((year, i) => year === activeYears[i])) {
        dispatch({ type: 'applyUserInput', payload: newYears });
      }
    }, [input]);

    function handleInputFocus() {
      dispatch({ type: 'readyInput' });
    }

    return (
      <FormField name="year" label="Time">
        <TextInput
          id="yearInput"
          placeholder="type here"
          type="string"
          value={input}
          onChange={event => setInput(event.target.value)}
          onFocusCapture={handleInputFocus}
          onClick={event => event.target.select()}
          ref={ref}
        />
      </FormField>
    );
  }
);

export default YearHotInput;
