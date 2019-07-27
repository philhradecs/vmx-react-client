import { useState, useContext, useEffect, useMemo } from 'react';
import { Grid } from 'grommet';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import CoverGridTile from './CoverGridTile/CoverGridTile';
import DetailsViewerLayer from '../DetailsViewer/DetailsViewerLayer';
import ApolloDataContext from '../ApolloDataProvider/context';
import LoadingGridLayer from './LoadingGridLayer';
import LoadingGrid from './LoadingGrid';
import LoadMoreUIWrapper from './LoadMoreUIOverlay/LoadMoreUIWrapper';

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
    searchReleases,
    loading,
    error,
    hasMore,
    fetchMoreData,
    variables
  } = useContext(ApolloDataContext);

  const defaultMemoryData = { results: [] };
  const [dataMemory, setDataMemory] = useState(defaultMemoryData);
  const [reachedTop, setReachedTop] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(
    () => {
      if (searchReleases && !loading) {
        setDataMemory(searchReleases);
      }
    },
    [searchReleases, loading]
  );

  const [showDetailsViewer, setShowDetailsViewer] = useState(false);
  const [detailsID, setDetailsID] = useState(null);

  const { results } = loading ? dataMemory : searchReleases; // show previous grid data while loading new data

  const coverTiles = useMemo(
    () =>
      results.map(release => {
        const { id } = release;
        const openDetailsViewer = event => {
          event.stopPropagation();
          setDetailsID(id);
          setShowDetailsViewer(true);
        };

        return (
          <CoverGridTile
            key={id}
            data={release}
            openDetailsViewer={openDetailsViewer}
          />
        );
      }),
    [results]
  );

  if (error) return error.message;
  if (loading && !dataMemory) return <LoadingGrid />;

  function handleReachTop() {
    if (hasMore.prev) {
      setReachedTop(true);
    }
  }
  function handleReachBottom() {
    if (hasMore.next) {
      setReachedBottom(true);
    }
  }

  function resetReachedEnds() {
    setReachedBottom(false);
    setReachedTop(false);
  }

  const trackScroll = { top: reachedTop, bottom: reachedBottom };

  return (
    <>
      <LoadMoreUIWrapper
        callbackTop={fetchMoreData.prevPage}
        callbackBottom={fetchMoreData.nextPage}
        trackScroll={trackScroll}
        resetReachedEnds={resetReachedEnds}
        minHeight={40}
        limit={350}
        step={40}
      >
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
                style={{ padding: '0', margin: '0.5rem' }}
                columns={{ count: columns, size: 'auto' }}
              >
                {coverTiles}
              </Grid>
            </TransitionBox>
          </CSSTransition>
        </InfiniteScroll>
      </LoadMoreUIWrapper>

      {loading && <LoadingGridLayer text="loading" />}

      {showDetailsViewer && (
        <DetailsViewerLayer
          searchData={searchReleases.results}
          detailsID={detailsID}
          close={() => setShowDetailsViewer(false)}
        />
      )}
    </>
  );
}
