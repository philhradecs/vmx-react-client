import { useContext } from 'react';
import { Box, Text } from 'grommet';
import ApolloDataContext from '../ApolloDataProvider/context';
import PaginationControls from './PaginationControls';

export default function PaginationStatusBar() {
  const { data, loading, fetchMoreData, hasMore } = useContext(
    ApolloDataContext
  );

  return (
    <Box
      direction="row"
      justify="center"
      align="center"
      pad="0.5rem"
      gap="large"
    >
      {loading ? (
        <Text size="small" alignSelf="center">
          LOADING...
        </Text>
      ) : (
        <PaginationControls
          data={data}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
        />
      )}
    </Box>
  );
}
