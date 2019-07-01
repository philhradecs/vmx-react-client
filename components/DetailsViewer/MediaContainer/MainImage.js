import { Box, Image } from 'grommet';
import Ratio from 'react-ratio/lib/Ratio';

export default function MainImage({ imageSrc }) {
  return (
    <Box overflow="hidden" round="7px" fill>
      <Ratio>
        <Box
          margin="1rem"
          overflow="hidden"
          round="7px"
          elevation="medium"
          fill="horizontal"
        >
          <Image
            src={imageSrc}
            fallback="https://s3.amazonaws.com/detroitpubliclibrary/assets/images/material-cd.jpg"
            fit="contain"
            height="100%"
            width="100%"
          />
        </Box>
      </Ratio>
    </Box>
  );
}
