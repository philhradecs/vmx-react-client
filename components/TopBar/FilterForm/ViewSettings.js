import { useState } from 'react';
import { Box, RadioButtonGroup, RangeInput } from 'grommet';

function ViewSettings() {
  const [value, setValue] = useState('one');
  return (
    <Box direction="row" align="center" justify="center">
      <RangeInput />

      <RadioButtonGroup
        name="doc"
        options={['one', 'two']}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </Box>
  );
}

export default ViewSettings;
