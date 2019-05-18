import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import { Box } from 'grommet';

import TopBar from '../components/TopBar/TopBar';
import CoverGrid from '../components/CoverGrid/CoverGrid';

import musicTypes from '../components/TopBar/FilterForm/InputAutosuggestion/data/discogsMusicTypes190510';
import { GET_SEARCH_RELEASES } from '../queries';
import combineSearchData from '../utils/combineSearchData';

function formatQueryForApollo(queryParam) {
  const query = { ...queryParam };
  if (Object.prototype.hasOwnProperty.call(query, 'musicType')) {
    const matchedType = musicTypes.find(
      ({ label }) => label === query.musicType
    ).value;
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
      <TopBar initialFormValues={router.query} />
      <Query query={GET_SEARCH_RELEASES} variables={apolloQuery}>
        {({ data, loading, error, fetchMore }) => {
          if (loading) return 'Loading';
          if (error) return `Error: ${error.message}`;

          const combinedData = combineSearchData(data.searchReleases);
          if (combinedData.items === 0) return 'No Results!';
          return <CoverGrid data={combinedData} />;
        }}
      </Query>
    </Box>
  );
});

export default Explorer;
