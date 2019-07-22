import { useState } from 'react';
import { Box } from 'grommet';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoadingArtistDetails() {
  const [loading, setLoading] = useState(true);
  return (
    <Box fill justify="center" align="center">
      <ScaleLoader
        css={override}
        sizeUnit="px"
        size={15}
        color="#123abc"
        loading={loading}
      />
    </Box>
  );
}
