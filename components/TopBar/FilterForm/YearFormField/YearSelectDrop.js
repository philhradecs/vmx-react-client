import { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Drop, RangeSelector, Stack, Text } from 'grommet';

function YearSelectDrop({
  dispatch,
  dropValues,
  dropValuesRange,
  presetSelection,
  entries,
  textInputRef
}) {
  const [selection, setSelection] = useState(presetSelection);

  function handleScroll(event) {
    event.preventDefault();
    const [rangeMin, rangeMax] = dropValuesRange;
    const years = [...dropValues];
    years.sort();
    if (event.deltaY < 0 && years[years.length - 1] < rangeMax) {
      dispatch({ type: 'incrementDropValues' });
    } else if (event.deltaY > 0 && years[0] > rangeMin) {
      dispatch({ type: 'decrementDropValues' });
    }
  }

  useEffect(() => {
    const scrollArea = document.getElementById('rangeSelectContainer');
    scrollArea.addEventListener('wheel', handleScroll);
    return function cleanup() {
      scrollArea.removeEventListener('wheel', handleScroll);
    };
  });

  useEffect(() => {
    dispatch({ type: 'applyUserSelection', payload: selection });
  }, [selection]);

  useLayoutEffect(() => {
    setSelection(presetSelection);
  }, [presetSelection]);

  function handleClickOutside() {
    dispatch({ type: 'closeDrop' });
  }

  const numArray = Array.from({ length: entries }, (v, k) => k);

  return (
    <Drop
      align={{ top: 'bottom', left: 'left' }}
      onClickOutside={handleClickOutside}
      stretch={false}
      target={textInputRef.current}
      pad={{ vertical: '0.6rem' }}
      elevation="small"
    >
      <Stack id="rangeSelectContainer">
        <Box direction="column">
          {numArray.map(index => (
            <Box key={index} pad={{ horizontal: '1rem', vertical: '0.4rem' }}>
              <Text style={{ fontFamily: 'monospace' }}>
                {dropValues[index]}
              </Text>
            </Box>
          ))}
        </Box>
        <RangeSelector
          id="rangeSelector"
          direction="vertical"
          min={0}
          max={entries - 1}
          invert={false}
          size="medium"
          round="xxsmall"
          values={selection}
          onChange={values => setSelection(values)}
        />
      </Stack>
    </Drop>
  );
}

export default YearSelectDrop;
