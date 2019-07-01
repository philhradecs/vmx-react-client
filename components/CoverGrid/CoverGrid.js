import { useCallback, useState } from 'react';
import { Grid } from 'grommet';

import CoverGridTile from './CoverGridTile/CoverGridTile';
import DetailsViewerLayer from '../DetailsViewer/DetailsViewerLayer';

export default function CoverGrid({ data, columns }) {
  const { results } = data;
  const [showDetailsViewer, setShowDetailsViewer] = useState(false);
  const [detailsID, setDetailsID] = useState(null);

  const openDetailsViewerAtID = useCallback(id => {
    setDetailsID(id);
    setShowDetailsViewer(true);
  }, []);

  return (
    <>
      <Grid
        as="ul"
        style={{ padding: 0, margin: 0 }}
        columns={{ count: columns, size: 'auto' }}
        gap="medium"
      >
        {results.map(release => {
          const { id } = release;
          const openDetailsViewer = event => {
            event.stopPropagation();
            openDetailsViewerAtID(id);
          };

          return (
            <CoverGridTile
              key={id}
              data={release}
              openDetailsViewer={openDetailsViewer}
            />
          );
        })}
      </Grid>
      {showDetailsViewer && (
        <DetailsViewerLayer
          searchData={data.results}
          detailsID={detailsID}
          close={() => setShowDetailsViewer(false)}
        />
      )}
    </>
  );
}
