import { gql } from 'apollo-boost';

const GET_SEARCH_RELEASES = gql`
  query searchReleases(
    $query: String
    $genre: String
    $style: String
    $country: String
    $years: String
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
          small
        }
        id
      }
    }
  }
`;

const GET_RELEASE_DETAILS = gql`
  query releaseDetails($id: ID!) {
    releaseDetails(id: $id) {
      title
      artists {
        name
        id
      }
      genres
      styles
      released
      tracklist {
        position
        duration
        title
      }
      images {
        type
        full
        small
      }
      id
    }
  }
`;

export { GET_SEARCH_RELEASES, GET_RELEASE_DETAILS };
