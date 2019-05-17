import { withRouter } from 'next/router';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Box } from 'grommet';
import TopBar from '../components/TopBar/TopBar';
import musicTypes from '../components/TopBar/FilterForm/InputAutosuggestion/data/discogsMusicTypes190510';

// FIXME: setup apollo vscode extension, check gql tag
const GET_SEARCH_RELEASES = gql`
  query searchReleases(
    $query: String
    $genre: String
    $style: String
    $country: String
    $years: [String]
    $artist: String
  ) {
    searchReleases(
      query: $query
      genre: $genre
      style: $style
      country: $country
      years: $years
      artist: $artist
    ) {
      items
      page
      pages
      results {
        title
        year
        country
        genres
        styles
        image {
          full
        }
        id
      }
    }
  }
`;

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

          return (
            <div>
              {data.searchReleases.map(({ items, page, pages, results }, idx) =>
                results.length > 1 ? (
                  <ul key={idx}>
                    <strong>
                      set #{idx + 1} | total number of items: {items} | page{' '}
                      {page} of {pages}
                    </strong>
                    <hr />
                    {results.map(
                      ({ title, year, country, genres, styles, id }) => (
                        <li key={id}>
                          <b>{title}</b> ({' '}
                          <span
                            style={{ opacity: '0.9', fontWeight: 'lighter' }}
                          >
                            year:
                          </span>{' '}
                          {year}{' '}
                          <span
                            style={{ opacity: '0.9', fontWeight: 'lighter' }}
                          >
                            country:
                          </span>{' '}
                          {country}{' '}
                          <span
                            style={{ opacity: '0.9', fontWeight: 'lighter' }}
                          >
                            id:
                          </span>{' '}
                          {id}{' '}
                          <span
                            style={{ opacity: '0.9', fontWeight: 'lighter' }}
                          >
                            genres:
                          </span>{' '}
                          {genres.map(genre => `${genre} `)}{' '}
                          <span
                            style={{ opacity: '0.9', fontWeight: 'lighter' }}
                          >
                            styles:
                          </span>{' '}
                          {styles.map(style => `${style} `)})
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  'No results'
                )
              )}
            </div>
          );
        }}
      </Query>
    </Box>
  );
});

export default Explorer;
