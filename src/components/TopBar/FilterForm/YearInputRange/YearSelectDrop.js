import { useContext } from 'react';
import { Box, Drop, RangeSelector, Stack, Text } from 'grommet';
import { CaretDown, CaretUp } from 'grommet-icons';
import { DispatchContext, StateContext, ConfigContext } from './lib/contexts';

export default function YearSelectDrop({ textInputRef }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { dropValuesRange, dropEntries } = useContext(ConfigContext);
  const { dropSelection, dropValues } = state;

  function adaptToUserRangeMod(direction) {
    const [rangeMin, rangeMax] = dropValuesRange;
    const years = [...dropValues];
    years.sort();

    switch (direction) {
      case 'inc': {
        if (years[years.length - 1] < rangeMax) {
          dispatch({ type: 'incrementDropValues' });
        } else if (dropSelection[0] > 0) {
          dispatch({
            type: 'applyNewSelection',
            payload: dropSelection.map(idx => idx - 1)
          });
        }
        break;
      }
      case 'dec': {
        if (years[0] > rangeMin) {
          dispatch({ type: 'decrementDropValues' });
        } else if (dropSelection[1] < dropEntries - 1) {
          dispatch({
            type: 'applyNewSelection',
            payload: dropSelection.map(idx => idx + 1)
          });
        }
        break;
      }
      default:
        break;
    }
  }

  function handleChange(newSelection) {
    dispatch({ type: 'applyNewSelection', payload: newSelection });
  }

  function handleScroll(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
      adaptToUserRangeMod('inc');
    } else if (event.deltaY > 0) {
      adaptToUserRangeMod('dec');
    }
  }

  function handleClick(event) {
    event.preventDefault();
    adaptToUserRangeMod(event.target.id);
  }

  function handleClickOutside() {
    dispatch({ type: 'closeDrop' });
  }

  const numArray = Array.from({ length: dropEntries }, (v, k) => k);

  return (
    <Drop
      align={{ top: 'bottom', left: 'left' }}
      onClickOutside={handleClickOutside}
      stretch={false}
      target={textInputRef.current}
      elevation="small"
    >
      <Box
        align="center"
        justify="center"
        onClick={handleClick}
        cursor="pointer"
        id="inc"
        pad={{ vertical: '0.4rem' }}
      >
        <CaretUp pointerEvents="none" color="plain" size="small" />
      </Box>
      <Stack id="rangeSelectContainer" onWheel={handleScroll}>
        <Box direction="column">
          {numArray.map(index => (
            <Box key={index} pad={{ horizontal: '1rem', vertical: '0.3rem' }}>
              <Text
                style={{
                  fontFamily: 'monospace',
                  userSelect: 'none',
                  msUserSelect: 'none',
                  MozUserSelect: 'none'
                }}
              >
                {dropValues[index]}
              </Text>
            </Box>
          ))}
        </Box>
        <RangeSelector
          id="rangeSelector"
          direction="vertical"
          min={0}
          max={dropEntries - 1}
          invert={false}
          size="medium"
          round="xxsmall"
          values={dropSelection}
          onChange={handleChange}
        />
      </Stack>
      <Box
        align="center"
        justify="center"
        onClick={handleClick}
        cursor="pointer"
        id="dec"
        pad={{ vertical: '0.4rem' }}
      >
        <CaretDown pointerEvents="none" color="plain" size="small" />
      </Box>
    </Drop>
  );
}
