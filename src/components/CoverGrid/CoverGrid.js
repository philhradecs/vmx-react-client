import { useMemo } from 'react';
import { Box, Grid } from 'grommet';

import CoverGridTile from './CoverGridTile/CoverGridTile';

export default function CoverGrid({ data, columns }) {
  const { results } = data;

  return (
    <Grid columns={{ count: columns, size: 'auto' }}>
      {results.map(release => (
        <CoverGridTile key={release.id} data={release} />
      ))}
    </Grid>
  );
}
