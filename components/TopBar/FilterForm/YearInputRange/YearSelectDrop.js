import React, { useContext } from 'react';
import { Box, Drop, RangeSelector, Stack, Text } from 'grommet';
import { DispatchContext, StateContext } from './lib/contexts';

const DisplayRange = React.memo(({ dropValues }) => {
  const displayValues = dropValues.reduce((list, val, i) => {
    return i % 10 === 0 ? [...list, val] : list;
  }, []);

  return displayValues.map(value => (
    <Box key={value}>
      <Text
        style={{
          fontFamily: 'monospace',
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none'
        }}
        margin="0.3rem"
      >
        {value}
      </Text>
    </Box>
  ));
});

export default function YearSelectDrop({ inputRef }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { dropSelection, dropValues } = state;

  const handleChange = selection =>
    dispatch({ type: 'applyNewSelection', payload: selection });

  const closeDrop = () => dispatch({ type: 'closeDrop' });

  function handleSelectionMod(mod) {
    const [minSelect, maxSelect] = [...dropSelection];
    let nextMin = minSelect + mod;
    let nextMax = maxSelect - mod;

    // if bounds would 'flip'
    if (nextMin > nextMax) {
      return dispatch({
        type: 'applyNewSelection',
        payload: [minSelect, minSelect]
      });
    }

    // if one of the bounds would exceed the the value range leave it where it was
    if (nextMin >= 0 && !(nextMax < dropValues.length)) {
      nextMax = maxSelect;
    } else if (!(nextMin >= 0) && nextMax < dropValues.length) {
      nextMin = minSelect;
    }

    // dispatch if both bounds are within value range
    if (nextMin >= 0 && nextMax < dropValues.length) {
      return dispatch({
        type: 'applyNewSelection',
        payload: [nextMin, nextMax]
      });
    }

    return null;
  }

  function handleWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
      handleSelectionMod(-1);
    } else if (event.deltaY > 0) {
      handleSelectionMod(+1);
    }
  }

  return (
    <Drop
      target={inputRef.current}
      align={{ top: 'bottom', right: 'right' }}
      onClickOutside={closeDrop}
      width="100vw"
      margin={{ top: '0.5rem' }}
      elevation="none"
      pad="1rem"
      onWheel={handleWheel}
    >
      <Stack id="rangeSelectContainer" fill>
        <Box
          direction="row"
          border={{ side: 'bottom', size: '2px', color: 'accent-2' }}
          justify="between"
        >
          <DisplayRange dropValues={dropValues} />
        </Box>
        <RangeSelector
          id="rangeSelector"
          direction="horizontal"
          min={0}
          max={dropValues.length - 1}
          invert={false}
          size="medium"
          round="xxsmall"
          values={dropSelection}
          onChange={handleChange}
        />
      </Stack>
    </Drop>
  );
}
