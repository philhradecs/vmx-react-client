import { useState } from 'react';
import { Grid, Layer, Keyboard } from 'grommet';

import CoverGridTile from './CoverGridTile/CoverGridTile';
import DetailsViewer from '../DetailsViewer/DetailsViewer';

export default function CoverGrid({ data, columns }) {
  const { results } = data;
  const [showDetailsViewer, setShowDetailsViewer] = useState(false);
  const [detailsID, setDetailsID] = useState(null);

  function openDetailsViewerAtID(id) {
    setDetailsID(id);
    setShowDetailsViewer(true);
  }

  return (
    <>
      <Grid columns={{ count: columns, size: 'auto' }}>
        {results.map(release => (
          <CoverGridTile
            key={release.id}
            data={release}
            openDetailsViewerAtID={openDetailsViewerAtID}
          />
        ))}
      </Grid>
      {showDetailsViewer && (
        <Keyboard onEsc={() => setShowDetailsViewer(false)} target="document">
          <Layer
            position="center"
            onClickOutside={() => setShowDetailsViewer(false)}
          >
            <DetailsViewer data={data.results} detailsID={detailsID} />
          </Layer>
        </Keyboard>
      )}
    </>
  );
}
