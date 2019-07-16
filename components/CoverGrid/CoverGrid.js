import Router from 'next/router';

import { useCallback, useState, useContext, useEffect } from 'react';
import { Grid, Box } from 'grommet';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import CoverGridTile from './CoverGridTile/CoverGridTile';
import DetailsViewerLayer from '../DetailsViewer/DetailsViewerLayer';
import ApolloDataContext from '../ApolloDataProvider/context';
import LoadingGridLayer from './LoadingGridLayer';
import LoadingGrid from './LoadingGrid';

const TransitionBox = styled.div`
  &.tile-transition-enter,
  &.tile-transition-appear {
    opacity: 0.01;
  }
  &.tile-transition-enter-active,
  &.tile-transition-appear-active {
    opacity: 1;
    transition: all 500ms;
  }
  &.tile-transition-exit {
    opacity: 1;
  }
  &.tile-transition-exit-active {
    opacity: 0.01;
    transition: all 500ms;
  }
`;

export default function CoverGrid({ columns }) {
  const {
    data,
    loading,
    error,
    hasMore,
    fetchMoreData,
    variables
  } = useContext(ApolloDataContext);
  const [dataMemory, setDataMemory] = useState(null);

  useEffect(
    () => {
      if (data && !loading) {
        setDataMemory(data);
      }
    },
    [data, loading]
  );

  const [showDetailsViewer, setShowDetailsViewer] = useState(false);
  const [detailsID, setDetailsID] = useState(null);

  const openDetailsViewerAtID = useCallback(id => {
    setDetailsID(id);
    setShowDetailsViewer(true);
  }, []);

  if (error) return error.message;
  if (loading && !dataMemory) return <LoadingGrid />;

  const { results } = loading ? dataMemory : data; // show previous grid data while loading new data

  const coverTiles = results.map(release => {
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
  });

  function handleReachTop() {
    if (hasMore.prev) {
      fetchMoreData.prevPage();
    }
  }
  function handleReachBottom() {
    if (hasMore.next) {
      fetchMoreData.nextPage();
    }
  }

  return (
    <>
      <InfiniteScroll
        onReachBottom={handleReachBottom}
        onReachTop={handleReachTop}
      >
        <CSSTransition
          in
          appear
          exit
          timeout={500}
          unmountOnExit
          classNames="tile-transition"
        >
          <TransitionBox>
            <Grid
              as="ul"
              style={{ padding: '1rem', margin: 0 }}
              columns={{ count: columns, size: 'auto' }}
              gap="medium"
            >
              {coverTiles}
            </Grid>
          </TransitionBox>
        </CSSTransition>
      </InfiniteScroll>

      {loading && <LoadingGridLayer text={`loading page ${variables.page}`} />}

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
