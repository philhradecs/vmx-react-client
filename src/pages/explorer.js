import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import { Box } from 'grommet';

import TopBar from '../components/TopBar/TopBar';
import CoverGrid from '../components/CoverGrid/CoverGrid';
import LoadingGrid from '../components/CoverGrid/LoadingGrid';

import musicTypes from '../data/discogsMusicTypes190510';
import { GET_SEARCH_RELEASES } from '../apollo/queries';

function formatQueryForApollo(queryParam) {
  const query = { ...queryParam };
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

const Explorer = withRouter(({ router }) => {
  const apolloQuery = formatQueryForApollo(router.query);

  return (
    <Box>
      <Box direction="column" height="100vh">
        <TopBar prevQuery={router.query} small />
        <Box
          overflow="auto"
          height="100%"
          pad={{ horizontal: 'medium', vertical: 'small' }}
        >
          <Query query={GET_SEARCH_RELEASES} variables={apolloQuery}>
            {({ data, loading, error, fetchMore }) => {
              if (loading) return <LoadingGrid />;
              if (error) return `Error: ${error.message}`;

              const queryData = data.searchReleases;
              return queryData.results.length === 0 ? (
                'No Results'
              ) : (
                <CoverGrid columns={5} data={queryData} />
              );
            }}
          </Query>
        </Box>
      </Box>
    </Box>
  );
});

export default Explorer;
