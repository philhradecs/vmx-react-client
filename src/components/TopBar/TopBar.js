import { useState } from 'react';
import { Box, Collapsible } from 'grommet';
import CollapsibleControl from './CollapsibleControl/CollapsibleControl';

import ControlBox from './ControlBox/ControlBox';

function TopBar({ initialFormValues }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box>
      <Collapsible open={!isCollapsed}>
        <ControlBox
          isCollapsed={isCollapsed}
          initialFormValues={initialFormValues}
        />
      </Collapsible>
      <CollapsibleControl
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </Box>
  );
}

export default TopBar;
