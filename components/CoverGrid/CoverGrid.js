import { useCallback, useState, useContext } from 'react';
import { Grid, Box } from 'grommet';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import CoverGridTile from './CoverGridTile/CoverGridTile';
import DetailsViewerLayer from '../DetailsViewer/DetailsViewerLayer';
import DiscogsDataContext from '../ApolloDataProvider/context';
import LoadingGrid from './LoadingGrid';

const ListTransitionBox = styled(Box)`
  /* This fires as soon as the element enters the dorm */
  .tile-transition-enter,
  .tile-transition-appear {
    /*We give the list the initial dimension of the list button*/
    top: 0;
    width: 120px;
    max-height: 40px;
    color: transparent;
    background-color: #5a564c;
  }
  /* This is where we can add the transition*/
  .tile-transition-enter-active,
  .tile-transition-appear-active {
    top: 45px;
    width: 200px;
    max-height: 200px;
    background-color: #9e8949;
    transition: all 400ms;
  }
  /* This fires as soon as the this.state.showList is false */
  .tile-transition-exit {
    top: 45px;
    width: 200px;
    max-height: 200px;
    background-color: #9e8949;
  }
  /* fires as element leaves the DOM*/
  .tile-transition-exit-active {
    top: 0;
    width: 120px;
    max-height: 40px;
    color: transparent;
    background-color: #5a564c;
    transition: all 400ms;
  }
`;

export default function CoverGrid({ columns }) {
  const { data, loading, error, fetchPage } = useContext(DiscogsDataContext);

  const [showDetailsViewer, setShowDetailsViewer] = useState(false);
  const [detailsID, setDetailsID] = useState(null);

  const openDetailsViewerAtID = useCallback(id => {
    setDetailsID(id);
    setShowDetailsViewer(true);
  }, []);
  if (loading) return <LoadingGrid />;
  if (error) return error.message;

  const { results } = data;

  const coverTiles = results.map(release => {
    const { id } = release;
    const openDetailsViewer = event => {
      event.stopPropagation();
      openDetailsViewerAtID(id);
    };

    return (
      <CSSTransition in appear timeout={500} key={id}>
        <ListTransitionBox>
          <CoverGridTile data={release} openDetailsViewer={openDetailsViewer} />
        </ListTransitionBox>
      </CSSTransition>
    );
  });

  return (
    <>
      <InfiniteScroll
        onReachBottom={fetchPage.next}
        onReachTop={fetchPage.prev}
      >
        <Grid
          as="ul"
          style={{ padding: '1rem', margin: 0 }}
          columns={{ count: columns, size: 'auto' }}
          gap="medium"
        >
          {coverTiles}
        </Grid>
      </InfiniteScroll>
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
