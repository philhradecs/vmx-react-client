import { useEffect } from 'react';
import { Box, Drop, RangeSelector, Stack, Text } from 'grommet';

function YearSelectDrop({
  textInputRef,
  handleClickOutside,
  handleScroll,
  displayValues,
  handleSelectionChange,
  selectedIndex
}) {
  useEffect(() => {
    const scrollArea = document.getElementById('rangeSelectContainer');
    scrollArea.addEventListener('wheel', handleScroll);
    return function cleanup() {
      scrollArea.removeEventListener('wheel', handleScroll);
    };
  });

  return (
    <Drop
      align={{ top: 'bottom', left: 'left' }}
      stretch={false}
      target={textInputRef.current}
      onClickOutside={handleClickOutside}
    >
      <Stack id="rangeSelectContainer">
        <Box direction="column">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
            <Box key={index} pad={{ horizontal: '1em', vertical: '0.3em' }}>
              <Text style={{ fontFamily: 'monospace' }}>
                {displayValues[index]}
              </Text>
            </Box>
          ))}
        </Box>
        <RangeSelector
          id="rangeSelector"
          direction="vertical"
          min={0}
          max={9}
          invert={false}
          size="medium"
          round="xxsmall"
          values={selectedIndex}
          onChange={handleSelectionChange}
        />
      </Stack>
    </Drop>
  );
}

export default YearSelectDrop;
