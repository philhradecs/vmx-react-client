import { useContext } from 'react';
import { Box, Text } from 'grommet';
import ApolloDataContext from './ApolloDataProvider/context';

export default function ResultStatusBar() {
  const { data, loading } = useContext(ApolloDataContext);
  return data && !loading ? (
    <Box
      direction="row"
      justify="center"
      align="center"
      pad="0.5rem"
      gap="large"
    >
      <Text size="small" color="dark-1">
        PAGE: {data.pagination.page} of {data.pagination.pages}
      </Text>
      <Text size="small" color="dark-1">
        RESULTS: {data.pagination.items}
      </Text>
    </Box>
  ) : null;
}
