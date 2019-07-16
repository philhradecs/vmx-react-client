import { useState } from 'react';
import { Box, Text } from 'grommet';
import { css } from '@emotion/core';
import { GridLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoadingGrid({ text }) {
  const [loading, setLoading] = useState(true);
  return (
    <Box fill direction="column" justify="center" align="center">
      <GridLoader
        css={override}
        sizeUnit="px"
        size={20}
        color="white"
        loading={loading}
      />
      {text && <Text color="white">{text}</Text>}
    </Box>
  );
}
