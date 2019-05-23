import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import { Box } from 'grommet';

import TopBar from '../components/TopBar/TopBar';
import CoverGrid from '../components/CoverGrid/CoverGrid';

import musicTypes from '../components/TopBar/FilterForm/InputAutosuggestion/data/discogsMusicTypes190510';
import { GET_SEARCH_RELEASES } from '../queries';
import { combineSearchData } from '../utils/dataUtils';

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
  if (typeof query.years === 'string') {
    query.years = [query.years];
  }
  return query;
}

const Explorer = withRouter(({ router }) => {
  const apolloQuery = formatQueryForApollo(router.query);

  return (
    <Box>
      <Box direction="column" height="100vh">
        <TopBar initialFormValues={router.query} />
        <Box overflow="auto" height="100%">
          <Query query={GET_SEARCH_RELEASES} variables={apolloQuery}>
            {({ data, loading, error, fetchMore }) => {
              if (loading) return 'Loading';
              if (error) return `Error: ${error.message}`;

              const combinedData = combineSearchData(data.searchReleases);

              return combinedData.results.length === 0 ? (
                'No Results'
              ) : (
                <CoverGrid columns={5} data={combinedData} />
              );
            }}
          </Query>
        </Box>
      </Box>
    </Box>
  );
});

export default Explorer;
