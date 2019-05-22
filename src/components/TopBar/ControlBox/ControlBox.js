import { Box } from 'grommet';
import FilterForm from '../FilterForm/FilterForm';
import ViewSettings from '../ViewSettings/ViewSettings';

function ControlBox({ isCollapsed, initialFormValues }) {
  return (
    <Box
      height={isCollapsed ? 'xsmall' : 'small'}
      direction="row"
      fill="horizontal"
      align="center"
    >
      <FilterForm isCollapsed initialFormValues={initialFormValues} />
      {/* <ViewSettings isCollapsed /> */}
    </Box>
  );
}

export default ControlBox;
