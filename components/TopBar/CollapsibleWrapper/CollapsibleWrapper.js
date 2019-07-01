import React, { useState } from 'react';
import { Box, Collapsible } from 'grommet';
import CollapsibleControl from './CollapsibleControl';

function CollapsibleWrapper({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box>
      <Collapsible open={!isCollapsed}>
        {React.cloneElement(children, isCollapsed)}
      </Collapsible>
      <CollapsibleControl
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </Box>
  );
}

export default CollapsibleWrapper;
