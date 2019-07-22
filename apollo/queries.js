import { gql } from 'apollo-boost';

export const GET_FETCHED_PAGES = gql`
  {
    fetchedPages @client
  }
`;

export const GET_ACTIVE_QUERY = gql`
  {
    activeQuery @client {
      query
      genre
      style
      country
      years
      artist
      page
      per_page
    }
  }
`;

export const GET_SEARCH_RELEASES = gql`
  query searchReleases(
    $query: String
    $genre: String
    $style: String
    $country: String
    $years: String
    $artist: String
    $page: Int
    $per_page: Int
  ) {
    searchReleases(
      query: $query
      genre: $genre
      style: $style
      country: $country
      years: $years
      artist: $artist
      page: $page
      per_page: $per_page
    ) {
      pagination {
        items
        page
        pages
        # fetchedPages @client
        per_page
      }
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

export const GET_RELEASE_DETAILS = gql`
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

export const GET_ARTIST_DETAILS = gql`
  query releaseDetails($id: ID!) {
    artistDetails(id: $id) {
      name
      realname
      profile
      images {
        small
        full
      }
      id
    }
  }
`;
