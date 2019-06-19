import { useState } from 'react';
import { Box } from 'grommet';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoadingTile() {
  const [loading, setLoading] = useState(true);
  return (
    <Box fill justify="center" align="center">
      <ClipLoader
        css={override}
        sizeUnit="px"
        size={100}
        color="#123abc"
        loading={loading}
      />
    </Box>
  );
}
