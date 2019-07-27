import { withRouter } from 'next/router';
import { Box, Grid } from 'grommet';

import TopBar from '../components/TopBar/TopBar';
import CoverGrid from '../components/CoverGrid/CoverGrid';

import musicTypes from '../data/discogsMusicTypes190510';
import { GET_SEARCH_RELEASES } from '../apollo/queries';
import ApolloDataProvider from '../components/ApolloDataProvider/ApolloDataProvider';
import PaginationStatusBar from '../components/PaginationStatusBar/PaginationStatusBar';
import PaginationBar from '../components/PaginationBar/PaginationBar';

function formatQueryForApollo(queryParam) {
  const query = { ...queryParam };
  query.page = parseInt(query.page, 10);
  query.per_page = parseInt(query.per_page, 10);

  if (Object.prototype.hasOwnProperty.call(query, 'musicType')) {
    const matchedTypeEntry = musicTypes.find(
      ({ label }) => label === query.musicType
    );
    const matchedType = matchedTypeEntry ? matchedTypeEntry.value : 'style';
    query[matchedType] = query.musicType;
    delete query.musicType;
  }
  return query;
}

function Explorer({ router }) {
  const apolloQuery = formatQueryForApollo(router.query); // translate 'musicType' form parameter to query parameter 'style' or 'genre'

  const apolloOptions = {
    variables: apolloQuery,
    query: GET_SEARCH_RELEASES
  };

  return (
    <Box height="100vh">
      <Grid
        fill
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        // gap="small"
        areas={[
          { name: 'topBar', start: [0, 0], end: [1, 0] },
          { name: 'paginationBar', start: [0, 1], end: [0, 1] },
          { name: 'coverGrid', start: [1, 1], end: [1, 1] }
        ]}
      >
        <Box gridArea="topBar">
          <TopBar prevQuery={router.query} small />
        </Box>
        <ApolloDataProvider
          apolloOptions={apolloOptions}
          typeName="searchReleases"
          load
        >
          {/* <PaginationStatusBar /> */}
          <Box gridArea="coverGrid" overflow="hidden">
            <CoverGrid columns={5} />
          </Box>
          <Box gridArea="paginationBar">
            <PaginationBar />
          </Box>
        </ApolloDataProvider>
      </Grid>
    </Box>
  );
}

export default withRouter(Explorer);
