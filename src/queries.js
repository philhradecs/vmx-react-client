import { gql } from 'apollo-boost';

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

export { GET_SEARCH_RELEASES };
