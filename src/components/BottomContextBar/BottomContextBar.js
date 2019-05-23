import { Box } from 'grommet';
import InfoContext from './InfoContext';

export default function ContextBottomBar({ contextData }) {
  return (
    <Box background="neutral-3" pad="15px">
      {contextData && <InfoContext data={contextData} />}
    </Box>
  );
}
