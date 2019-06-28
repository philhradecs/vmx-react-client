import { useState, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { Projects, Stop, FormAdd, FormSubtract, Split } from 'grommet-icons';

import IconWrapper from '../../IconWrapper';

const minColumns = 3;
const maxColumns = 8;

function ViewSettings() {
  const [numColumns, setNumColumns] = useState(5);
  const [splitView, setSplitView] = useState(false);

  function decreaseNumColumns() {
    const nextNum = numColumns - 1;
    if (nextNum >= minColumns) {
      setNumColumns(nextNum);
    }
  }

  function increaseNumColumns() {
    const nextNum = numColumns + 1;
    if (nextNum <= maxColumns) {
      setNumColumns(nextNum);
    }
  }

  return (
    <Box direction="row" align="center" justify="center" gap="2rem">
      <Box gap="1.5rem" direction="row" align="center">
        <Text>Size</Text>
        <Box direction="row" gap="0.3rem">
          <IconWrapper
            onClick={decreaseNumColumns}
            highlightColor="accent-4"
            focusIndicator={false}
            disabled={numColumns <= minColumns}
          >
            <FormSubtract color="neutral-3" />
          </IconWrapper>
          <Projects />
          <IconWrapper
            onClick={increaseNumColumns}
            highlightColor="accent-4"
            focusIndicator={false}
            disabled={numColumns >= maxColumns}
          >
            <FormAdd color="neutral-3" />
          </IconWrapper>
        </Box>
      </Box>
      <Box gap="1.5rem" direction="row" align="center">
        <Text>Layout</Text>
        <Box direction="row" gap="0.3rem">
          <IconWrapper
            onClick={() => setSplitView(false)}
            highlightColor="accent-4"
            focusIndicator={false}
            selected={!splitView}
          >
            <Stop size="1.8rem" color="neutral-3" />
          </IconWrapper>
          <IconWrapper
            onClick={() => setSplitView(true)}
            highlightColor="accent-4"
            focusIndicator={false}
            sticky
            selected={splitView}
          >
            <Split color="neutral-3" />
          </IconWrapper>
        </Box>
      </Box>
    </Box>
  );
}

export default ViewSettings;
