import { useContext } from 'react';
import { Box, Text, Heading } from 'grommet';
import ApolloDataContext from '../../ApolloDataProvider/context';

export default function ArtistDetails() {
  const { artistDetails, loading } = useContext(ApolloDataContext);

  if (loading) return '...loading';
  if (!artistDetails) return 'no description for this artist';

  const { name, realname, profile } = artistDetails;

  return (
    <Box overflow="auto">
      <Heading size="1.1rem" level="2">
        Artist:
      </Heading>
      <Text>{name}</Text>
      <Heading size="1.1rem" level="2">
        Profile:
      </Heading>
      <Text>{profile}</Text>
    </Box>
  );
}
