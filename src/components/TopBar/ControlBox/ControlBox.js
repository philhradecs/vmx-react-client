import { Anchor, Box } from 'grommet';

import FilterForm from '../FilterForm/FilterForm';
import ViewSettings from '../ViewSettings/ViewSettings';

function ControlBox({ prevQuery, small }) {
  return (
    <Box direction="row" fill="horizontal" align="center">
      <Box width="50px" justify="center" align="center">
        <Anchor href="/">
          <Box color="brand">VMX</Box>
        </Anchor>
      </Box>
      <FilterForm prevQuery={prevQuery} small={small} />
      {/* <ViewSettings isCollapsed small={small}/> */}
    </Box>
  );
}

export default ControlBox;
