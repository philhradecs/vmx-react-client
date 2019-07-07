import { useState } from 'react';
import { Box } from 'grommet';
import { css } from '@emotion/core';
import { PropagateLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoadingImageSelector() {
  const [loading, setLoading] = useState(true);
  return (
    <Box fill justify="center" align="center">
      <PropagateLoader
        css={override}
        sizeUnit="px"
        size={15}
        color="#123abc"
        loading={loading}
      />
    </Box>
  );
}
