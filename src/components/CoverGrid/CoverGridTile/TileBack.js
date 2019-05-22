import { Box, Image, Text, Stack } from 'grommet';
import { Query } from 'react-apollo';
import { GET_RELEASE_DETAILS } from '../../../queries';

export default function TileBack({ releaseID }) {
  return (
    <Box background="neutral-1">
      <Query query={GET_RELEASE_DETAILS} variables={{ releaseID }}>
        {({ data, loading, error, fetchMore }) => {
          if (loading) return 'Loading';
          if (error) return `Error: ${error.message}`;

          return data === null ? 'No Details' : <Text>{data.tracklist}</Text>;
        }}
      </Query>
    </Box>
  );
}
