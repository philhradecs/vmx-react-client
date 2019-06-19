import { Box, Text } from 'grommet';
import { Query } from 'react-apollo';
import { GET_RELEASE_DETAILS } from '../../../apollo/queries';
import LoadingTile from './LoadingTile';

export default function Back({ releaseID, loadBack }) {
  return (
    <Box fill>
      {loadBack && (
        <Query query={GET_RELEASE_DETAILS} variables={{ id: releaseID }}>
          {({ data, loading, error, fetchMore }) => {
            if (loading) return <LoadingTile />;
            if (error) return `${error.message}`;
            if (data === null) return 'No Details';

            const result = data.releaseDetails;
            const { images } = result;
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
                  {result.tracklist.map(track => {
                    const { title, position } = track;
                    return (
                      <Text
                        key={title + position}
                        margin={{ bottom: '3px' }}
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
          }}
        </Query>
      )}
    </Box>
  );
}
