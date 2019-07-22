import { Box, Image } from 'grommet';
import Ratio from 'react-ratio/lib/Ratio';

export default function MainImage({ imageSrc }) {
  return (
    <Box overflow="hidden" round="7px" fill pad="1rem">
      <Ratio>
        <Box overflow="hidden" round="7px" elevation="medium" fill>
          <Box
            fill
            background={{
              image: `url("${imageSrc}"), url('https://s3.amazonaws.com/detroitpubliclibrary/assets/images/material-cd.jpg')`,
              position: 'center',
              size: 'cover'
            }}
          />
        </Box>
      </Ratio>
    </Box>
  );
}
