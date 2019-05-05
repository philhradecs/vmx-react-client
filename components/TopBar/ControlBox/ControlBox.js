import { Box } from 'grommet';
import FilterForm from '../FilterForm/FilterForm';
import ViewSettings from '../FilterForm/ViewSettings';

function ControlBox({ isCollapsed }) {
  return (
    <Box
      height={isCollapsed ? 'xsmall' : 'small'}
      direction="row"
      justify="around"
      align="center"
      fill
    >
      <FilterForm isCollapsed />
      <ViewSettings isCollapsed />
    </Box>
  );
}

export default ControlBox;
