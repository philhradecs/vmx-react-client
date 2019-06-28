import { Box } from 'grommet';
import { Down, Up } from 'grommet-icons';

import IconWrapper from '../../IconWrapper';

export default function CollapsibleControl({ isCollapsed, setIsCollapsed }) {
  function toggleCollapsed() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <Box
      direction="row"
      align="center"
      justify="center"
      margin={{ horizontal: '0.8rem' }}
    >
      {isCollapsed ? (
        <IconWrapper
          highlightColor="accent-4"
          onClick={toggleCollapsed}
          hoverIndicator="light-1"
          iconPad={{ vertical: '0.3rem', horizontal: '6rem' }}
        >
          <Down color="neutral-3" size="1.2rem" />
        </IconWrapper>
      ) : (
        <IconWrapper
          highlightColor="accent-4"
          onClick={toggleCollapsed}
          hoverIndicator="light-1"
          iconPad={{ vertical: '0.3rem', horizontal: '6rem' }}
        >
          <Up color="neutral-3" size="1.2rem" />
        </IconWrapper>
      )}
    </Box>
  );
}
