import { Box } from 'grommet';
import { Down, Up } from 'grommet-icons';

export default function CollapsibleControl({ isCollapsed, setIsCollapsed }) {
  return (
    <Box direction="row" align="center" justify="center">
      {isCollapsed ? (
        <Box
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          <Down color="neutral-3" />
        </Box>
      ) : (
        <Box onClick={() => setIsCollapsed(!isCollapsed)}>
          <Up color="neutral-3" />
        </Box>
      )}
    </Box>
  );
}
