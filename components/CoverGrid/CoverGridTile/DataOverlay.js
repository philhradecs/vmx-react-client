import React from 'react';
import { Box, Text } from 'grommet';
import { Disc, Group } from 'grommet-icons';

export default function DataOverlay({ data }) {
  const { country, year } = data;
  const [artist, title] = data.title.split('-');

  const iconSize = '0.9rem';
  const iconColor = 'brand';

  return (
    <Box fill>
      <Box fill direction="column" justify="end" alignSelf="end">
        <Box direction="row" align="center" gap="0.3rem">
          <Box flex={false}>
            <Disc size={iconSize} color={iconColor} />
          </Box>
          <Text truncate size="small" margin={{ right: 'auto' }}>
            {title}
          </Text>
          <Text size="small">{year}</Text>
        </Box>
        <Box direction="row" align="center" gap="0.3rem">
          <Box flex={false}>
            <Group size={iconSize} color={iconColor} />
          </Box>
          <Text truncate size="small" margin={{ right: 'auto' }}>
            {artist}
          </Text>
          <Text size="small">{country}</Text>
        </Box>
      </Box>
    </Box>
  );
}
