import { withRouter } from 'next/router';
import { Box } from 'grommet';

import TopBar from '../components/TopBar/TopBar';
import CoverGrid from '../components/CoverGrid/CoverGrid';

import musicTypes from '../data/discogsMusicTypes190510';
import { GET_SEARCH_RELEASES } from '../apollo/queries';
import ApolloDataProvider from '../components/ApolloDataProvider/ApolloDataProvider';
import PaginationStatusBar from '../components/PaginationStatusBar/PaginationStatusBar';

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
    <Box direction="column" height="100vh">
      <TopBar prevQuery={router.query} small />
      <ApolloDataProvider
        apolloOptions={apolloOptions}
        typeName="searchReleases"
        load
      >
        <PaginationStatusBar />
        <Box height="100%">
          <CoverGrid columns={5} />
        </Box>
      </ApolloDataProvider>
    </Box>
  );
}

export default withRouter(Explorer);
