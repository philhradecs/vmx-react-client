import { Box } from 'grommet';
import FilterForm from '../FilterForm/FilterForm';
import ViewSettings from '../ViewSettings/ViewSettings';

function ControlBox({ isCollapsed, prevQuery }) {
  return (
    <Box
      height={isCollapsed ? 'xsmall' : 'small'}
      direction="row"
      fill="horizontal"
      align="center"
    >
      <FilterForm isCollapsed prevQuery={prevQuery} />
      {/* <ViewSettings isCollapsed /> */}
    </Box>
  );
}

export default ControlBox;
