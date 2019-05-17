import { useState } from 'react';
import { Box, Collapsible } from 'grommet';
import { Up, Down } from 'grommet-icons';

import ControlBox from './ControlBox/ControlBox';

function TopBar({ initialFormValues }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Collapsible open={!isCollapsed}>
        <ControlBox
          isCollapsed={isCollapsed}
          initialFormValues={initialFormValues}
        />
      </Collapsible>
      <Box tag="header" direction="row" align="center" justify="center">
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
    </>
  );
}

export default TopBar;
