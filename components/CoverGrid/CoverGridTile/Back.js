import { Box, Text } from 'grommet';
import { useContext } from 'react';
import LoadingTile from './LoadingTile';
import ApolloDataContext from '../../ApolloDataProvider/context';

export default function Back() {
  const { data } = useContext(ApolloDataContext);

  if (!data) return <LoadingTile />;

  const { images } = data;
  const image =
    images.length > 1
      ? images[1]
      : images[0] || {
          full:
            'https://s3.amazonaws.com/detroitpubliclibrary/assets/images/material-cd.jpg'
        };

  return (
    <Box
      fill
      align="center"
      justify="center"
      background={{
        image: `url("${image.full}")`,
        position: 'center',
        size: 'cover'
      }}
    >
      <Box
        background="rgba(0,0,0,0.6)"
        width="80%"
        pad="1rem"
        margin="1rem"
        overflow="hidden"
        round="4px"
      >
        {data.tracklist.map(track => {
          const { title, position } = track;
          const margin = { bottom: '3px' };
          return (
            <Text
              key={title + position}
              margin={margin}
              size="0.8rem"
              color="white"
            >
              {position}. {title}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
