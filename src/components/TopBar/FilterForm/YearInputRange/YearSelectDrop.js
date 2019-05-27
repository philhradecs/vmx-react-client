import { useContext } from 'react';
import { Box, Drop, RangeSelector, Stack, Text } from 'grommet';
import { DispatchContext, StateContext } from './lib/contexts';

export default function YearSelectDrop({ inputRef }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { dropSelection, dropValues } = state;

  function handleChange(newSelection) {
    dispatch({ type: 'applyNewSelection', payload: newSelection });
  }

  function handleSelectionMod(mod) {
    const [minSelect, maxSelect] = [...dropSelection];
    const nextSelection = [minSelect + mod, maxSelect - mod];
    let [nextMin, nextMax] = nextSelection;

    if (nextMin > nextMax) {
      return dispatch({
        type: 'applyNewSelection',
        payload: [minSelect, minSelect]
      });
    }

    if (nextMin >= 0 && !(nextMax < dropValues.length)) {
      nextMax = maxSelect;
    } else if (!(nextMin >= 0) && nextMax < dropValues.length) {
      nextMin = minSelect;
    }

    if (nextMin >= 0 && nextMax < dropValues.length) {
      return dispatch({
        type: 'applyNewSelection',
        payload: [nextMin, nextMax]
      });
    }

    return undefined;
  }

  function handleWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
      handleSelectionMod(-1);
    } else if (event.deltaY > 0) {
      handleSelectionMod(+1);
    }
  }

  // TODO: investigate react no-op error
  function handleClickOutside() {
    dispatch({ type: 'closeDrop' });
  }

  const displayValues = dropValues.reduce((list, val, i) => {
    return i % 10 === 0 ? [...list, val] : list;
  }, []);
  // const numArray = Array.from({ length: displayValues.length }, (v, k) => k);

  return (
    <Drop
      align={{ top: 'bottom', left: 'left' }}
      onClickOutside={handleClickOutside}
      stretch={false}
      width="100vw"
      target={inputRef.current}
      elevation="small"
      pad="20px"
      onWheel={handleWheel}
    >
      <Stack id="rangeSelectContainer">
        <Box
          direction="row"
          border={{ side: 'bottom', size: '3px', color: 'neutral-1' }}
          justify="between"
        >
          {displayValues.map(value => (
            <Box key={value}>
              <Text
                style={{
                  fontFamily: 'monospace',
                  userSelect: 'none',
                  msUserSelect: 'none',
                  MozUserSelect: 'none'
                }}
                margin="5px 10px"
              >
                {value}
              </Text>
            </Box>
          ))}
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
