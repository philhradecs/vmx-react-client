import { Box, Button, Text } from 'grommet';
import { FormPreviousLink, FormNextLink } from 'grommet-icons';

const ButtonLabel = text => <Text size="small">{text}</Text>;

export default function PaginationControls({ data, fetchMoreData, hasMore }) {

  return (
    <Box direction="row" gap="large">
      <Button
        plain
        label={ButtonLabel('PREV PAGE')}
        onClick={fetchMoreData.prevPage}
        icon={<FormPreviousLink />}
        hoverIndicator
        disabled={!hasMore.prev}
      />
      <Text size="small" color="dark-1">
        {data.pagination.page} of {data.pagination.pages}
      </Text>
      <Button
        plain
        label={ButtonLabel('NEXT PAGE')}
        onClick={fetchMoreData.nextPage}
        icon={<FormNextLink />}
        hoverIndicator
        disabled={!hasMore.next}
        reverse
      />
    </Box>
  );
}
