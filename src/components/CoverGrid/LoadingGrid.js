import { useState } from 'react';
import { Box } from 'grommet';
import { css } from '@emotion/core';
import { GridLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoadingGrid() {
  const [loading, setLoading] = useState(true);
  return (
    <Box fill justify="center" align="center">
      <GridLoader
        css={override}
        sizeUnit="px"
        size={20}
        color="#123abc"
        loading={loading}
      />
    </Box>
  );
}
