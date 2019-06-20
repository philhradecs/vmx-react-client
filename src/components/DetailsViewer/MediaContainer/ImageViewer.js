import Ratio from 'react-ratio/lib/Ratio';
import { Image, Box } from 'grommet';
import { useState } from 'react';
import ImageSelector from './ImageSelector';

export default function ImageViewer({ initialImage, images, loading, error }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesDataIsFetched, setImagesDataIsFetched] = useState(images);

  return (
    <Box fill>
      <Box overflow="hidden" round="7px" height="80%">
        <Ratio>
          <Image
            src={imagesDataIsFetched ? images[activeIndex].full : initialImage}
            fallback="https://s3.amazonaws.com/detroitpubliclibrary/assets/images/material-cd.jpg"
            fit="cover"
            height="100%"
          />
        </Ratio>
      </Box>
      <Box height="20%">
        {error ? (
          error.message
        ) : (
          <ImageSelector
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            images={images}
            loading={loading}
          />
        )}
      </Box>
    </Box>
  );
}
