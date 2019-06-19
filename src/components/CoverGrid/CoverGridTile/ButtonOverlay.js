import React from 'react';

import { Box, Collapsible, Stack } from 'grommet';
import { Expand, Revert } from 'grommet-icons';
import IconWrapper from '../../IconWrapper';

export default function ButtonOverlay({
  children,
  handleFlip,
  openDetailsViewer,
  tileIsHovering
}) {
  // const blend = { mixBlendMode: 'exclusion' };
  // TODO: beautify blending algorithm
  return (
    <Stack fill>
      <Box fill>{children}</Box>
      <Collapsible direction="vertical" open={tileIsHovering}>
        <Box
          direction="column"
          align="end"
          alignSelf="end"
          justify="end"
          background="rgba(255,255,255,0.7)"
          round={{ corner: 'bottom', size: '6px' }}
          margin={{ right: '0.4rem' }}
          elevation="xsmall"
          pad="0.5rem"
          gap="0.5rem"
        >
          <IconWrapper onClick={openDetailsViewer} highlightColor="accent-4">
            <Expand
              color="neutral-3"
              // style={blend}
              size="1.2rem"
            />
          </IconWrapper>

          <IconWrapper onClick={handleFlip} highlightColor="accent-4">
            <Revert
              color="neutral-3"
              // style={blend}
              size="1.2rem"
            />
          </IconWrapper>
        </Box>
      </Collapsible>
    </Stack>
  );
}
